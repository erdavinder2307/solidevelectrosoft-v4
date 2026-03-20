import React from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_META = {
  blog:        { label: 'Blog',        colorClass: 'rc-badge--blog' },
  product:     { label: 'Product',     colorClass: 'rc-badge--product' },
  portfolio:   { label: 'Portfolio',   colorClass: 'rc-badge--portfolio' },
  page:        { label: 'Page',        colorClass: 'rc-badge--page' },
  video:       { label: 'Video',       colorClass: 'rc-badge--video' },
  team:        { label: 'Team',        colorClass: 'rc-badge--team' },
  client:      { label: 'Client',      colorClass: 'rc-badge--client' },
  testimonial: { label: 'Testimonial', colorClass: 'rc-badge--testimonial' },
};

/**
 * Wraps matched query tokens inside <mark> elements.
 * @param {string} text
 * @param {string} query
 * @returns {React.ReactNode[]}
 */
function highlightText(text = '', query = '') {
  if (!query || !text) return [text];
  const tokens = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length); // longest first to avoid double-highlight

  const escapedPattern = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  if (!escapedPattern) return [text];

  const regex = new RegExp(`(${escapedPattern})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="rc-highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

/** Truncate a string to `max` characters, preferring word boundaries. */
function truncate(str = '', max = 130) {
  if (str.length <= max) return str;
  const cut = str.lastIndexOf(' ', max);
  return str.slice(0, cut > 0 ? cut : max) + '…';
}

function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return null;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ResultCard – a single search result item.
 *
 * @param {{ result: SearchResult, query: string, onClose: () => void, featured?: boolean }} props
 */
const ResultCard = ({ result, query, onClose, onClientClick, featured = false }) => {
  const navigate = useNavigate();
  const meta = TYPE_META[result.type] || { label: result.type, colorClass: '' };
  const formattedDate = formatDate(result.date);

  const handleClick = () => {
    if (result.type === 'client' && onClientClick && result._raw) {
      onClientClick(result._raw);
      return;
    }
    navigate(result.url);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  };

  return (
    <article
      className={`rc-card${featured ? ' rc-card--featured' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${meta.label}: ${result.title}`}
    >
      {/* Type badge */}
      <span className={`rc-badge ${meta.colorClass}`}>{meta.label}</span>

      <div className="rc-body">
        {/* Title with highlights */}
        <h3 className="rc-title">
          {highlightText(result.title, query)}
        </h3>

        {/* Description snippet with highlights */}
        {result.description && (
          <p className="rc-desc">
            {highlightText(truncate(result.description), query)}
          </p>
        )}

        {/* Footer: tags + date */}
        <div className="rc-footer">
          {(result.tags || []).slice(0, 4).map((tag) => (
            <span key={tag} className="rc-tag">
              {tag}
            </span>
          ))}
          {formattedDate && (
            <time className="rc-date" dateTime={result.date}>
              {formattedDate}
            </time>
          )}
        </div>
      </div>

      {/* Arrow indicator */}
      <svg className="rc-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </article>
  );
};

export default ResultCard;
