/**
 * Admin: All Feed Comments
 * Shows every comment from the feedComments collection — both blog-sourced
 * and Content Hub post-sourced — so admins can approve/reject/delete them
 * from a single place.
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchAllCommentsAdmin,
  updateCommentStatus,
  deleteComment,
} from '../../services/feedService';

const STATUS_BADGE = {
  pending:  { background: '#fffbeb', color: '#b45309', label: 'Pending' },
  approved: { background: '#f0fdf4', color: '#15803d', label: 'Approved' },
  rejected: { background: '#fef2f2', color: '#dc2626', label: 'Rejected' },
};

const th = {
  padding: '11px 14px',
  textAlign: 'left',
  fontSize: 11.5,
  fontWeight: 700,
  color: '#6b7280',
  borderBottom: '1px solid #e5e7eb',
  background: '#f9fafb',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const td = {
  padding: '13px 14px',
  borderBottom: '1px solid #f3f4f6',
  fontSize: 13.5,
  color: '#374151',
  verticalAlign: 'top',
};

const FeedCommentsList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [filter, setFilter]     = useState('');   // '' = all, 'pending', 'approved', 'rejected'
  const [search, setSearch]     = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchAllCommentsAdmin();
        setComments(data);
      } catch {
        setError('Failed to load comments.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleStatus = async (commentId, status) => {
    try {
      await updateCommentStatus(commentId, status);
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, status } : c))
      );
    } catch {
      alert('Update failed. Please try again.');
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment permanently?')) return;
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch {
      alert('Delete failed. Please try again.');
    }
  };

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const sourceLabel = (postId = '') => {
    if (postId.startsWith('blog_')) return { label: 'Blog', color: '#7c3aed' };
    return { label: 'Content Hub', color: '#0369a1' };
  };

  const filtered = comments.filter((c) => {
    if (filter && c.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.name?.toLowerCase().includes(q) ||
        c.comment?.toLowerCase().includes(q) ||
        c.postId?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    pending:  comments.filter((c) => c.status === 'pending').length,
    approved: comments.filter((c) => c.status === 'approved').length,
    rejected: comments.filter((c) => c.status === 'rejected').length,
  };

  return (
    <div style={{ padding: '32px', maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: 0 }}>
            Feed Comments
          </h1>
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>
            Approve or reject comments from the Insights &amp; Updates feed (blog posts + Content Hub).
          </p>
        </div>
        <Link
          to="/admin/content-hub"
          style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none' }}
        >
          ← Content Hub
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {[
          { key: '', label: 'All', count: comments.length, color: '#374151' },
          { key: 'pending',  label: 'Pending',  count: counts.pending,  color: '#b45309' },
          { key: 'approved', label: 'Approved', count: counts.approved, color: '#15803d' },
          { key: 'rejected', label: 'Rejected', count: counts.rejected, color: '#dc2626' },
        ].map(({ key, label, count, color }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: `1.5px solid ${filter === key ? color : '#e5e7eb'}`,
              background: filter === key ? '#f9fafb' : 'white',
              color,
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {label} ({count})
          </button>
        ))}
        <input
          type="search"
          placeholder="Search name, comment, post…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginLeft: 'auto',
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            fontSize: 13,
            width: 220,
            outline: 'none',
          }}
        />
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading comments…</p>
      ) : error ? (
        <p style={{ color: '#dc2626' }}>{error}</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No comments found.</p>
      ) : (
        <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid #e5e7eb' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>Source</th>
                <th style={th}>Name</th>
                <th style={th}>Comment</th>
                <th style={th}>Status</th>
                <th style={th}>Date</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const src = sourceLabel(c.postId);
                const badge = STATUS_BADGE[c.status] || STATUS_BADGE.pending;
                return (
                  <tr key={c.id}>
                    <td style={td}>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 700,
                        background: src.color + '18',
                        color: src.color,
                      }}>
                        {src.label}
                      </span>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3, fontFamily: 'monospace' }}>
                        {c.postId}
                      </div>
                    </td>
                    <td style={td}>
                      <strong>{c.name || '—'}</strong>
                      {c.email && (
                        <div style={{ fontSize: 12, color: '#6b7280' }}>{c.email}</div>
                      )}
                    </td>
                    <td style={{ ...td, maxWidth: 340 }}>
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {c.comment}
                      </span>
                    </td>
                    <td style={td}>
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 600,
                        background: badge.background,
                        color: badge.color,
                      }}>
                        {badge.label}
                      </span>
                    </td>
                    <td style={{ ...td, whiteSpace: 'nowrap', fontSize: 12, color: '#6b7280' }}>
                      {formatDate(c.createdDate)}
                    </td>
                    <td style={{ ...td, whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {c.status !== 'approved' && (
                          <button
                            onClick={() => handleStatus(c.id, 'approved')}
                            style={{ padding: '5px 10px', fontSize: 12, borderRadius: 6, border: 'none', background: '#dcfce7', color: '#15803d', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Approve
                          </button>
                        )}
                        {c.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatus(c.id, 'rejected')}
                            style={{ padding: '5px 10px', fontSize: 12, borderRadius: 6, border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(c.id)}
                          style={{ padding: '5px 10px', fontSize: 12, borderRadius: 6, border: 'none', background: '#f3f4f6', color: '#6b7280', cursor: 'pointer' }}
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

export default FeedCommentsList;
