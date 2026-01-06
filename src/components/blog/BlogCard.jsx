import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const date = blog.publishDate ? new Date(blog.publishDate.seconds ? blog.publishDate.seconds * 1000 : blog.publishDate).toLocaleDateString() : '';
  return (
    <article style={{ background: 'white', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
      {blog.coverImageUrl && (
        <div style={{ width: '100%', height: 200, overflow: 'hidden' }}>
          <img src={blog.coverImageUrl} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
      )}
      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: '#6b7280' }}>{date}</span>
          {blog.category && (
            <span style={{ fontSize: 12, background: '#eef2ff', color: '#667eea', padding: '4px 10px', borderRadius: 20 }}>{blog.category}</span>
          )}
        </div>

        <h3 style={{ margin: '6px 0 8px', fontSize: 20 }}>{blog.title}</h3>
        <p style={{ color: '#6b7280', marginBottom: 12 }}>{blog.excerpt}</p>
        <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: '#667eea', fontWeight: 600 }}>Read more →</Link>
      </div>
    </article>
  );
};

export default BlogCard;
