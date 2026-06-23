/**
 * Admin: Content Hub — Comment Moderation
 * View, approve, reject, and delete comments for a specific post.
 */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  fetchAllCommentsAdmin,
  updateCommentStatus,
  deleteComment,
  getFeedPostById,
} from '../../services/feedService';

const STATUS_BADGE = {
  pending:  { background: '#fffbeb', color: '#b45309', label: 'Pending' },
  approved: { background: '#f0fdf4', color: '#15803d', label: 'Approved' },
  rejected: { background: '#fef2f2', color: '#dc2626', label: 'Rejected' },
};

const s = {
  th: {
    padding: '11px 14px',
    textAlign: 'left',
    fontSize: 11.5,
    fontWeight: 700,
    color: '#6b7280',
    borderBottom: '1px solid #e5e7eb',
    background: '#f9fafb',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  td: {
    padding: '13px 14px',
    borderBottom: '1px solid #f3f4f6',
    fontSize: 13.5,
    color: '#374151',
    verticalAlign: 'top',
  },
};

const ContentHubComments = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [postData, commentData] = await Promise.all([
          getFeedPostById(postId),
          fetchAllCommentsAdmin(postId),
        ]);
        setPost(postData);
        setComments(commentData);
      } catch {
        setError('Failed to load comments.');
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  const handleStatus = async (commentId, status) => {
    try {
      await updateCommentStatus(commentId, status);
      setComments((prev) => prev.map((c) => c.id === commentId ? { ...c, status } : c));
    } catch {
      alert('Update failed.');
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment permanently?')) return;
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch {
      alert('Delete failed.');
    }
  };

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const filtered = filter ? comments.filter((c) => c.status === filter) : comments;

  if (loading) return <p style={{ padding: 40, color: '#6b7280' }}>Loading…</p>;

  return (
    <div style={{ paddingBottom: 60 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
        <Link to="/admin/content-hub" style={{ color: '#667eea', fontSize: 14, textDecoration: 'none' }}>
          ← Content Hub
        </Link>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a202c', marginBottom: 4 }}>
        Comments
      </h1>
      {post && (
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>
          For: <strong>{post.title}</strong>
        </p>
      )}

      {error && (
        <div style={{ padding: '10px 14px', background: '#fef2f2', color: '#dc2626', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
          {error}
        </div>
      )}

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['', 'pending', 'approved', 'rejected'].map((val) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            style={{
              padding: '6px 14px',
              borderRadius: 100,
              border: '1.5px solid',
              borderColor: filter === val ? '#667eea' : '#e5e7eb',
              background: filter === val ? '#EEF2FF' : '#fff',
              color: filter === val ? '#667eea' : '#6b7280',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {val ? val.charAt(0).toUpperCase() + val.slice(1) : 'All'} ({(val ? comments.filter((c) => c.status === val) : comments).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: '#9ca3af', textAlign: 'center', padding: '40px 0' }}>
          No comments in this view.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            <thead>
              <tr>
                <th style={s.th}>Author</th>
                <th style={s.th}>Comment</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Date</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const badge = STATUS_BADGE[c.status] || STATUS_BADGE.pending;
                return (
                  <tr key={c.id}>
                    <td style={{ ...s.td, whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      {c.email && <div style={{ fontSize: 12, color: '#9ca3af' }}>{c.email}</div>}
                    </td>
                    <td style={{ ...s.td, maxWidth: 340 }}>
                      <p style={{ margin: 0, lineHeight: 1.55 }}>{c.comment}</p>
                    </td>
                    <td style={s.td}>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 10px',
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 600,
                        background: badge.background,
                        color: badge.color,
                      }}>
                        {badge.label}
                      </span>
                    </td>
                    <td style={{ ...s.td, whiteSpace: 'nowrap', fontSize: 12, color: '#9ca3af' }}>
                      {formatDate(c.createdDate)}
                    </td>
                    <td style={s.td}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {c.status !== 'approved' && (
                          <button
                            onClick={() => handleStatus(c.id, 'approved')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#15803d', fontSize: 13, fontWeight: 600, textAlign: 'left', padding: 0 }}
                          >
                            Approve
                          </button>
                        )}
                        {c.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatus(c.id, 'rejected')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b45309', fontSize: 13, fontWeight: 500, textAlign: 'left', padding: 0 }}
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(c.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 13, fontWeight: 500, textAlign: 'left', padding: 0 }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContentHubComments;
