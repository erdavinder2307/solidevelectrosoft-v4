/**
 * FeedCommentModal — LinkedIn/Facebook style
 * Bottom sheet on mobile, centred panel on desktop.
 * Scrollable comments list · sticky compose bar · avatar initials · stagger animations.
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { submitComment, fetchApprovedComments } from '../../services/feedService';

const INITIAL_FORM = { name: '', email: '', comment: '' };

// ─── Avatar helpers ──────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  '#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#ef4444', '#6366f1', '#14b8a6',
];

function avatarColor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[Math.abs(h)];
}

function getInitials(name = '') {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase() || '?';
}

function Avatar({ name, size = 36 }) {
  return (
    <div
      className="fc-avatar"
      style={{ width: size, height: size, background: avatarColor(name), fontSize: Math.round(size * 0.38) }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
function CommentSkeleton() {
  return (
    <div className="fc-comment-skeleton">
      <div className="fc-skeleton-avatar" />
      <div className="fc-skeleton-body">
        <div className="fc-skeleton-line fc-skeleton-line--name" />
        <div className="fc-skeleton-line fc-skeleton-line--text" />
        <div className="fc-skeleton-line fc-skeleton-line--short" />
      </div>
    </div>
  );
}

// ─── Time helper ─────────────────────────────────────────────────────────────
function timeAgo(date) {
  if (!date) return '';
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7)  return `${d}d`;
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Component ───────────────────────────────────────────────────────────────
const FeedCommentModal = ({ post, onClose }) => {
  const feedId = post.feedId || post.id;
  const source = post.source || 'feed';

  const [form, setForm]                         = useState(INITIAL_FORM);
  const [errors, setErrors]                     = useState({});
  const [submitting, setSubmitting]             = useState(false);
  const [submitted, setSubmitted]               = useState(false);
  const [approvedComments, setApprovedComments] = useState([]);
  const [loadingComments, setLoadingComments]   = useState(true);
  const [composeOpen, setComposeOpen]           = useState(false);

  const nameInputRef   = useRef(null);
  const commentsEndRef = useRef(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Load approved comments
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingComments(true);
      const data = await fetchApprovedComments(feedId);
      if (mounted) setApprovedComments(data);
      setLoadingComments(false);
    })();
    return () => { mounted = false; };
  }, [feedId]);

  // Focus name when compose expands
  useEffect(() => {
    if (composeOpen) nameInputRef.current?.focus();
  }, [composeOpen]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleChange = (field) => (ev) => {
    setForm((p) => ({ ...p, [field]: ev.target.value }));
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())         e.name    = 'Please enter your name';
    if (!form.comment.trim())      e.comment = 'Comment cannot be empty';
    if (form.comment.trim().length < 5) e.comment = 'Too short (min. 5 characters)';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await submitComment(feedId, source, form);
      setSubmitted(true);
    } catch (err) {
      console.error('Comment submit error:', err);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fc-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fc-title"
    >
      <div className="fc-panel" role="document">

        {/* ── Header ── */}
        <div className="fc-header">
          <div className="fc-header__left">
            <MessageCircle size={15} className="fc-header__icon" aria-hidden="true" />
            <div style={{ minWidth: 0 }}>
              <h2 id="fc-title" className="fc-header__title">
                {loadingComments
                  ? 'Comments'
                  : approvedComments.length > 0
                    ? `${approvedComments.length} Comment${approvedComments.length !== 1 ? 's' : ''}`
                    : 'Comments'}
              </h2>
              <p className="fc-header__post" title={post.title}>{post.title}</p>
            </div>
          </div>
          <button className="fc-close" onClick={onClose} aria-label="Close comments">
            <X size={15} />
          </button>
        </div>

        {/* ── Scrollable comments body ── */}
        <div className="fc-body">
          {loadingComments ? (
            <div className="fc-comments-list">
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </div>
          ) : approvedComments.length === 0 ? (
            <div className="fc-empty">
              <div className="fc-empty__icon" aria-hidden="true">💬</div>
              <p className="fc-empty__title">No comments yet</p>
              <p className="fc-empty__sub">Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="fc-comments-list">
              {approvedComments.map((c, i) => (
                <div
                  key={c.id}
                  className="fc-comment"
                  style={{ animationDelay: `${i * 0.055}s` }}
                >
                  <Avatar name={c.name} size={34} />
                  <div className="fc-comment__body">
                    <div className="fc-comment__bubble">
                      <div className="fc-comment__meta">
                        <span className="fc-comment__name">{c.name}</span>
                        <span className="fc-comment__time">{timeAgo(c.createdDate)}</span>
                      </div>
                      <p className="fc-comment__text">{c.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={commentsEndRef} />
            </div>
          )}
        </div>

        {/* ── Sticky compose area ── */}
        <div className="fc-compose">
          {submitted ? (
            <div className="fc-success">
              <CheckCircle size={18} color="#10b981" aria-hidden="true" />
              <div>
                <strong>Comment submitted!</strong>
                <p>It'll appear here once approved.</p>
              </div>
            </div>
          ) : !composeOpen ? (
            <button
              className="fc-compose-prompt"
              onClick={() => setComposeOpen(true)}
              aria-label="Add a comment"
            >
              <div className="fc-compose-prompt__avatar" aria-hidden="true">+</div>
              <span className="fc-compose-prompt__text">Add a comment…</span>
            </button>
          ) : (
            <form className="fc-compose-form" onSubmit={handleSubmit} noValidate>
              <div className="fc-compose-form__fields">
                <div className="fc-compose-form__row">
                  <input
                    ref={nameInputRef}
                    type="text"
                    className={`fc-input${errors.name ? ' fc-input--error' : ''}`}
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Your name *"
                    maxLength={100}
                    autoComplete="name"
                  />
                  <input
                    type="email"
                    className="fc-input"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="Email (optional)"
                    maxLength={200}
                    autoComplete="email"
                  />
                </div>
                {errors.name && <span className="fc-error">{errors.name}</span>}
                <textarea
                  className={`fc-textarea${errors.comment ? ' fc-textarea--error' : ''}`}
                  value={form.comment}
                  onChange={handleChange('comment')}
                  placeholder="Share your thoughts…"
                  maxLength={2000}
                  rows={3}
                />
                {errors.comment && <span className="fc-error">{errors.comment}</span>}
                {errors.submit  && <span className="fc-error">{errors.submit}</span>}
              </div>
              <div className="fc-compose-form__actions">
                <button
                  type="button"
                  className="fc-btn-cancel"
                  onClick={() => { setComposeOpen(false); setForm(INITIAL_FORM); setErrors({}); }}
                >
                  Cancel
                </button>
                <button type="submit" className="fc-btn-post" disabled={submitting}>
                  {submitting ? <span className="feed-spinner" /> : <Send size={13} aria-hidden="true" />}
                  {submitting ? 'Posting…' : 'Post'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default FeedCommentModal;

