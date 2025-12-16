# Azure Communication Services Email Integration

## Overview
This project uses **Azure Communication Services** for sending emails through the AI Project Requirements Assistant. The integration is implemented in Firebase Functions and uses a verified custom domain `solidevelectrosoft.com`.

## Architecture

```
Frontend (React) 
  → Firebase Functions (Node.js 20)
    → Azure Communication Services Email API
      → Email Delivery via solidevelectrosoft.com
```

## Azure Resources

### Communication Services Resource
- **Name**: `solidev-email-send-resource-3`
- **Resource Group**: `solidev`
- **Location**: Global (Data Location: India)
- **Hostname**: `solidev-email-send-resource-3.india.communication.azure.com`
- **Status**: Provisioning Succeeded ✅

### Email Domain Configuration
- **Domain**: `solidevelectrosoft.com`
- **Management**: Customer Managed
- **Sender Address**: `admin@solidevelectrosoft.com`
- **Recipient**: `davinder@solidevelectrosoft.com`

### DNS Verification Status ✅
- **Domain Verification**: ✅ Verified
- **DKIM (Selector 1)**: ✅ Verified
- **DKIM (Selector 2)**: ✅ Verified
- **SPF**: ✅ Verified
- **DMARC**: Not Started (optional)

## Implementation Details

### 1. Package Dependencies
```json
"@azure/communication-email": "^1.0.0"
```

### 2. Firebase Functions Configuration
```bash
# Set Azure connection string
firebase functions:config:set azure.email.connection_string="endpoint=https://solidev-email-send-resource-3.india.communication.azure.com/;accesskey=YOUR_KEY"

# Deploy functions
firebase deploy --only functions
```

### 3. Code Implementation

**File**: `functions/email/sendRequirements.js`

```javascript
const { EmailClient } = require('@azure/communication-email');
const functions = require('firebase-functions');

async function sendRequirementsEmail({ requirementsSummary, conversationHistory, userEmail }) {
  // Get Azure connection string from Firebase config
  const connectionString = functions.config().azure?.email?.connection_string;
  
  // Create Azure Email client
  const emailClient = new EmailClient(connectionString);
  
  // Configure email message
  const message = {
    senderAddress: 'admin@solidevelectrosoft.com',
    content: {
      subject: 'New Project Requirements via AI Assistant',
      html: emailBody,
    },
    recipients: {
      to: [
        { address: 'davinder@solidevelectrosoft.com', displayName: 'Davinder Pal' }
      ],
    },
  };
  
  // Send email using Azure Communication Services
  const poller = await emailClient.beginSend(message);
  const result = await poller.pollUntilDone();
  
  return { messageId: result.id };
}
```

## Azure CLI Commands

### 1. Verify Azure Account
```bash
az account show
```

### 2. List Communication Services Resources
```bash
az communication list --output table
```

### 3. Get Resource Details
```bash
az communication show \
  --name solidev-email-send-resource-3 \
  --resource-group solidev
```

### 4. Get Connection Strings
```bash
az communication list-key \
  --name solidev-email-send-resource-3 \
  --resource-group solidev
```

### 5. Check Email Domain Configuration
```bash
az resource show \
  --ids "/subscriptions/YOUR_SUBSCRIPTION/resourceGroups/solidev/providers/Microsoft.Communication/emailServices/solidev-send-email/domains/solidevelectrosoft.com"
```

### 6. Send Test Email via Azure CLI
```bash
az communication email send \
  --connection-string "YOUR_CONNECTION_STRING" \
  --sender "admin@solidevelectrosoft.com" \
  --to "davinder@solidevelectrosoft.com" \
  --subject "Test Email" \
  --text "This is a test email" \
  --html "<h1>Test Email</h1><p>This is a test email.</p>"
```

## End-to-End Testing

### Test via Firebase Function
```bash
curl -X POST "https://us-central1-solidev-electrosoft.cloudfunctions.net/sendRequirements" \
  -H "Content-Type: application/json" \
  -d '{
    "requirementsSummary": "Test Requirements",
    "conversationHistory": [
      {"role": "user", "content": "Test message"},
      {"role": "assistant", "content": "Test response"}
    ],
    "userEmail": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Requirements sent successfully",
  "messageId": "f0006935-7118-4003-b362-4a4b195b89ab"
}
```

