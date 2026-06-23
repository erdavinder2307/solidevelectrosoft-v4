/**
 * Admin: Content Hub — Posts List
 * Lists all FeedPosts across all types. Supports search, filter by type.
 */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  fetchAllFeedPostsAdmin,
  deleteFeedPost,
} from '../../services/feedService';

const POST_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'blog_article',    label: 'Blog Article' },
  { value: 'product_update',  label: 'Product Update' },
  { value: 'feature_release', label: 'Feature Release' },
  { value: 'company_update',  label: 'Company Update' },
  { value: 'founder_insight', label: 'Founder Insight' },
  { value: 'milestone',       label: 'Milestone' },
];

const TYPE_LABELS = Object.fromEntries(POST_TYPES.slice(1).map((t) => [t.value, t.label]));

const s = {
  container: { padding: '0 0 60px' },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  heading: { fontSize: 26, fontWeight: 700, color: '#1a202c', margin: 0 },
  controls: { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' },
  input: {
    padding: '8px 14px',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    fontSize: 14,
    minWidth: 200,
    fontFamily: 'inherit',
  },
  select: {
    padding: '8px 14px',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'inherit',
    background: '#fff',
  },
  newBtn: {
    padding: '9px 20px',
    background: '#667eea',
    color: '#fff',
    borderRadius: 8,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #e5e7eb',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 600,
    color: '#6b7280',
    borderBottom: '1px solid #e5e7eb',
    background: '#f9fafb',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #f3f4f6',
    fontSize: 14,
    color: '#374151',
    verticalAlign: 'top',
  },
  typeBadge: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 100,
    fontSize: 11,
    fontWeight: 600,
    background: '#eff6ff',
    color: '#1d4ed8',
  },
  statusBadge: (published) => ({
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 100,
    fontSize: 11,
    fontWeight: 600,
    background: published ? '#f0fdf4' : '#f9fafb',
    color: published ? '#15803d' : '#6b7280',
  }),
  actionLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 500,
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#ef4444',
    fontSize: 13,
    fontWeight: 500,
    padding: 0,
  },
};

const ContentHubList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllFeedPostsAdmin();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteFeedPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('Delete failed. Please try again.');
    }
  };

  const filtered = posts.filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || p.type === typeFilter;
    return matchSearch && matchType;
  });

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div style={s.container}>
      {/* Toolbar */}
      <div style={s.toolbar}>
        <h1 style={s.heading}>Content Hub</h1>
        <div style={s.controls}>
          <input
            type="text"
            style={s.input}
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search posts"
          />
          <select
            style={s.select}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter by type"
          >
            {POST_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <Link to="/admin/content-hub/new" style={s.newBtn}>
            + New Post
          </Link>
        </div>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', background: '#fef2f2', color: '#dc2626', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: '#6b7280', padding: '40px 0', textAlign: 'center' }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
          <p style={{ fontSize: 16, fontWeight: 600 }}>No posts found</p>
          <p style={{ fontSize: 14, marginTop: 4 }}>
            {search || typeFilter ? 'Try adjusting your filters.' : 'Create your first post to get started.'}
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table} aria-label="Content Hub posts">
            <thead>
              <tr>
                <th style={s.th}>Title</th>
                <th style={s.th}>Type</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Published</th>
                <th style={{ ...s.th, textAlign: 'center' }}>Likes</th>
                <th style={{ ...s.th, textAlign: 'center' }}>Comments</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} style={{ transition: 'background 0.15s' }}>
                  <td style={{ ...s.td, maxWidth: 280 }}>
                    <div style={{ fontWeight: 600, color: '#1a202c', marginBottom: 2 }}>
                      {post.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>/{post.slug}</div>
                  </td>
                  <td style={s.td}>
                    <span style={s.typeBadge}>{TYPE_LABELS[post.type] || post.type}</span>
                  </td>
                  <td style={s.td}>
                    <span style={s.statusBadge(post.isPublished)}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={s.td}>{formatDate(post.publishedDate)}</td>
                  <td style={{ ...s.td, textAlign: 'center' }}>{post.likeCount || 0}</td>
                  <td style={{ ...s.td, textAlign: 'center' }}>{post.commentCount || 0}</td>
                  <td style={s.td}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <Link to={`/admin/content-hub/${post.id}/edit`} style={s.actionLink}>
                        Edit
                      </Link>
                      <Link to={`/admin/content-hub/${post.id}/comments`} style={s.actionLink}>
                        Comments
                      </Link>
                      <button
                        style={s.deleteBtn}
                        onClick={() => handleDelete(post.id, post.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 12 }}>
        {filtered.length} post{filtered.length !== 1 ? 's' : ''}
        {(search || typeFilter) ? ' (filtered)' : ''}
      </p>
    </div>
  );
};

export default ContentHubList;
