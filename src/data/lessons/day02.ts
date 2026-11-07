import type {LessonContent} from '../lessonTypes';
export const day02:LessonContent & {quizId:string}={
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
      "id": "60000000-0000-4000-8000-000000000021",
      "prompt": {
        "en": "In an HTML document, where should the page title and character-encoding declaration normally be placed?",
        "hi": "HTML document में page title और character-encoding declaration सामान्यतः कहाँ होने चाहिए?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "Inside the head element",
            "hi": "head element के अंदर"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "Inside the footer element",
            "hi": "footer element के अंदर"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "After the closing html tag",
            "hi": "closing html tag के बाद"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "Inside every paragraph element",
            "hi": "हर paragraph element के अंदर"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000022",
      "prompt": {
        "en": "What does this HTML snippet display as the main heading? <h1>Welcome</h1>",
        "hi": "यह HTML snippet मुख्य heading के रूप में क्या दिखाता है? <h1>Welcome</h1>"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "A browser tab title only",
            "hi": "केवल browser tab का title"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "A level-one heading containing Welcome",
            "hi": "Welcome वाली level-one heading"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "A hyperlink to a page named Welcome",
            "hi": "Welcome नाम के page का hyperlink"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "A form input with the value Welcome",
            "hi": "Welcome value वाला form input"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000023",
      "prompt": {
        "en": "A page needs a navigation landmark for its primary site links. Which element is the best semantic choice?",
        "hi": "Page के मुख्य site links के लिए navigation landmark चाहिए। कौन-सा element सही semantic choice है?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "<div>",
            "hi": "<div>"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "<span>",
            "hi": "<span>"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "<nav>",
            "hi": "<nav>"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "<aside>",
            "hi": "<aside>"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000024",
      "prompt": {
        "en": "Which change fixes this document-language issue? <html lang=\"\">",
        "hi": "इस document-language issue को कौन-सा बदलाव ठीक करता है? <html lang=\"\">"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "Add lang to body and leave html empty.",
            "hi": "body में lang जोड़ें और html खाली छोड़ें।"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "Replace lang with charset.",
            "hi": "lang को charset से बदलें।"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "Put the language only in a CSS class.",
            "hi": "Language केवल CSS class में लिखें।"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "Set a valid language tag, for example <html lang=\"en\">.",
            "hi": "एक valid language tag सेट करें, जैसे <html lang=\"en\">।"
          }
        }
      ]
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
  },
  "quizId": "50000000-0000-4000-8000-000000000002"
};
