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
        "en": "Which markup correctly connects a visible label to an email input?",
        "hi": "कौन-सा markup visible label को email input से सही तरह जोड़ता है?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "<label>Email</label><input type=\"email\">",
            "hi": "<label>Email</label><input type=\"email\">"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "<label for=\"email\">Email</label><input id=\"email\" type=\"email\">",
            "hi": "<label for=\"email\">Email</label><input id=\"email\" type=\"email\">"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "<input type=\"email\" label=\"Email\">",
            "hi": "<input type=\"email\" label=\"Email\">"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "<p>Email</p><input type=\"email\" placeholder=\"Email\">",
            "hi": "<p>Email</p><input type=\"email\" placeholder=\"Email\">"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000052",
      "prompt": {
        "en": "What happens when a required email input is empty and the user submits a normal browser-validated form?",
        "hi": "जब required email input खाली हो और user सामान्य browser-validated form submit करे, तो क्या होता है?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "The browser normally blocks submission and reports a constraint validation error.",
            "hi": "Browser सामान्यतः submission रोकता है और constraint validation error दिखाता है।"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "The browser automatically invents an email address.",
            "hi": "Browser अपने आप email address बना देता है।"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "The browser silently changes the input type to text.",
            "hi": "Browser चुपचाप input type को text कर देता है।"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "The browser submits the form and marks the field as valid.",
            "hi": "Browser form submit करके field को valid मान लेता है।"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000053",
      "prompt": {
        "en": "A group of related radio buttons needs a shared accessible caption. Which elements should wrap the group?",
        "hi": "Related radio buttons के group को shared accessible caption चाहिए। कौन-से elements group को wrap करें?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "section and header",
            "hi": "section और header"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "div and span",
            "hi": "div और span"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "fieldset and legend",
            "hi": "fieldset और legend"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "label and placeholder",
            "hi": "label और placeholder"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000054",
      "prompt": {
        "en": "A search form should put a non-sensitive search term in the URL so the result can be bookmarked. Which method is the best fit?",
        "hi": "Search form में non-sensitive search term URL में रखना है ताकि result bookmark हो सके। कौन-सा method सही है?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "POST, because it always makes data bookmarkable",
            "hi": "POST, क्योंकि यह हमेशा data bookmarkable बनाता है"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "PUT, because browsers require it for all forms",
            "hi": "PUT, क्योंकि सभी forms के लिए browser इसे जरूरी मानता है"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "PATCH, because search modifies the server",
            "hi": "PATCH, क्योंकि search server को बदलता है"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "GET, because form data is placed in the URL query string",
            "hi": "GET, क्योंकि form data URL query string में जाता है"
          }
        }
      ]
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
