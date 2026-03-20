import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { search as runSearch } from '../services/searchService';

const SearchContext = createContext(null);

const DEBOUNCE_MS = 300;

export function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ types: [], tags: [], dateFrom: '', dateTo: '' });

  const [results, setResults] = useState(null);   // null = not yet searched
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);

  // ── Keyboard shortcut ────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Prevent body scroll when modal open ──────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ── Debounced search ─────────────────────────────────────────────────────
  const executeSearch = useCallback(
    (q, f) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (!q || q.trim().length < 2) {
        setResults(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      debounceRef.current = setTimeout(async () => {
        try {
          const data = await runSearch(q, f);
          setResults(data);
        } catch (err) {
          console.error('[SearchContext] search error:', err);
          setError('Search failed. Please try again.');
          setResults({ all: [], topResult: null, byType: {}, allTags: [] });
        } finally {
          setLoading(false);
        }
      }, DEBOUNCE_MS);
    },
    []
  );

  // Re-run search whenever query or filters change
  useEffect(() => {
    executeSearch(query, filters);
  }, [query, filters, executeSearch]);

  // ── Persist query in sessionStorage so back-nav restores state ───────────
  const openWithQuery = useCallback((q = '') => {
    setQuery(q);
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    // Preserve query for potential re-open; don't clear it.
  }, []);

  const resetSearch = useCallback(() => {
    setQuery('');
    setFilters({ types: [], tags: [], dateFrom: '', dateTo: '' });
    setResults(null);
  }, []);

  const value = {
    isOpen,
    setIsOpen,
    openSearch: () => setIsOpen(true),
    closeSearch,
    openWithQuery,
    resetSearch,
    query,
    setQuery,
    filters,
    setFilters,
    results,
    loading,
    error,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used inside <SearchProvider>');
  return ctx;
}
