import {mkdir,writeFile} from 'node:fs/promises';
import {stdin} from 'node:process';
import {EXPECTED_QUESTION_IDS} from './quiz-question-ids.mjs';
const chunks=[];for await(const chunk of stdin)chunks.push(chunk);
let rows;try{rows=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new Error('Input must be a JSON array on stdin.');}
if(!Array.isArray(rows)||rows.length!==20)throw new Error('Exactly 20 key entries are required.');
const ids=new Set(EXPECTED_QUESTION_IDS),seen=new Set();
for(const row of rows){if(!row||!ids.has(row.question_id)||seen.has(row.question_id)||typeof row.correct_option_id!=='string'||!['a','b','c','d'].includes(row.correct_option_id)||typeof row.explanation_en!=='string'||!row.explanation_en.trim()||typeof row.explanation_hi!=='string'||!row.explanation_hi.trim())throw new Error('Invalid, duplicate, or incomplete answer-key row.');seen.add(row.question_id);}
if(seen.size!==ids.size)throw new Error('Question IDs do not match the shared allow-list.');
await mkdir('private',{recursive:true});
await writeFile('private/answer-keys-days01-05.json',JSON.stringify(rows,null,2)+'\n',{flag:'wx',mode:0o600});
process.stdout.write('Protected local answer key created. Contents were not printed.\n');
