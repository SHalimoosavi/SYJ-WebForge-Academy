import type {LessonContent} from '../lessonTypes';
export const day05:LessonContent & {quizId:string}={
  "day": 5,
  "slug": "forms-semantic-html",
  "title": {
    "en": "Forms & Semantic HTML",
    "hi": "फॉर्म और Semantic HTML"
  },
  "summary": {
    "en": "Build usable forms with labels, native validation, accessible controls and semantic landmarks.",
    "hi": "Labels, native validation, accessible controls और semantic landmarks से usable forms बनाएं।"
  },
  "objectives": {
    "en": [
      "Associate every form control with a label.",
      "Choose input types and constraints that match the data.",
      "Explain GET vs POST and accessible validation feedback."
    ],
    "hi": [
      "हर form control को label से जोड़ना।",
      "Data के अनुसार input type और constraints चुनना।",
      "GET और POST तथा accessible validation feedback समझना।"
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
      "id": "form-structure",
      "title": {
        "en": "Form structure and labels",
        "hi": "इंटरनेट और वेब"
      },
      "body": {
        "en": "A form groups controls for submitting information. Each control needs a programmatic label, usually with label for matching the control id. Placeholder text is a hint, not a label. Group related controls with fieldset and legend.",
        "hi": "Form जानकारी submit करने वाले controls का समूह है। हर control का programmatic label होना चाहिए; label for को control id से match करें। Placeholder hint है, label नहीं। Related controls को fieldset और legend में रखें।"
      }
    },
    {
      "id": "input-types",
      "title": {
        "en": "Input types and validation",
        "hi": "Browser और Server"
      },
      "body": {
        "en": "Use email, url, tel, number, date and other input types when they match the expected data. required, minlength, maxlength, min, max and pattern provide native constraints. Browser validation improves usability but server-side validation is still mandatory because clients can be modified.",
        "hi": "Expected data के अनुसार email, url, tel, number, date जैसे input types चुनें। required, minlength, maxlength, min, max और pattern native constraints देते हैं। Browser validation उपयोगी है, लेकिन client बदला जा सकता है इसलिए server-side validation भी जरूरी है।"
      }
    },
    {
      "id": "submission",
      "title": {
        "en": "GET and POST",
        "hi": "URL पढ़ना"
      },
      "body": {
        "en": "GET places form data in the URL query string and is suitable for retrieval/search when data is not sensitive. POST sends data in the request body and is commonly used for changes or sensitive form payloads (always use HTTPS). Neither method replaces authorization or server validation.",
        "hi": "GET form data को URL query में रखता है और retrieval/search के लिए उपयोगी है, जब data sensitive न हो। POST data request body में भेजता है और changes या sensitive payload के लिए आम है (HTTPS जरूरी है)। दोनों में server validation और authorization जरूरी हैं।"
      }
    },
    {
      "id": "feedback",
      "title": {
        "en": "Accessible feedback",
        "hi": "Status Codes और Caching"
      },
      "body": {
        "en": "Keep instructions near the relevant control. Identify errors in text, associate error messages with aria-describedby and set aria-invalid when invalid. On submission failure, provide a summary and move focus to it or the first invalid field. Never rely on color alone.",
        "hi": "Instructions संबंधित control के पास रखें। Error को text में बताएं, aria-describedby से message जोड़ें और invalid होने पर aria-invalid सेट करें। Submission fail हो तो summary दें और focus summary या पहले invalid field पर ले जाएं। केवल रंग पर निर्भर न रहें।"
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
        "Create a file named day-5.html.",
        "Build a small page that demonstrates: associate every form control with a label.",
        "Open it in a browser, inspect it, then change one detail and observe the result."
      ],
      "hi": [
        "day-5.html नाम की file बनाएं।",
        "एक छोटा page बनाएं जो यह दिखाए: हर form control को label से जोड़ना।",
        "Browser में खोलें, inspect करें, एक detail बदलें और result देखें।"
      ]
    },
    "starterCode": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Day 5 Practice</title>\n</head>\n<body>\n  <main>\n    <h1>Day 5: Forms & Semantic HTML</h1>\n    <p>My first practice page.</p>\n  </main>\n</body>\n</html>",
    "expectedOutput": "A browser page with a clear heading and a short paragraph; inspect the page and verify the relevant lesson concept."
  },
  "quiz": [
    {
      "id": "60000000-0000-4000-8000-000000000051",
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
      "id": "60000000-0000-4000-8000-000000000052",
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
      "id": "60000000-0000-4000-8000-000000000053",
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
      "id": "60000000-0000-4000-8000-000000000054",
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
      "en": "Day 5 mini assignment",
      "hi": "दिन 5 का mini assignment"
    },
    "brief": {
      "en": "Create a one-page learning note that teaches a beginner: Associate every form control with a label. Include one correct example, a short explanation and a note about a common mistake.",
      "hi": "एक beginner को यह सिखाने वाला एक-page learning note बनाएं: हर form control को label से जोड़ना। एक सही example, छोटा explanation और common mistake का note शामिल करें।"
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
  "quizId": "50000000-0000-4000-8000-000000000005"
};
