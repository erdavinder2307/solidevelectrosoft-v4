import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, updateDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebase';

const TestimonialsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');
      const q = query(collection(db, 'testimonials'), orderBy('displayOrder', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(data);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (id, current) => {
    try {
      setUpdating(id);
      await updateDoc(doc(db, 'testimonials', id), { isPublished: !current, updatedAt: new Date() });
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, isPublished: !current } : t)));
    } catch (err) {
      console.error('Publish toggle failed:', err);
      setError('Failed to update publish state');
    } finally { setUpdating(null); }
  };

  const toggleFeatured = async (id, current) => {
    try {
      setUpdating(id);
      await updateDoc(doc(db, 'testimonials', id), { isFeatured: !current, updatedAt: new Date() });
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, isFeatured: !current } : t)));
    } catch (err) {
      console.error('Featured toggle failed:', err);
      setError('Failed to update featured state');
    } finally { setUpdating(null); }
  };

  const softDelete = async (id) => {
    if (!window.confirm('Soft delete this testimonial?')) return;
    try {
      setUpdating(id);
      await updateDoc(doc(db, 'testimonials', id), { isDeleted: true, isPublished: false, updatedAt: new Date() });
      setItems((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Soft delete failed:', err);
      setError('Failed to delete testimonial');
    } finally { setUpdating(null); }
  };

  const handleSortChange = async (id, value) => {
    const order = parseInt(value, 10) || 0;
    try {
      setUpdating(id);
      await updateDoc(doc(db, 'testimonials', id), { displayOrder: order, updatedAt: new Date() });
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, displayOrder: order } : t)));
    } catch (err) {
      console.error('Sort update failed:', err);
      setError('Failed to update order');
    } finally { setUpdating(null); }
  };

  const onDragStart = (e, position) => { dragItem.current = position; };
  const onDragEnter = (e, position) => { dragOverItem.current = position; };
  const onDragEnd = async () => {
    const listCopy = [...items];
    const dragItemContent = listCopy[dragItem.current];
    listCopy.splice(dragItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, dragItemContent);
    setItems(listCopy.map((t, idx) => ({ ...t, displayOrder: idx })));
    // persist batch
    try {
      const batch = writeBatch(db);
      listCopy.forEach((t, idx) => {
        batch.update(doc(db, 'testimonials', t.id), { displayOrder: idx, updatedAt: new Date() });
      });
      await batch.commit();
    } catch (err) {
      console.error('Reorder failed:', err);
      setError('Failed to save new order');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ display: 'inline-block', width: 48, height: 48, border: '4px solid #f3f4f6', borderTopColor: '#667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a202c' }}>Testimonials</h1>
        <Link to="/admin/testimonials/new" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#667eea', color: 'white', textDecoration: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500 }}>➕ Add Testimonial</Link>
      </div>

      {error && (
        <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '12px 16px', marginBottom: 16, color: '#991B1B' }}>{error}</div>
      )}

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', background: 'white', borderRadius: 12, border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 16 }}>No testimonials yet. Add your first entry.</p>
          <Link to="/admin/testimonials/new" style={{ display: 'inline-block', padding: '10px 18px', background: '#667eea', color: 'white', textDecoration: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500 }}>Add Testimonial</Link>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>Client</th>
                <th style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>Role/Company</th>
                <th style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>Rating</th>
                <th style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>Published</th>
                <th style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>Featured</th>
                <th style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>Order</th>
                <th style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t, index) => (
                <tr key={t.id} style={{ borderTop: '1px solid #e5e7eb' }} draggable onDragStart={(e) => onDragStart(e, index)} onDragEnter={(e) => onDragEnter(e, index)} onDragEnd={onDragEnd}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {t.clientImageUrl ? (
                        <img src={t.clientImageUrl} alt={t.clientName} loading="lazy" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#4b5563' }}>
                          {(t.clientInitials || (t.clientName || '').split(' ').map(p => p[0]).join('').slice(0,2)).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div>{t.clientName}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{t.source || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#374151' }}>
                    {[t.clientRole, [t.clientCompany, t.country].filter(Boolean).join(', ')].filter(Boolean).join(' • ')}
                  </td>
                  <td style={{ padding: '12px 16px' }}>{t.rating ?? 5}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <input type="checkbox" checked={!!t.isPublished} onChange={() => togglePublished(t.id, t.isPublished)} disabled={updating===t.id} />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <input type="checkbox" checked={!!t.isFeatured} onChange={() => toggleFeatured(t.id, t.isFeatured)} disabled={updating===t.id} />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <input type="number" defaultValue={t.displayOrder || 0} onBlur={(e) => handleSortChange(t.id, e.target.value)} style={{ width: 90, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }} />
                  </td>
                  <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                    <Link to={`/admin/testimonials/${t.id}`} style={{ padding: '8px 12px', borderRadius: 8, background: '#f3f4f6', color: '#111827', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>Edit</Link>
                    <button type="button" onClick={() => softDelete(t.id)} disabled={updating===t.id} style={{ padding: '8px 12px', borderRadius: 8, background: '#FEE2E2', color: '#991B1B', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default TestimonialsList;
