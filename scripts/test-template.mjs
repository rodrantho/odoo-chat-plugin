import assert from 'node:assert/strict';
import {readFile,readdir,mkdtemp,cp,rm} from 'node:fs/promises';
import {join,resolve,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {DatabaseSync} from 'node:sqlite';
import {randomBytes} from 'node:crypto';

const packageRoot=resolve('submission/odoo'),template=join(packageRoot,'skills/instalar-odoo/assets/site-template');
const manifest=JSON.parse(await readFile(join(packageRoot,'plugin.json'),'utf8'));
assert.equal(manifest.version,'0.5.0');
assert.equal(manifest.extensions['com.openai'].onboardingSkill,'./skills/instalar-odoo/SKILL.md');
assert(!(await readdir(packageRoot)).some(n=>['mcp.json','.app.json','.mcp.json'].includes(n)));
const hosting=JSON.parse(await readFile(join(template,'.openai/hosting.json'),'utf8'));
assert.equal(hosting.d1,'DB');assert(!Object.hasOwn(hosting,'project_id'));
for(const name of await readdir(packageRoot,{recursive:true})){
 if(!/\.(?:json|md|js|mjs|ts|sql|html)$/.test(name))continue;
 const source=await readFile(join(packageRoot,name),'utf8');
 assert(!/appgprj_|asdk_app_sites_|rubymouse256|portal\.nst\.uy|nexituruguay|nst-odoo-consultas/.test(source),'Deployed identity in package: '+name);
}
const temp=await mkdtemp(join(tmpdir(),'odoo-template-')),nativeFetch=globalThis.fetch;
const databases=[];
try{
 const instances=[];
 for(const [index,owner] of ['alpha','beta'].entries()){
  const folder=join(temp,owner);await cp(template,folder,{recursive:true});
  execFileSync(process.execPath,['scripts/build.mjs'],{cwd:folder,stdio:'pipe'});
  const worker=(await import(pathToFileURL(join(folder,'dist/server/index.js')).href)).default;
  const db=new DatabaseSync(':memory:');databases.push(db);
  for(const file of (await readdir(join(folder,'drizzle'))).filter(n=>n.endsWith('.sql')).sort())db.exec(await readFile(join(folder,'drizzle',file),'utf8'));
  const env={
   CREDENTIAL_ENCRYPTION_KEY:randomBytes(32).toString('base64'),
   DB:{prepare(sql){return{bind(...p){return{
    async first(){return db.prepare(sql).get(...p)},
    async run(){return db.prepare(sql).run(...p)}
   }}}}}
  };
  const origin='https://'+owner+'.private-install.com';
  async function request(path,body,identity=owner){const r=await worker.fetch(new Request(origin+path,{method:body?'POST':'GET',headers:{...(identity?{'oai-authenticated-user-id':identity}:{}),...(body?{'Content-Type':'application/json',Origin:origin}:{})},...(body?{body:JSON.stringify(body)}:{})}),env);return{status:r.status,data:await r.json()};}
  const call=async(name,args={})=>(await request('/mcp',{jsonrpc:'2.0',id:1,method:'tools/call',params:{name,arguments:args}})).data.result;
  const status=JSON.parse((await call('odoo_status')).content[0].text);assert.equal(status.connected,false);assert.equal(status.setup_url,origin+'/');
  assert.equal((await request('/api/connection',null,null)).status,401);
  instances.push({owner,db,env,request,call,index});
 }
 assert.notEqual(instances[0].env.CREDENTIAL_ENCRYPTION_KEY,instances[1].env.CREDENTIAL_ENCRYPTION_KEY);
 globalThis.fetch=async(url,opts)=>{
  assert.equal(opts.redirect,'manual');
  if(url.startsWith('https://cloudflare-dns.com/'))return Response.json({Status:0,Answer:new URL(url).searchParams.get('type')==='A'?[{type:1,data:'93.184.216.34'}]:[]});
  const rpc=JSON.parse(opts.body).params;const owner=url.includes('alpha')?'alpha':'beta';
  return Response.json({result:rpc.method==='version'?{server_version_info:[17,0]}:rpc.args[2]===owner+'-fictional-key'?101:false});
 };
 for(const x of instances){const result=await x.request('/api/connection',{url:'https://erp.'+x.owner+'.com',database:x.owner,login:x.owner+'@example.invalid',apiKey:x.owner+'-fictional-key'});assert.equal(result.status,200);assert.equal((await x.request('/api/connection',null,'other')).data.configured,false);}
 const a=instances[0],b=instances[1];const row=a.db.prepare('SELECT * FROM user_connections').get();
 assert(!JSON.stringify(row).includes('fictional-key'));
 const original=b.db.prepare('SELECT * FROM user_connections').get();
 b.db.prepare('UPDATE user_connections SET ciphertext=?,iv=?').run(row.ciphertext,row.iv);
 assert.equal((await b.request('/api/connection')).status,400);
 b.db.prepare('UPDATE user_connections SET ciphertext=?,iv=?').run(original.ciphertext,original.iv);
 await a.request('/api/disconnect',{});assert.equal((await a.request('/api/connection')).data.configured,false);assert.equal((await b.request('/api/connection')).data.configured,true);
 console.log('PASS: distributable has no fixed server or deployed identity; two template builds use separate databases, encryption secrets and setup URLs; no credential/record copies; disconnect is independent. Fictional data only.');
}finally{globalThis.fetch=nativeFetch;for(const db of databases)db.close();assert.equal(dirname(resolve(temp)),resolve(tmpdir()));assert(resolve(temp).startsWith(join(resolve(tmpdir()),'odoo-template-')));await rm(temp,{recursive:true,force:true});}
