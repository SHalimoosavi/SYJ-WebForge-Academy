import type {LessonContent} from '../lessonTypes';
export const day03:LessonContent & {quizId:string}={
  "day": 3,
  "slug": "text-links-lists",
  "title": {
    "en": "Text, Links & Lists",
    "hi": "टेक्स्ट, लिंक और लिस्ट"
  },
  "summary": {
    "en": "Structure readable content with headings, paragraphs, meaningful links and lists.",
    "hi": "Headings, paragraphs, meaningful links और lists से readable content बनाएं।"
  },
  "objectives": {
    "en": [
      "Choose headings and paragraphs for content structure.",
      "Write descriptive, accessible hyperlinks.",
      "Select ordered, unordered and description lists appropriately."
    ],
    "hi": [
      "Content structure के लिए headings और paragraphs चुनना।",
      "Descriptive और accessible hyperlinks लिखना।",
      "सही जगह ordered, unordered और description lists चुनना।"
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
      "id": "text",
      "title": {
        "en": "Readable text structure",
        "hi": "इंटरनेट और वेब"
      },
      "body": {
        "en": "Use headings to divide a page into topics and paragraphs for related sentences. Strong and em convey importance or emphasis; b and i are stylistic. Do not use repeated spaces or empty paragraphs to create layout. Use CSS for spacing and typography.",
        "hi": "Page को topics में बाँटने के लिए headings और संबंधित sentences के लिए paragraphs इस्तेमाल करें। strong और em importance या emphasis बताते हैं; b और i stylistic हैं। Layout बनाने के लिए extra spaces या empty paragraphs न रखें। Spacing और typography CSS से करें।"
      }
    },
    {
      "id": "links",
      "title": {
        "en": "Links users can understand",
        "hi": "Browser और Server"
      },
      "body": {
        "en": "An anchor with href creates a link. Link text should describe its destination or action; avoid vague phrases such as “click here”. Use a meaningful URL, and use mailto or tel only when appropriate. Opening a new tab with target=_blank should be intentional; rel=noopener protects the opener context.",
        "hi": "href वाले anchor से link बनता है। Link text destination या action बताना चाहिए; “click here” जैसे अस्पष्ट शब्द न लिखें। Meaningful URL दें। target=_blank तभी इस्तेमाल करें जब जरूरी हो; rel=noopener opener context को सुरक्षित करता है।"
      }
    },
    {
      "id": "lists",
      "title": {
        "en": "Choose the right list",
        "hi": "URL पढ़ना"
      },
      "body": {
        "en": "Use ul when order does not matter, ol when sequence or ranking matters, and dl for term–description pairs. Put each list item in li. Nest lists only when a sub-list genuinely belongs to an item; avoid using lists merely to indent content.",
        "hi": "जब क्रम जरूरी न हो तो ul, sequence या ranking हो तो ol और term-description pairs के लिए dl इस्तेमाल करें। हर list item li में रखें। Nested list तभी बनाएं जब sub-list वास्तव में किसी item का हिस्सा हो।"
      }
    },
    {
      "id": "navigation",
      "title": {
        "en": "Navigation and page context",
        "hi": "Status Codes और Caching"
      },
      "body": {
        "en": "A navigation region groups important links. Keep labels consistent and provide a clear current-page indication when building multi-page navigation. A fragment such as #contact points to an element with a matching id on the same page.",
        "hi": "Navigation region महत्वपूर्ण links को समूह में रखता है। Multi-page navigation में labels consistent रखें और current page स्पष्ट दिखाएं। #contact जैसा fragment उसी page पर matching id वाले element तक ले जाता है।"
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
        "Create a file named day-3.html.",
        "Build a small page that demonstrates: choose headings and paragraphs for content structure.",
        "Open it in a browser, inspect it, then change one detail and observe the result."
      ],
      "hi": [
        "day-3.html नाम की file बनाएं।",
        "एक छोटा page बनाएं जो यह दिखाए: Content structure के लिए headings और paragraphs चुनना।",
        "Browser में खोलें, inspect करें, एक detail बदलें और result देखें।"
      ]
    },
    "starterCode": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Day 3 Practice</title>\n</head>\n<body>\n  <main>\n    <h1>Day 3: Text, Links & Lists</h1>\n    <p>My first practice page.</p>\n  </main>\n</body>\n</html>",
    "expectedOutput": "A browser page with a clear heading and a short paragraph; inspect the page and verify the relevant lesson concept."
  },
  "quiz": [
    {
      "id": "60000000-0000-4000-8000-000000000031",
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
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000032",
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
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000033",
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
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000034",
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
      ]
    }
  ],
  "assignment": {
    "title": {
      "en": "Day 3 mini assignment",
      "hi": "दिन 3 का mini assignment"
    },
    "brief": {
      "en": "Create a one-page learning note that teaches a beginner: Choose headings and paragraphs for content structure. Include one correct example, a short explanation and a note about a common mistake.",
      "hi": "एक beginner को यह सिखाने वाला एक-page learning note बनाएं: Content structure के लिए headings और paragraphs चुनना। एक सही example, छोटा explanation और common mistake का note शामिल करें।"
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
  "quizId": "50000000-0000-4000-8000-000000000003"
};
