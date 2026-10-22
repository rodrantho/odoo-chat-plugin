import http from 'node:http';
import {readFile,mkdir,writeFile,rename,unlink,stat} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomBytes} from 'node:crypto';
import {spawn} from 'node:child_process';
import worker from './worker/index.js';

const root=dirname(fileURLToPath(import.meta.url));
const userId='windows-local-owner';
const oldSetup='http://127.0.0.1/';
const redactSetup=(value,setup)=>JSON.parse(JSON.stringify(value).replaceAll(oldSetup,setup));
export function dpapi(mode,input){
 if(process.platform!=='win32')return Promise.reject(Error('Esta versión local requiere Windows.'));
 const action=mode==='protect'?'Protect':'Unprotect';
 const command="Add-Type -AssemblyName System.Security; $raw=[Console]::In.ReadToEnd(); $bytes=[Convert]::FromBase64String($raw); $result=[Security.Cryptography.ProtectedData]::"+action+"($bytes,$null,[Security.Cryptography.DataProtectionScope]::CurrentUser); [Console]::Out.Write([Convert]::ToBase64String($result))";
 return new Promise((resolve,reject)=>{const child=spawn('powershell.exe',['-NoProfile','-NonInteractive','-Command',command],{windowsHide:true,stdio:['pipe','pipe','pipe']});const out=[];let length=0;const timeout=setTimeout(()=>child.kill(),15000);child.on('error',()=>{clearTimeout(timeout);reject(Error('No se pudo usar la protección de Windows.'));});child.stdout.on('data',b=>{length+=b.length;if(length>1000000)child.kill();else out.push(b);});child.stderr.resume();child.on('close',code=>{clearTimeout(timeout);if(code!==0||length>1000000)return reject(Error('Windows no pudo proteger o abrir la conexión local.'));resolve(Buffer.from(Buffer.concat(out).toString().trim(),'base64'));});child.stdin.end(Buffer.from(input).toString('base64'));});
}
export async function startLocal({file=join(process.env.LOCALAPPDATA||join(process.env.USERPROFILE,'AppData','Local'),'OdooLocal','connection.dpapi'),crypt=dpapi,closeAfterSave=false}={}){
 let state={key:randomBytes(32).toString('base64'),row:null},fileTime=0;
 try{const bytes=await readFile(file);state=JSON.parse((await crypt('unprotect',bytes)).toString());if(typeof state.key!=='string'||Buffer.from(state.key,'base64').length!==32||!Object.hasOwn(state,'row'))throw Error('Archivo inválido.');}catch(error){if(error.code!=='ENOENT')throw Error('No se pudo abrir la conexión local de este usuario Windows.');}
 async function refresh(){let info;try{info=await stat(file);}catch(error){if(error.code!=='ENOENT')throw Error('No se pudo leer la conexión protegida.');state={key:randomBytes(32).toString('base64'),row:null};fileTime=0;return;}if(info.mtimeMs===fileTime)return;try{const next=JSON.parse((await crypt('unprotect',await readFile(file))).toString());if(typeof next.key!=='string'||Buffer.from(next.key,'base64').length!==32||!Object.hasOwn(next,'row'))throw Error('Archivo inválido.');state=next;fileTime=info.mtimeMs;}catch{throw Error('No se pudo abrir la conexión local de este usuario Windows.');}}
 async function save(next){const encrypted=await crypt('protect',Buffer.from(JSON.stringify(next)));await mkdir(dirname(file),{recursive:true});const temporary=file+'.'+randomBytes(8).toString('hex')+'.tmp';try{await writeFile(temporary,encrypted,{mode:0o600,flag:'wx'});await rename(temporary,file);}catch{await unlink(temporary).catch(()=>{});throw Error('No se pudo guardar la conexión protegida en este equipo.');}state=next;fileTime=(await stat(file)).mtimeMs;}
 const env={get CREDENTIAL_ENCRYPTION_KEY(){return state.key;},DB:{prepare(sql){return{bind(...args){if(args[0]!==userId)throw Error('Propietario local inválido.');return{async first(){if(!sql.startsWith('SELECT '))throw Error('Consulta inválida.');await refresh();return state.row;},async run(){if(sql.startsWith('INSERT ')){const row={ciphertext:args[1],iv:args[2],updated_at:args[3]};await save({...state,row});return{success:true};}if(sql.startsWith('DELETE ')){try{await unlink(file);}catch(error){if(error.code!=='ENOENT')throw Error('No se pudo eliminar la conexión local.');}state={key:randomBytes(32).toString('base64'),row:null};fileTime=0;return{success:true};}throw Error('Operación local inválida.');}};}};}}};
 const token=randomBytes(32).toString('hex');let origin,setup;
 let html=await readFile(join(root,'worker/settings.html'),'utf8');
 html=html.replace('Cada compañero usa su propia clave API.','Este conector funciona exclusivamente en esta PC y se conecta directamente a Odoo.').replace('Compartir el complemento permite que otros configuren su cuenta. Nunca les entrega acceso a tu conexión.','Las credenciales se guardan en este equipo, protegidas para tu usuario de Windows. No se utiliza Sites.').replaceAll("'/api/","'/"+token+"/api/");
 const server=http.createServer(async(req,res)=>{try{
  if(req.headers.host!==new URL(origin).host){res.writeHead(403);res.end();return;}
  const u=new URL(req.url,origin);if(!u.pathname.startsWith('/'+token+'/')){res.writeHead(404);res.end();return;}
  const path=u.pathname.slice(token.length+1);
  if(path==='/'){if(req.method!=='GET'){res.writeHead(405);res.end();return;}res.writeHead(200,{'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; form-action 'self'; base-uri 'none'"});res.end(html);return;}
  if(!['/api/connection','/api/disconnect'].includes(path)){res.writeHead(404);res.end();return;}
  if(req.method==='POST'&&req.headers.origin!==origin){res.writeHead(403);res.end();return;}
  const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>4096){res.writeHead(413);res.end();return;}chunks.push(chunk);}
  const headers=new Headers({'oai-authenticated-user-id':userId});for(const name of ['origin','content-type','sec-fetch-site'])if(req.headers[name])headers.set(name,req.headers[name]);
  const request=new Request(origin+path,{method:req.method,headers,...(req.method==='POST'?{body:Buffer.concat(chunks)}:{})});
  const response=await worker.fetch(request,env);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(await response.text());if(closeAfterSave&&path==='/api/connection'&&req.method==='POST'&&response.ok)setTimeout(()=>server.close(),1000);
 }catch{res.writeHead(500,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({error:'No se pudo completar la operación local.'}));}});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
 origin='http://127.0.0.1:'+server.address().port;setup=origin+'/'+token+'/';server.unref();
 async function dispatch(message){if(!message||message.jsonrpc!=='2.0')return{jsonrpc:'2.0',id:message?.id??null,error:{code:-32600,message:'Solicitud inválida'}};if(message.id===undefined)return null;
  try{const response=await worker.fetch(new Request(origin+'/mcp',{method:'POST',headers:{'Content-Type':'application/json','oai-authenticated-user-id':userId},body:JSON.stringify(message)}),env);const result=redactSetup(await response.json(),setup);
   if(message.method==='initialize'&&result.result){result.result.serverInfo={name:'odoo-local',version:'0.4.1'};result.result.instructions+=' El servidor se ejecuta en este equipo Windows. Configurar la clave solo en el formulario 127.0.0.1; nunca por chat. No usar el antiguo complemento alojado en Sites.';}
   if(message.method==='tools/call'&&message.params?.name==='odoo_status'&&!result.result?.isError){const content=result.result.content?.find(c=>c.type==='text');if(content){const status=JSON.parse(content.text);status.execution='local-windows';status.connector_version='0.4.1';status.setup_url=setup;content.text=JSON.stringify(status);}}
   return result;
  }catch{return{jsonrpc:'2.0',id:message.id,error:{code:-32603,message:'Error del conector local.'}};}}
 return{server,setup,origin,dispatch,close:()=>new Promise(resolve=>server.close(resolve))};
}
async function main(){const configure=process.argv.includes('--configure');const local=await startLocal({closeAfterSave:configure});if(configure){local.server.ref();process.stdout.write(JSON.stringify({setup_url:local.setup})+'\n');setTimeout(()=>local.server.close(),15*60*1000).unref();return;}let buffer='';let queue=Promise.resolve();
 process.stdin.setEncoding('utf8');process.stdin.on('data',chunk=>{buffer+=chunk;if(Buffer.byteLength(buffer)>200000){process.stderr.write('Solicitud local demasiado grande.\n');process.exitCode=1;process.stdin.destroy();return;}let end;while((end=buffer.indexOf('\n'))!==-1){const line=buffer.slice(0,end).trim();buffer=buffer.slice(end+1);if(!line)continue;queue=queue.then(async()=>{let message;try{message=JSON.parse(line);}catch{process.stdout.write(JSON.stringify({jsonrpc:'2.0',id:null,error:{code:-32700,message:'JSON inválido'}})+'\n');return;}const result=await local.dispatch(message);if(result)process.stdout.write(JSON.stringify(result)+'\n');}).catch(()=>{process.stderr.write('Error al procesar solicitud local.\n');});}});
 process.stdin.on('end',()=>{queue.finally(()=>local.close());});for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>{local.server.close();process.exit(0);});
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===fileURLToPath(new URL('file:///'+process.argv[1].replaceAll('\\','/'))))main().catch(()=>{process.stderr.write('No se pudo iniciar Odoo local.\n');process.exitCode=1;});
