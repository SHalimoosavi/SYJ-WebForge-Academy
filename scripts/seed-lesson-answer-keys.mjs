import {spawnSync} from 'node:child_process';
import {console} from 'node:console';
import process from 'node:process';

const raw=process.env.SYJ_LESSON_ANSWER_KEYS_JSON;
if(!raw){
  console.error('SYJ_LESSON_ANSWER_KEYS_JSON is required. Load it from a protected secret manager; do not commit it.');
  process.exit(2);
}
let entries;
try{entries=JSON.parse(raw);}catch{console.error('Answer-key secret is not valid JSON.');process.exit(2);}
if(!Array.isArray(entries)||entries.length!==20){
  console.error('Expected exactly 20 Day 1–5 answer-key entries.');
  process.exit(2);
}
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const seen=new Set();
function quote(value){return "'"+String(value).replace(/'/g,"''")+"'";}
for(const row of entries){
 if(!row||typeof row!=='object'||!uuid.test(row.question_id)||typeof row.correct_option_id!=='string'||row.correct_option_id.length<1||row.correct_option_id.length>80||typeof row.explanation_en!=='string'||row.explanation_en.length<3||row.explanation_en.length>2000||typeof row.explanation_hi!=='string'||row.explanation_hi.length<3||row.explanation_hi.length>2000){
  console.error('An answer-key entry has an invalid shape or field length.');
  process.exit(2);
 }
 if(seen.has(row.question_id)){console.error('Duplicate question ID in answer-key secret.');process.exit(2);}
 seen.add(row.question_id);
}
const values=entries.map(row=>`(${quote(row.question_id)}::uuid,${quote(row.correct_option_id)},${quote(row.explanation_en)},${quote(row.explanation_hi)})`).join(',\n');
const sql=`begin;
do $guard$
begin
 if (select count(*) from public.quiz_questions qq join public.quizzes q on q.id=qq.quiz_id join public.lessons l on l.id=q.lesson_id where l.day_number between 1 and 5)<>20 then
  raise exception 'Expected 20 published Day 1–5 quiz questions before loading keys';
 end if;
 if exists(select 1 from jsonb_array_elements(${quote(JSON.stringify(entries))}::jsonb) e where not exists(select 1 from public.quiz_questions qq join public.quizzes q on q.id=qq.quiz_id join public.lessons l on l.id=q.lesson_id where l.day_number between 1 and 5 and qq.id=(e->>'question_id')::uuid and exists(select 1 from jsonb_array_elements(qq.options) opt where opt->>'id'=e->>'correct_option_id'))) then
  raise exception 'Answer key references an unknown question or option';
 end if;
end
$guard$;
insert into lesson_private.quiz_answer_keys(question_id,correct_option_id,explanation_en,explanation_hi) values
${values}
on conflict(question_id) do update set correct_option_id=excluded.correct_option_id,explanation_en=excluded.explanation_en,explanation_hi=excluded.explanation_hi;
commit;`;
const result=spawnSync('psql',['-X','-v','ON_ERROR_STOP=1'],{input:sql,encoding:'utf8',env:process.env});
if(result.stdout)process.stdout.write(result.stdout);
if(result.stderr)process.stderr.write(result.stderr);
if(result.error){console.error(result.error.message);process.exit(1);}
process.exit(result.status??1);
