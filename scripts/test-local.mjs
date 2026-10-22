import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,dirname} from 'node:path';
import {startLocal,dpapi} from '../local-runtime/server.mjs';
const dir=await mkdtemp(join(tmpdir(),'odoo-local-test-')),file=join(dir,'test.dpapi');
const nativeFetch=globalThis.fetch;let local,restored,watcher;const calls=[];
globalThis.fetch=async(url,opts)=>{if(typeof url==='string'&&url.startsWith('https://cloudflare-dns.com/'))return Response.json({Status:0,Answer:new URL(url).searchParams.get('type')==='A'?[{type:1,data:'93.184.216.34'}]:[]});if(typeof url==='string'&&url==='https://erp.example.com/jsonrpc'){const p=JSON.parse(opts.body).params;calls.push(p);let result;if(p.service==='common')result=p.method==='authenticate'?(p.args[1]==='local-test@example.invalid'&&p.args[2]==='fictional-test-key'?101:false):{server_version:'17.0+e',server_version_info:[17,0]};else result=p.args[4]==='read'?p.args[5][0].map(id=>({id,display_name:'Ticket ficticio',partner_id:[501,'Cliente ficticio']})):p.args[4]==='message_post'?901:[];return Response.json({result});}return nativeFetch(url,opts);};
try{
 const input=Buffer.from('DPAPI fictional-data roundtrip');const protectedData=await dpapi('protect',input);assert(!protectedData.includes(input));assert.deepEqual(await dpapi('unprotect',protectedData),input);
 local=await startLocal({file});watcher=await startLocal({file});assert.equal(local.server.address().address,'127.0.0.1');
 const invoke=async(name,args={})=>local.dispatch({jsonrpc:'2.0',id:1,method:'tools/call',params:{name,arguments:args}});
 const startStatus=await invoke('odoo_status');assert(!startStatus.result.isError);const data=JSON.parse(startStatus.result.content[0].text);assert.equal(data.execution,'local-windows');assert.equal(data.connected,false);assert.equal(data.setup_url,local.setup);assert(!JSON.stringify(startStatus).includes('chatgpt.site'));
 const init=await local.dispatch({jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'fictional-local-test',version:'1.0'}}});assert.equal(init.result.serverInfo.name,'odoo-local');
 const list=await local.dispatch({jsonrpc:'2.0',id:2,method:'tools/list'});assert.equal(list.result.tools.length,15);assert(list.result.tools.find(t=>t.name==='odoo_post_message').inputSchema.required.includes('user_approved'));
 const page=await nativeFetch(local.setup);assert.equal(page.status,200);const html=await page.text();assert(html.includes(new URL(local.setup).pathname+'api/connection'));assert.equal((await nativeFetch(local.origin+'/api/connection')).status,404);assert.equal((await nativeFetch(local.setup+'mcp',{method:'POST',body:'{}'})).status,404);
 const endpoint=local.setup+'api/connection',body=JSON.stringify({url:'https://erp.example.com',database:'fictional-db',login:'local-test@example.invalid',apiKey:'fictional-test-key'});
 assert.equal((await nativeFetch(endpoint,{method:'POST',headers:{Origin:'https://evil.example','Content-Type':'application/json'},body})).status,403);
 assert.equal((await nativeFetch(endpoint,{method:'POST',headers:{Origin:local.origin,'Content-Type':'application/json'},body})).status,200);
 const disk=await readFile(file);assert(!disk.includes(Buffer.from('fictional-test-key')));assert(!disk.includes(Buffer.from('local-test@example.invalid')));
 assert.equal(JSON.parse((await invoke('odoo_status')).result.content[0].text).connected,true);
 const refreshed=await watcher.dispatch({jsonrpc:'2.0',id:10,method:'tools/call',params:{name:'odoo_status',arguments:{}}});assert.equal(JSON.parse(refreshed.result.content[0].text).connected,true);await watcher.close();watcher=null;
 const denied=await invoke('odoo_post_message',{model:'helpdesk.ticket',record_id:1,body:'Borrador ficticio',visibility:'customer',user_requested:true});assert.equal(denied.result.isError,true);assert(!calls.some(p=>p.service==='object'&&p.args[4]==='message_post'));
 const approved=await invoke('odoo_post_message',{model:'helpdesk.ticket',record_id:1,body:'Aprobado ficticio',visibility:'customer',user_requested:true,user_approved:true});assert.equal(approved.result.isError,false);assert.equal(calls.at(-1).args[4],'message_post');
 await local.close();local=null;restored=await startLocal({file});const status=await restored.dispatch({jsonrpc:'2.0',id:3,method:'tools/call',params:{name:'odoo_status',arguments:{}}});assert.equal(JSON.parse(status.result.content[0].text).connected,true);
 const disconnected=await nativeFetch(restored.setup+'api/disconnect',{method:'POST',headers:{Origin:restored.origin,'Content-Type':'application/json'},body:'{}'});assert.equal(disconnected.status,200);await assert.rejects(readFile(file),{code:'ENOENT'});
 console.log('PASS: local 127.0.0.1 only, capability URL, CSRF/root rejection, 15 tools, DPAPI protection and restart, disconnect and approved simulated replies. No real Odoo calls.');
}finally{globalThis.fetch=nativeFetch;if(local)await local.close();if(restored)await restored.close();if(watcher)await watcher.close();assert.equal(dirname(resolve(dir)),resolve(tmpdir()));assert(resolve(dir).startsWith(join(resolve(tmpdir()),'odoo-local-test-')));await rm(dir,{recursive:true,force:true});}
