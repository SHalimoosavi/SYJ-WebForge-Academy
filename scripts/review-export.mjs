import {readFile,writeFile} from 'node:fs/promises';
import {EXPECTED_QUESTION_IDS} from './quiz-question-ids.mjs';
const keyPath='private/answer-keys-days01-05.json',outPath='private/review-export-days01-05.txt';
const keys=JSON.parse(await readFile(keyPath,'utf8'));
if(!Array.isArray(keys)||keys.length!==20)throw new Error('Protected key must contain exactly 20 rows.');
const keyMap=new Map(keys.map(row=>[row.question_id,row]));
if(keyMap.size!==20||EXPECTED_QUESTION_IDS.some(id=>!keyMap.has(id)))throw new Error('Protected key IDs differ from the shared allow-list.');
const letters='ABCD',days=[];
for(let day=1;day<=5;day++){
 const source=await readFile(`src/data/lessons/day0${day}.ts`,'utf8'),start=source.indexOf('=')+1,end=source.lastIndexOf(';');
 const lesson=JSON.parse(source.slice(start,end)),rows=[];
 for(const q of lesson.quiz){
  const key=keyMap.get(q.id);if(!key)throw new Error(`Missing protected key for ${q.id}`);
  const index=q.options.findIndex(o=>o.id===key.correct_option_id);
  if(index<0)throw new Error(`MISMATCH: ${q.id} correct option ID is not in displayed options.`);
  if(!key.explanation_en?.trim()||!key.explanation_hi?.trim())throw new Error(`Missing bilingual explanation for ${q.id}`);
  rows.push({q,key,index});
 }
 days.push({day,rows});
}
const lines=[];
for(const {day,rows} of days){lines.push(`DAY ${day} — ENGLISH`);rows.forEach(({q,key,index},i)=>{lines.push(`Q${i+1}. ${q.prompt.en}`);q.options.forEach((o,j)=>lines.push(`${letters[j]}. ${o.label.en}`));lines.push(`Correct: ${letters[index]}. ${q.options[index].label.en}`,`Explanation: ${key.explanation_en}`,'');});lines.push(`END OF DAY ${day}`,'');}
for(const {day,rows} of days){lines.push(`DAY ${day} — HINDI`);rows.forEach(({q},i)=>{lines.push(`Q${i+1}. ${q.prompt.hi}`);q.options.forEach((o,j)=>lines.push(`${letters[j]}. ${o.label.hi}`));lines.push('');});lines.push(`END OF DAY ${day}`,'');}
await writeFile(outPath,lines.join('\n')+'\n',{mode:0o600});
process.stdout.write(`Review export written: ${outPath}\n`);
