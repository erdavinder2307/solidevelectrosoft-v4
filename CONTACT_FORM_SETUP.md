# Contact Form Setup Guide

## Overview
The contact form in this React application is designed to work in both development and production environments.

## Development Mode
- When running on `localhost` or `127.0.0.1`, the form will simulate submission
- Form data is logged to the console for debugging
- A success message is displayed, but no actual email is sent
- This allows for testing the form functionality without requiring a PHP server

## Production Setup

### Requirements
- Web server with PHP support (Apache, Nginx with PHP-FPM, etc.)
- PHP mail() function enabled or SMTP configuration

### Steps

1. **Upload Files**
   - Upload all React build files to your web server
   - Ensure `mail.php` is in the root directory of your website

2. **Configure PHP Mail**
   - The `mail.php` file is already configured to send emails to:
     - Primary: `admin@solidevelectrosoft.com`
     - CC: `davinder@solidevelectrosoft.com`
   - Update these email addresses if needed

3. **SMTP Configuration (Optional but Recommended)**
   - For better email delivery, configure SMTP instead of using PHP's mail() function
   - Consider using services like SendGrid, Mailgun, or AWS SES

4. **Test the Form**
   - Submit a test message through the contact form
   - Check that emails are received at the configured addresses

## Email Configuration Options

### Option 1: PHP mail() (Basic)
- Uses the server's built-in mail function
- May end up in spam folders
- Requires proper server mail configuration

### Option 2: SMTP (Recommended)
- More reliable email delivery
- Better spam folder avoidance
- Requires SMTP credentials

### Example SMTP Configuration
To use SMTP, modify `mail.php` to use PHPMailer:

```php
// Add at the top of mail.php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

// Configure SMTP settings
$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.your-provider.com';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@domain.com';
$mail->Password = 'your-app-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

## Troubleshooting

### Common Issues
1. **Form submits but no email received**
   - Check server error logs
   - Verify PHP mail configuration
   - Check spam folders

2. **Network errors in browser**
   - Ensure `mail.php` is accessible at `/mail.php`
   - Check server permissions on the PHP file

3. **CORS errors**
   - The PHP file includes CORS headers for development
   - In production, ensure your domain is properly configured

### Security Notes
- The PHP file includes basic input sanitization
- Consider adding CAPTCHA for additional spam protection
- Monitor for suspicious form submissions
- Rate limiting can be added to prevent abuse

## Alternative Solutions

### EmailJS (No Backend Required)
If you prefer not to use PHP, you can integrate EmailJS:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Configure email templates
3. Replace the form submission logic with EmailJS calls

### Contact Form Services
- Netlify Forms
- Formspree
- Typeform
- Google Forms

These services can handle form submissions without requiring your own backend.
