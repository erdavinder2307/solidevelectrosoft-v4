/**
 * FeedShareModal
 * LinkedIn, X, Facebook, WhatsApp, Email, Copy Link, Native Share.
 * Works with unified feed items (blog-sourced or feedPost-sourced).
 */
import React, { useState, useEffect, useCallback } from 'react';
import { X, Mail, Link2, Share2 } from 'lucide-react';

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
import { recordShare } from '../../services/feedService';

function getPostUrl(post) {
  const base   = window.location.origin;
  const source = post.source || 'feed';
  const { type, slug, relatedProductSlug, relatedProductId } = post;
  if (source === 'blog' || type === 'blog_article') return `${base}/blog/${slug}`;
  if ((type === 'product_update' || type === 'feature_release') && relatedProductSlug) {
    return `${base}/products/${relatedProductSlug}`;
  }
  return `${base}/updates/${slug}`;
}

const SHARE_PLATFORMS = (postUrl, title) => {
  const eu = encodeURIComponent(postUrl);
  const et = encodeURIComponent(title);
  return [
    {
      key: 'linkedin',
      label: 'LinkedIn',
      Icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${eu}`,
    },
    {
      key: 'x',
      label: 'X (Twitter)',
      Icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?url=${eu}&text=${et}`,
    },
    {
      key: 'facebook',
      label: 'Facebook',
      Icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${eu}`,
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      Icon: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.107.544 4.09 1.499 5.815L0 24l6.335-1.481A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.364l-.359-.213-3.714.868.936-3.623-.234-.372A9.818 9.818 0 012.182 12C2.182 6.566 6.566 2.182 12 2.182c5.434 0 9.818 4.384 9.818 9.818 0 5.434-4.384 9.818-9.818 9.818z"/>
        </svg>
      ),
      href: `https://api.whatsapp.com/send?text=${et}%20${eu}`,
    },
    {
      key: 'email',
      label: 'Email',
      Icon: Mail,
      href: `mailto:?subject=${et}&body=${encodeURIComponent(`Check this out: ${postUrl}`)}`,
    },
  ];
};

const FeedShareModal = ({ post, onClose }) => {
  const [copied, setCopied] = useState(false);
  const postUrl  = getPostUrl(post);
  const feedId   = post.feedId || post.id;
  const source   = post.source || 'feed';
  const platforms = SHARE_PLATFORMS(postUrl, post.title);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

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

  const track = useCallback(() => recordShare(feedId, source), [feedId, source]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      track();
      setTimeout(() => setCopied(false), 2200);
    } catch { /* fallback: user can copy from input */ }
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title: post.title, text: post.summary || post.title, url: postUrl });
      track();
    } catch { /* user cancelled */ }
  };

  return (
    <div
      className="feed-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="feed-modal" role="document">
        <div className="feed-modal__header">
          <div style={{ minWidth: 0 }}>
            <h2 id="share-modal-title" className="feed-modal__title">Share</h2>
            <p className="feed-modal__post-title">{post.title}</p>
          </div>
          <button className="feed-modal__close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="feed-modal__body">
          <div className="feed-share-grid">
            {platforms.map(({ key, label, Icon, href }) => (
              <a
                key={key}
                className="feed-share-btn"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track}
                aria-label={`Share on ${label}`}
              >
                <span className="feed-share-btn__icon"><Icon size={20} /></span>
                {label}
              </a>
            ))}
            {/* Native share (mobile/supported browsers) */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                className="feed-share-btn"
                onClick={handleNativeShare}
                aria-label="More sharing options"
              >
                <span className="feed-share-btn__icon"><Share2 size={20} /></span>
                More
              </button>
            )}
          </div>

          {/* Copy link */}
          <div className="feed-share-copy-row">
            <input
              type="text"
              className="feed-share-url-input"
              value={postUrl}
              readOnly
              aria-label="Post URL"
              onFocus={(e) => e.target.select()}
            />
            <button
              className={`feed-share-copy-btn${copied ? ' copied' : ''}`}
              onClick={handleCopy}
              aria-label="Copy link"
            >
              {copied ? (
                <>✓ Copied</>
              ) : (
                <><Link2 size={13} style={{ marginRight: 4 }} />Copy</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedShareModal;

