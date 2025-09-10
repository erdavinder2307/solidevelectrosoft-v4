import { EmailClient } from '@azure/communication-email';
import { environment } from '../config/environment';

class SendEmailService {
  constructor() {
    this.emailClient = null;
    this.secondaryEmailClient = null;
    this.senderName = environment.email.senderName;
    this.senderEmail = environment.email.senderEmail;
    this.initializeClient();
  }

  initializeClient() {
    try {
      if (environment.azure.primaryConnectionString) {
        this.emailClient = new EmailClient(environment.azure.primaryConnectionString);
        console.log('Primary Azure email client initialized');
      }
      
      if (environment.azure.secondaryConnectionString) {
        this.secondaryEmailClient = new EmailClient(environment.azure.secondaryConnectionString);
        console.log('Secondary Azure email client initialized');
      }
      
      if (!this.emailClient && !this.secondaryEmailClient) {
        console.warn('No Azure Communication Services connection strings configured');
      }
    } catch (error) {
      console.error('Failed to initialize email clients:', error);
    }
  }

  async sendEmail(to, subject, body, ccEmails = []) {
    const clients = [this.emailClient, this.secondaryEmailClient].filter(Boolean);
    
    if (clients.length === 0) {
      throw new Error('No email clients available. Please check your Azure configuration.');
    }

    // Format subject to include sender name for better recognition
    const formattedSubject = `${subject} - ${this.senderName}`;
    
    const emailMessage = {
      senderAddress: this.senderEmail,
      content: {
        subject: formattedSubject,
        plainText: this.stripHtml(body),
        html: body
      },
      recipients: {
        to: Array.isArray(to) ? to.map(email => ({ address: email })) : [{ address: to }],
        cc: ccEmails.length > 0 ? ccEmails.map(email => ({ address: email })) : undefined
      },
    };

    // Try primary client first, then fallback to secondary
    for (let i = 0; i < clients.length; i++) {
      try {
        console.log(`Attempting to send email using ${i === 0 ? 'primary' : 'secondary'} client`);
        const poller = await clients[i].beginSend(emailMessage);
        const response = await poller.pollUntilDone();
        console.log(`Email sent successfully using ${i === 0 ? 'primary' : 'secondary'} client`);
        return response;
      } catch (error) {
        console.error(`Failed to send email using ${i === 0 ? 'primary' : 'secondary'} client:`, error);
        
        // If this is the last client, throw the error
        if (i === clients.length - 1) {
          throw error;
        }
        
        // Otherwise, continue to next client
        console.log('Trying next available client...');
      }
    }
  }

  async sendContactFormEmail(formData) {
    const { name, email, phone, subject, message } = formData;
    
    // Check if any Azure client is configured
    const hasAzureClient = this.emailClient || this.secondaryEmailClient;
    if (!hasAzureClient) {
      console.warn('No Azure Communication Services clients configured, using fallback');
      return this.sendEmailFallback(formData);
    }

    const emailSubject = `New Contact Form Submission - ${name}`;
    const emailBody = this.generateContactEmailTemplate({
      name,
      email,
      phone,
      subject,
      message,
      submissionDate: new Date().toLocaleString(),
      ipAddress: 'N/A' // Would need server-side detection
    });

    const recipients = [environment.email.recipientEmails.primary];
    const ccEmails = [environment.email.recipientEmails.cc];

    try {
      const response = await this.sendEmail(recipients, emailSubject, emailBody, ccEmails);
      return {
        success: true,
        message: 'Thank you for your message! We will get back to you within 24 hours.',
        response
      };
    } catch (error) {
      console.error('Failed to send contact form email with all Azure clients:', error);
      
      // Try fallback on Azure failure
      console.warn('All Azure email clients failed, trying fallback method');
      return this.sendEmailFallback(formData);
    }
  }

  async sendConfirmationEmail(to, name, query) {
    const subject = 'Thank you for contacting Solidev Electrosoft';
    
    try {
      // Load email template
      const template = await this.loadEmailTemplate('/assets/templates/customer-email-template.html');
      
      const body = template
        .replace(/{{name}}/g, name)
        .replace(/{{subject}}/g, 'Contact Form Submission')
        .replace(/{{message}}/g, query)
        .replace(/{{year}}/g, new Date().getFullYear().toString())
        .replace(/{{company}}/g, this.senderName);

      return await this.sendEmail(to, subject, body);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    }
  }

  async loadEmailTemplate(templatePath) {
    try {
      const response = await fetch(templatePath);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.error('Error loading email template:', error);
      // Return a default template if the file doesn't exist
      return this.getDefaultEmailTemplate();
    }
  }

  generateContactEmailTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #007bff; color: white; padding: 20px; text-align: center; }
          .content { background: #f8f9fa; padding: 20px; border: 1px solid #dee2e6; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #495057; }
          .value { margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #007bff; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6c757d; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Contact Form Submission</h1>
            <p>Solidev Electrosoft - Convert Ideas Into Reality</p>
          </div>
          
          <div class="content">
            <h2>Contact Details</h2>
            
            <div class="field">
              <div class="label">📧 Form Type:</div>
              <div class="value">Contact Form Submission</div>
            </div>
            
            <div class="field">
              <div class="label">📅 Submission Date:</div>
              <div class="value">${data.submissionDate}</div>
            </div>
            
            <div class="field">
              <div class="label">👤 Name:</div>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">📱 Phone:</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            
            <div class="field">
              <div class="label">📝 Subject:</div>
              <div class="value">${data.subject}</div>
            </div>
            
            <div class="field">
              <div class="label">💬 Message:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent from the Solidev Electrosoft website contact form.</p>
            <p>🌐 Website: <a href="https://solidevelectrosoft.com">https://solidevelectrosoft.com</a></p>
            <p>📧 Reply directly to: <a href="mailto:${data.email}">${data.email}</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getDefaultEmailTemplate() {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thank you for contacting {{company}}!</h2>
          <p>Dear {{name}},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #007bff;">{{message}}</p>
          <p>Best regards,<br>{{company}} Team</p>
          <hr>
          <p style="font-size: 12px; color: #666;">© {{year}} {{company}}. All rights reserved.</p>
        </body>
      </html>
    `;
  }

  stripHtml(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }

  // Fallback method for environments without Azure setup
  async sendEmailFallback(formData) {
    // This could integrate with other services like EmailJS, Formspree, etc.
    console.log('Email fallback - Form data:', formData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: `Thank you ${formData.name}! Your message has been received. We will get back to you within 24 hours. (Fallback mode - please configure Azure Communication Services for email delivery)`,
      fallback: true
    };
  }
}

// Create and export a singleton instance
const emailService = new SendEmailService();
export default emailService;
