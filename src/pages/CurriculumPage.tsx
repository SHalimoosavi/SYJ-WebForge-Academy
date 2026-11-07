import {curriculum} from '../data/curriculum';
type Props={onOpen:(day:number)=>void;onHome:()=>void};
export function CurriculumPage({onOpen,onHome}:Props){
 return <main className="lesson-shell">
  <header className="lesson-top"><a href="#/" onClick={onHome}>SYJ WebAcademy</a><span>40-DAY CURRICULUM · DAYS 1–5 INTERACTIVE</span></header>
  <section className="lesson-intro"><p className="lesson-kicker">LEARN · BUILD · DEPLOY</p><h1>Web Development Roadmap</h1><p>Start with web fundamentals, learn by building, and keep a record of your progress.</p></section>
  <div className="curriculum-list">{curriculum.map(item=><article className="curriculum-row" key={item.day}>
   <span className="day-number">{String(item.day).padStart(2,'0')}</span><div><small>{item.stage}</small><h2>{item.title}</h2><p>{item.summary}</p></div>
   {item.day<=5?<button className="lesson-button" onClick={()=>onOpen(item.day)}>Open lesson <span aria-hidden="true">→</span></button>:<span className="coming-label">Coming in next release</span>}
  </article>)}</div>
 </main>;
}
