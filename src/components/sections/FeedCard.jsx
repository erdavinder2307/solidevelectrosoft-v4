/**
 * FeedItem
 * Compact vertical-timeline activity feed item.
 * Replaces the old card-grid FeedCard design.
 *
 * Routing logic:
 *   blog_article    → /blog/:slug
 *   product_update  → /products/:relatedProductSlug (fallback /updates/:slug)
 *   feature_release → /products/:relatedProductSlug (fallback /updates/:slug)
 *   company_update  → /updates/:slug
 *   founder_insight → /updates/:slug
 *   milestone       → /updates/:slug
 */
import React, { useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, MessageCircle, Share2, Package, Rocket,
  Lightbulb, FileText, Building2, Trophy, Pin,
  ExternalLink,
} from 'lucide-react';
import { toggleLike } from '../../services/feedService';

const FeedCommentModal = lazy(() => import('../ui/FeedCommentModal'));
const FeedShareModal   = lazy(() => import('../ui/FeedShareModal'));

// ─── Post type config ────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  blog_article:    { label: 'Article',         Icon: FileText,  badge: 'feed-badge--blog_article' },
  product_update:  { label: 'Product Update',  Icon: Package,   badge: 'feed-badge--product_update' },
  feature_release: { label: 'Feature Release', Icon: Rocket,    badge: 'feed-badge--feature_release' },
  company_update:  { label: 'Company Update',  Icon: Building2, badge: 'feed-badge--company_update' },
  founder_insight: { label: 'Founder Insight', Icon: Lightbulb, badge: 'feed-badge--founder_insight' },
  milestone:       { label: 'Milestone',       Icon: Trophy,    badge: 'feed-badge--milestone' },
};

const DEFAULT_TYPE = TYPE_CONFIG.company_update;

// ─── Routing helper ──────────────────────────────────────────────────────────
function getItemUrl(item) {
  const { type, slug, relatedProductSlug, relatedProductId } = item;
  switch (type) {
    case 'blog_article':
      return `/blog/${slug}`;
    case 'product_update':
    case 'feature_release':
      if (relatedProductSlug) return `/products/${relatedProductSlug}`;
      if (relatedProductId)   return `/product/${relatedProductId}`;
      return `/updates/${slug}`;
    default:
      return `/updates/${slug}`;
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7)  return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
}

