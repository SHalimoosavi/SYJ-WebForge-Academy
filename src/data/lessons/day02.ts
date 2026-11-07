import type {LessonContent} from '../lessonTypes';
export const day02:LessonContent={
  "day": 2,
  "slug": "html-document-structure",
  "title": {
    "en": "HTML Document Structure",
    "hi": "HTML डॉक्यूमेंट संरचना"
  },
  "summary": {
    "en": "Create a valid, meaningful HTML document and understand semantic page structure.",
    "hi": "एक सही HTML document बनाएं और semantic page structure समझें।"
  },
  "objectives": {
    "en": [
      "Explain elements, tags and attributes.",
      "Build a valid HTML5 document with metadata.",
      "Use semantic landmarks and heading order."
    ],
    "hi": [
      "Elements, tags और attributes समझना।",
      "Metadata के साथ valid HTML5 document बनाना।",
      "Semantic landmarks और सही heading order इस्तेमाल करना।"
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
      "id": "elements",
      "title": {
        "en": "Elements, tags and attributes",
        "hi": "इंटरनेट और वेब"
      },
      "body": {
        "en": "An HTML element is represented by tags and content. Many elements have an opening tag, content and closing tag; void elements such as img and meta do not. Attributes add information to an element. Quote attribute values and use lowercase names for consistency.",
        "hi": "HTML element को tags और content से दर्शाया जाता है। कई elements में opening tag, content और closing tag होते हैं; img और meta जैसे void elements का closing tag नहीं होता। Attributes अतिरिक्त जानकारी देते हैं। Attribute values को quotes में रखें।"
      }
    },
    {
      "id": "document",
      "title": {
        "en": "The HTML5 document shell",
        "hi": "Browser और Server"
      },
      "body": {
        "en": "The doctype tells browsers to use standards mode. The html element is the document root. The head contains metadata and resource links; the body contains visible page content. Set the document language so assistive technology can pronounce text correctly.",
        "hi": "Doctype browser को standards mode इस्तेमाल करने को कहता है। html element document root है। head में metadata और resource links होते हैं; body में दिखाई देने वाला content होता है। Document language सेट करें ताकि assistive technology सही pronunciation कर सके।"
      }
    },
    {
      "id": "metadata",
      "title": {
        "en": "Metadata that matters",
        "hi": "URL पढ़ना"
      },
      "body": {
        "en": "A descriptive title appears in the browser tab and helps users distinguish pages. UTF-8 supports a broad range of characters. The viewport meta tag tells mobile browsers how to size the layout viewport. A concise description can be used by search engines as a snippet, but they may choose another excerpt.",
        "hi": "Descriptive title browser tab में दिखता है और pages पहचानने में मदद करता है। UTF-8 कई भाषाओं के characters support करता है। Viewport meta tag mobile browser को layout viewport का size बताता है। Description search snippet में इस्तेमाल हो सकता है, लेकिन search engine दूसरा text भी चुन सकता है।"
      }
    },
    {
      "id": "semantics",
      "title": {
        "en": "Semantic structure and headings",
        "hi": "Status Codes और Caching"
      },
      "body": {
        "en": "Use header, nav, main, section, article and footer according to their meaning. A page should normally have one main landmark. Headings form an outline: choose levels by hierarchy, not visual size. Use CSS for appearance instead of skipping heading levels to get a smaller font.",
        "hi": "header, nav, main, section, article और footer को उनके अर्थ के अनुसार इस्तेमाल करें। आम तौर पर page में एक main landmark होना चाहिए। Headings hierarchy बनाती हैं; level अर्थ के आधार पर चुनें, font size के लिए नहीं। Appearance के लिए CSS इस्तेमाल करें।"
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
        "Create a file named day-2.html.",
        "Build a small page that demonstrates: explain elements, tags and attributes.",
        "Open it in a browser, inspect it, then change one detail and observe the result."
      ],
      "hi": [
        "day-2.html नाम की file बनाएं।",
        "एक छोटा page बनाएं जो यह दिखाए: Elements, tags और attributes समझना।",
        "Browser में खोलें, inspect करें, एक detail बदलें और result देखें।"
      ]
    },
    "starterCode": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Day 2 Practice</title>\n</head>\n<body>\n  <main>\n    <h1>Day 2: HTML Document Structure</h1>\n    <p>My first practice page.</p>\n  </main>\n</body>\n</html>",
    "expectedOutput": "A browser page with a clear heading and a short paragraph; inspect the page and verify the relevant lesson concept."
  },
  "quiz": [
    {
      "id": "d2-q1",
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
      "correctOptionId": "a",
      "explanation": {
        "en": "Web standards and semantics make content more reliable, understandable and accessible.",
        "hi": "Web standards और semantics content को reliable, understandable और accessible बनाते हैं।"
      }
    },
    {
      "id": "d2-q2",
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
      "correctOptionId": "b",
      "explanation": {
        "en": "Client-side checks improve UX; the server remains the authority for validation and authorization.",
        "hi": "Client-side checks UX सुधारते हैं; validation और authorization के लिए server authoritative रहता है।"
      }
    },
    {
      "id": "d2-q3",
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
      "correctOptionId": "a",
      "explanation": {
        "en": "Meaningful text and programmatic relationships help keyboard and assistive-technology users.",
        "hi": "Meaningful text और programmatic relationships keyboard तथा assistive-technology users की मदद करते हैं।"
      }
    },
    {
      "id": "d2-q4",
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
      "correctOptionId": "a",
      "explanation": {
        "en": "Practice plus inspection reveals mistakes and builds transferable skills.",
        "hi": "Practice और inspection mistakes दिखाते हैं और transferable skills बनाते हैं।"
      }
    }
  ],
  "assignment": {
    "title": {
      "en": "Day 2 mini assignment",
      "hi": "दिन 2 का mini assignment"
    },
    "brief": {
      "en": "Create a one-page learning note that teaches a beginner: Explain elements, tags and attributes. Include one correct example, a short explanation and a note about a common mistake.",
      "hi": "एक beginner को यह सिखाने वाला एक-page learning note बनाएं: Elements, tags और attributes समझना। एक सही example, छोटा explanation और common mistake का note शामिल करें।"
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
  }
};
