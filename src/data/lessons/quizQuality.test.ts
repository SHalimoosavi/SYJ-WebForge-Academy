import {readFileSync} from 'node:fs';
import {describe,expect,it} from 'vitest';
import {day01} from './day01';
import {day02} from './day02';
import {day03} from './day03';
import {day04} from './day04';
import {day05} from './day05';

const lessons=[day01,day02,day03,day04,day05];
const expectedIds=Array.from({length:5},(_,d)=>Array.from({length:4},(_,q)=>`60000000-0000-4000-8000-0000000000${d+1}${q+1}`)).flat();
const normalize=(value:string)=>value.toLocaleLowerCase().replace(/<[^>]+>/g,' ').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');

describe('Days 1–5 quiz quality',()=>{
 it('has exactly four questions and four distinct options per lesson',()=>{
  for(const lesson of lessons){
   expect(lesson.quiz).toHaveLength(4);
   for(const question of lesson.quiz){
    expect(question.options).toHaveLength(4);
    expect(new Set(question.options.map(option=>option.id)).size).toBe(4);
    expect(new Set(question.options.map(option=>option.label.en)).size).toBe(4);
   }
  }
 });
 it('has unique question IDs matching the answer-key loader schema exactly',()=>{
  const actual=lessons.flatMap(lesson=>lesson.quiz.map(question=>question.id)).sort();
  expect(new Set(actual).size).toBe(20);
  expect(actual).toEqual([...expectedIds].sort());
 });
 it('matches every published question ID to the protected loader allow-list',()=>{
  const loader=readFileSync(new URL('../../../scripts/seed-lesson-answer-keys.mjs',import.meta.url),'utf8');
  const allowed=[...loader.matchAll(/'([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})'/gi)].map(match=>match[1]).sort();
  expect(allowed).toEqual([...expectedIds].sort());
  expect(lessons.flatMap(lesson=>lesson.quiz.map(question=>question.id)).sort()).toEqual(allowed);
 });
 it('provides non-empty English and Hindi prompts and options',()=>{
  for(const lesson of lessons){
   for(const question of lesson.quiz){
    expect(question.prompt.en.trim().length).toBeGreaterThan(20);
    expect(question.prompt.hi.trim().length).toBeGreaterThan(10);
    for(const option of question.options){
     expect(option.label.en.trim().length).toBeGreaterThan(0);
     expect(option.label.hi.trim().length).toBeGreaterThan(0);
    }
   }
  }
 });
 it('has no repeated or near-identical prompts across the 20 questions',()=>{
  const prompts=lessons.flatMap(lesson=>lesson.quiz.map(question=>normalize(question.prompt.en)));
  expect(new Set(prompts).size).toBe(20);
  for(let i=0;i<prompts.length;i++)for(let j=i+1;j<prompts.length;j++){
   const a=new Set(prompts[i].split(' ')),b=new Set(prompts[j].split(' '));
   const overlap=[...a].filter(word=>b.has(word)).length/Math.max(1,new Set([...a,...b]).size);
   expect(overlap).toBeLessThan(0.72);
  }
 });
 it('does not expose correct answers or explanations in the client question type',()=>{
  for(const lesson of lessons)for(const question of lesson.quiz){
   expect('correctOptionId' in question).toBe(false);
   expect('explanation' in question).toBe(false);
  }
 });
});