function formatCount(n) {
  if (!n || n === 0) return null;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// ─── Skeleton ──────────────────────────────────────────────────────────────
export const FeedItemSkeleton = () => (
  <div className="feed-item-skeleton">
    <div className="feed-skeleton-dot">
      <div className="feed-skeleton-dot-circle" />
    </div>
    <div className="feed-skeleton-body">
      <div className="feed-skeleton-line feed-skeleton-line--xs" style={{ marginBottom: 10 }} />
      <div className="feed-skeleton-line feed-skeleton-line--medium" style={{ height: 15 }} />
      <div className="feed-skeleton-line feed-skeleton-line--full" style={{ marginTop: 6 }} />
      <div className="feed-skeleton-line feed-skeleton-line--short" style={{ marginTop: 3 }} />
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const FeedItem = ({ item, isLiked: initialLiked, onLikeChange }) => {
  const navigate = useNavigate();
  const [likeCount, setLikeCount]       = useState(item.likeCount || 0);
  const [liked, setLiked]               = useState(initialLiked || false);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [commentOpen, setCommentOpen]   = useState(false);
  const [shareOpen, setShareOpen]       = useState(false);

  const typeConfig = TYPE_CONFIG[item.type] || DEFAULT_TYPE;
  const { Icon } = typeConfig;
  const itemUrl = getItemUrl(item);

  const handleNavigate = useCallback(() => navigate(itemUrl), [navigate, itemUrl]);

  const handleProductClick = useCallback((e) => {
    e.stopPropagation();
    if (item.relatedProductSlug) navigate(`/products/${item.relatedProductSlug}`);
    else if (item.relatedProductId) navigate(`/product/${item.relatedProductId}`);
  }, [navigate, item.relatedProductSlug, item.relatedProductId]);

  const handleLike = useCallback(async (e) => {
    e.stopPropagation();
    const newLiked = !liked;
    const delta = newLiked ? 1 : -1;
    setLiked(newLiked);
    setLikeCount((c) => Math.max(0, c + delta));
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 380);
    try {
      await toggleLike(item.feedId, item.source);
      onLikeChange?.(item.feedId, newLiked);
    } catch {
      setLiked(!newLiked);
      setLikeCount((c) => Math.max(0, c - delta));
    }
  }, [liked, item.feedId, item.source, onLikeChange]);

  const likeCountStr    = formatCount(likeCount);
  const commentCountStr = formatCount(item.commentCount);

  return (
    <>
      <article
        className={`feed-item${item.isPinned ? ' feed-item--pinned' : ''}`}
        aria-label={item.title}
      >
        {/* Timeline dot */}
        <div className="feed-item__dot-col" aria-hidden="true">
          <div className="feed-item__dot" />
          <div className="feed-item__line" />
        </div>

        {/* Content */}
        <div className="feed-item__content">
          <div className="feed-item__text">
            {/* Meta: type badge + date + pinned */}
            <div className="feed-item__meta">
              <span
                className={`feed-item__type-badge ${typeConfig.badge}`}
                aria-label={`Post type: ${typeConfig.label}`}
              >
                <Icon size={11} aria-hidden="true" />
                {typeConfig.label}
              </span>
              <time
                className="feed-item__date"
                dateTime={item.publishedDate ? new Date(item.publishedDate).toISOString() : ''}
              >
                {formatDate(item.publishedDate)}
              </time>
              {item.isPinned && (
                <span className="feed-item__pin" aria-label="Pinned">
                  <Pin size={10} aria-hidden="true" />
                  Pinned
                </span>
              )}
            </div>

            {/* Title */}
            <button
              className="feed-item__title"
              onClick={handleNavigate}
              aria-label={`Read: ${item.title}`}
            >
              {item.title}
            </button>

            {/* Summary */}
            {item.summary && (
              <p className="feed-item__summary">{item.summary}</p>
            )}

            {/* Related product badge */}
            {item.relatedProductName && (
              <button
                className="feed-item__product"
                onClick={handleProductClick}
                aria-label={`Related product: ${item.relatedProductName}`}
              >
                <Package size={11} aria-hidden="true" />
                {item.relatedProductName}
              </button>
            )}

            {/* Actions */}
            <div className="feed-item__actions" role="group" aria-label="Post actions">
              {/* Like */}
              <button
                className={`feed-action-btn${liked ? ' feed-action-btn--liked' : ''}`}
                onClick={handleLike}
                aria-pressed={liked}
                aria-label={liked ? 'Unlike' : 'Like'}
              >
                <Heart
                  size={14}
                  fill={liked ? 'currentColor' : 'none'}
                  className={likeAnimating ? 'feed-like-burst' : ''}
                  aria-hidden="true"
                />
                {likeCountStr && <span>{likeCountStr}</span>}
              </button>

              {/* Comment */}
              <button
                className="feed-action-btn"
                onClick={(e) => { e.stopPropagation(); setCommentOpen(true); }}
                aria-label={`View comments${item.commentCount ? ` (${item.commentCount})` : ''}`}
              >
                <MessageCircle size={14} aria-hidden="true" />
                {commentCountStr && <span>{commentCountStr}</span>}
              </button>

              <div className="feed-action-separator" aria-hidden="true" />

              {/* Share */}
              <button
                className="feed-action-btn"
                onClick={(e) => { e.stopPropagation(); setShareOpen(true); }}
                aria-label="Share"
              >
                <Share2 size={14} aria-hidden="true" />
                <span>Share</span>
              </button>

              <div className="feed-action-separator" aria-hidden="true" />

              {/* Read more */}
              <button
                className="feed-item__read-more"
                onClick={handleNavigate}
                aria-label={`Read more about ${item.title}`}
              >
                Read more
                <ExternalLink size={12} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Thumbnail (desktop only, hidden on mobile) */}
          {item.imageUrl && (
            <div className="feed-item__thumb" aria-hidden="true">
              <img
                src={item.imageUrl}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </div>
      </article>

      {/* Modals (lazy) */}
      <Suspense fallback={null}>
        {commentOpen && (
          <FeedCommentModal
            post={{ ...item, id: item.feedId }}
            onClose={() => setCommentOpen(false)}
          />
        )}
        {shareOpen && (
          <FeedShareModal
            post={{ ...item, id: item.feedId }}
            onClose={() => setShareOpen(false)}
          />
        )}
      </Suspense>
    </>
  );
};

// Keep old export name as alias so any existing import of FeedCardSkeleton still works
export { FeedItemSkeleton as FeedCardSkeleton };
export default FeedItem;

