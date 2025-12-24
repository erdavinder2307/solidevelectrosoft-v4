import React from 'react';

/**
 * Disclaimer
 * Reusable legal-safe, professional disclaimer for Portfolio/Client sections.
 * - Uses small, muted text
 * - Accessible contrast via optional color prop
 * - Appears unobtrusively below relevant content
 */
const Disclaimer = ({ variant = 'portfolio', color, enabled = true, style = {}, className = '' }) => {
  if (!enabled) return null;

  // Default colors tuned for light vs dark contexts
  const defaultColor = color || (variant === 'clients' ? '#6b7280' : '#6b7280');

  const containerStyle = {
    width: '100%',
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle = {
    fontSize: '12px',
    lineHeight: 1.6,
    color: defaultColor,
    textAlign: 'center',
    maxWidth: '820px',
    margin: 0,
  };

  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <p style={textStyle} aria-label={variant === 'clients' ? 'Clients section disclaimer' : 'Portfolio disclaimer'}>
        {`Project details are provided for illustrative purposes only.\nCompany names are mentioned solely to describe past project engagements.\nAll trademarks and brand names belong to their respective owners.`}
      </p>
    </div>
  );
};

export default Disclaimer;
