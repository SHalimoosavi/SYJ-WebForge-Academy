export type LessonSection = { id:string; title:{en:string;hi:string}; body:{en:string;hi:string}; code?:string; output?:string; note?:{en:string;hi:string} };
export type QuizQuestion = { id:string; prompt:{en:string;hi:string}; options:{id:string;label:{en:string;hi:string}}[];  explanation:{en:string;hi:string} };
export type LessonContent = {
 day:number; slug:string; title:{en:string;hi:string}; summary:{en:string;hi:string};
 objectives:{en:string[];hi:string[]}; prerequisites:{en:string[];hi:string[]};
 sections:LessonSection[]; exercise:{title:{en:string;hi:string};instructions:{en:string[];hi:string[]};starterCode:string;expectedOutput:string};
 quiz:QuizQuestion[]; assignment:{title:{en:string;hi:string};brief:{en:string;hi:string};criteria:{en:string[];hi:string[]}};
 completion:{en:string[];hi:string[]};
};