### Test via Azure CLI
```bash
az communication email send \
  --connection-string "$AZURE_CONNECTION_STRING" \
  --sender "admin@solidevelectrosoft.com" \
  --to "davinder@solidevelectrosoft.com" \
  --subject "Azure CLI Test" \
  --text "Direct test via Azure CLI"
```

**Expected Response:**
```json
{
  "error": null,
  "id": "5d737654-94b8-45e6-8ecf-4857e00b20f3",
  "status": "Succeeded"
}
```

## Migration from Nodemailer

### Before (Nodemailer)
- SMTP-based email delivery via Gmail
- Required app password configuration
- Limited to Gmail's sending limits
- Configuration: `email.user` and `email.pass`

### After (Azure Communication Services)
- Direct API-based email delivery
- Enterprise-grade email service
- Custom verified domain support
- Higher sending limits and better deliverability
- Configuration: `azure.email.connection_string`

## Configuration Updates Required

### Firebase Functions Config
```bash
# Remove old Nodemailer config (optional)
firebase functions:config:unset email.user
firebase functions:config:unset email.pass

# Add Azure config
firebase functions:config:set azure.email.connection_string="YOUR_CONNECTION_STRING"
```

### Package.json Updates
```json
{
  "dependencies": {
    "@azure/communication-email": "^1.0.0",  // Added
    "nodemailer": "^6.9.7"  // Can be removed after full migration
  }
}
```

## Email Template

The email includes:
- **Header**: Branded gradient header with AI Assistant branding
- **Requirements Summary**: Structured project requirements from AI conversation
- **User Contact**: Optional user email if provided
- **Conversation History**: Full chat transcript
- **Submission Details**: Timestamp and source information
- **Footer**: Company branding with "Powered by Azure Communication Services"

## Monitoring & Troubleshooting

### Check Firebase Functions Logs
```bash
firebase functions:log
```

### View Azure Communication Services Metrics
```bash
# In Azure Portal
Navigate to: Communication Services → Metrics
Monitor: Email send operations, delivery status, errors
```

### Common Issues

1. **"Azure Communication Services configuration missing"**
   - Solution: Run `firebase functions:config:set azure.email.connection_string="..."`

2. **"Email send failed"**
   - Check DNS verification status
   - Verify sender address matches verified domain
   - Check Azure service health

3. **Email not delivered**
   - Check spam folder
   - Verify DNS records (DKIM, SPF)
   - Review Azure Communication Services logs

## Cost Considerations

### Azure Communication Services Pricing
- **Email Sending**: $0.00025 per email (for first 1M emails/month)
- **Example**: 1,000 emails = $0.25
- **Volume Pricing**: Decreases with higher volumes

### Comparison with Nodemailer/Gmail
- Gmail SMTP: Free but with daily limits (500-2000 emails/day)
- Azure: Pay-per-use with no daily limits
- Better deliverability with verified domain

## Security Best Practices

1. **Never commit connection strings to Git**
   - Use Firebase Functions config or environment variables
   - Keep `.env` files in `.gitignore`

2. **Rotate Access Keys Regularly**
   ```bash
   az communication regenerate-key \
     --name solidev-email-send-resource-3 \
     --resource-group solidev \
     --key-type primary
   ```

3. **Monitor Email Operations**
   - Set up Azure Monitor alerts
   - Track failed deliveries
   - Review bounce rates

## References

- [Azure Communication Services Email Documentation](https://learn.microsoft.com/azure/communication-services/concepts/email/email-overview)
- [Azure CLI Communication Commands](https://learn.microsoft.com/cli/azure/communication)
- [Firebase Functions Configuration](https://firebase.google.com/docs/functions/config-env)
- [@azure/communication-email SDK](https://www.npmjs.com/package/@azure/communication-email)

## Deployment Checklist

- [x] Install `@azure/communication-email` package
- [x] Update `sendRequirements.js` to use Azure Email Client
- [x] Configure Firebase Functions with Azure connection string
- [x] Deploy updated Firebase Functions
- [x] Validate Azure Communication Services setup via CLI
- [x] Perform end-to-end email test
- [x] Verify DNS records and domain verification
- [x] Test email delivery to production recipient
- [x] Document configuration and testing procedures

## Support

For issues or questions:
- **Azure Support**: Azure Portal → Support → New Support Request
- **Firebase Support**: Firebase Console → Support
- **Internal**: Contact davinder@solidevelectrosoft.com
