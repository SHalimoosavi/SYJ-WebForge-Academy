import type {LessonContent} from '../lessonTypes';
export const day01:LessonContent & {quizId:string}={
  "day": 1,
  "slug": "web-internet-basics",
  "title": {
    "en": "Web & Internet Basics",
    "hi": "वेब और इंटरनेट की मूल बातें"
  },
  "summary": {
    "en": "Understand how a browser, network, server and URL work together to deliver a website.",
    "hi": "समझें कि browser, network, server और URL मिलकर वेबसाइट कैसे दिखाते हैं।"
  },
  "objectives": {
    "en": [
      "Explain the difference between the Internet and the Web.",
      "Describe the browser–server request and response cycle.",
      "Identify a URL's main parts and explain HTTP vs HTTPS."
    ],
    "hi": [
      "Internet और Web का अंतर समझाना।",
      "Browser–server request और response cycle बताना।",
      "URL के हिस्से पहचानना और HTTP व HTTPS समझना।"
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
      "id": "internet-web",
      "title": {
        "en": "Internet vs the Web",
        "hi": "इंटरनेट और वेब"
      },
      "body": {
        "en": "The Internet is the global network infrastructure that connects devices. The World Wide Web is one service that runs on it: linked documents and applications accessed with browsers. Email, file transfer and voice calls can use the Internet without being Web pages.",
        "hi": "Internet दुनिया भर के devices को जोड़ने वाला network infrastructure है। World Wide Web उस पर चलने वाली एक service है, जिसमें browser से खुलने वाले linked documents और applications होते हैं। Email, file transfer और voice calls भी Internet इस्तेमाल कर सकते हैं, लेकिन वे जरूरी नहीं कि Web pages हों।"
      }
    },
    {
      "id": "browser-server",
      "title": {
        "en": "Browser, server and request",
        "hi": "Browser और Server"
      },
      "body": {
        "en": "A browser (client) asks for a resource. DNS helps find the server's IP address. The browser sends an HTTP request; the server returns an HTTP response with a status code, headers and usually a body such as HTML. The browser parses HTML, fetches linked CSS, JavaScript and images, then paints the page.",
        "hi": "Browser (client) किसी resource का अनुरोध करता है। DNS server का IP address खोजने में मदद करता है। Browser HTTP request भेजता है; server status code, headers और आम तौर पर HTML जैसी body के साथ response देता है। Browser HTML पढ़ता है, CSS, JavaScript और images लाता है और फिर page दिखाता है।"
      }
    },
    {
      "id": "url",
      "title": {
        "en": "Read a URL",
        "hi": "URL पढ़ना"
      },
      "body": {
        "en": "A URL identifies where a resource can be found. In https://academy.example/lessons/day-1?lang=en#intro, the scheme is https, the host is academy.example, the path is /lessons/day-1, the query is lang=en and the fragment is intro. HTTPS protects data in transit using TLS; it does not automatically make a site trustworthy.",
        "hi": "URL बताता है कि resource कहाँ मिलेगा। https://academy.example/lessons/day-1?lang=en#intro में scheme https, host academy.example, path /lessons/day-1, query lang=en और fragment intro है। HTTPS, TLS से रास्ते में data को सुरक्षित करता है; इससे website अपने आप भरोसेमंद साबित नहीं होती।"
      }
    },
    {
      "id": "status",
      "title": {
        "en": "Status codes and caching",
        "hi": "Status Codes और Caching"
      },
      "body": {
        "en": "Common response codes include 200 (success), 301/302 (redirect), 400 (bad request), 401 (authentication required), 403 (forbidden), 404 (not found) and 500 (server error). Caching lets browsers reuse eligible responses and reduces repeated downloads; cache rules are controlled by response headers.",
        "hi": "आम response codes हैं: 200 (सफल), 301/302 (redirect), 400 (गलत request), 401 (authentication जरूरी), 403 (अनुमति नहीं), 404 (नहीं मिला) और 500 (server error)। Caching से browser कुछ responses दोबारा इस्तेमाल कर सकता है और repeated downloads कम होते हैं।"
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
        "Create a file named day-1.html.",
        "Build a small page that demonstrates: explain the difference between the internet and the web.",
        "Open it in a browser, inspect it, then change one detail and observe the result."
      ],
      "hi": [
        "day-1.html नाम की file बनाएं।",
        "एक छोटा page बनाएं जो यह दिखाए: Internet और Web का अंतर समझाना।",
        "Browser में खोलें, inspect करें, एक detail बदलें और result देखें।"
      ]
    },
    "starterCode": "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Day 1 Practice</title>\n</head>\n<body>\n  <main>\n    <h1>Day 1: Web & Internet Basics</h1>\n    <p>My first practice page.</p>\n  </main>\n</body>\n</html>",
    "expectedOutput": "A browser page with a clear heading and a short paragraph; inspect the page and verify the relevant lesson concept."
  },
  "quiz": [
    {
      "id": "60000000-0000-4000-8000-000000000011",
      "prompt": {
        "en": "Which statement correctly separates the Internet from the World Wide Web?",
        "hi": "कौन-सा कथन Internet और World Wide Web का सही अंतर बताता है?"
      },
      "options": [
        {
          "id": "b",
          "label": {
            "en": "The Web connects routers; the Internet is a collection of web pages.",
            "hi": "Web routers को जोड़ता है; Internet web pages का समूह है।"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "The Internet only carries email; the Web carries every other kind of data.",
            "hi": "Internet केवल email ले जाता है; Web बाकी सभी तरह का data ले जाता है।"
          }
        },
        {
          "id": "a",
          "label": {
            "en": "The Internet connects networks; the Web is a service of linked resources that uses it.",
            "hi": "Internet networks को जोड़ता है; Web उस पर चलने वाली linked resources की service है।"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "The Internet and the Web are two names for the same thing.",
            "hi": "Internet और Web एक ही चीज़ के दो नाम हैं।"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000012",
      "prompt": {
        "en": "A browser opens https://learn.example/courses/html?level=beginner#forms. Which part is the fragment?",
        "hi": "Browser https://learn.example/courses/html?level=beginner#forms खोलता है। इसमें fragment कौन-सा हिस्सा है?"
      },
      "options": [
        {
          "id": "d",
          "label": {
            "en": "forms",
            "hi": "forms"
          }
        },
        {
          "id": "a",
          "label": {
            "en": "/courses/html",
            "hi": "/courses/html"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "learn.example",
            "hi": "learn.example"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "level=beginner",
            "hi": "level=beginner"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000013",
      "prompt": {
        "en": "What normally happens after a browser receives an HTML response from a server?",
        "hi": "Server से HTML response मिलने के बाद सामान्यतः browser क्या करता है?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "It assumes every linked file is already inside the HTML.",
            "hi": "वह मान लेता है कि सभी linked files HTML में पहले से मौजूद हैं।"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "It sends the HTML to DNS to translate it into an IP address.",
            "hi": "वह HTML को IP address में बदलने के लिए DNS को वापस भेजता है।"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "It changes the server's HTTP status code to 200.",
            "hi": "वह server का HTTP status code 200 कर देता है।"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "It parses the HTML and requests linked resources such as CSS, scripts and images.",
            "hi": "वह HTML parse करता है और CSS, scripts तथा images जैसे linked resources माँगता है।"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000014",
      "prompt": {
        "en": "What does this response status mean: HTTP/1.1 404 Not Found?",
        "hi": "इस response status का क्या अर्थ है: HTTP/1.1 404 Not Found?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "The request succeeded and the resource was returned.",
            "hi": "Request सफल हुई और resource मिल गया।"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "The requested resource could not be found at that URL.",
            "hi": "उस URL पर माँगा गया resource नहीं मिला।"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "The browser must sign in before continuing.",
            "hi": "आगे बढ़ने से पहले browser को sign in करना होगा।"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "The server permanently moved the resource to a new URL.",
            "hi": "Server ने resource को स्थायी रूप से नए URL पर भेज दिया।"
          }
        }
      ]
    }
  ],
  "assignment": {
    "title": {
      "en": "Day 1 mini assignment",
      "hi": "दिन 1 का mini assignment"
    },
    "brief": {
      "en": "Create a one-page learning note that teaches a beginner: Explain the difference between the Internet and the Web. Include one correct example, a short explanation and a note about a common mistake.",
      "hi": "एक beginner को यह सिखाने वाला एक-page learning note बनाएं: Internet और Web का अंतर समझाना। एक सही example, छोटा explanation और common mistake का note शामिल करें।"
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
  "quizId": "50000000-0000-4000-8000-000000000001"
};
