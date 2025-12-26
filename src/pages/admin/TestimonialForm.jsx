import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ImageUploader from '../../components/admin/ImageUploader';
import { uploadImageToFirebase } from '../../utils/imageUtils';

const StarSelector = ({ value=5, onChange }) => {
  const r = Math.min(5, Math.max(1, Number(value) || 5));
  return (
    <div aria-label={`${r} star rating`}>
      {Array.from({ length: 5 }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i+1)}
          aria-label={`Set rating to ${i+1}`}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={i < r ? '#f59e0b' : 'none'} stroke={i < r ? '#f59e0b' : '#d1d5db'} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      ))}
    </div>
  );
};

const TestimonialForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    clientName: '',
    clientRole: '',
    clientCompany: '',
    country: '',
    rating: 5,
    testimonialText: '',
    clientInitials: '',
    clientImageUrl: '',
    source: '',
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    displayOrder: 0,
  });

  useEffect(() => {
    if (isEditing) fetchItem();
  }, [id, isEditing]);

  const fetchItem = async () => {
    try {
      const snap = await getDoc(doc(db, 'testimonials', id));
      if (snap.exists()) {
        const data = snap.data();
        setFormData({
          clientName: data.clientName || '',
          clientRole: data.clientRole || '',
          clientCompany: data.clientCompany || '',
          country: data.country || '',
          rating: data.rating ?? 5,
          testimonialText: data.testimonialText || '',
          clientInitials: data.clientInitials || '',
          clientImageUrl: data.clientImageUrl || '',
          source: data.source || '',
          isFeatured: !!data.isFeatured,
          isPublished: !!data.isPublished,
          isDeleted: !!data.isDeleted,
          displayOrder: data.displayOrder || 0,
        });
        setImagePreview(data.clientImageUrl || '');
      } else {
        setErrors({ general: 'Testimonial not found' });
      }
    } catch (err) {
      console.error('Load testimonial failed:', err);
      setErrors({ general: 'Failed to load testimonial' });
    } finally { setLoading(false); }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageSelected = (file) => {
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors((prev) => ({ ...prev, clientImageUrl: 'Image must be under 5MB' }));
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, clientImageUrl: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!formData.clientRole.trim()) newErrors.clientRole = 'Role is required';
    if (!formData.testimonialText.trim()) newErrors.testimonialText = 'Testimonial text is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setSubmitting(true);
    setSuccessMessage('');

    try {
      let imageUrl = formData.clientImageUrl;
      if (imageFile) {
        imageUrl = await uploadImageToFirebase(imageFile, 'testimonials');
      }
      const payload = {
        ...formData,
        clientImageUrl: imageUrl || '',
        rating: Math.min(5, Math.max(1, Number(formData.rating) || 5)),
        displayOrder: parseInt(formData.displayOrder, 10) || 0,
        updatedAt: new Date(),
      };
      if (isEditing) {
        await updateDoc(doc(db, 'testimonials', id), payload);
        setSuccessMessage('Testimonial updated successfully');
        setTimeout(() => navigate('/admin/testimonials'), 1200);
      } else {
        await addDoc(collection(db, 'testimonials'), { ...payload, createdAt: new Date() });
        setSuccessMessage('Testimonial added successfully');
        setFormData({ clientName: '', clientRole: '', clientCompany: '', country: '', rating: 5, testimonialText: '', clientInitials: '', clientImageUrl: '', source: '', isFeatured: false, isPublished: true, isDeleted: false, displayOrder: 0 });
        setImageFile(null);
        setImagePreview('');
      }
    } catch (err) {
      console.error('Save testimonial failed:', err);
      setErrors({ general: 'Failed to save testimonial' });
    } finally { setSubmitting(false); }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ display: 'inline-block', width: 48, height: 48, border: '4px solid #f3f4f6', borderTopColor: '#667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a202c' }}>{isEditing ? 'Edit Testimonial' : 'Add Testimonial'}</h1>
        <button type="button" onClick={() => navigate('/admin/testimonials')} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #e5e7eb', background: 'white', color: '#374151', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Back to list</button>
      </div>

      {errors.general && (
        <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '12px 16px', marginBottom: 16, color: '#991B1B' }}>{errors.general}</div>
      )}

      {successMessage && (
        <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: 8, padding: '12px 16px', marginBottom: 16, color: '#166534' }}>{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label htmlFor="clientName" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1a202c' }}>Client Name *</label>
            <input type="text" id="clientName" name="clientName" value={formData.clientName} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14 }} />
            {errors.clientName && (<span style={{ fontSize: 13, color: '#991B1B' }}>{errors.clientName}</span>)}
          </div>
          <div>
            <label htmlFor="clientRole" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1a202c' }}>Client Role *</label>
            <input type="text" id="clientRole" name="clientRole" value={formData.clientRole} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14 }} />
            {errors.clientRole && (<span style={{ fontSize: 13, color: '#991B1B' }}>{errors.clientRole}</span>)}
          </div>
          <div>
            <label htmlFor="clientCompany" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1a202c' }}>Company</label>
            <input type="text" id="clientCompany" name="clientCompany" value={formData.clientCompany} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14 }} />
          </div>
          <div>
            <label htmlFor="country" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1a202c' }}>Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14 }} />
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <label htmlFor="testimonialText" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1a202c' }}>Testimonial *</label>
          <textarea id="testimonialText" name="testimonialText" value={formData.testimonialText} onChange={handleInputChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14, minHeight: 120, resize: 'vertical' }} />
          {errors.testimonialText && (<span style={{ fontSize: 13, color: '#991B1B' }}>{errors.testimonialText}</span>)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1a202c' }}>Client Image</label>
            <ImageUploader onImageSelected={handleImageSelected} />
            {imagePreview && (
              <div style={{ marginTop: 12 }}>
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              </div>
            )}
            {errors.clientImageUrl && (<span style={{ fontSize: 13, color: '#991B1B' }}>{errors.clientImageUrl}</span>)}
          </div>
          <div>
            <label htmlFor="clientInitials" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1a202c' }}>Client Initials (fallback)</label>
            <input type="text" id="clientInitials" name="clientInitials" value={formData.clientInitials} onChange={handleInputChange} placeholder="e.g., NV" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14 }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1a202c' }}>Source</label>
            <input type="text" name="source" value={formData.source} onChange={handleInputChange} placeholder="LinkedIn, Email, Upwork..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1a202c' }}>Rating</label>
            <StarSelector value={formData.rating} onChange={(val) => setFormData((prev) => ({ ...prev, rating: val }))} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <div>
            <label htmlFor="displayOrder" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#1a202c' }}>Display Order</label>
            <input type="number" id="displayOrder" name="displayOrder" value={formData.displayOrder} onChange={handleInputChange} style={{ width: '100%', maxWidth: 150, padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 14 }} />
            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Lower numbers appear first</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleInputChange} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1a202c' }}>Published</span>
            </label>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1a202c' }}>Featured</span>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button type="submit" disabled={submitting} style={{ padding: '10px 24px', background: '#667eea', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>{submitting ? 'Saving...' : isEditing ? 'Update Testimonial' : 'Add Testimonial'}</button>
          <button type="button" onClick={() => navigate('/admin/testimonials')} style={{ padding: '10px 24px', background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default TestimonialForm;
