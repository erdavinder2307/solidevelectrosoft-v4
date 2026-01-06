# 🤖 AI Project Requirements Assistant

> **Claude Sonnet-powered chat assistant for gathering structured software project requirements**

---

## 🎯 What It Does

Intelligent chat interface that:
- ✅ Collects project ideas & requirements through natural conversation
- ✅ Uses Claude Sonnet API with strict guardrails (requirements-only)
- ✅ Generates structured summaries
- ✅ Emails final requirements to `davinder@solidevelectrosoft.com`
- ✅ Mobile-first, fully responsive design
- ✅ Integrated with existing CTAs

---

## 📁 Project Structure

```
solidevelectrosoft-v4/
├── functions/                          # Firebase Functions (Backend)
│   ├── package.json                    # Dependencies
│   ├── index.js                        # Function endpoints
│   ├── ai/
│   │   └── claudeHandler.js           # Claude API integration
│   └── email/
│       └── sendRequirements.js        # Email sender (Nodemailer)
│
├── src/
│   ├── components/
│   │   └── ai/
│   │       └── AIProjectAssistant.jsx # Main chat UI component
│   ├── services/
│   │   └── aiService.js               # API calls to Firebase
│   ├── hooks/
│   │   └── useAIAssistant.js          # Modal state management
│   └── styles/
│       └── ai-assistant.css           # Mobile-first styles
│
├── firebase.json                       # Firebase config
├── AI_ASSISTANT_DEPLOYMENT.md         # Full deployment guide
└── AI_ASSISTANT_TEST.md               # Test scenarios
```

---

## 🚀 Quick Deployment

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

### 2. Install Dependencies
```bash
cd functions
npm install
```

### 3. Configure Secrets
```bash
firebase functions:config:set anthropic.key="YOUR_ANTHROPIC_API_KEY"
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.pass="YOUR_GMAIL_APP_PASSWORD"
```

### 4. Deploy Functions
```bash
firebase deploy --only functions
```

### 5. Update Frontend Config
Edit `src/services/aiService.js`:
```javascript
const FIREBASE_FUNCTIONS_URL = 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net';
```

Or create `.env.local`:
```env
REACT_APP_FIREBASE_FUNCTIONS_URL=https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net
```

### 6. Build & Deploy
```bash
npm run build
git push origin main
```

---

## 🎨 How It's Integrated

### Homepage Hero CTA
The primary CTA button on ModernHome now opens the AI assistant:

```jsx
<ModernHero 
  primaryCTA={{
    text: '🤖 Chat with AI Assistant',
    onClick: openAI,
    isButton: true,
  }}
/>

<AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />
```

### Mobile-First Design
- Full-screen modal on mobile (< 768px)
- Centered modal on desktop
- Touch-friendly 48px+ input areas
- Smooth scrolling with proper text wrapping

---

## 🔐 Security

- ✅ API keys stored in Firebase config (never in frontend)
- ✅ Backend-only API calls to Claude
- ✅ CORS enabled for your domain
- ✅ Rate limiting via Firebase quotas

---

## 💬 System Prompt

The AI assistant has a **strict system prompt** that:
- Only asks questions about software projects
- Does NOT provide solutions or code
- Collects: idea, problem, users, features, platforms, timeline, budget
- Generates structured summary when complete
- Redirects off-topic questions

**Do NOT modify system prompt without approval**

---

## 📊 Expected Costs

| Service | Free Tier | Typical Monthly |
|---------|-----------|----------------|
| Firebase Functions | 2M invocations | < 1,000 |
| Claude Sonnet API | Pay-per-use | ~$5-10 |
| Email (Gmail) | Free | Free |
| **Total** | **~$0-10/month** | ✅ |

---

## 🧪 Testing

### Frontend Test
1. Run `npm run dev`
2. Click "🤖 Chat with AI Assistant"
3. Have a conversation
4. Verify email received

### Backend Test
```bash
# Start emulator
firebase emulators:start --only functions

# Test in another terminal
curl -X POST http://localhost:5001/YOUR_PROJECT/us-central1/aiRequest \
  -H "Content-Type: application/json" \
  -d '{"userMessage": "I want to build an app", "conversationHistory": []}'
```

---

## 📞 Support

- **Deployment Guide:** `AI_ASSISTANT_DEPLOYMENT.md`
- **Test Scenarios:** `AI_ASSISTANT_TEST.md`
- **Email:** davinder@solidevelectrosoft.com

---

## ✅ Features Checklist

- [x] Firebase Functions backend
- [x] Claude Sonnet API integration
- [x] Strict requirements-gathering prompt
- [x] Email delivery (Nodemailer)
- [x] Mobile-first React component
- [x] Typing indicator
- [x] Success state UI
- [x] CTA integration
- [x] Responsive modal
- [x] Auto-scroll messages
- [x] Body scroll prevention
- [x] Deployment documentation
- [x] Test scenarios
- [ ] Firebase project initialization (you need to run `firebase init`)
- [ ] API keys configuration (you need to set keys)
- [ ] Production deployment (deploy after setup)

---

## 🔄 Next Steps

1. **Initialize Firebase:** `firebase init`
2. **Set API Keys:** See deployment guide
3. **Test Locally:** `firebase emulators:start`
4. **Deploy Functions:** `firebase deploy --only functions`
5. **Update Frontend URL:** Edit `aiService.js`
6. **Test End-to-End:** Complete a full conversation
7. **Go Live:** Push to production

---

**Created:** December 2025  
**Version:** 1.0.0  
**Tech Stack:** React + Firebase Functions + Claude Sonnet + Nodemailer
