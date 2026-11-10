-- Private answer keys and public question bank for Days 1-5. Run after 0002_lesson_engine.sql.
begin;
insert into public.quizzes(id,lesson_id,title_en,title_hi,pass_percent,published)
select '50000000-0000-4000-8000-000000000001',l.id,'Day 1 Knowledge Check','दिन 1 ज्ञान जाँच',70,true
from public.lessons l where l.day_number=1
on conflict(id) do update set published=true;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000011','50000000-0000-4000-8000-000000000001',1,'Which statement best describes the main concept in this lesson?','इस lesson की मुख्य अवधारणा को कौन-सा कथन सही बताता है?','[{"id":"a","label_en":"Use the semantic, standards-based approach taught in the lesson.","label_hi":"Lesson में सिखाया गया semantic और standards-based तरीका अपनाएं।"},{"id":"b","label_en":"Choose elements only for their default visual appearance.","label_hi":"Elements केवल उनके default visual look के आधार पर चुनें।"},{"id":"c","label_en":"Skip browser behavior and rely only on styling.","label_hi":"Browser behavior छोड़कर केवल styling पर निर्भर रहें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000012','50000000-0000-4000-8000-000000000001',2,'What should you do when a browser-side check can be bypassed?','जब browser-side check को bypass किया जा सकता है, तब क्या करना चाहिए?','[{"id":"a","label_en":"Trust the browser completely.","label_hi":"Browser पर पूरी तरह भरोसा करें।"},{"id":"b","label_en":"Repeat validation on the server.","label_hi":"Server पर validation दोबारा करें।"},{"id":"c","label_en":"Remove validation.","label_hi":"Validation हटा दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000013','50000000-0000-4000-8000-000000000001',3,'Which practice improves accessibility?','कौन-सी practice accessibility सुधारती है?','[{"id":"a","label_en":"Use meaningful names and clear text alternatives.","label_hi":"Meaningful names और clear text alternatives दें।"},{"id":"b","label_en":"Communicate meaning only through color.","label_hi":"Meaning केवल color से बताएं।"},{"id":"c","label_en":"Remove labels and instructions.","label_hi":"Labels और instructions हटा दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000014','50000000-0000-4000-8000-000000000001',4,'What is the best way to check your understanding?','अपनी समझ जाँचने का सबसे अच्छा तरीका क्या है?','[{"id":"a","label_en":"Build the exercise and inspect the result.","label_hi":"Exercise बनाएं और result जाँचें।"},{"id":"b","label_en":"Copy code without reading it.","label_hi":"Code पढ़े बिना copy करें।"},{"id":"c","label_en":"Skip testing.","label_hi":"Testing छोड़ दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;

insert into public.quizzes(id,lesson_id,title_en,title_hi,pass_percent,published)
select '50000000-0000-4000-8000-000000000002',l.id,'Day 2 Knowledge Check','दिन 2 ज्ञान जाँच',70,true
from public.lessons l where l.day_number=2
on conflict(id) do update set published=true;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000021','50000000-0000-4000-8000-000000000002',1,'Which statement best describes the main concept in this lesson?','इस lesson की मुख्य अवधारणा को कौन-सा कथन सही बताता है?','[{"id":"a","label_en":"Use the semantic, standards-based approach taught in the lesson.","label_hi":"Lesson में सिखाया गया semantic और standards-based तरीका अपनाएं।"},{"id":"b","label_en":"Choose elements only for their default visual appearance.","label_hi":"Elements केवल उनके default visual look के आधार पर चुनें।"},{"id":"c","label_en":"Skip browser behavior and rely only on styling.","label_hi":"Browser behavior छोड़कर केवल styling पर निर्भर रहें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000022','50000000-0000-4000-8000-000000000002',2,'What should you do when a browser-side check can be bypassed?','जब browser-side check को bypass किया जा सकता है, तब क्या करना चाहिए?','[{"id":"a","label_en":"Trust the browser completely.","label_hi":"Browser पर पूरी तरह भरोसा करें।"},{"id":"b","label_en":"Repeat validation on the server.","label_hi":"Server पर validation दोबारा करें।"},{"id":"c","label_en":"Remove validation.","label_hi":"Validation हटा दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000023','50000000-0000-4000-8000-000000000002',3,'Which practice improves accessibility?','कौन-सी practice accessibility सुधारती है?','[{"id":"a","label_en":"Use meaningful names and clear text alternatives.","label_hi":"Meaningful names और clear text alternatives दें।"},{"id":"b","label_en":"Communicate meaning only through color.","label_hi":"Meaning केवल color से बताएं।"},{"id":"c","label_en":"Remove labels and instructions.","label_hi":"Labels और instructions हटा दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000024','50000000-0000-4000-8000-000000000002',4,'What is the best way to check your understanding?','अपनी समझ जाँचने का सबसे अच्छा तरीका क्या है?','[{"id":"a","label_en":"Build the exercise and inspect the result.","label_hi":"Exercise बनाएं और result जाँचें।"},{"id":"b","label_en":"Copy code without reading it.","label_hi":"Code पढ़े बिना copy करें।"},{"id":"c","label_en":"Skip testing.","label_hi":"Testing छोड़ दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;

insert into public.quizzes(id,lesson_id,title_en,title_hi,pass_percent,published)
select '50000000-0000-4000-8000-000000000003',l.id,'Day 3 Knowledge Check','दिन 3 ज्ञान जाँच',70,true
from public.lessons l where l.day_number=3
on conflict(id) do update set published=true;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000031','50000000-0000-4000-8000-000000000003',1,'Which statement best describes the main concept in this lesson?','इस lesson की मुख्य अवधारणा को कौन-सा कथन सही बताता है?','[{"id":"a","label_en":"Use the semantic, standards-based approach taught in the lesson.","label_hi":"Lesson में सिखाया गया semantic और standards-based तरीका अपनाएं।"},{"id":"b","label_en":"Choose elements only for their default visual appearance.","label_hi":"Elements केवल उनके default visual look के आधार पर चुनें।"},{"id":"c","label_en":"Skip browser behavior and rely only on styling.","label_hi":"Browser behavior छोड़कर केवल styling पर निर्भर रहें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000032','50000000-0000-4000-8000-000000000003',2,'What should you do when a browser-side check can be bypassed?','जब browser-side check को bypass किया जा सकता है, तब क्या करना चाहिए?','[{"id":"a","label_en":"Trust the browser completely.","label_hi":"Browser पर पूरी तरह भरोसा करें।"},{"id":"b","label_en":"Repeat validation on the server.","label_hi":"Server पर validation दोबारा करें।"},{"id":"c","label_en":"Remove validation.","label_hi":"Validation हटा दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000033','50000000-0000-4000-8000-000000000003',3,'Which practice improves accessibility?','कौन-सी practice accessibility सुधारती है?','[{"id":"a","label_en":"Use meaningful names and clear text alternatives.","label_hi":"Meaningful names और clear text alternatives दें।"},{"id":"b","label_en":"Communicate meaning only through color.","label_hi":"Meaning केवल color से बताएं।"},{"id":"c","label_en":"Remove labels and instructions.","label_hi":"Labels और instructions हटा दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000034','50000000-0000-4000-8000-000000000003',4,'What is the best way to check your understanding?','अपनी समझ जाँचने का सबसे अच्छा तरीका क्या है?','[{"id":"a","label_en":"Build the exercise and inspect the result.","label_hi":"Exercise बनाएं और result जाँचें।"},{"id":"b","label_en":"Copy code without reading it.","label_hi":"Code पढ़े बिना copy करें।"},{"id":"c","label_en":"Skip testing.","label_hi":"Testing छोड़ दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;

insert into public.quizzes(id,lesson_id,title_en,title_hi,pass_percent,published)
select '50000000-0000-4000-8000-000000000004',l.id,'Day 4 Knowledge Check','दिन 4 ज्ञान जाँच',70,true
from public.lessons l where l.day_number=4
on conflict(id) do update set published=true;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000041','50000000-0000-4000-8000-000000000004',1,'Which statement best describes the main concept in this lesson?','इस lesson की मुख्य अवधारणा को कौन-सा कथन सही बताता है?','[{"id":"a","label_en":"Use the semantic, standards-based approach taught in the lesson.","label_hi":"Lesson में सिखाया गया semantic और standards-based तरीका अपनाएं।"},{"id":"b","label_en":"Choose elements only for their default visual appearance.","label_hi":"Elements केवल उनके default visual look के आधार पर चुनें।"},{"id":"c","label_en":"Skip browser behavior and rely only on styling.","label_hi":"Browser behavior छोड़कर केवल styling पर निर्भर रहें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000042','50000000-0000-4000-8000-000000000004',2,'What should you do when a browser-side check can be bypassed?','जब browser-side check को bypass किया जा सकता है, तब क्या करना चाहिए?','[{"id":"a","label_en":"Trust the browser completely.","label_hi":"Browser पर पूरी तरह भरोसा करें।"},{"id":"b","label_en":"Repeat validation on the server.","label_hi":"Server पर validation दोबारा करें।"},{"id":"c","label_en":"Remove validation.","label_hi":"Validation हटा दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000043','50000000-0000-4000-8000-000000000004',3,'Which practice improves accessibility?','कौन-सी practice accessibility सुधारती है?','[{"id":"a","label_en":"Use meaningful names and clear text alternatives.","label_hi":"Meaningful names और clear text alternatives दें।"},{"id":"b","label_en":"Communicate meaning only through color.","label_hi":"Meaning केवल color से बताएं।"},{"id":"c","label_en":"Remove labels and instructions.","label_hi":"Labels और instructions हटा दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000044','50000000-0000-4000-8000-000000000004',4,'What is the best way to check your understanding?','अपनी समझ जाँचने का सबसे अच्छा तरीका क्या है?','[{"id":"a","label_en":"Build the exercise and inspect the result.","label_hi":"Exercise बनाएं और result जाँचें।"},{"id":"b","label_en":"Copy code without reading it.","label_hi":"Code पढ़े बिना copy करें।"},{"id":"c","label_en":"Skip testing.","label_hi":"Testing छोड़ दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;

insert into public.quizzes(id,lesson_id,title_en,title_hi,pass_percent,published)
select '50000000-0000-4000-8000-000000000005',l.id,'Day 5 Knowledge Check','दिन 5 ज्ञान जाँच',70,true
from public.lessons l where l.day_number=5
on conflict(id) do update set published=true;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000051','50000000-0000-4000-8000-000000000005',1,'Which statement best describes the main concept in this lesson?','इस lesson की मुख्य अवधारणा को कौन-सा कथन सही बताता है?','[{"id":"a","label_en":"Use the semantic, standards-based approach taught in the lesson.","label_hi":"Lesson में सिखाया गया semantic और standards-based तरीका अपनाएं।"},{"id":"b","label_en":"Choose elements only for their default visual appearance.","label_hi":"Elements केवल उनके default visual look के आधार पर चुनें।"},{"id":"c","label_en":"Skip browser behavior and rely only on styling.","label_hi":"Browser behavior छोड़कर केवल styling पर निर्भर रहें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000052','50000000-0000-4000-8000-000000000005',2,'What should you do when a browser-side check can be bypassed?','जब browser-side check को bypass किया जा सकता है, तब क्या करना चाहिए?','[{"id":"a","label_en":"Trust the browser completely.","label_hi":"Browser पर पूरी तरह भरोसा करें।"},{"id":"b","label_en":"Repeat validation on the server.","label_hi":"Server पर validation दोबारा करें।"},{"id":"c","label_en":"Remove validation.","label_hi":"Validation हटा दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000053','50000000-0000-4000-8000-000000000005',3,'Which practice improves accessibility?','कौन-सी practice accessibility सुधारती है?','[{"id":"a","label_en":"Use meaningful names and clear text alternatives.","label_hi":"Meaningful names और clear text alternatives दें।"},{"id":"b","label_en":"Communicate meaning only through color.","label_hi":"Meaning केवल color से बताएं।"},{"id":"c","label_en":"Remove labels and instructions.","label_hi":"Labels और instructions हटा दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;
insert into public.quiz_questions(id,quiz_id,position,prompt_en,prompt_hi,options)
values('60000000-0000-4000-8000-000000000054','50000000-0000-4000-8000-000000000005',4,'What is the best way to check your understanding?','अपनी समझ जाँचने का सबसे अच्छा तरीका क्या है?','[{"id":"a","label_en":"Build the exercise and inspect the result.","label_hi":"Exercise बनाएं और result जाँचें।"},{"id":"b","label_en":"Copy code without reading it.","label_hi":"Code पढ़े बिना copy करें।"},{"id":"c","label_en":"Skip testing.","label_hi":"Testing छोड़ दें।"}]'::jsonb)
on conflict(id) do update set options=excluded.options,prompt_en=excluded.prompt_en,prompt_hi=excluded.prompt_hi;

commit;
