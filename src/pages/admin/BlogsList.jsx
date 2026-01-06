import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as blogsService from '../../services/blogsService';

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await blogsService.fetchAllBlogsAdmin();
      setBlogs(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog? This will soft-delete and unpublish it.')) {
      try {
        await blogsService.softDeleteBlog(id);
        setBlogs(blogs.filter((b) => b.id !== id));
      } catch (err) {
        console.error(err);
        setError('Failed to delete blog');
      }
    }
  };

  const filtered = blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return (b.publishDate?.seconds || b.publishDate || 0) - (a.publishDate?.seconds || a.publishDate || 0);
      case 'oldest':
        return (a.publishDate?.seconds || a.publishDate || 0) - (b.publishDate?.seconds || b.publishDate || 0);
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  if (loading) return <div style={{ padding: 40 }}>Loading blogs…</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Blogs</h1>
        <Link to="/admin/blogs/new" style={{ padding: '12px 18px', background: '#667eea', color: 'white', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>➕ Add Blog</Link>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title" style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', flex: 1 }} />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
        </select>
      </div>

      {error && <div style={{ background: '#fee2e2', padding: 12, borderRadius: 8, color: '#991b1b' }}>{error}</div>}

      {sorted.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', background: 'white', borderRadius: 12 }}>No blogs found.</div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {sorted.map((b) => (
            <div key={b.id} style={{ background: 'white', borderRadius: 12, padding: 16, border: '1px solid #e5e7eb', display: 'flex', gap: 16, alignItems: 'center' }}>
              {b.coverImageUrl && <img src={b.coverImageUrl} alt={b.title} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }} />}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{b.title}</h3>
                <div style={{ color: '#6b7280', marginTop: 6 }}>{b.excerpt}</div>
                <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{b.category}</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{b.status}</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{b.publishDate ? new Date(b.publishDate.seconds ? b.publishDate.seconds * 1000 : b.publishDate).toLocaleDateString() : ''}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => navigate(`/admin/blogs/${b.id}`)} style={{ padding: '8px 12px', background: '#667eea', color: 'white', borderRadius: 8, border: 'none' }}>Edit</button>
                <button onClick={() => handleDelete(b.id)} style={{ padding: '8px 12px', background: '#ef4444', color: 'white', borderRadius: 8, border: 'none' }}>Delete</button>
                <a href={`/blog/${b.slug}`} target="_blank" rel="noreferrer" style={{ padding: '8px 12px', background: '#f3f4f6', color: '#374151', borderRadius: 8, textDecoration: 'none' }}>Preview</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsList;
