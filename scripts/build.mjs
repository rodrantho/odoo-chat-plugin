import {mkdir,copyFile,readFile,writeFile} from 'node:fs/promises';
await mkdir('dist/server',{recursive:true});
await mkdir('dist/.openai',{recursive:true});
const source=await readFile('worker/index.js','utf8');
const html=await readFile('worker/settings.html','utf8');
await writeFile('dist/server/index.js',source.replace("'__SETTINGS_HTML__'",JSON.stringify(html)));
await copyFile('.openai/hosting.json','dist/.openai/hosting.json');
console.log('Build listo');
