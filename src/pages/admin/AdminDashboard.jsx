import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    portfolios: 0,
    clients: 0,
    teamMembers: 0,
    testimonials: 0,
    storyImages: 0,
    videos: 0,
    blogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsSnap = await getDocs(collection(db, 'products'));
        const portfoliosSnap = await getDocs(collection(db, 'portfolios'));
        const clientsSnap = await getDocs(collection(db, 'client_engagements'));
        const teamSnap = await getDocs(collection(db, 'team_members'));
        const testimonialsSnap = await getDocs(collection(db, 'testimonials'));
        const storySnap = await getDocs(collection(db, 'story_images'));
        const videosSnap = await getDocs(collection(db, 'videos'));
        const blogsSnap = await getDocs(collection(db, 'blogs'));

        setStats({
          products: productsSnap.size,
          portfolios: portfoliosSnap.size,
          clients: clientsSnap.size,
          teamMembers: teamSnap.size,
          testimonials: testimonialsSnap.size,
          storyImages: storySnap.size,
          videos: videosSnap.size,
          blogs: blogsSnap.size,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: '📦',
      color: '#667eea',
      link: '/admin/products',
    },
    {
      title: 'Total Portfolios',
      value: stats.portfolios,
      icon: '💼',
      color: '#f59e0b',
      link: '/admin/portfolios',
    },
    {
      title: 'Team Members',
      value: stats.teamMembers,
      icon: '👥',
      color: '#8b5cf6',
      link: '/admin/team-members',
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: '⭐',
      color: '#ec4899',
      link: '/admin/testimonials',
    },
    {
      title: 'Story Images',
      value: stats.storyImages,
      icon: '🖼️',
      color: '#14b8a6',
      link: '/admin/story-images',
    },
    {
      title: 'Total Videos',
      value: stats.videos,
      icon: '🎥',
      color: '#8b5cf6',
      link: '/admin/videos',
    },
    {
      title: 'Total Blogs',
      value: stats.blogs,
      icon: '✍️',
      color: '#06b6d4',
      link: '/admin/blogs',
    },
    {
      title: 'Client Engagements',
      value: stats.clients,
      icon: '🤝',
      color: '#10b981',
      link: '/admin/clients',
    },
  ];

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
      {/* Welcome Section */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
          Welcome to Admin Dashboard
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Manage your website content, products, and portfolios
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {statCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              textDecoration: 'none',
              transition: 'all 0.2s',
              border: '1px solid #e5e7eb',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                  {card.title}
                </p>
                <p style={{ fontSize: '36px', fontWeight: '700', color: '#1a202c' }}>
                  {card.value}
                </p>
              </div>
              <div
                style={{
                  fontSize: '48px',
                  opacity: 0.2,
                }}
              >
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '20px' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            to="/admin/products/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#5568d3')}
            onMouseLeave={(e) => (e.target.style.background = '#667eea')}
          >
            <span>➕</span> Add New Product
          </Link>
          <Link
            to="/admin/portfolios/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#f59e0b',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#d97706')}
            onMouseLeave={(e) => (e.target.style.background = '#f59e0b')}
          >
            <span>➕</span> Add New Portfolio
          </Link>
          <Link
            to="/admin/clients/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#10b981',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#059669')}
            onMouseLeave={(e) => (e.target.style.background = '#10b981')}
          >
            <span>➕</span> Add Client Engagement
          </Link>
          <Link
            to="/admin/team-members/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#8b5cf6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#7c3aed')}
            onMouseLeave={(e) => (e.target.style.background = '#8b5cf6')}
          >
            <span>➕</span> Add New Video
          </Link>
          <Link
            to="/admin/testimonials/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#ec4899',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#db2777')}
            onMouseLeave={(e) => (e.target.style.background = '#ec4899')}
          >
            <span>➕</span> Add Testimonial
          </Link>
          <Link
            to="/admin/blogs/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#06b6d4',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#0891b2')}
            onMouseLeave={(e) => (e.target.style.background = '#06b6d4')}
          >
            <span>➕</span> Add Blog
          </Link>
          <Link
            to="/admin/story-images/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#14b8a6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#0d9488')}
            onMouseLeave={(e) => (e.target.style.background = '#14b8a6')}
          >
            <span>➕</span> Add Story Image
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div
        style={{
          marginTop: '32px',
          background: '#EEF2FF',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #c7d2fe',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#4338ca', marginBottom: '12px' }}>
          💡 Getting Started
        </h3>
        <ul style={{ color: '#6366f1', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Add products to showcase your services</li>
          <li>Create portfolios with project images and details</li>
          <li>Manage team members with profiles and LinkedIn links</li>
          <li>Add client testimonials with ratings and images</li>
          <li>Upload story images for your About page hero section</li>
          <li>Track client engagements and project history</li>
          <li>Upload images up to 5MB (JPG, PNG, WebP)</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
