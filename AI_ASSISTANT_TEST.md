# AI Assistant - Test Conversation Flow

## Mock Conversation for Testing

### Turn 1
**User:** I want to build a mobile app

**AI:** Great! Let's explore your mobile app idea. What specific problem or need will this app address for your users?

### Turn 2
**User:** It's a fitness tracking app for runners

**AI:** Excellent! A fitness tracking app for runners. Who is your target audience? (e.g., casual runners, marathon trainers, beginners, etc.)

### Turn 3
**User:** Mostly beginners and casual runners who want to track their progress

**AI:** Perfect. What are the core features you'd like to include? For example: GPS tracking, pace monitoring, distance logging, calorie counter, etc.

### Turn 4
**User:** GPS tracking, route history, goal setting, and social sharing

**AI:** Those are solid features. What platforms do you need this app for? iOS, Android, or both?

### Turn 5
**User:** Both iOS and Android

**AI:** Great. Do you have a timeline in mind for this project?

### Turn 6
**User:** I'd like to launch in 3-4 months

**AI:** Understood. What's your approximate budget range for this project? This helps us recommend the right approach (MVP vs full build).

### Turn 7
**User:** Around $15,000 to $20,000

**AI:** Excellent. Are there any existing apps that inspire you or that you'd like to reference?

### Turn 8
**User:** Similar to Strava but simpler and more beginner-friendly

**AI:** Perfect! I have all the information I need. Here's a summary of your project requirements:

---

## 📋 FINAL REQUIREMENTS SUMMARY

**Project Title:** Beginner-Friendly Running & Fitness Tracking Mobile App

**Problem Statement:**
Casual and beginner runners need a simple, user-friendly way to track their running progress, set goals, and share achievements without the complexity of professional-grade apps.

**Proposed Solution:**
A mobile app (iOS & Android) that provides GPS tracking, route history, goal setting, and social sharing features with a focus on simplicity and beginner-friendliness.

**Target Users:**
- Casual runners
- Beginner runners
- Fitness enthusiasts starting their running journey

**Core Features:**
- GPS-based route tracking
- Route history and statistics
- Goal setting (distance, time, frequency)
- Social sharing capabilities
- User-friendly interface optimized for beginners

**Optional Features:**
- Calorie tracking
- Pace monitoring
- Achievement badges
- Community challenges

**Platforms:**
- iOS (iPhone)
- Android (smartphones)

**Timeline:**
3-4 months from project start to launch

**Budget:**
$15,000 - $20,000

**References:**
- Strava (for feature inspiration)
- Focus on simpler, more accessible UX

**Notes:**
- Prioritize beginner-friendly design over advanced features
- Clean, intuitive interface is critical
- Consider phased rollout (MVP first, then enhanced features)

---

**Next Steps:**
Our team will review these requirements and send you a detailed proposal within 24-48 hours.

[REQUIREMENTS_COMPLETE]

---

## Testing Checklist

- [ ] Modal opens when CTA clicked
- [ ] Initial greeting appears
- [ ] User can type and send messages
- [ ] Typing indicator shows during AI response
- [ ] Messages display in correct order
- [ ] Chat scrolls to bottom automatically
- [ ] Email input appears when complete
- [ ] Submit button works
- [ ] Success state displays
- [ ] Email received at davinder@solidevelectrosoft.com
- [ ] Mobile layout is responsive
- [ ] Modal closes properly
- [ ] Body scroll is prevented when modal open

---

## API Testing Commands

### Test AI Request
```bash
curl -X POST http://localhost:5001/YOUR_PROJECT_ID/us-central1/aiRequest \
  -H "Content-Type: application/json" \
  -d '{
    "userMessage": "I want to build a mobile app",
    "conversationHistory": []
  }'
```

### Test Email
```bash
curl -X POST http://localhost:5001/YOUR_PROJECT_ID/us-central1/sendRequirements \
  -H "Content-Type: application/json" \
  -d '{
    "requirementsSummary": "Test project requirements",
    "conversationHistory": [
      {"role": "user", "content": "I want to build an app"},
      {"role": "assistant", "content": "What problem does it solve?"}
    ],
    "userEmail": "test@example.com"
  }'
```
