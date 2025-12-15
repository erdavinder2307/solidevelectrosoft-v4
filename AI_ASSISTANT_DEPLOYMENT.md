# AI Project Requirements Assistant - Deployment Guide

## Overview
This AI-powered assistant uses **Claude Sonnet** via Firebase Functions to gather structured project requirements from website visitors.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase CLI: `npm install -g firebase-tools`
- Firebase Project (create at https://console.firebase.google.com)
- Anthropic API Key (get from https://console.anthropic.com)
- Gmail App Password (for email sending)

---

## 📦 Step 1: Firebase Project Setup

### 1.1 Initialize Firebase (if not already done)
```bash
cd /path/to/solidevelectrosoft-v4
firebase login
firebase init
```

Select:
- **Functions**: Configure and deploy Cloud Functions
- Choose existing project or create new
- Language: **JavaScript**
- ESLint: **Yes** (recommended)
- Install dependencies: **Yes**

### 1.2 Install Dependencies
```bash
cd functions
npm install
```

---

## 🔐 Step 2: Configure Secrets

### 2.1 Set Anthropic API Key
```bash
firebase functions:config:set anthropic.key="YOUR_ANTHROPIC_API_KEY"
```

Get your API key from: https://console.anthropic.com/settings/keys

### 2.2 Set Email Credentials
```bash
firebase functions:config:set email.user="your-email@gmail.com" email.pass="YOUR_APP_PASSWORD"
```

**For Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Go to "App passwords"
4. Generate password for "Mail"
5. Use that 16-character password

**Alternative Email Providers:**
- SendGrid
- Mailgun
- AWS SES
- Update `functions/email/sendRequirements.js` accordingly

### 2.3 Verify Config
```bash
firebase functions:config:get
```

Should show:
```json
{
  "anthropic": {
    "key": "sk-ant-..."
  },
  "email": {
    "user": "your-email@gmail.com",
    "pass": "xxxx xxxx xxxx xxxx"
  }
}
```

---

## 🌐 Step 3: Update Frontend Configuration

### 3.1 Get Firebase Functions URL
After deploying (or use local emulator URL for testing):
- Production: `https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net`
- Local: `http://localhost:5001/YOUR_PROJECT_ID/us-central1`

### 3.2 Set Environment Variable
Create `.env.local` in project root:
```env
REACT_APP_FIREBASE_FUNCTIONS_URL=https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net
```

Or update `src/services/aiService.js` directly:
```javascript
const FIREBASE_FUNCTIONS_URL = 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net';
```

---

## 🔥 Step 4: Deploy Firebase Functions

### 4.1 Test Locally (Optional but Recommended)
```bash
cd functions
npm run serve
```

This starts local emulator at `http://localhost:5001`

### 4.2 Deploy to Production
```bash
firebase deploy --only functions
```

Output will show:
```
✔  functions[aiRequest(us-central1)] Deployed
✔  functions[sendRequirements(us-central1)] Deployed
```

### 4.3 Verify Deployment
```bash
firebase functions:list
```

---

## 🧪 Step 5: Test the AI Assistant

### 5.1 Frontend Testing
1. Run dev server: `npm run dev`
2. Open homepage
3. Click "🤖 Chat with AI Assistant" button
4. Test conversation flow

### 5.2 Backend Testing (cURL)
```bash
# Test AI Request
curl -X POST https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/aiRequest \
  -H "Content-Type: application/json" \
  -d '{
    "userMessage": "I want to build a mobile app",
    "conversationHistory": []
  }'

# Test Email Sending
curl -X POST https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/sendRequirements \
  -H "Content-Type: application/json" \
  -d '{
    "requirementsSummary": "Test requirements",
    "conversationHistory": [],
    "userEmail": "test@example.com"
  }'
```

---

## 📱 Step 6: Build & Deploy Frontend

### 6.1 Build Production
```bash
npm run build
```

### 6.2 Deploy to Azure Static Web Apps
```bash
git add .
git commit -m "Add AI Project Requirements Assistant"
git push origin main
```

GitHub Actions will automatically deploy.

---

## 🔧 Troubleshooting

### Issue: "Anthropic API key not configured"
**Solution:**
```bash
firebase functions:config:set anthropic.key="YOUR_KEY"
firebase deploy --only functions
```

### Issue: "Email configuration missing"
**Solution:**
```bash
firebase functions:config:set email.user="EMAIL" email.pass="PASSWORD"
firebase deploy --only functions
```

### Issue: CORS errors
**Solution:** Functions already include CORS middleware. Verify:
- Frontend URL is correct
- Functions are deployed
- No browser extensions blocking requests

### Issue: AI responses are slow
**Expected:** Claude API takes 2-5 seconds per response (normal)
**Optimization:** Consider caching or streaming responses in future updates

---

## 📊 Monitoring & Logs

### View Function Logs
```bash
firebase functions:log --only aiRequest
firebase functions:log --only sendRequirements
```

### Monitor Usage
- Firebase Console: https://console.firebase.google.com
- Anthropic Console: https://console.anthropic.com/settings/usage
- Check email delivery in Gmail/SendGrid dashboard

---

## 💰 Cost Estimates

### Firebase Functions (Free Tier)
- 2M invocations/month free
- Typical usage: 10-50 conversations/day = well within free tier

### Claude Sonnet API
- ~$3 per 1M input tokens
- ~$15 per 1M output tokens
- Typical conversation (10 messages): ~$0.05
- 100 conversations/month: ~$5

### Email (Gmail)
- Free for basic usage
- SendGrid/Mailgun: Free tiers available

**Total monthly cost: $0-10 for typical traffic**

---

## 🔄 Future Enhancements (TODO)

- [ ] Add conversation analytics (Firebase Analytics)
- [ ] Store conversations in Firestore for CRM integration
- [ ] Add authentication for personalized follow-ups
- [ ] Implement streaming responses for better UX
- [ ] Add multi-language support
- [ ] Integrate with HubSpot/Salesforce
- [ ] Add file upload for reference documents

---

## 📞 Support

For issues or questions:
- Email: davinder@solidevelectrosoft.com
- Check Firebase logs: `firebase functions:log`
- Review Anthropic API status: https://status.anthropic.com

---

## 🎉 Success Checklist

- [ ] Firebase project created
- [ ] Functions deployed successfully
- [ ] API keys configured
- [ ] Email credentials set
- [ ] Frontend environment variables updated
- [ ] Test conversation completed
- [ ] Test email received
- [ ] Production build deployed
- [ ] Mobile responsiveness verified
- [ ] Analytics tracking added (optional)

---

## 📝 Notes

- Keep API keys secret - never commit to git
- Monitor usage to avoid unexpected costs
- Update system prompt only with approval
- Test thoroughly before production deployment
- Consider rate limiting for high traffic

---

**Deployment Date:** December 2025  
**Version:** 1.0.0  
**Maintainer:** Solidev Electrosoft
