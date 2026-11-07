import {useEffect,useState} from 'react';
import HomePage from './pages/HomePage';
import {CurriculumPage} from './pages/CurriculumPage';
import {LessonPage} from './pages/LessonPage';
import './styles.css';

type Route={name:'home'|'curriculum'|'lesson'|'not-found';day?:number};
function readRoute():Route{
 const raw=window.location.hash.replace(/^#/, '')||'/';
 const path=raw.startsWith('/')?raw:'/'+raw;
 if(['/','/home','/dashboard','/batches','/setup'].includes(path))return {name:'home'};
 if(path==='/curriculum')return {name:'curriculum'};
 const match=path.match(/^\/lesson\/(\d{1,2})$/);
 if(match){const day=Number(match[1]);if(day>=1&&day<=5)return {name:'lesson',day};}
 return {name:'not-found'};
}
export default function App(){
 const [route,setRoute]=useState<Route>(()=>readRoute());
 useEffect(()=>{const update=()=>setRoute(readRoute());window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
 const navigate=(path:string)=>{window.location.hash=path;};
 if(route.name==='home')return <><HomePage/><div className="lesson-entry"><a href="#/curriculum">Open the interactive 40-day curriculum <span aria-hidden="true">→</span></a></div></>;
 if(route.name==='curriculum')return <CurriculumPage onOpen={day=>navigate('/lesson/'+day)} onHome={()=>navigate('/')}/>;
 if(route.name==='lesson'&&route.day)return <LessonPage day={route.day} onNavigate={navigate}/>;
 return <main className="lesson-shell"><h1>Page not found</h1><p>The requested lesson or page does not exist.</p><a href="#/">Return home</a></main>;
}
