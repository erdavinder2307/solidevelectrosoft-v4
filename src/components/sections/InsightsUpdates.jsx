/**
 * InsightsUpdates Section
 * Professional activity feed aggregating Content Hub posts + existing Blog posts.
 * Two-column layout: sticky header left, scrollable timeline right.
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fetchAggregatedFeed, enrichWithEngagement, checkLikedBatch } from '../../services/feedService';
import FeedItem, { FeedItemSkeleton } from './FeedCard';
import '../../styles/feed.css';

const PAGE_SIZE = 6;
const SKELETON_COUNT = 4;

const InsightsUpdates = () => {
  const [items, setItems]           = useState([]);
  const [likedSet, setLikedSet]     = useState(new Set());
  const [loading, setLoading]       = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore]       = useState(false);
  const [error, setError]           = useState('');
  const pageRef = useRef(0);

  // Initial load
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const { items: rawItems, hasMore: more } = await fetchAggregatedFeed(PAGE_SIZE, 0);
        if (!mounted) return;
        // Enrich blog items with engagement counts
        const enriched = await enrichWithEngagement(rawItems);
        if (!mounted) return;
        setItems(enriched);
        setHasMore(more);
        pageRef.current = 0;
        // Batch-check likes
        if (enriched.length) {
          const ids = enriched.map((i) => i.feedId);
          const liked = await checkLikedBatch(ids);
          if (mounted) setLikedSet(liked);
        }
      } catch (err) {
        console.error('InsightsUpdates load error:', err);
        if (mounted) setError('Unable to load updates.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = pageRef.current + 1;
      const { items: rawItems, hasMore: more } = await fetchAggregatedFeed(PAGE_SIZE, nextPage);
      const enriched = await enrichWithEngagement(rawItems);
      pageRef.current = nextPage;
      setHasMore(more);
      setItems((prev) => [...prev, ...enriched]);
      if (enriched.length) {
        const ids = enriched.map((i) => i.feedId);
        const newLiked = await checkLikedBatch(ids);
        setLikedSet((prev) => new Set([...prev, ...newLiked]));
      }
    } catch (err) {
      console.error('loadMore error:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore]);

  const handleLikeChange = useCallback((feedId, liked) => {
    setLikedSet((prev) => {
      const next = new Set(prev);
      if (liked) next.add(feedId); else next.delete(feedId);
      return next;
    });
  }, []);

  return (
    <section className="feed-section" aria-labelledby="feed-section-heading">
      <div className="feed-container">
        <div className="feed-layout">

          {/* ─── Left: Sticky Header ─── */}
          <motion.div
            className="feed-header-col"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
          >
            <div className="feed-badge" aria-hidden="true">
              <span className="feed-badge-dot" />
              Activity
            </div>
            <h2 id="feed-section-heading" className="feed-title">
              Insights &amp;<br /><span>Updates</span>
            </h2>
            <p className="feed-subtitle">
              Product releases, engineering notes, company milestones, and founder perspectives.
            </p>
            <a href="/blog" className="feed-view-all">
              View all posts
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </motion.div>

          {/* ─── Right: Scrollable Feed ─── */}
          <div
            className="feed-scroll-col"
            aria-live="polite"
            aria-label="Activity feed"
          >
            {loading ? (
              <div className="feed-stream" aria-busy="true">
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <FeedItemSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="feed-empty" role="alert">
                <span className="feed-empty-icon" aria-hidden="true">⚠️</span>
                <h3>Temporarily unavailable</h3>
                <p>{error}</p>
              </div>
            ) : items.length === 0 ? (
              <div className="feed-empty">
                <span className="feed-empty-icon" aria-hidden="true">📬</span>
                <h3>No updates yet</h3>
                <p>Check back soon — exciting announcements are coming.</p>
              </div>
            ) : (
              <>
                <motion.div
                  className="feed-stream"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06 } },
                  }}
                >
                  {items.map((item) => (
                    <motion.div
                      key={item.feedId}
                      variants={{
                        hidden:   { opacity: 0, y: 12 },
                        visible:  { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      <FeedItem
                        item={item}
                        isLiked={likedSet.has(item.feedId)}
                        onLikeChange={handleLikeChange}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {hasMore && (
                  <div className="feed-load-more-wrap">
                    <button
                      className="feed-load-more-btn"
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      aria-busy={loadingMore}
                    >
                      {loadingMore && <span className="feed-spinner" aria-hidden="true" />}
                      {loadingMore ? 'Loading…' : 'Load more'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default InsightsUpdates;
