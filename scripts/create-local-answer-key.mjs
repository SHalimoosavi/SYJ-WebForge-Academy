import {mkdir,writeFile} from 'node:fs/promises';
import {stdin} from 'node:process';
import {EXPECTED_QUESTION_IDS} from './quiz-question-ids.mjs';
const chunks=[];for await(const chunk of stdin)chunks.push(chunk);
let rows;try{rows=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new Error('Input must be a JSON array on stdin.');}
if(!Array.isArray(rows)||rows.length!==20)throw new Error('Exactly 20 key entries are required.');
const ids=new Set(EXPECTED_QUESTION_IDS),seen=new Set(),seenEn=new Set(),seenHi=new Set();
const genericEn=new Set(['this option matches the concept taught in the lesson.','this is the correct answer.','this option is correct.','the correct answer is.','because this is correct.']);
const genericHi=new Set(['यह विकल्प lesson में सिखाई गई अवधारणा से मेल खाता है।','यह सही उत्तर है।','यह विकल्प सही है।','सही उत्तर यही है।']);
function sentenceCount(value){return value.trim().split(/[.!?।]+/u).filter(part=>part.trim()).length;}
for(const row of rows){
 if(!row||!ids.has(row.question_id)||seen.has(row.question_id)||typeof row.correct_option_id!=='string'||!['a','b','c','d'].includes(row.correct_option_id))throw new Error('Invalid or duplicate answer-key row.');
 for(const [field,seenSet,generic] of [['explanation_en',seenEn,genericEn],['explanation_hi',seenHi,genericHi]]){
  const value=row[field],normalized=typeof value==='string'?value.trim().toLocaleLowerCase():'';
  if(typeof value!=='string'||value.trim().length<20||generic.has(normalized)||seenSet.has(normalized)||sentenceCount(value)<1||sentenceCount(value)>2)throw new Error(`Each question requires a distinct, specific 1–2 sentence ${field} explanation; generic or missing text is rejected.`);
  seenSet.add(normalized);
 }
 seen.add(row.question_id);
}
if(seen.size!==ids.size)throw new Error('Question IDs do not match the shared allow-list.');
await mkdir('private',{recursive:true});
await writeFile('private/answer-keys-days01-05.json',JSON.stringify(rows,null,2)+'\n',{flag:'wx',mode:0o600});
process.stdout.write('Protected local answer key created. Contents were not printed.\n');
