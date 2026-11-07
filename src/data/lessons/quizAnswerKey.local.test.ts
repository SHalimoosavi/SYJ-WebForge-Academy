import {describe,expect,it} from 'vitest';
import {existsSync,readFileSync} from 'node:fs';
import {day01} from './day01';
import {day02} from './day02';
import {day03} from './day03';
import {day04} from './day04';
import {day05} from './day05';
import {EXPECTED_QUESTION_IDS} from '../../../scripts/quiz-question-ids.mjs';
const path='private/answer-keys-days01-05.json',available=existsSync(path);
const lessons=[day01,day02,day03,day04,day05];
describe.skipIf(!available)('local protected answer-key checks',()=>{
 it('matches all 20 IDs and has exactly five correct answers per displayed letter',()=>{
  const keys=JSON.parse(readFileSync(path,'utf8')) as {question_id:string;correct_option_id:string}[];
  expect(keys).toHaveLength(20);expect(keys.map(k=>k.question_id).sort()).toEqual([...EXPECTED_QUESTION_IDS].sort());
  const byId=new Map(keys.map(k=>[k.question_id,k.correct_option_id])),counts={A:0,B:0,C:0,D:0};
  for(const lesson of lessons)for(const q of lesson.quiz){const id=byId.get(q.id);expect(id).toBeDefined();const index=q.options.findIndex(o=>o.id===id);expect(index).toBeGreaterThanOrEqual(0);counts['ABCD'[index] as keyof typeof counts]++;const wrong=q.options.filter(o=>o.id!==id);expect(wrong).toHaveLength(3);expect(wrong.every(o=>o.id!==id)).toBe(true);}
  expect(counts).toEqual({A:5,B:5,C:5,D:5});
 });
});
if(!available)console.info('SKIP: local protected answer-key checks require private/answer-keys-days01-05.json; CI public checks do not have this file.');
