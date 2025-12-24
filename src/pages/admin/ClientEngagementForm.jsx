import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

const ClientEngagementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    engagementType: 'direct',
    partnerName: '',
    domains: '',
    projects: '',
    period: '',
    isVisible: true,
    sortOrder: 100,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetchEngagement();
    }
  }, [id]);

  const fetchEngagement = async () => {
    try {
      const docRef = doc(db, 'client_engagements', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          companyName: data.companyName || '',
          description: data.description || '',
          engagementType: data.engagementType || 'direct',
          partnerName: data.partnerName || '',
          domains: Array.isArray(data.domains) ? data.domains.join(', ') : '',
          projects: Array.isArray(data.projects) ? data.projects.join(', ') : '',
          period: data.period || '',
          isVisible: data.isVisible !== undefined ? data.isVisible : true,
          sortOrder: data.sortOrder || 100,
        });
      } else {
        alert('Client engagement not found');
        navigate('/admin/clients');
      }
    } catch (error) {
      console.error('Error fetching engagement:', error);
      alert('Error loading engagement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.period.trim()) {
      newErrors.period = 'Period is required';
    }

    if (formData.engagementType === 'via_partner' && !formData.partnerName.trim()) {
      newErrors.partnerName = 'Partner name is required for "Via Partner" engagement type';
    }

    if (!formData.sortOrder || isNaN(formData.sortOrder)) {
      newErrors.sortOrder = 'Sort order must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      // Process array fields
      const domains = formData.domains
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean);

      const projects = formData.projects
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);

      const dataToSave = {
        companyName: formData.companyName.trim(),
        description: formData.description.trim(),
        engagementType: formData.engagementType,
        partnerName: formData.engagementType === 'via_partner' ? formData.partnerName.trim() : null,
        domains,
        projects,
        period: formData.period.trim(),
        isVisible: formData.isVisible,
        sortOrder: Number(formData.sortOrder),
        updatedAt: serverTimestamp(),
      };

      if (isEditMode) {
        // Update existing document
        const docRef = doc(db, 'client_engagements', id);
        await updateDoc(docRef, dataToSave);
        alert('Client engagement updated successfully!');
      } else {
        // Create new document
        dataToSave.createdAt = serverTimestamp();
        await addDoc(collection(db, 'client_engagements'), dataToSave);
        alert('Client engagement created successfully!');
      }

      navigate('/admin/clients');
    } catch (error) {
      console.error('Error saving engagement:', error);
      alert('Error saving engagement. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div
          style={{
            display: 'inline-block',
            width: '48px',
            height: '48px',
            border: '4px solid #f3f4f6',
            borderTopColor: '#667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
          {isEditMode ? 'Edit Client Engagement' : 'Add Client Engagement'}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          {isEditMode ? 'Update engagement details' : 'Add a new company engagement'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
          {/* Company Name */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="companyName"
              style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}
            >
              Company Name <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g., Provizant Inc"
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.companyName ? '#dc2626' : '#d1d5db'}`,
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = errors.companyName ? '#dc2626' : '#d1d5db')}
            />
            {errors.companyName && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.companyName}</p>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="description"
              style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}
            >
              Description <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief, neutral description of the engagement"
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${errors.description ? '#dc2626' : '#d1d5db'}`,
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = errors.description ? '#dc2626' : '#d1d5db')}
            />
            {errors.description && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.description}</p>
            )}
          </div>

          {/* Engagement Type */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="engagementType"
              style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}
            >
              Engagement Type <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select
              id="engagementType"
              name="engagementType"
              value={formData.engagementType}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                background: 'white',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            >
              <option value="direct">Direct</option>
              <option value="via_partner">Via Partner</option>
              <option value="contractor">Contractor</option>
            </select>
          </div>

          {/* Partner Name (conditional) */}
          {formData.engagementType === 'via_partner' && (
            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="partnerName"
                style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}
              >
                Partner Name <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                id="partnerName"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleChange}
                placeholder="e.g., TechRBM"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.partnerName ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                onBlur={(e) => (e.target.style.borderColor = errors.partnerName ? '#dc2626' : '#d1d5db')}
              />
              {errors.partnerName && (
                <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.partnerName}</p>
              )}
            </div>
          )}

          {/* Two Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Domains */}
            <div>
              <label
                htmlFor="domains"
                style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}
              >
                Domains (Optional)
              </label>
              <input
                type="text"
                id="domains"
                name="domains"
                value={formData.domains}
                onChange={handleChange}
                placeholder="e.g., Healthcare, Aviation (comma-separated)"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Separate multiple domains with commas
              </p>
            </div>

            {/* Projects */}
            <div>
              <label
                htmlFor="projects"
                style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}
              >
                Projects (Optional)
              </label>
              <input
                type="text"
                id="projects"
                name="projects"
                value={formData.projects}
                onChange={handleChange}
                placeholder="e.g., RSS Cloud, Core360 (comma-separated)"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Separate multiple projects with commas
              </p>
            </div>
          </div>

          {/* Period and Sort Order */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Period */}
            <div>
              <label
                htmlFor="period"
                style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}
              >
                Period <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                id="period"
                name="period"
                value={formData.period}
                onChange={handleChange}
                placeholder="e.g., 2020–2023, Ongoing"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.period ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                onBlur={(e) => (e.target.style.borderColor = errors.period ? '#dc2626' : '#d1d5db')}
              />
              {errors.period && (
                <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.period}</p>
              )}
            </div>

            {/* Sort Order */}
            <div>
              <label
                htmlFor="sortOrder"
                style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}
              >
                Sort Order <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="number"
                id="sortOrder"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleChange}
                min="1"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.sortOrder ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                onBlur={(e) => (e.target.style.borderColor = errors.sortOrder ? '#dc2626' : '#d1d5db')}
              />
              {errors.sortOrder && (
                <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>{errors.sortOrder}</p>
              )}
            </div>
          </div>

          {/* Visibility Toggle */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="isVisible"
                checked={formData.isVisible}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  marginRight: '12px',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Visible on public site
              </span>
            </label>
            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px', marginLeft: '30px' }}>
              Toggle to show/hide this engagement on your website
            </p>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '12px 24px',
                background: saving ? '#9ca3af' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: saving ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!saving) e.target.style.background = '#5568d3';
              }}
              onMouseLeave={(e) => {
                if (!saving) e.target.style.background = '#667eea';
              }}
            >
              {saving ? 'Saving...' : isEditMode ? 'Update Engagement' : 'Create Engagement'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/clients')}
              disabled={saving}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: saving ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!saving) {
                  e.target.style.background = '#f9fafb';
                  e.target.style.borderColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (!saving) {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = '#d1d5db';
                }
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      {/* Help Section */}
      <div
        style={{
          marginTop: '24px',
          background: '#fef3c7',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #fcd34d',
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>
          ⚠️ Content Guidelines
        </h3>
        <ul style={{ color: '#b45309', fontSize: '13px', lineHeight: '1.6', paddingLeft: '20px', margin: 0 }}>
          <li>Use factual, neutral language only</li>
          <li>No marketing claims or endorsements</li>
          <li>Describe past project work, not ongoing relationships</li>
          <li>Include partner names when work was done via intermediary</li>
        </ul>
      </div>
    </div>
  );
};

export default ClientEngagementForm;
