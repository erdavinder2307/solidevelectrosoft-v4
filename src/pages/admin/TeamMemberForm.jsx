import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ImageUploader from '../../components/admin/ImageUploader';
import { uploadImageToFirebase } from '../../utils/imageUtils';

const TeamMemberForm = () => {
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
    name: '',
    role: '',
    profileImageUrl: '',
    linkedinUrl: '',
    shortBio: '',
    isVisible: true,
    sortOrder: 0,
  });

  useEffect(() => {
    if (isEditing) {
      fetchMember();
    }
  }, [id, isEditing]);

  const fetchMember = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'team_members', id));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          name: data.name || '',
          role: data.role || '',
          profileImageUrl: data.profileImageUrl || '',
          linkedinUrl: data.linkedinUrl || '',
          shortBio: data.shortBio || '',
          isVisible: data.isVisible !== undefined ? data.isVisible : true,
          sortOrder: data.sortOrder || 0,
        });
        setImagePreview(data.profileImageUrl || '');
      } else {
        setErrors({ general: 'Team member not found' });
      }
    } catch (err) {
      console.error('Error fetching member:', err);
      setErrors({ general: 'Failed to load team member' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageSelected = (file) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, profileImageUrl: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (formData.linkedinUrl && !/^https?:\/\//i.test(formData.linkedinUrl)) {
      newErrors.linkedinUrl = 'Enter a valid URL (https://...)';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSuccessMessage('');

    try {
      let imageUrl = formData.profileImageUrl;
      if (imageFile) {
        imageUrl = await uploadImageToFirebase(imageFile, 'team/profile');
      }

      const dataToSave = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        profileImageUrl: imageUrl || '',
        linkedinUrl: formData.linkedinUrl.trim(),
        shortBio: formData.shortBio.trim(),
        isVisible: !!formData.isVisible,
        sortOrder: parseInt(formData.sortOrder, 10) || 0,
        updatedAt: new Date(),
      };

      if (isEditing) {
        await updateDoc(doc(db, 'team_members', id), dataToSave);
        setSuccessMessage('Team member updated successfully');
      } else {
        await addDoc(collection(db, 'team_members'), {
          ...dataToSave,
          createdAt: new Date(),
        });
        setSuccessMessage('Team member added successfully');
        setFormData({
          name: '',
          role: '',
          profileImageUrl: '',
          linkedinUrl: '',
          shortBio: '',
          isVisible: true,
          sortOrder: 0,
        });
        setImageFile(null);
        setImagePreview('');
      }
    } catch (err) {
      console.error('Error saving team member:', err);
      setErrors({ general: 'Failed to save team member' });
    } finally {
      setSubmitting(false);
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
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a202c' }}>
          {isEditing ? 'Edit Team Member' : 'Add Team Member'}
        </h1>
        <button
          type="button"
          onClick={() => navigate('/admin/team-members')}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            background: 'white',
            color: '#374151',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          ← Back to list
        </button>
      </div>

      {errors.general && (
        <div
          style={{
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            color: '#991B1B',
          }}
        >
          {errors.general}
        </div>
      )}

      {successMessage && (
        <div
          style={{
            background: '#ECFDF3',
            border: '1px solid #BBF7D0',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px',
            color: '#166534',
          }}
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#111827', marginBottom: '6px' }}>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: errors.name ? '1px solid #f87171' : '1px solid #d1d5db',
                fontSize: '14px',
              }}
              placeholder="e.g., Priya Sharma"
            />
            {errors.name && <p style={{ color: '#b91c1c', fontSize: '13px', marginTop: '6px' }}>{errors.name}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#111827', marginBottom: '6px' }}>Role *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: errors.role ? '1px solid #f87171' : '1px solid #d1d5db',
                fontSize: '14px',
              }}
              placeholder="e.g., Software Engineer"
            />
            {errors.role && <p style={{ color: '#b91c1c', fontSize: '13px', marginTop: '6px' }}>{errors.role}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#111827', marginBottom: '6px' }}>Profile Image</label>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px' }}>Square crop (1:1) recommended. This image is optional but improves the section.</p>
            {imagePreview && (
              <div style={{ marginBottom: '10px' }}>
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #e5e7eb' }}
                />
              </div>
            )}
            <ImageUploader
              aspectRatio={1}
              onImageSelected={handleImageSelected}
              onError={(msg) => setErrors((prev) => ({ ...prev, profileImageUrl: msg }))}
            />
            {errors.profileImageUrl && <p style={{ color: '#b91c1c', fontSize: '13px', marginTop: '6px' }}>{errors.profileImageUrl}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#111827', marginBottom: '6px' }}>LinkedIn URL (optional)</label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: errors.linkedinUrl ? '1px solid #f87171' : '1px solid #d1d5db',
                fontSize: '14px',
              }}
              placeholder="https://linkedin.com/in/username"
            />
            {errors.linkedinUrl && <p style={{ color: '#b91c1c', fontSize: '13px', marginTop: '6px' }}>{errors.linkedinUrl}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#111827', marginBottom: '6px' }}>Short bio (optional)</label>
            <textarea
              name="shortBio"
              value={formData.shortBio}
              onChange={handleInputChange}
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                resize: 'vertical',
              }}
              placeholder="2–3 lines about their expertise"
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#111827', fontWeight: 600 }}>
              <input
                type="checkbox"
                name="isVisible"
                checked={formData.isVisible}
                onChange={handleInputChange}
              />
              Show publicly
            </label>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', color: '#111827', marginBottom: '6px' }}>Sort order</label>
              <input
                type="number"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleInputChange}
                style={{
                  width: '140px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '12px 18px',
                background: submitting ? '#9ca3af' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {submitting ? 'Saving...' : 'Save Team Member'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/team-members')}
              style={{
                padding: '12px 18px',
                background: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeamMemberForm;
