import React from 'react';

const TYPE_OPTIONS = [
  { value: 'blog',        label: 'Blogs' },
  { value: 'product',     label: 'Products' },
  { value: 'portfolio',   label: 'Portfolio' },
  { value: 'video',       label: 'Videos' },
  { value: 'team',        label: 'Team' },
  { value: 'client',      label: 'Clients' },
  { value: 'testimonial', label: 'Testimonials' },
  { value: 'page',        label: 'Pages' },
];

/**
 * FiltersSidebar – left sidebar shown inside the search modal.
 * Lets users filter by content type, tag, and date range.
 */
const FiltersSidebar = ({ filters, onChange, availableTags = [] }) => {
  const { types = [], tags = [], dateFrom = '', dateTo = '' } = filters;

  const toggleType = (value) => {
    const next = types.includes(value)
      ? types.filter((t) => t !== value)
      : [...types, value];
    onChange({ ...filters, types: next });
  };

  const toggleTag = (tag) => {
    const next = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];
    onChange({ ...filters, tags: next });
  };

  const clearAll = () =>
    onChange({ types: [], tags: [], dateFrom: '', dateTo: '' });

  const hasActiveFilters =
    types.length > 0 || tags.length > 0 || dateFrom || dateTo;

  return (
    <aside className="fs-sidebar">
      <div className="fs-header">
        <span className="fs-title">Filters</span>
        {hasActiveFilters && (
          <button type="button" className="fs-clear-btn" onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      {/* ── Content Type ─────────────────────────────────── */}
      <div className="fs-section">
        <p className="fs-section-label">Type</p>
        <div className="fs-options">
          {TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`fs-chip${types.includes(opt.value) ? ' fs-chip--active' : ''}`}
              onClick={() => toggleType(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tags ─────────────────────────────────────────── */}
      {availableTags.length > 0 && (
        <div className="fs-section">
          <p className="fs-section-label">Tags</p>
          <div className="fs-options fs-options--wrap">
            {availableTags.slice(0, 20).map((tag) => (
              <button
                key={tag}
                type="button"
                className={`fs-chip fs-chip--sm${tags.includes(tag) ? ' fs-chip--active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Date Range ───────────────────────────────────── */}
      <div className="fs-section">
        <p className="fs-section-label">Date</p>
        <div className="fs-date-group">
          <label className="fs-date-label">
            From
            <input
              type="date"
              className="fs-date-input"
              value={dateFrom}
              onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
            />
          </label>
          <label className="fs-date-label">
            To
            <input
              type="date"
              className="fs-date-input"
              value={dateTo}
              onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
            />
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
