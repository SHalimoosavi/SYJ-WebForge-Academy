import type {Json} from './database.types';
import {supabase} from './supabase';

export type ProgressSnapshot={completedDays:number[];lessonIds:Record<number,string>};
export type QuizAnswer={question_id:string;option_id:string};
export type QuizFeedback={question_id:string;correct:boolean;explanation_en:string;explanation_hi:string};
export type QuizResult={attempt_id:string;score:number;max_score:number;passed:boolean;best_score:number;feedback:QuizFeedback[]};

function parseQuizResult(value:Json):QuizResult{
 if(typeof value!=='object'||value===null||Array.isArray(value))throw new Error('The quiz service returned an invalid response.');
 const record=value as {[key:string]:Json|undefined};
 const feedback=record.feedback;
 if(typeof record.attempt_id!=='string'||typeof record.score!=='number'||typeof record.max_score!=='number'||typeof record.passed!=='boolean'||typeof record.best_score!=='number'||!Array.isArray(feedback))throw new Error('The quiz service returned an incomplete response.');
 return {attempt_id:record.attempt_id,score:record.score,max_score:record.max_score,passed:record.passed,best_score:record.best_score,feedback:feedback.map(item=>{
  if(typeof item!=='object'||item===null||Array.isArray(item))throw new Error('Invalid quiz feedback item.');
  const row=item as {[key:string]:Json|undefined};
  if(typeof row.question_id!=='string'||typeof row.correct!=='boolean'||typeof row.explanation_en!=='string'||typeof row.explanation_hi!=='string')throw new Error('Invalid quiz feedback item.');
  return {question_id:row.question_id,correct:row.correct,explanation_en:row.explanation_en,explanation_hi:row.explanation_hi};
 })};
}
export async function loadProgress():Promise<ProgressSnapshot>{
 if(!supabase)return {completedDays:[],lessonIds:{}};
 const {data:lessons,error:lessonError}=await supabase.from('lessons').select('id,day_number').gte('day_number',1).lte('day_number',40);
 if(lessonError)throw lessonError;
 const lessonIds:Record<number,string>={};
 for(const row of lessons??[])lessonIds[row.day_number]=row.id;
 const {data:sessionData,error:sessionError}=await supabase.auth.getSession();
 if(sessionError)throw sessionError;
 if(!sessionData.session)return {completedDays:[],lessonIds};
 const {data,error}=await supabase.from('lesson_progress').select('completed,lesson_id').eq('learner_id',sessionData.session.user.id).eq('completed',true);
 if(error)throw error;
 const ids=new Set((data??[]).map(row=>row.lesson_id));
 return {completedDays:Object.entries(lessonIds).filter(([,id])=>ids.has(id)).map(([day])=>Number(day)),lessonIds};
}
export async function submitQuiz(quizId:string,answers:QuizAnswer[]):Promise<QuizResult>{
 if(!supabase)throw new Error('Sign in and connect the learning service to submit a scored quiz.');
 const {data,error}=await supabase.rpc('submit_quiz_attempt',{p_quiz_id:quizId,p_answers:answers as unknown as Json});
 if(error)throw error;
 return parseQuizResult(data);
}
export async function completeLesson(lessonId:string):Promise<void>{
 if(!supabase)throw new Error('Sign in and connect the learning service to save completion.');
 const {error}=await supabase.rpc('mark_lesson_complete',{p_lesson_id:lessonId});
 if(error)throw error;
}
export async function saveExercise(lessonId:string,exerciseKey:string,submission:string):Promise<void>{
 if(!supabase)throw new Error('Sign in and connect the learning service to save your exercise.');
 const {data:sessionData,error:sessionError}=await supabase.auth.getSession();
 if(sessionError)throw sessionError;
 const user=sessionData.session?.user;
 if(!user)throw new Error('Sign in before saving an exercise.');
 const {error}=await supabase.from('exercise_results').upsert({learner_id:user.id,lesson_id:lessonId,exercise_key:exerciseKey,status:'submitted',submission_text:submission},{onConflict:'learner_id,lesson_id,exercise_key'});
 if(error)throw error;
}
