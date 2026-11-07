import type {LessonContent} from '../lessonTypes';
export const day04:LessonContent & {quizId:string}={
  "day": 4,
  "slug": "images-audio-video",
  "title": {
    "en": "Images, Audio & Video",
    "hi": "इमेज, ऑडियो और वीडियो"
  },
  "summary": {
    "en": "Add responsive, accessible images and media with appropriate alternatives and controls.",
    "hi": "सही alternatives और controls के साथ responsive, accessible images और media जोड़ें।"
  },
  "objectives": {
    "en": [
      "Choose useful alt text or an empty alt for decorative images.",
      "Use responsive image sizing and understand srcset basics.",
      "Embed audio and video with controls and captions."
    ],
    "hi": [
      "Meaningful alt text या decorative image के लिए empty alt चुनना।",
      "Responsive image sizing और srcset समझना।",
      "Controls और captions के साथ audio-video जोड़ना।"
    ]
  },
  "prerequisites": {
    "en": [
      "A modern browser and a text editor.",
      "No previous coding experience is required."
    ],
    "hi": [
      "एक modern browser और text editor।",
      "पहले coding अनुभव की आवश्यकता नहीं।"
    ]
  },
  "sections": [
    {
      "id": "images",
      "title": {
        "en": "Images and alternative text",
        "hi": "इंटरनेट और वेब"
      },
      "body": {
        "en": "The img element embeds an image. Write alt text that communicates the image's purpose in context. If an image is purely decorative and adds no information, use alt=\"\" so screen readers can skip it. Do not put “image of” in every alt; describe the relevant meaning.",
        "hi": "img element image जोड़ता है। Alt text image का context में उद्देश्य बताता है। Purely decorative image के लिए alt=\"\" रखें ताकि screen reader उसे skip कर सके। हर alt में “image of” लिखना जरूरी नहीं; relevant meaning बताएं।"
      }
    },
    {
      "id": "responsive",
      "title": {
        "en": "Responsive images",
        "hi": "Browser और Server"
      },
      "body": {
        "en": "Set max-width:100% and height:auto so images fit narrow screens without distortion. Use width and height attributes to reserve space and reduce layout shift. srcset and sizes let the browser choose an appropriate source for device pixel density and layout width.",
        "hi": "max-width:100% और height:auto से image छोटी screen में fit होती है और distort नहीं होती। width और height attributes जगह reserve करते हैं और layout shift घटाते हैं। srcset और sizes browser को सही image source चुनने देते हैं।"
      }
    },
    {
      "id": "media",
      "title": {
        "en": "Audio and video",
        "hi": "URL पढ़ना"
      },
      "body": {
        "en": "Use audio or video with controls so users can play, pause and adjust media. Provide multiple source formats only when you need broad format support. Add captions with track kind=\"captions\" for spoken video content. Do not autoplay sound; it can surprise users and block access.",
        "hi": "audio या video में controls दें ताकि users play, pause और volume नियंत्रित कर सकें। Spoken video के लिए track kind=\"captions\" से captions दें। Sound autoplay न करें; यह users को परेशान कर सकता है और accessibility बाधित कर सकता है।"
      }
    },
    {
      "id": "performance",
      "title": {
        "en": "Media performance and licensing",
        "hi": "Status Codes और Caching"
      },
      "body": {
        "en": "Compress images, choose modern formats where supported and lazy-load off-screen images. Do not lazy-load the main above-the-fold hero image if it is critical to rendering. Use media you own, have permission to use or that is appropriately licensed; attribution requirements still apply.",
        "hi": "Images compress करें, supported modern formats चुनें और screen से बाहर की images lazy-load करें। ऊपर दिखाई देने वाली मुख्य hero image को lazy-load न करें यदि वह rendering के लिए जरूरी है। केवल अपने या अनुमति/licence वाले media इस्तेमाल करें।"
      }
    }
  ],
  "exercise": {
    "title": {
      "en": "Guided practice",
      "hi": "Guided Practice"
    },
    "instructions": {
      "en": [
        "Create a file named day-4.html.",
        "Build a small page that demonstrates: choose useful alt text or an empty alt for decorative images.",
        "Open it in a browser, inspect it, then change one detail and observe the result."
      ],
      "hi": [
        "day-4.html नाम की file बनाएं।",
        "एक छोटा page बनाएं जो यह दिखाए: Meaningful alt text या decorative image के लिए empty alt चुनना।",
        "Browser में खोलें, inspect करें, एक detail बदलें और result देखें।"
      ]
    },
    "starterCode": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Day 4 Practice</title>\n</head>\n<body>\n  <main>\n    <h1>Day 4: Images, Audio & Video</h1>\n    <p>My first practice page.</p>\n  </main>\n</body>\n</html>",
    "expectedOutput": "A browser page with a clear heading and a short paragraph; inspect the page and verify the relevant lesson concept."
  },
  "quiz": [
    {
      "id": "60000000-0000-4000-8000-000000000041",
      "prompt": {
        "en": "Which statement best describes the main concept in this lesson?",
        "hi": "इस lesson की मुख्य अवधारणा को कौन-सा कथन सही बताता है?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "Use the semantic, standards-based approach taught in the lesson.",
            "hi": "Lesson में सिखाया गया semantic और standards-based तरीका अपनाएं।"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "Choose elements only for their default visual appearance.",
            "hi": "Elements केवल उनके default visual look के आधार पर चुनें।"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "Skip browser behavior and rely only on styling.",
            "hi": "Browser behavior छोड़कर केवल styling पर निर्भर रहें।"
          }
        }
      ],
      "explanation": {
        "en": "Web standards and semantics make content more reliable, understandable and accessible.",
        "hi": "Web standards और semantics content को reliable, understandable और accessible बनाते हैं।"
      }
    },
    {
      "id": "60000000-0000-4000-8000-000000000042",
      "prompt": {
        "en": "What should you do when a browser-side check can be bypassed?",
        "hi": "जब browser-side check को bypass किया जा सकता है, तब क्या करना चाहिए?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "Trust the browser completely.",
            "hi": "Browser पर पूरी तरह भरोसा करें।"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "Repeat validation on the server.",
            "hi": "Server पर validation दोबारा करें।"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "Remove validation.",
            "hi": "Validation हटा दें।"
          }
        }
      ],
      "explanation": {
        "en": "Client-side checks improve UX; the server remains the authority for validation and authorization.",
        "hi": "Client-side checks UX सुधारते हैं; validation और authorization के लिए server authoritative रहता है।"
      }
    },
    {
      "id": "60000000-0000-4000-8000-000000000043",
      "prompt": {
        "en": "Which practice improves accessibility?",
        "hi": "कौन-सी practice accessibility सुधारती है?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "Use meaningful names and clear text alternatives.",
            "hi": "Meaningful names और clear text alternatives दें।"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "Communicate meaning only through color.",
            "hi": "Meaning केवल color से बताएं।"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "Remove labels and instructions.",
            "hi": "Labels और instructions हटा दें।"
          }
        }
      ],
      "explanation": {
        "en": "Meaningful text and programmatic relationships help keyboard and assistive-technology users.",
        "hi": "Meaningful text और programmatic relationships keyboard तथा assistive-technology users की मदद करते हैं।"
      }
    },
    {
      "id": "60000000-0000-4000-8000-000000000044",
      "prompt": {
        "en": "What is the best way to check your understanding?",
        "hi": "अपनी समझ जाँचने का सबसे अच्छा तरीका क्या है?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "Build the exercise and inspect the result.",
            "hi": "Exercise बनाएं और result जाँचें।"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "Copy code without reading it.",
            "hi": "Code पढ़े बिना copy करें।"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "Skip testing.",
            "hi": "Testing छोड़ दें।"
          }
        }
      ],
      "explanation": {
        "en": "Practice plus inspection reveals mistakes and builds transferable skills.",
        "hi": "Practice और inspection mistakes दिखाते हैं और transferable skills बनाते हैं।"
      }
    }
  ],
  "assignment": {
    "title": {
      "en": "Day 4 mini assignment",
      "hi": "दिन 4 का mini assignment"
    },
    "brief": {
      "en": "Create a one-page learning note that teaches a beginner: Choose useful alt text or an empty alt for decorative images. Include one correct example, a short explanation and a note about a common mistake.",
      "hi": "एक beginner को यह सिखाने वाला एक-page learning note बनाएं: Meaningful alt text या decorative image के लिए empty alt चुनना। एक सही example, छोटा explanation और common mistake का note शामिल करें।"
    },
    "criteria": {
      "en": [
        "All required elements or concepts are used correctly.",
        "Content is readable and organized with meaningful structure.",
        "The page is tested in a browser and works at a narrow mobile width.",
        "No copied answer without understanding; be ready to explain your choices."
      ],
      "hi": [
        "सभी जरूरी elements या concepts सही इस्तेमाल हों।",
        "Content readable हो और meaningful structure में हो।",
        "Page browser में test हो और mobile width पर काम करे।",
        "बिना समझे copied answer नहीं; अपने choices समझाने के लिए तैयार रहें।"
      ]
    }
  },
  "completion": {
    "en": [
      "Read every lesson section.",
      "Complete the guided practice and inspect the result.",
      "Score at least 70% on the quiz.",
      "Submit the mini assignment for review."
    ],
    "hi": [
      "Lesson के सभी sections पढ़ें।",
      "Guided practice पूरा करके result inspect करें।",
      "Quiz में कम से कम 70% score करें।",
      "Mini assignment review के लिए submit करें।"
    ]
  },
  "quizId": "50000000-0000-4000-8000-000000000004"
};
