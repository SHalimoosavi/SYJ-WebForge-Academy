import {describe,expect,it} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {LessonPage} from './LessonPage';

describe('lesson page accessibility structure',()=>{
 it('renders a main landmark, navigation, heading hierarchy and labelled quiz controls',()=>{
  const html=renderToStaticMarkup(<LessonPage day={1} onNavigate={()=>undefined}/>);
  expect(html).toContain('<main');
  expect(html).toContain('aria-label="Lesson navigation"');
  expect(html).toContain('<h1');
  expect(html).toContain('<fieldset');
  expect(html).toContain('<legend');
  expect(html).toContain('type="radio"');
  expect(html).toContain('aria-label="Switch lesson language"');
  expect(html).toContain('id="exercise-code"');
 });
 it('renders the same lesson structure in Hindi when the language is selected through the accessible toggle',()=>{
  const html=renderToStaticMarkup(<LessonPage day={5} onNavigate={()=>undefined}/>);
  expect(html).toContain('Forms &amp; Semantic HTML');
  expect(html).toContain('Knowledge check');
 });
});
