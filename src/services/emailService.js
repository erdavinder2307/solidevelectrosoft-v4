import { environment } from '../config/environment';

const SENT_MESSAGE = 'Thank you for your message! We will get back to you within 24 hours.';

// Sends the website's forms through the Solidev email API. The API owns the recipients and
// templates and sends the submitter's confirmation itself; this client only picks a use case
// and passes the field values. Never throws: failures come back as { success: false }.
class EmailService {
  async send(useCase, fields, sendConfirmation) {
    try {
      const response = await fetch(environment.emailApi.sendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ useCase, fields, sendConfirmation }),
      });
      if (!response.ok) {
        console.error('Email API: send failed with status', response.status);
        return { success: false };
      }
      return { success: true, message: SENT_MESSAGE };
    } catch (error) {
      console.error('Email API: request failed', error);
      return { success: false };
    }
  }

  sendContactFormEmail({ name, email, phone, subject, message }) {
    return this.send(
      'website-contact',
      { name, email, phone: phone || undefined, subject: subject || undefined, message },
      true
    );
  }

  sendCallbackRequest({ name, phone, message }) {
    return this.send('website-callback', { name, phone, message: message || undefined }, false);
  }
}

const emailService = new EmailService();
export default emailService;
