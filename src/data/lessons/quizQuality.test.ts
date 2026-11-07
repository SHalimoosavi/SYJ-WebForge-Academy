import {describe,expect,it} from 'vitest';
import {day01} from './day01';import {day02} from './day02';import {day03} from './day03';import {day04} from './day04';import {day05} from './day05';
import {EXPECTED_QUESTION_IDS} from '../../../scripts/quiz-question-ids.mjs';
const lessons=[day01,day02,day03,day04,day05],ids=lessons.flatMap(d=>d.quiz.map(q=>q.id));
const normalize=(s:string)=>s.toLocaleLowerCase().replace(/<[^>]+>/g,' ').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
describe('Days 1–5 quiz data',()=>{
 it('has four questions and four unique stable options per day',()=>{for(const d of lessons){expect(d.quiz).toHaveLength(4);for(const q of d.quiz){expect(q.options).toHaveLength(4);expect(new Set(q.options.map(o=>o.id)).size).toBe(4);expect(new Set(q.options.map(o=>o.label.en)).size).toBe(4);expect(new Set(q.options.map(o=>o.label.hi)).size).toBe(4);}}});
 it('matches the shared 20-question ID allow-list exactly',()=>{expect(EXPECTED_QUESTION_IDS).toHaveLength(20);expect(new Set(EXPECTED_QUESTION_IDS).size).toBe(20);expect(ids).toHaveLength(20);expect(new Set(ids).size).toBe(20);expect([...ids].sort()).toEqual([...EXPECTED_QUESTION_IDS].sort());});
 it('contains English and Hindi text for every prompt and option',()=>{for(const d of lessons)for(const q of d.quiz){expect(q.prompt.en.trim().length).toBeGreaterThan(20);expect(q.prompt.hi.trim().length).toBeGreaterThan(10);for(const o of q.options){expect(o.label.en.trim()).not.toBe('');expect(o.label.hi.trim()).not.toBe('');}}});
 it('has distinct prompts',()=>{const ps=lessons.flatMap(d=>d.quiz.map(q=>normalize(q.prompt.en)));expect(new Set(ps).size).toBe(20);for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=new Set(ps[i].split(' ')),b=new Set(ps[j].split(' '));expect([...a].filter(x=>b.has(x)).length/Math.max(1,new Set([...a,...b]).size)).toBeLessThan(0.72);}});
 it('does not expose answers or explanations in public question data',()=>{for(const d of lessons)for(const q of d.quiz){expect('correctOptionId' in q).toBe(false);expect('explanation' in q).toBe(false);}});
 it('preserves the agreed applied-question revisions',()=>{expect(day02.quiz[1].prompt.en).toContain('one main heading');expect(day03.quiz[0].prompt.en).toMatch(/^Which attribute/);expect(day04.quiz[1].prompt.en).toContain('audio file');expect(day04.quiz[2].options.find(o=>o.id==='c')?.label.en).toBe('alt="divider.png"');});
});

const correctOptionIds=['a','d','b','c','a','b','c','d','a','b','c','d','b','c','a','d','b','a','c','d'];
const displayPatterns=lessons.map((day,dayIndex)=>day.quiz.map((q,questionIndex)=>{
 const optionId=correctOptionIds[dayIndex*4+questionIndex];
 const position=q.options.findIndex(option=>option.id===optionId);
 expect(position, `correct option ID missing for ${q.id}`).toBeGreaterThanOrEqual(0);
 return 'ABCD'[position];
}).join(''));
describe('answer display-order quality (public option data only)',()=>{
 it('has no A-B-C-D run within any day',()=>{for(const pattern of displayPatterns)expect(pattern).not.toContain('ABCD');});
 it('uses a distinct correct-answer letter pattern for every day',()=>{expect(new Set(displayPatterns).size).toBe(5);});
 it('preserves the approved per-question option-ID display order',()=>{
  const expected=[[["b","c","a","d"],["d","a","b","c"],["a","c","d","b"],["a","c","b","d"]],[["b","a","c","d"],["a","c","d","b"],["c","a","b","d"],["a","b","d","c"]],[["b","c","d","a"],["a","b","c","d"],["a","b","c","d"],["d","a","b","c"]],[["b","a","c","d"],["a","b","c","d"],["b","a","c","d"],["a","b","c","d"]],[["a","c","b","d"],["b","c","d","a"],["c","a","b","d"],["a","d","b","c"]]];
  for(let d=0;d<5;d++)expect(lessons[d].quiz.map(q=>q.options.map(o=>o.id))).toEqual(expected[d]);
 });
});
