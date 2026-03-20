import React from 'react';
import ResultCard from './ResultCard';

const SECTION_ORDER = ['blog', 'product', 'portfolio', 'video', 'team', 'client', 'testimonial', 'page'];
const SECTION_LABELS = {
  blog:        'Blogs',
  product:     'Products',
  portfolio:   'Portfolio',
  video:       'Videos',
  team:        'Team Members',
  client:      'Client Engagements',
  testimonial: 'Testimonials',
  page:        'Pages',
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="sr-skeleton" aria-hidden="true">
      <div className="sk-badge" />
      <div className="sk-title" />
      <div className="sk-line" />
      <div className="sk-line sk-line--short" />
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState({ query }) {
  return (
    <div className="sr-empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
      <p className="sr-empty-title">No results for &ldquo;{query}&rdquo;</p>
      <p className="sr-empty-hint">Try a different keyword or remove filters.</p>
    </div>
  );
}

// ─── Prompt State (no query yet) ─────────────────────────────────────────────

function PromptState() {
  const hints = [
    'Try searching "web development"',
    'Find blogs about AI',
    'Look up "Solidcare" product',
    'Search for portfolio projects',
  ];
  return (
    <div className="sr-prompt">
      <p className="sr-prompt-title">Start typing to search…</p>
      <ul className="sr-hint-list">
        {hints.map((h) => (
          <li key={h} className="sr-hint-item">{h}</li>
        ))}
      </ul>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * SearchResults – renders loading skeletons, empty state, or categorised results.
 */
const SearchResults = ({ query, results, loading, onClose, onClientClick }) => {
  // Loading state
  if (loading) {
    return (
      <div className="sr-container">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // No query typed yet
  if (!query || query.trim().length < 2) {
    return <PromptState />;
  }

  // Searched but no results
  if (results && results.all.length === 0) {
    return <EmptyState query={query} />;
  }

  // Results available
  if (!results) return null;

  const { topResult, byType } = results;

  return (
    <div className="sr-container">
      {/* ── Top Result ─────────────────────────────────── */}
      {topResult && (
        <section className="sr-section">
          <h2 className="sr-section-title">
            <span className="sr-section-icon">⭐</span> Top Result
          </h2>
          <ResultCard
            result={topResult}
            query={query}
            onClose={onClose}
            onClientClick={onClientClick}
            featured
          />
        </section>
      )}

      {/* ── Categorised Results ────────────────────────── */}
      {SECTION_ORDER.map((type) => {
        const items = byType[type];
        if (!items || items.length === 0) return null;

        // Skip top result from its own category section to avoid duplication
        const filtered = topResult && topResult.type === type
          ? items.slice(1)
          : items;

        if (filtered.length === 0) return null;

        return (
          <section key={type} className="sr-section">
            <h2 className="sr-section-title">
              {SECTION_LABELS[type]}
              <span className="sr-count">{filtered.length}</span>
            </h2>
            <div className="sr-list">
              {filtered.map((r) => (
                <ResultCard key={r.id} result={r} query={query} onClose={onClose} onClientClick={onClientClick} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default SearchResults;
