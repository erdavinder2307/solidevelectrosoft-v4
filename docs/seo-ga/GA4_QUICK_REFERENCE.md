# GA4 Event Tracking - Quick Reference

## Common Tracking Patterns

### 1. Track a Button Click (CTA)
```javascript
import { trackCTAClick } from '../../utils/analytics';

<button onClick={() => trackCTAClick('Get Started', 'hero')}>
  Get Started
</button>
```

### 2. Track Page View (Automatic in App.jsx)
Already implemented via RouteTracker. No action needed for new pages.

### 3. Track Form Submission
```javascript
import { trackContactFormSubmitted } from '../../utils/analytics';

const handleSubmit = async (e) => {
  e.preventDefault();
  // ... form logic
  trackContactFormSubmitted('pricing'); // source attribution
};
```

### 4. Track External Link
```javascript
import { trackExternalLinkClicked } from '../../utils/analytics';

<a 
  href="https://example.com" 
  onClick={() => trackExternalLinkClicked('website')}
>
  Visit Website
</a>
```

### 5. Track WhatsApp Click
```javascript
import { trackWhatsAppClicked } from '../../utils/analytics';

<a 
  href={whatsappLink} 
  onClick={() => trackWhatsAppClicked()}
>
  Chat on WhatsApp
</a>
```

### 6. Create Custom Event
```javascript
import { trackEvent } from '../../utils/analytics';

const handleAction = () => {
  trackEvent('custom_event_name', {
    parameter1: 'value1',
    parameter2: 'value2',
  });
};
```

## Available Tracking Functions

Import from `src/utils/analytics.js`:

### Lead Generation
- `trackCTAClick(label, location, page)`
- `trackContactFormStarted(source)`
- `trackContactFormSubmitted(source)`
- `trackWhatsAppClicked(page)`

### AI Assistant
- `trackAISessionStarted(planId, sourcePage)`
- `trackAIQuestionAnswered(questionIndex, planId)`
- `trackAISessionCompleted(planId, completionType)`
- `trackAIUpgradePromptShown(fromPlan, toPlan)`
- `trackAIUpgradeClicked(fromPlan, toPlan)`

### Products & Portfolio
- `trackProductViewed(productId, productName)`
- `trackProductScreenshotsOpened(productId)`
- `trackPortfolioViewed(projectId)`
- `trackExternalLinkClicked(destination, page)`

### Pricing (Ready to Use)
- `trackPricingSectionViewed(page)`
- `trackPlanSelected(planId, price, page)`
- `trackPricingCTAClick(planId, ctaLabel)`

### Admin
- `trackAdminLogin()`
- `trackAdminContentCreated(contentType)`
- `trackAdminContentUpdated(contentType)`

## Testing Events

1. **Open Browser Console**
2. **Perform action** (click button, submit form, etc.)
3. **Check console** for log: `GA4 Event: event_name {params}`
4. **Verify in GA4 DebugView** (real-time)

## Common Mistakes to Avoid

❌ Don't track PII:
```javascript
// BAD
trackEvent('form_submit', { 
  email: user.email,  // Never track email!
  phone: user.phone   // Never track phone!
});

// GOOD
trackContactFormSubmitted('direct');
```

❌ Don't create noisy events:
```javascript
// BAD - fires on every mouse move
onMouseMove={() => trackEvent('mouse_moved')}

// GOOD - track meaningful actions
onClick={() => trackCTAClick('Get Quote', 'hero')}
```

❌ Don't forget error handling:
```javascript
// GOOD - analytics utility handles errors gracefully
try {
  trackEvent('my_event', params);
} catch (e) {
  // Analytics failure shouldn't break the app
}
```

## Privacy Checklist

Before tracking any event:
- [ ] Does it contain personal information? (email, phone, name, message)
- [ ] Is it a meaningful business metric?
- [ ] Does it respect user privacy?
- [ ] Is it compliant with GDPR/privacy laws?

## Need Help?

- Full documentation: `GA4_IMPLEMENTATION_SUMMARY.md`
- Analytics utility: `src/utils/analytics.js`
- Ask: GitHub Copilot or team lead
