import {describe,expect,it} from 'vitest';
import {completionPercent,isLessonUnlocked,isQuizComplete} from './lessonRules';

describe('lesson unlock rules',()=>{
 it('unlocks only the first lesson by default',()=>{
  expect(isLessonUnlocked(1,[])).toBe(true);
  expect(isLessonUnlocked(2,[])).toBe(false);
 });
 it('unlocks the next lesson after its predecessor is completed',()=>{
  expect(isLessonUnlocked(2,[1])).toBe(true);
  expect(isLessonUnlocked(3,[1])).toBe(false);
  expect(isLessonUnlocked(3,[1,2])).toBe(true);
 });
 it('rejects invalid day numbers',()=>{
  expect(isLessonUnlocked(0,[1])).toBe(false);
  expect(isLessonUnlocked(41,[40])).toBe(false);
 });
});
describe('quiz answer completeness',()=>{
 it('requires an answer for every question',()=>{
  expect(isQuizComplete(['a','b'],{a:'x',b:'y'})).toBe(true);
  expect(isQuizComplete(['a','b'],{a:'x'})).toBe(false);
 });
 it('rejects an empty quiz and empty option IDs',()=>{
  expect(isQuizComplete([],{a:'x'})).toBe(false);
  expect(isQuizComplete(['a'],{a:''})).toBe(false);
 });
});
describe('progress percentage',()=>{
 it('counts unique valid completed days only',()=>{
  expect(completionPercent([1,2,2,0,41])).toBe(5);
 });
 it('handles empty and invalid totals safely',()=>{
  expect(completionPercent([],40)).toBe(0);
  expect(completionPercent([1],0)).toBe(0);
 });
});
