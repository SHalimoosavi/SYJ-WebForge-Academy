import {describe,expect,it} from 'vitest';
import {day01} from './day01';
import {day02} from './day02';
import {day03} from './day03';
import {day04} from './day04';
import {day05} from './day05';
import {EXPECTED_QUESTION_IDS} from '../../../scripts/quiz-question-ids.mjs';

const lessons=[day01,day02,day03,day04,day05];
const expectedIds=[...EXPECTED_QUESTION_IDS];
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
 it('loads a non-empty shared ID allow-list and matches all lesson question IDs exactly',()=>{
  expect(expectedIds.length).toBeGreaterThan(0);
  expect(expectedIds).toHaveLength(20);
  expect(new Set(expectedIds).size).toBe(expectedIds.length);
  const actual=lessons.flatMap(lesson=>lesson.quiz.map(question=>question.id)).sort();
  expect(actual).toHaveLength(20);
  expect(new Set(actual).size).toBe(20);
  expect(actual).toEqual([...expectedIds].sort());
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
