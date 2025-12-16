# Azure Communication Services Email Setup Guide

## Overview
This guide explains how to set up Azure Communication Services for sending emails from the React contact form, replacing the previous PHP mail handler.

## Benefits of Azure Communication Services
- ✅ **Reliable Delivery**: Enterprise-grade email delivery
- ✅ **Scalable**: Handles high volume without configuration
- ✅ **Spam Protection**: Better inbox delivery rates
- ✅ **Tracking**: Delivery status and analytics
- ✅ **Security**: Built-in authentication and encryption
- ✅ **No Server Required**: Works directly from client-side

## Setup Instructions

### 1. Create Azure Communication Services Resource

1. **Log in to Azure Portal** (https://portal.azure.com)
2. **Create a new resource** → Search for "Communication Services"
3. **Fill in the details:**
   - Resource name: `solidev-communication-services`
   - Subscription: Choose your subscription
   - Resource group: Create new or select existing
   - Data location: Choose closest to your users
4. **Review and create** the resource

### 2. Configure Email Domain

1. **Go to your Communication Services resource**
2. **Navigate to "Email" → "Provision domains"**
3. **Choose one option:**
   
   **Option A: Use Azure subdomain (Free)**
   - Click "Add domain" → "Azure subdomain"
   - Choose a subdomain name (e.g., `solidev-emails`)
   - This gives you: `donotreply@{subdomain}.azurecomm.net`
   
   **Option B: Use custom domain (Recommended)**
   - Click "Add domain" → "Custom domain"
   - Enter your domain: `solidevelectrosoft.com`
   - Follow DNS verification steps
   - This allows: `donotreply@solidevelectrosoft.com`

### 3. Get Connection String

1. **In your Communication Services resource**
2. **Go to "Settings" → "Keys"**
3. **Copy the "Primary connection string"**
4. **Save it securely** - you'll need this for configuration

### 4. Configure React Application

#### Create Environment Variables

1. **Create `.env.local` file** in your project root:
```bash
# Azure Communication Services Configuration
REACT_APP_AZURE_COMMUNICATION_CONNECTION_STRING=endpoint=https://your-service.communication.azure.com/;accesskey=your-access-key-here
```

2. **Update email configuration** in `src/config/environment.js`:
```javascript
export const environment = {
  azure: {
    primaryConnectionString: process.env.REACT_APP_AZURE_COMMUNICATION_CONNECTION_STRING || '',
  },
  email: {
    senderName: 'Solidev Electrosoft',
    senderEmail: 'admin@solidevelectrosoft.com', // Update with your verified domain
    recipientEmails: {
      primary: 'admin@solidevelectrosoft.com',
      cc: 'davinder@solidevelectrosoft.com'
    }
  }
};
```

### 5. Verify Setup

1. **Start your React application**
2. **Open browser console** to check for any configuration errors
3. **Submit a test contact form**
4. **Check the following:**
   - No console errors
   - Success message appears
   - Emails received at configured addresses

## Email Flow

### When a user submits the contact form:

1. **Form Validation** → Client-side validation
2. **Azure API Call** → Send email via Communication Services
3. **Admin Notification** → Email sent to admin team
4. **User Confirmation** → Optional confirmation email to user
5. **Success Feedback** → User sees success message

### Email Templates

**Admin Email Contains:**
- User contact details (name, email, phone)
- Subject and message
- Submission timestamp
- Professional HTML formatting

**User Confirmation Email Contains:**
- Thank you message
- Copy of their inquiry
- Company contact information
- Expected response timeframe

## Troubleshooting

### Common Issues

#### 1. "Email client not initialized"
**Cause:** Missing or invalid connection string
**Solution:** 
- Check `.env.local` file exists
- Verify connection string format
- Restart development server

#### 2. "Domain not verified"
**Cause:** Email domain not properly configured
**Solution:**
- Complete DNS verification in Azure portal
- Wait for propagation (up to 24 hours)
- Use Azure subdomain as temporary solution

#### 3. "Permission denied"
**Cause:** Insufficient Azure permissions
**Solution:**
- Ensure your Azure account has Communication Services permissions
- Check resource group access rights

#### 4. Emails going to spam
**Cause:** Domain reputation or configuration
**Solution:**
- Complete SPF, DKIM, DMARC configuration
- Use verified custom domain
- Avoid spam trigger words in templates

### Development vs Production

**Development Mode:**
- Fallback to console logging if Azure not configured
- No actual emails sent
- Form validation still works

**Production Mode:**
- Full Azure Communication Services integration
- Real email delivery
- Error handling and fallbacks

## Cost Considerations

### Azure Communication Services Pricing (as of 2024)
- **Email messages**: $0.25 per 1,000 emails
- **Very cost-effective** for typical contact form volumes
- **No monthly fees** - pay only for usage

### Example Costs
- 100 emails/month: ~$0.025
- 1,000 emails/month: ~$0.25
- 10,000 emails/month: ~$2.50

## Advanced Configuration

### Custom Email Templates
1. Edit `public/assets/templates/customer-email-template.html`
2. Use placeholders: `{{name}}`, `{{message}}`, `{{year}}`
3. Test with different content

### Additional Recipients
Update `environment.js`:
```javascript
recipientEmails: {
  primary: 'admin@solidevelectrosoft.com',
  cc: 'davinder@solidevelectrosoft.com',
  sales: 'sales@solidevelectrosoft.com'
}
```

### Email Analytics
Azure provides delivery reports and analytics:
1. Go to Communication Services → Insights
2. View email delivery statistics
3. Monitor bounce rates and engagement

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use different Azure resources** for dev/staging/production
3. **Rotate connection strings** regularly
4. **Monitor usage** for unexpected spikes
5. **Implement rate limiting** to prevent abuse

## Migration from PHP

### What's Changed
- ❌ Removed PHP dependency
- ❌ No server-side email configuration needed
- ✅ Direct client-to-Azure communication
- ✅ Better error handling and user feedback
- ✅ Professional email templates
- ✅ Automatic fallbacks

### What's Better
- **Reliability**: Enterprise-grade email service
- **Scalability**: Handles growth automatically
- **Maintenance**: No server email configuration
- **Features**: Delivery tracking and analytics
- **Security**: Modern authentication and encryption

## Support

For issues or questions:
1. Check Azure Communication Services documentation
2. Review browser console for error messages
3. Test with Azure subdomain first
4. Contact Azure support for service-specific issues

## Next Steps

1. **Complete Azure setup** following this guide
2. **Test thoroughly** in development
3. **Deploy to staging** environment
4. **Verify production** email delivery
5. **Monitor usage** and costs
6. **Consider additional features** like SMS notifications
