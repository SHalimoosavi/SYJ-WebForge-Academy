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
        "en": "Which attribute gives a meaningful text alternative for an informative image?",
        "hi": "Informative image के लिए meaningful text alternative कौन-सा attribute देता है?"
      },
      "options": [
        {
          "id": "b",
          "label": {
            "en": "alt",
            "hi": "alt"
          }
        },
        {
          "id": "a",
          "label": {
            "en": "title",
            "hi": "title"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "href",
            "hi": "href"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "width",
            "hi": "width"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000042",
      "prompt": {
        "en": "Which markup gives a browser native playback controls for an audio file?",
        "hi": "Audio file के लिए browser के native playback controls कौन-सा markup देता है?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "<img controls src=\"sound.mp3\">",
            "hi": "<img controls src=\"sound.mp3\">"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "<video controls src=\"sound.mp3\"></video>",
            "hi": "<video controls src=\"sound.mp3\"></video>"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "<audio controls src=\"sound.mp3\"></audio>",
            "hi": "<audio controls src=\"sound.mp3\"></audio>"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "<source controls src=\"sound.mp3\">",
            "hi": "<source controls src=\"sound.mp3\">"
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000043",
      "prompt": {
        "en": "A decorative divider image adds no information. Which alt value is normally appropriate?",
        "hi": "एक decorative divider image कोई जानकारी नहीं देती। सामान्यतः कौन-सी alt value सही है?"
      },
      "options": [
        {
          "id": "b",
          "label": {
            "en": "alt=\"decorative divider image\"",
            "hi": "alt=\"decorative divider image\""
          }
        },
        {
          "id": "a",
          "label": {
            "en": "alt=\"\"",
            "hi": "alt=\"\""
          }
        },
        {
          "id": "c",
          "label": {
            "en": "alt=\"divider.png\"",
            "hi": "alt=\"divider.png\""
          }
        },
        {
          "id": "d",
          "label": {
            "en": "alt=\"image\"",
            "hi": "alt=\"image\""
          }
        }
      ]
    },
    {
      "id": "60000000-0000-4000-8000-000000000044",
      "prompt": {
        "en": "Which markup provides native browser controls for a video file?",
        "hi": "Video file के लिए browser के native controls कौन-सा markup देता है?"
      },
      "options": [
        {
          "id": "a",
          "label": {
            "en": "<audio controls src=\"clip.mp4\"></audio>",
            "hi": "<audio controls src=\"clip.mp4\"></audio>"
          }
        },
        {
          "id": "b",
          "label": {
            "en": "<img controls src=\"clip.mp4\">",
            "hi": "<img controls src=\"clip.mp4\">"
          }
        },
        {
          "id": "c",
          "label": {
            "en": "<source controls src=\"clip.mp4\">",
            "hi": "<source controls src=\"clip.mp4\">"
          }
        },
        {
          "id": "d",
          "label": {
            "en": "<video controls src=\"clip.mp4\"></video>",
            "hi": "<video controls src=\"clip.mp4\"></video>"
          }
        }
      ]
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
