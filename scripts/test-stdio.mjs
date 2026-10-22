import {spawn} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const dir=await mkdtemp(join(tmpdir(),'odoo-stdio-test-'));
try{const output=await new Promise((done,reject)=>{const child=spawn(process.execPath,[process.argv[2]||'local-runtime/server.mjs'],{cwd:dirname(dirname(fileURLToPath(import.meta.url))),env:{...process.env,LOCALAPPDATA:dir},windowsHide:true,stdio:['pipe','pipe','pipe']});let stdout='',stderr='';const timer=setTimeout(()=>{child.kill();reject(Error('Local stdio timed out'));},10000);child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);child.on('error',reject);child.on('close',code=>{clearTimeout(timer);if(code!==0)return reject(Error('Local process failed without successful shutdown'));done({stdout,stderr});});child.stdin.end([{jsonrpc:'2.0',id:1,method:'initialize',params:{}},{jsonrpc:'2.0',id:2,method:'tools/list'},{jsonrpc:'2.0',id:3,method:'tools/call',params:{name:'odoo_status',arguments:{}}}].map(v=>JSON.stringify(v)).join('\n')+'\n');});
const replies=output.stdout.trim().split('\n').map(s=>JSON.parse(s));assert.equal(replies.length,3);assert.equal(replies[0].result.serverInfo.version,'0.5.0');assert.equal(replies[1].result.tools.length,15);const status=JSON.parse(replies[2].result.content[0].text);assert.equal(status.execution,'local-windows');assert.equal(status.connected,false);assert(status.setup_url.startsWith('http://127.0.0.1:'));assert.equal(output.stderr,'');console.log('PASS: real child-process MCP stdio initialize, 15-tool discovery, local setup status and clean shutdown. No credentials or Odoo calls.');
}finally{assert.equal(dirname(resolve(dir)),resolve(tmpdir()));assert(resolve(dir).startsWith(join(resolve(tmpdir()),'odoo-stdio-test-')));await rm(dir,{recursive:true,force:true});}
