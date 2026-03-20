import React, { useRef, useEffect } from 'react';

/**
 * SearchInput – the text field shown inside the search modal.
 */
const SearchInput = ({ value, onChange, onClear, isLoading }) => {
  const inputRef = useRef(null);

  // Auto-focus when rendered
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="si-wrapper">
      {/* Search icon */}
      <span className="si-icon" aria-hidden="true">
        {isLoading ? (
          <svg className="si-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        )}
      </span>

      <input
        ref={inputRef}
        type="search"
        className="si-input"
        placeholder="Search blogs, products, portfolio, pages…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck="false"
        aria-label="Global search"
      />

      {/* Keyboard hint (only when empty) */}
      {!value && (
        <kbd className="si-kbd">ESC</kbd>
      )}

      {/* Clear button */}
      {value && (
        <button
          type="button"
          className="si-clear"
          onClick={onClear}
          aria-label="Clear search"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
