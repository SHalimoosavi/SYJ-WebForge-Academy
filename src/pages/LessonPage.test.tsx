// @vitest-environment jsdom
import {afterEach,describe,expect,it} from 'vitest';
import {cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import {LessonPage} from './LessonPage';
import {day01} from '../data/lessons/day01';

afterEach(()=>cleanup());
describe('lesson page accessibility and language behavior',()=>{
 it('renders semantic landmarks, accessible quiz controls and a labelled exercise editor',async()=>{
  render(<LessonPage day={1} onNavigate={()=>undefined}/>);
  await screen.findByRole('heading',{name:'Web & Internet Basics'});
  expect(screen.getByRole('main')).toBeTruthy();
  expect(screen.getByRole('navigation',{name:'Lesson navigation'})).toBeTruthy();
  expect(screen.getByRole('heading',{name:'Learning objectives'})).toBeTruthy();
  expect(screen.getAllByRole('group').length).toBeGreaterThanOrEqual(4);
  expect(screen.getAllByRole('radio').length).toBe(day01.quiz.reduce((total,question)=>total+question.options.length,0));
  expect(screen.getByLabelText('Your edited code or written response')).toBeTruthy();
  expect(screen.getByRole('button',{name:'Switch lesson language'})).toBeTruthy();
 });
 it('switches the same lesson to Hindi without changing the day',async()=>{
  render(<LessonPage day={1} onNavigate={()=>undefined}/>);
  await screen.findByRole('heading',{name:'Web & Internet Basics'});
  fireEvent.click(screen.getByRole('button',{name:'Switch lesson language'}));
  await waitFor(()=>expect(screen.getByRole('heading',{name:'वेब और इंटरनेट की मूल बातें'})).toBeTruthy());
  expect(screen.getByText(/DAY 01/)).toBeTruthy();
 });
 it('shows a prerequisite lock on a direct URL when the previous day is incomplete',async()=>{
  render(<LessonPage day={2} onNavigate={()=>undefined}/>);
  await screen.findByRole('heading',{name:'Complete the previous day first'});
  expect(screen.queryByRole('heading',{name:'HTML Document Structure'})).toBeNull();
 });
});
