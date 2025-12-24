import React from 'react';

/**
 * ProjectLogo
 * Reusable logo renderer for portfolio projects.
 * - If `logoUrl` exists: renders the image inside a 1:1 square
 * - Else: renders a name-based fallback "logo" with intentional styling
 */
const ProjectLogo = ({ name = 'Project', logoUrl = null, style = {}, className = '' }) => {
  const containerStyle = {
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: '16px',
    border: '1px solid #e5e7eb',
    background: logoUrl
      ? '#f9fafb'
      : 'linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(102, 126, 234, 0.08)',
    ...style,
  };

  if (logoUrl) {
    return (
      <div className={className} style={containerStyle} aria-label={`Project logo: ${name}`}>
        <img
          src={logoUrl}
          alt={`${name} logo`}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
        />
      </div>
    );
  }

  const initials = (name || 'Project')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  const showInitials = (name || '').trim().split(/\s+/).length >= 2;

  return (
    <div
      className={className}
      style={containerStyle}
      aria-label={`Project logo: ${name}`}
      title={name}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#111827',
          padding: '12px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 'clamp(18px, 4.5vw, 22px)',
            lineHeight: 1.25,
            letterSpacing: '0.01em',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflow: 'hidden',
            maxHeight: '2.6em',
          }}
        >
          {name}
        </div>
        {showInitials && (
          <div
            aria-hidden
            style={{
              fontWeight: 600,
              fontSize: 'clamp(12px, 3.5vw, 14px)',
              color: '#6b7280',
              opacity: 0.65,
              letterSpacing: '0.06em',
            }}
          >
            {initials}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectLogo;
