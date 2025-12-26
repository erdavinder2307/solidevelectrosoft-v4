import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import ProductsList from '../../pages/admin/ProductsList';
import ProductForm from '../../pages/admin/ProductForm';
import PortfoliosList from '../../pages/admin/PortfoliosList';
import PortfolioForm from '../../pages/admin/PortfolioForm';
import ClientEngagements from '../../pages/admin/ClientEngagements';
import ClientEngagementForm from '../../pages/admin/ClientEngagementForm';
import TeamMembersList from '../../pages/admin/TeamMembersList';
import TeamMemberForm from '../../pages/admin/TeamMemberForm';
import StoryImagesList from '../../pages/admin/StoryImagesList';
import StoryImageForm from '../../pages/admin/StoryImageForm';
import TestimonialsList from '../../pages/admin/TestimonialsList';
import TestimonialForm from '../../pages/admin/TestimonialForm';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/products', icon: '📦', label: 'Products' },
    { path: '/admin/portfolios', icon: '💼', label: 'Portfolios' },
    { path: '/admin/team-members', icon: '👥', label: 'Team Members' },
    { path: '/admin/testimonials', icon: '⭐', label: 'Testimonials' },
    { path: '/admin/story-images', icon: '🖼️', label: 'Story Images' },
    { path: '/admin/clients', icon: '🤝', label: 'Client Engagements' },
  ];

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: '#6b7280',
    textDecoration: 'none',
    borderRadius: '8px',
    margin: '4px 0',
    transition: 'all 0.2s',
    fontSize: '14px',
    fontWeight: '500',
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: '#EEF2FF',
    color: '#667eea',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? '260px' : '80px',
          background: 'white',
          borderRight: '1px solid #e5e7eb',
          transition: 'width 0.3s',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          zIndex: 40,
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {sidebarOpen && (
            <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#1a202c' }}>
              Admin CMS
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '20px' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              <span style={{ fontSize: '20px', marginRight: sidebarOpen ? '12px' : '0' }}>
                {item.icon}
              </span>
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        style={{
          marginLeft: sidebarOpen ? '260px' : '80px',
          flex: 1,
          transition: 'margin-left 0.3s',
        }}
      >
        {/* Top Bar */}
        <header
          style={{
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c' }}>
            Content Management
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>
              {currentUser?.email}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                background: '#fee2e2',
                color: '#991b1b',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.background = '#fecaca')}
              onMouseLeave={(e) => (e.target.style.background = '#fee2e2')}
            >
              🚪 Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: '32px' }}>
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductForm />} />
            <Route path="portfolios" element={<PortfoliosList />} />
            <Route path="portfolios/new" element={<PortfolioForm />} />
            <Route path="portfolios/:id" element={<PortfolioForm />} />
            <Route path="team-members" element={<TeamMembersList />} />
            <Route path="team-members/new" element={<TeamMemberForm />} />
            <Route path="team-members/:id" element={<TeamMemberForm />} />
            <Route path="story-images" element={<StoryImagesList />} />
            <Route path="story-images/new" element={<StoryImageForm />} />
            <Route path="story-images/:id" element={<StoryImageForm />} />
            <Route path="testimonials" element={<TestimonialsList />} />
            <Route path="testimonials/new" element={<TestimonialForm />} />
            <Route path="testimonials/:id" element={<TestimonialForm />} />
            <Route path="clients" element={<ClientEngagements />} />
            <Route path="clients/new" element={<ClientEngagementForm />} />
            <Route path="clients/:id" element={<ClientEngagementForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
