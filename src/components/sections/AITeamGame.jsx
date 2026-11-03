import React, { useEffect } from 'react';
import { trackEvent } from '../../utils/analytics';

const GAME_URL = '/ai-team-game/index.html';

/**
 * "A Day at the AI Office": the Unity WebGL game, served from public/ai-team-game/.
 * The iframe only loads the game's own poster page; Unity downloads after the visitor presses Play there.
 * The game talks to this page with postMessage ({type: 'aiteam', event, data} or {type: 'aiteam', action}).
 */
const AITeamGame = ({ statsTargetId }) => {
  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== window.location.origin) return;
      const msg = e.data;
      if (!msg || msg.type !== 'aiteam') return;
      if (msg.action === 'show_stats') {
        document.getElementById(statsTargetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        trackEvent('game_show_stats');
        return;
      }
      if (typeof msg.event === 'string' && msg.event.startsWith('game_')) {
        const params = { page: window.location.pathname };
        // Flat values only (counts, method, reason): the game sends no personal data.
        Object.entries(msg.data || {}).forEach(([key, value]) => {
          if (['string', 'number', 'boolean'].includes(typeof value)) params[key] = value;
        });
        trackEvent(msg.event, params);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [statsTargetId]);

  return (
    <div
      className="ai-team-game"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        aspectRatio: '16 / 10',
        minHeight: '520px',
        maxHeight: '80vh',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        background: '#f7f9fb',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <iframe
        src={GAME_URL}
        title="A Day at the AI Office, a 90-second game"
        loading="lazy"
        allow="fullscreen; clipboard-write; web-share"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      />
    </div>
  );
};

export default AITeamGame;
