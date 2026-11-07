import {useEffect,useMemo,useState} from 'react';
import {day01} from '../data/lessons/day01';
import {day02} from '../data/lessons/day02';
import {day03} from '../data/lessons/day03';
import {day04} from '../data/lessons/day04';
import {day05} from '../data/lessons/day05';
import type {LessonContent} from '../data/lessonTypes';
import {completeLesson,loadProgress,saveExercise,submitQuiz,type QuizAnswer,type QuizResult} from '../lib/lessonProgress';
import {supabase} from '../lib/supabase';
import {isLessonUnlocked,isQuizComplete} from '../lib/lessonRules';

type Content=LessonContent & {quizId:string};
const lessons:Record<number,Content>={1:day01,2:day02,3:day03,4:day04,5:day05};
type Language='en'|'hi';
type Props={day:number;onNavigate:(path:string)=>void};
export function LessonPage({day,onNavigate}:Props){
 const lesson=lessons[day];
 const [language,setLanguage]=useState<Language>('en');
 const [completed,setCompleted]=useState<number[]>([]);
 const [busy,setBusy]=useState(false);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const [notice,setNotice]=useState('');
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const [result,setResult]=useState<QuizResult|null>(null);
 const [exercise,setExercise]=useState(lesson?.exercise.starterCode??'');
 const [exerciseSaved,setExerciseSaved]=useState(false);
 const [copied,setCopied]=useState(false);
 const t=useMemo(()=>language==='en'?{objectives:'Learning objectives',prereq:'Before you begin',contents:'On this page',practice:'Guided practice',copy:'Copy starter code',copied:'Copied',expected:'Expected result',quiz:'Knowledge check',submit:'Submit answers',assignment:'Mini assignment',criteria:'Submission checklist',complete:'Mark lesson complete',completed:'Completed',previous:'Previous lesson',next:'Next lesson',save:'Save exercise',saved:'Exercise saved',loading:'Loading your progress…',offline:'Sign in and connect Supabase to save progress and submit a scored quiz.',score:'Your score',pass:'Passed',fail:'Not passed yet',retry:'Retake quiz',locked:'Complete this lesson to unlock the next one.',error:'Could not load progress.'}:{objectives:'सीखने के उद्देश्य',prereq:'शुरू करने से पहले',contents:'इस पेज पर',practice:'Guided Practice',copy:'Starter code कॉपी करें',copied:'कॉपी हो गया',expected:'Expected result',quiz:'Knowledge Check',submit:'Answers submit करें',assignment:'Mini Assignment',criteria:'Submission checklist',complete:'Lesson पूरा करें',completed:'पूरा हुआ',previous:'पिछला lesson',next:'अगला lesson',save:'Exercise save करें',saved:'Exercise save हो गया',loading:'आपकी progress लोड हो रही है…',offline:'Progress save और scored quiz submit करने के लिए sign in करके Supabase connect करें।',score:'आपका score',pass:'सफल',fail:'अभी पास नहीं हुए',retry:'Quiz फिर से दें',locked:'अगला lesson खोलने के लिए यह lesson पूरा करें।',error:'Progress लोड नहीं हो सकी।'},[language]);
 useEffect(()=>{let active=true;setLoading(true);loadProgress().then(p=>{if(active)setCompleted(p.completedDays);}).catch(e=>{if(active)setError(e instanceof Error?e.message:t.error);}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[day,t.error]);
 useEffect(()=>{setAnswers({});setResult(null);setExercise(lesson.exercise.starterCode);setExerciseSaved(false);setNotice('');},[day,lesson.exercise.starterCode]);
 if(!lesson)return <main className="lesson-shell"><h1>Lesson not found</h1><a href="#/curriculum">Back to curriculum</a></main>;
 const text=(value:{en:string;hi:string})=>value[language];
 const quizAnswers:QuizAnswer[]=lesson.quiz.filter(q=>answers[q.id]).map(q=>({question_id:q.id,option_id:answers[q.id]}));
 async function handleQuiz(){setBusy(true);setError('');setNotice('');try{if(!isQuizComplete(lesson.quiz.map(q=>q.id),answers))throw new Error(language==='en'?'Answer every question before submitting.':'Submit करने से पहले हर question का answer दें।');const r=await submitQuiz(lesson.quizId,quizAnswers);setResult(r);if(r.passed)setNotice(language==='en'?'Quiz passed. You can now complete this lesson.':'Quiz पास हो गया। अब lesson पूरा कर सकते हैं।');}catch(e){setError(e instanceof Error?e.message:'Quiz submission failed.');}finally{setBusy(false);}}
 async function handleComplete(){setBusy(true);setError('');try{if(!result?.passed)throw new Error(language==='en'?'Pass the quiz before completing this lesson.':'Lesson पूरा करने से पहले quiz पास करें।');const p=await loadProgress();const id=p.lessonIds[day];if(!id)throw new Error('Lesson is not seeded in the learning database.');await completeLesson(id);setCompleted(v=>v.includes(day)?v:[...v,day]);setNotice(language==='en'?'Lesson completion saved.':'Lesson completion save हो गया।');}catch(e){setError(e instanceof Error?e.message:'Could not complete lesson.');}finally{setBusy(false);}}
 async function handleExercise(){setBusy(true);setError('');try{const p=await loadProgress();const id=p.lessonIds[day];if(!id)throw new Error('Lesson is not seeded in the learning database.');await saveExercise(id,lesson.slug,exercise);setExerciseSaved(true);setNotice(t.saved);}catch(e){setError(e instanceof Error?e.message:'Could not save exercise.');}finally{setBusy(false);}}
 async function copyCode(){try{await navigator.clipboard.writeText(lesson.exercise.starterCode);setCopied(true);setTimeout(()=>setCopied(false),1600);}catch{setError(language==='en'?'Clipboard access was blocked by the browser. Select and copy the code manually.':'Browser ने clipboard access रोक दिया। Code select करके manually copy करें।');}}
 const canNext=isLessonUnlocked(day+1,completed);
 return <main className="lesson-shell">
  <header className="lesson-top"><a href="#/" onClick={()=>onNavigate('/')}>SYJ WebAcademy</a><nav aria-label="Lesson navigation"><a href="#/curriculum" onClick={()=>onNavigate('/curriculum')}>Curriculum</a><button className="language-toggle" onClick={()=>setLanguage(v=>v==='en'?'hi':'en')} aria-label="Switch lesson language">{language==='en'?'हिन्दी':'English'}</button></nav></header>
  <div className="lesson-layout"><aside className="lesson-sidebar"><strong>{t.contents}</strong><ol>{lesson.sections.map(s=><li key={s.id}><a href={'#'+s.id}>{text(s.title)}</a></li>)}<li><a href="#practice">{t.practice}</a></li><li><a href="#quiz">{t.quiz}</a></li><li><a href="#assignment">{t.assignment}</a></li></ol><div className="progress-mini"><span>{completed.length}/5 {language==='en'?'completed':'पूरे'}</span><div><i style={{width:(completed.length/5*100)+'%'}}/></div></div></aside>
  <article className="lesson-content"><p className="lesson-kicker">DAY {String(day).padStart(2,'0')} · {language==='en'?'HTML FOUNDATIONS':'HTML की बुनियाद'}</p><h1>{text(lesson.title)}</h1><p className="lesson-summary">{text(lesson.summary)}</p>
   {loading?<p role="status">{t.loading}</p>:null}{error&&<div className="lesson-error" role="alert">{error}</div>}{notice&&<div className="lesson-notice" role="status">{notice}</div>}
   <section className="lesson-panel"><h2>{t.objectives}</h2><ul>{lesson.objectives[language].map(v=><li key={v}>{v}</li>)}</ul></section>
   <section className="lesson-panel"><h2>{t.prereq}</h2><ul>{lesson.prerequisites[language].map(v=><li key={v}>{v}</li>)}</ul></section>
   {lesson.sections.map(section=><section className="lesson-section" id={section.id} key={section.id}><h2>{text(section.title)}</h2><p>{text(section.body)}</p>{section.code&&<pre><code>{section.code}</code></pre>}</section>)}
   <section className="lesson-panel practice-panel" id="practice"><h2>{t.practice}: {text(lesson.exercise.title)}</h2><ol>{lesson.exercise.instructions[language].map(v=><li key={v}>{v}</li>)}</ol><div className="code-heading"><span>HTML · STARTER</span><button onClick={copyCode}>{copied?t.copied:t.copy}</button></div><pre className="code-block"><code>{lesson.exercise.starterCode}</code></pre><label className="field-label" htmlFor="exercise-code">{language==='en'?'Your edited code or written response':'आपका edited code या written response'}</label><textarea id="exercise-code" rows={12} value={exercise} onChange={e=>{setExercise(e.target.value);setExerciseSaved(false);}}/><button className="action-button secondary" onClick={handleExercise} disabled={busy||exercise.trim().length===0}>{t.save}</button>{exerciseSaved&&<span role="status"> {t.saved}</span>}<h3>{t.expected}</h3><p>{lesson.exercise.expectedOutput}</p></section>
   <section className="lesson-panel quiz-panel" id="quiz"><h2>{t.quiz}</h2><p>{language==='en'?'Choose one answer for each question. The server checks your answers and stores the attempt.':'हर question के लिए एक answer चुनें। Server answers check करके attempt save करता है।'}</p>{lesson.quiz.map((q,i)=><fieldset className="quiz-question" key={q.id}><legend>{i+1}. {text(q.prompt)}</legend>{q.options.map(o=><label key={o.id} className="quiz-option"><input type="radio" name={q.id} value={o.id} checked={answers[q.id]===o.id} onChange={()=>{setAnswers(v=>({...v,[q.id]:o.id}));setResult(null);}}/><span>{text(o.label)}</span></label>)}{result&&<p className={result.feedback.find(f=>f.question_id===q.id)?.correct?'answer-good':'answer-bad'}>{result.feedback.find(f=>f.question_id===q.id)?.correct?'✓':'✕'} {language==='en'?result.feedback.find(f=>f.question_id===q.id)?.explanation_en:result.feedback.find(f=>f.question_id===q.id)?.explanation_hi}</p>}</fieldset>)}<button className="action-button" onClick={handleQuiz} disabled={busy||!supabase}>{busy?'…':result?t.retry:t.submit}</button>{result&&<div className="quiz-result" role="status"><strong>{t.score}: {result.score}%</strong><span>{result.passed?t.pass:t.fail}</span><small>{language==='en'?'Best score':'Best score'}: {result.best_score}%</small></div>}{!supabase&&<p className="muted-note">{t.offline}</p>}</section>
   <section className="lesson-panel assignment-panel" id="assignment"><h2>{t.assignment}: {text(lesson.assignment.title)}</h2><p>{text(lesson.assignment.brief)}</p><h3>{t.criteria}</h3><ul>{lesson.assignment.criteria[language].map(v=><li key={v}>{v}</li>)}</ul><h3>{language==='en'?'Completion requirements':'Completion requirements'}</h3><ul>{lesson.completion[language].map(v=><li key={v}>{v}</li>)}</ul></section>
   <div className="lesson-complete"><button className="action-button" onClick={handleComplete} disabled={busy||!result?.passed||completed.includes(day)}>{completed.includes(day)?t.completed:t.complete}</button>{!result?.passed&&!completed.includes(day)&&<small>{language==='en'?'A passing server-verified quiz is required.':'Server-verified quiz पास करना जरूरी है।'}</small>}</div>
   <footer className="lesson-pager"><button onClick={()=>onNavigate(day===1?'/curriculum':'/lesson/'+(day-1))}>{t.previous}</button>{day<5?(canNext?<button onClick={()=>onNavigate('/lesson/'+(day+1))}>{t.next} →</button>:<span>{t.locked}</span>):<a href="#/curriculum" onClick={()=>onNavigate('/curriculum')}>Curriculum →</a>}</footer>
  </article></div>
 </main>;
}
