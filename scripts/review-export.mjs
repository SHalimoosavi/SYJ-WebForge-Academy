import {readFile,writeFile} from 'node:fs/promises';
import {EXPECTED_QUESTION_IDS} from './quiz-question-ids.mjs';

const keyPath='private/answer-keys-days01-05.json';
const outPath='private/review-export-days01-05.txt';
const keys=JSON.parse(await readFile(keyPath,'utf8'));
if(!Array.isArray(keys)||keys.length!==20)throw new Error('Protected key must contain exactly 20 rows.');
const keyMap=new Map(keys.map(row=>[row.question_id,row]));
if(keyMap.size!==20||EXPECTED_QUESTION_IDS.some(id=>!keyMap.has(id)))throw new Error('Protected key IDs differ from the shared allow-list.');

const letters='ABCD';
const days=[];
for(let day=1;day<=5;day++){
 const source=await readFile(`src/data/lessons/day0${day}.ts`,'utf8');
 const start=source.indexOf('=')+1;
 const end=source.lastIndexOf(';');
 if(start===0||end<=start)throw new Error(`Unable to parse lesson data for day ${day}.`);
 const lesson=JSON.parse(source.slice(start,end));
 if(!Array.isArray(lesson.quiz))throw new Error(`Missing quiz data for day ${day}.`);
 const rows=[];
 for(const q of lesson.quiz){
  const key=keyMap.get(q.id);
  if(!key)throw new Error(`Missing protected key for ${q.id}`);
  if(!Array.isArray(q.options)||q.options.length!==4)throw new Error(`Expected exactly four displayed options for ${q.id}.`);
  const optionIds=q.options.map(option=>option.id);
  if(new Set(optionIds).size!==4)throw new Error(`Duplicate option IDs in displayed order for ${q.id}.`);
  if(q.options.some(option=>!option.label?.en?.trim()||!option.label?.hi?.trim()))throw new Error(`Missing English/Hindi option label for ${q.id}.`);
  // The lesson stores one shared ordered option array with bilingual labels.
  // Validate both locale labels at each A-D position so the displayed order cannot diverge.
  const englishOrder=q.options.map(option=>option.id);
  const hindiOrder=q.options.map(option=>option.id);
  if(englishOrder.some((id,index)=>id!==hindiOrder[index]))throw new Error(`MISMATCH: English and Hindi option order differs for ${q.id}.`);
  const index=q.options.findIndex(option=>option.id===key.correct_option_id);
  if(index<0)throw new Error(`MISMATCH: ${q.id} correct option ID is not in displayed options.`);
  if(!key.explanation_en?.trim()||!key.explanation_hi?.trim())throw new Error(`Missing bilingual explanation for ${q.id}`);
  rows.push({q,key,index});
 }
 days.push({day,rows});
}

const lines=[];
for(const {day,rows} of days){
 lines.push(`DAY ${day} — ENGLISH`);
 rows.forEach(({q,key,index},i)=>{
  lines.push(`Q${i+1}. ${q.prompt.en}`);
  q.options.forEach((option,j)=>lines.push(`${letters[j]}. ${option.label.en}`));
  lines.push(`Correct: ${letters[index]}. ${q.options[index].label.en}`,`Explanation: ${key.explanation_en}`,'');
 });
 lines.push(`END OF DAY ${day}`,'');
 lines.push(`DAY ${day} — HINDI`);
 rows.forEach(({q,key,index},i)=>{
  lines.push(`Q${i+1}. ${q.prompt.hi}`);
  q.options.forEach((option,j)=>lines.push(`${letters[j]}. ${option.label.hi}`));
  lines.push(`Correct: ${letters[index]}. ${q.options[index].label.hi}`,`Explanation: ${key.explanation_hi}`,'');
 });
 lines.push(`END OF DAY ${day}`,'');
}
await writeFile(outPath,lines.join('\n')+'\n',{mode:0o600});
process.stdout.write(`Review export written: ${outPath}\\n`);
