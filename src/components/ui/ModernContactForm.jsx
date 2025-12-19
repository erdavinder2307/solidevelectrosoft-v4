import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Modern Contact Form Component
 * Optimized for conversion with WhatsApp integration
 */
const ModernContactForm = ({
  onSubmit,
  whatsappNumber = "919115866828",
  showWhatsAppOption = true,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const projectTypes = [
    { value: '', label: 'Select project type' },
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'ai-solution', label: 'AI/ML Solution' },
    { value: 'mvp', label: 'MVP Development' },
    { value: 'other', label: 'Other' },
  ];

  const budgetRanges = [
    { value: '', label: 'Select budget range' },
    { value: 'under-499', label: 'Under $499' },
    { value: '499-999', label: '$499 - $999' },
    { value: '999-1999', label: '$999 - $1,999' },
    { value: '1999-4999', label: '$1,999 - $4,999' },
    { value: '4999-9999', label: '$4,999 - $9,999' },
    { value: 'over-9999', label: 'Over $9,999' },
    { value: 'not-sure', label: 'Not sure yet' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Call Firebase function to send contact form
      const response = await fetch(
        'https://us-central1-solidev-electrosoft.cloudfunctions.net/sendContactForm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            projectType: formData.projectType,
            budget: formData.budget,
            message: formData.message,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      // Call custom onSubmit if provided
      if (onSubmit) {
        await onSubmit(formData);
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Hi! I'm ${formData.name || '[Your Name]'} and I'm interested in discussing a ${formData.projectType || 'project'} with Solidev Electrosoft.`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const inputStyle = {
    width: '100%',
    padding: 'var(--space-4)',
    minHeight: '48px',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-base)',
    color: 'var(--text-primary)',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-lg)',
    transition: 'all var(--transition-default)',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 'var(--space-2)',
    fontSize: 'var(--text-sm)',
    fontWeight: '500',
    color: 'var(--text-primary)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid var(--color-success)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="16 8 10 14 8 12" fill="none"/>
          </svg>
          <span>Thank you! We'll get back to you within 24 hours.</span>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--color-error)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--color-error)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <span>Something went wrong. Please try again or contact us directly.</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name & Email Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-5)',
            marginBottom: 'var(--space-5)',
          }}
          className="form-row"
        >
          <div>
            <label htmlFor="name" style={labelStyle}>
              Full Name <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="email" style={labelStyle}>
              Email Address <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@company.com"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Phone & Project Type Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-5)',
            marginBottom: 'var(--space-5)',
          }}
          className="form-row"
        >
          <div>
            <label htmlFor="phone" style={labelStyle}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="projectType" style={labelStyle}>
              Project Type <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23737373' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right var(--space-4) center',
                paddingRight: 'var(--space-10)',
              }}
            >
              {projectTypes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget */}
        <div style={{ marginBottom: 'var(--space-5)' }}>
          <label htmlFor="budget" style={labelStyle}>
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            style={{
              ...inputStyle,
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23737373' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right var(--space-4) center',
              paddingRight: 'var(--space-10)',
            }}
          >
            {budgetRanges.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <label htmlFor="message" style={labelStyle}>
            Project Details <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Tell us about your project, goals, and timeline..."
            style={{
              ...inputStyle,
              minHeight: '140px',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="modern-btn modern-btn-primary modern-btn-lg"
          style={{
            width: '100%',
            justifyContent: 'center',
            marginBottom: showWhatsAppOption ? 'var(--space-4)' : 0,
          }}
        >
          {isSubmitting ? (
            <>
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'modern-spin 1s linear infinite',
                }}
              />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </>
          )}
        </button>

        {/* WhatsApp Option */}
        {showWhatsAppOption && (
          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-tertiary)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Or reach out directly via
            </span>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3) var(--space-5)',
                background: '#25D366',
                color: 'white',
                borderRadius: 'var(--radius-full)',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: 'var(--text-sm)',
                transition: 'all var(--transition-default)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        )}
      </form>

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 480px) {
          .form-row {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        
        input:focus, select:focus, textarea:focus {
          border-color: var(--color-primary-500) !important;
          box-shadow: 0 0 0 3px var(--color-primary-100) !important;
        }
      `}</style>
    </motion.div>
  );
};

export default ModernContactForm;
