import React, { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearch } from '../../contexts/SearchContext';
import SearchInput from './SearchInput';
import FiltersSidebar from './FiltersSidebar';
import SearchResults from './SearchResults';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.14 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.16 } },
};

/**
 * SearchModal – full-screen overlay search experience.
 * Controlled entirely by <SearchContext>.
 */
const SearchModal = () => {
  const {
    isOpen,
    closeSearch,
    query,
    setQuery,
    filters,
    setFilters,
    results,
    loading,
    error,
    resetSearch,
  } = useSearch();

  const overlayRef = useRef(null);

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) closeSearch();
  };

  // Gather available tags from current results for the sidebar
  const availableTags = results?.allTags || [];

  const handleClear = () => {
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="sm-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
          aria-label="Global search"
        >
          <motion.div
            className="sm-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Search Input ─────────────────────────── */}
            <div className="sm-input-row">
              <SearchInput
                value={query}
                onChange={setQuery}
                onClear={handleClear}
                isLoading={loading}
              />
              <button
                type="button"
                className="sm-close-btn"
                onClick={closeSearch}
                aria-label="Close search"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Error Banner ─────────────────────────── */}
            {error && (
              <div className="sm-error" role="alert">
                {error}
              </div>
            )}

            {/* ── Body: Filters + Results ──────────────── */}
            <div className="sm-body">
              <FiltersSidebar
                filters={filters}
                onChange={setFilters}
                availableTags={availableTags}
              />
              <div className="sm-results-pane">
                <SearchResults
                  query={query}
                  results={results}
                  loading={loading}
                  onClose={closeSearch}
                />
              </div>
            </div>

            {/* ── Footer hints ─────────────────────────── */}
            <div className="sm-footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> Open</span>
              <span><kbd>ESC</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
