import {describe,expect,it} from 'vitest';
import {day01} from './day01';
import {day02} from './day02';
import {day03} from './day03';
import {day04} from './day04';
import {day05} from './day05';
const lessons=[day01,day02,day03,day04,day05];
describe('Days 1–5 published learning content',()=>{
 it('provides five ordered, distinct lessons with bilingual objectives',()=>{
  expect(lessons.map(x=>x.day)).toEqual([1,2,3,4,5]);
  for(const lesson of lessons){
   expect(lesson.title.en.length).toBeGreaterThan(5);
   expect(lesson.title.hi.length).toBeGreaterThan(2);
   expect(lesson.objectives.en.length).toBeGreaterThanOrEqual(3);
   expect(lesson.objectives.hi.length).toBeGreaterThanOrEqual(3);
   expect(lesson.prerequisites.en.length).toBeGreaterThan(0);
   expect(lesson.prerequisites.hi.length).toBeGreaterThan(0);
  }
 });
 it('includes structured reading, exercises and assignments',()=>{
  for(const lesson of lessons){
   expect(lesson.sections.length).toBeGreaterThanOrEqual(4);
   expect(new Set(lesson.sections.map(section=>section.id)).size).toBe(lesson.sections.length);
   expect(lesson.exercise.starterCode).toContain('<!doctype html>');
   expect(lesson.exercise.instructions.en.length).toBeGreaterThanOrEqual(3);
   expect(lesson.assignment.criteria.en.length).toBeGreaterThanOrEqual(3);
   expect(lesson.assignment.criteria.hi.length).toBeGreaterThanOrEqual(3);
   expect(lesson.completion.en.length).toBeGreaterThanOrEqual(3);
   expect(lesson.completion.hi.length).toBeGreaterThanOrEqual(3);
  }
 });
 it('contains four bilingual quiz questions per day with server UUIDs and no client answer keys',()=>{
  for(const lesson of lessons){
   expect(lesson.quiz).toHaveLength(4);
   for(const question of lesson.quiz){
    expect(question.id).toMatch(/^[0-9a-f-]{36}$/i);
    expect(question.prompt.en.length).toBeGreaterThan(10);
    expect(question.prompt.hi.length).toBeGreaterThan(10);
    expect(question.options).toHaveLength(3);
    expect('correctOptionId' in question).toBe(false);
    expect('explanation' in question).toBe(false);
   }
  }
 });
});
