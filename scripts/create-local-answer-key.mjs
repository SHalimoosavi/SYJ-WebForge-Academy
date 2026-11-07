import {mkdir,writeFile} from 'node:fs/promises';
import {stdin} from 'node:process';
import {EXPECTED_QUESTION_IDS} from './quiz-question-ids.mjs';
const chunks=[];for await(const chunk of stdin)chunks.push(chunk);
let rows;try{rows=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new Error('Input must be a JSON array on stdin.');}
if(!Array.isArray(rows)||rows.length!==20)throw new Error('Exactly 20 key entries are required.');
const ids=new Set(EXPECTED_QUESTION_IDS),seen=new Set();
const generic=/^(this option matches the concept taught in the lesson\.?|यह विकल्प lesson में सिखाई गई अवधारणा से मेल खाता है।?)$/i;
function sentenceCount(value){return value.trim().split(/[.!?।]+/u).filter(part=>part.trim()).length;}
for(const row of rows){
 if(!row||!ids.has(row.question_id)||seen.has(row.question_id)||typeof row.correct_option_id!=='string'||!['a','b','c','d'].includes(row.correct_option_id))throw new Error('Invalid or duplicate answer-key row.');
 for(const field of ['explanation_en','explanation_hi']){
  const value=row[field];
  if(typeof value!=='string'||value.trim().length<20||generic.test(value.trim())||sentenceCount(value)<1||sentenceCount(value)>2)throw new Error(`Each question requires a real 1–2 sentence ${field} explanation; generic or missing text is rejected.`);
 }
 seen.add(row.question_id);
}
if(seen.size!==ids.size)throw new Error('Question IDs do not match the shared allow-list.');
await mkdir('private',{recursive:true});
await writeFile('private/answer-keys-days01-05.json',JSON.stringify(rows,null,2)+'\n',{flag:'wx',mode:0o600});
process.stdout.write('Protected local answer key created. Contents were not printed.\n');
