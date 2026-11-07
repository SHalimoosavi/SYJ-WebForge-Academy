export function isLessonUnlocked(day:number,completedDays:readonly number[]):boolean{
 if(!Number.isInteger(day)||day<1||day>40)return false;
 return day===1||completedDays.includes(day-1);
}
export function isQuizComplete(questionIds:readonly string[],answers:Readonly<Record<string,string>>):boolean{
 return questionIds.length>0&&questionIds.every(id=>typeof answers[id]==='string'&&answers[id].length>0);
}
export function completionPercent(completedDays:readonly number[],total=40):number{
 if(!Number.isInteger(total)||total<=0)return 0;
 const unique=new Set(completedDays.filter(day=>Number.isInteger(day)&&day>=1&&day<=total));
 return Math.round(unique.size/total*100);
}
