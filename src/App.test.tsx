// @vitest-environment jsdom
import {afterEach,describe,expect,it} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
import App from './App';

afterEach(()=>{cleanup();window.location.hash='';});
describe('hash-based lesson routing',()=>{
 it('loads a direct lesson URL from the initial location hash',async()=>{
  window.location.hash='#/lesson/1';
  render(<App/>);
  expect(await screen.findByRole('heading',{name:'Web & Internet Basics'})).toBeTruthy();
 });
 it('renders a not-found page for unsupported lesson routes',()=>{
  window.location.hash='#/lesson/40';
  render(<App/>);
  expect(screen.getByRole('heading',{name:'Page not found'})).toBeTruthy();
 });
 it('renders the curriculum route without depending on browser history state',()=>{
  window.location.hash='#/curriculum';
  render(<App/>);
  expect(screen.getByRole('heading',{name:'Web Development Roadmap'})).toBeTruthy();
 });
});
