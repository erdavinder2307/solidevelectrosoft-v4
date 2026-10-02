import React, { useEffect, useRef, useState } from 'react';
import { FaUserCheck, FaCheck } from 'react-icons/fa';
import { aiTeam, aiBadgeStyle } from '../../data/aiTeam';

// Example data only: invented products and tasks, never real work.
const exampleCards = [
  {
    id: 'fitlog',
    short: 'FitLog',
    title: 'FitLog: show today\'s workout first',
    why: 'People open the app to train, so today\'s workout moves to the top.',
    picture: 'wireframe',
  },
  {
    id: 'booking',
    short: 'Booking',
    title: 'Booking page: faster first screen',
    why: 'The first screen appears in about half the time.',
    picture: 'chart',
  },
];

const SAMPLE_NOTE = 'Keep yesterday\'s summary visible, just below the workout.';

const stops = [
  { key: 'asha', member: aiTeam.asha, verb: 'Plans', caption: 'Asha writes down why, how big, and what done means.' },
  { key: 'arjun', member: aiTeam.arjun, verb: 'Builds', caption: 'Arjun makes the change on a separate copy.' },
  { key: 'meera', member: aiTeam.meera, verb: 'Tests', caption: 'Meera tries it on a test machine and a virtual phone.' },
  { key: 'kabir', member: aiTeam.kabir, verb: 'Reviews', caption: 'Kabir reads the change and says it is ready.' },
  { key: 'you', name: 'You', verb: 'Approve', caption: 'You look at the result and tap approve.' },
  { key: 'released', name: 'Released', verb: 'Live', caption: 'Released ✓' },
];

const STEP_MS = 1000;
const LAST_STEP = stops.length - 1;

const WireframePicture = () => (
  <svg viewBox="0 0 240 100" role="img" aria-label="Sketch: before, the workout is at the bottom of the home screen; after, it is at the top" className="control-demo-picture">
    {[{ x: 34, label: 'Before', workoutY: 58 }, { x: 150, label: 'After', workoutY: 16 }].map(({ x, label, workoutY }) => (
      <g key={label}>
        <rect x={x} y="4" width="56" height="80" rx="8" className="cd-frame" />
        {[16, 30, 44, 58].filter((y) => y !== workoutY).slice(0, 3).map((y) => (
          <rect key={y} x={x + 7} y={y} width="42" height="10" rx="3" className="cd-block" />
        ))}
        <rect x={x + 7} y={workoutY} width="42" height="18" rx="3" className="cd-accent" />
        <text x={x + 28} y="97" textAnchor="middle" className="cd-label">{label}</text>
      </g>
    ))}
    <path d="M104 44 H136 M128 37 L136 44 L128 51" className="cd-arrow" />
  </svg>
);

const ChartPicture = () => (
  <svg viewBox="0 0 240 100" role="img" aria-label="Chart: the first screen appears in 3.2 seconds now and 1.4 seconds after the change" className="control-demo-picture">
    <text x="4" y="14" className="cd-label">First screen appears in</text>
    <text x="4" y="42" className="cd-label">Now</text>
    <rect x="44" y="30" width="150" height="16" rx="4" className="cd-block" />
    <text x="200" y="42" className="cd-label">3.2 s</text>
    <text x="4" y="74" className="cd-label">After</text>
    <rect x="44" y="62" width="66" height="16" rx="4" className="cd-accent" />
    <text x="116" y="74" className="cd-label">1.4 s</text>
  </svg>
);

const StopAvatar = ({ stop }) => {
  if (stop.member) {
    return (
      <span className="control-demo-avatar">
        <img src={stop.member.image} alt="" width={48} height={48} loading="lazy" decoding="async" />
        <span style={{ ...aiBadgeStyle, right: '-4px', bottom: '-4px', padding: '0 5px', fontSize: '9px' }}>AI</span>
      </span>
    );
  }
  const Icon = stop.key === 'you' ? FaUserCheck : FaCheck;
  return (
    <span className={`control-demo-avatar control-demo-icon${stop.key === 'released' ? ' is-released' : ''}`}>
      <Icon size={20} aria-hidden="true" />
    </span>
  );
};

/**
 * "You stay in control" demo: tap Go on an example decision card and watch the task travel through the AI team.
 */
const ControlDemo = () => {
  // phase: choose | running | skipped | change | sent
  const [phase, setPhase] = useState('choose');
  const [card, setCard] = useState(null);
  const [note, setNote] = useState(SAMPLE_NOTE);
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(0);
  const statusRef = useRef(null);
  const noteRef = useRef(null);
  const cardsRef = useRef(null);
  const focusCardsRef = useRef(false);

  // The step comes from the start time, so a paused or background tab still ends in the right place.
  const step = phase === 'running' ? Math.min(LAST_STEP, Math.floor((now - startedAt) / STEP_MS)) : -1;
  const released = step === LAST_STEP;

  useEffect(() => {
    if (phase !== 'running' || released) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(timer);
  }, [phase, released]);

  useEffect(() => {
    if (phase === 'change') noteRef.current?.focus();
    else if (phase !== 'choose') statusRef.current?.focus();
    else if (focusCardsRef.current) {
      focusCardsRef.current = false;
      cardsRef.current?.querySelector('button')?.focus();
    }
  }, [phase]);

  const choose = (nextPhase, chosen) => {
    setCard(chosen);
    if (nextPhase === 'running') {
      const t = Date.now();
      setStartedAt(t);
      setNow(t);
    }
    setPhase(nextPhase);
  };

  const reset = () => {
    focusCardsRef.current = true;
    setPhase('choose');
    setCard(null);
    setNote(SAMPLE_NOTE);
  };

  let caption = 'Tap Go on a card to watch the task travel.';
  if (phase === 'running') caption = stops[step].caption;
  else if (phase === 'skipped') caption = 'Nothing moves until you say go.';
  else if (phase === 'change') caption = 'Write what should change. Asha picks it up.';
  else if (phase === 'sent') caption = 'Asha updates the plan and brings it back to you.';

  const stopState = (index) => {
    if (phase === 'sent') return index === 0 ? 'current' : 'upcoming';
    if (step < 0) return 'upcoming';
    if (index < step) return 'done';
    return index === step ? 'current' : 'upcoming';
  };

  const tryAgain = (
    <button type="button" className="modern-btn modern-btn-secondary modern-btn-sm control-demo-btn" onClick={reset}>
      Try again
    </button>
  );

  return (
    <div className="control-demo">
      <div className="control-demo-phone">
        <div className="control-demo-phone-header">
          <span>Decisions{phase === 'choose' ? ' · 2 waiting' : ''}</span>
          <span className="control-demo-example">Example</span>
        </div>

        <div className="control-demo-screen">
          {/* The cards always keep their space (hidden after a choice), so the phone never changes height. */}
          <ul ref={cardsRef} className={`control-demo-cards${phase === 'choose' ? '' : ' is-hidden'}`} inert={phase !== 'choose'}>
            {exampleCards.map((item) => (
              <li key={item.id} className="control-demo-card">
                {item.picture === 'wireframe' ? <WireframePicture /> : <ChartPicture />}
                <h3 className="control-demo-card-title">{item.title}</h3>
                <p className="control-demo-card-why">{item.why}</p>
                <div className="control-demo-actions" role="group" aria-label={`Decision: ${item.title}`}>
                  <button type="button" className="modern-btn modern-btn-primary modern-btn-sm control-demo-btn" onClick={() => choose('running', item)}>
                    Go
                  </button>
                  <button type="button" className="modern-btn modern-btn-secondary modern-btn-sm control-demo-btn" onClick={() => choose('skipped', item)}>
                    Skip
                  </button>
                  <button type="button" className="modern-btn modern-btn-secondary modern-btn-sm control-demo-btn" onClick={() => choose('change', item)}>
                    Change…
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {phase !== 'choose' && (
            <div ref={statusRef} tabIndex={-1} className="control-demo-status">
              {phase !== 'change' && (
                <span className={`control-demo-chip${released ? ' is-released' : ''}`}>{card.title}</span>
              )}
              {phase === 'running' && (
                <p className="control-demo-message">{released ? 'Released ✓ Your customers have it.' : 'Approved. Your AI team is on it.'}</p>
              )}
              {phase === 'skipped' && <p className="control-demo-message">Skipped. Nothing was built.</p>}
              {phase === 'sent' && <p className="control-demo-message">Sent back to Asha with your note.</p>}
              {phase === 'change' && (
                <form
                  className="control-demo-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setPhase('sent');
                  }}
                >
                  <label htmlFor="control-demo-note" className="control-demo-card-title">
                    Change: {card.title}
                  </label>
                  <textarea
                    id="control-demo-note"
                    ref={noteRef}
                    rows={4}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    className="control-demo-note"
                  />
                  <div className="control-demo-actions">
                    <button type="submit" className="modern-btn modern-btn-primary modern-btn-sm control-demo-btn">
                      Send note
                    </button>
                    <button type="button" className="modern-btn modern-btn-secondary modern-btn-sm control-demo-btn" onClick={reset}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              {(released || phase === 'skipped' || phase === 'sent') && tryAgain}
            </div>
          )}
        </div>
      </div>

      <div className="control-demo-track-panel">
        <p className="control-demo-track-title">How the task travels</p>
        <div className="control-demo-track-wrap">
          <ol className="control-demo-track" aria-label="The task's steps">
            {stops.map((stop, index) => {
              const state = stopState(index);
              return (
                <li key={stop.key} className={`control-demo-stop is-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
                  <StopAvatar stop={stop} />
                  <span className="control-demo-stop-name">{stop.member?.name ?? stop.name}</span>
                  <span className="control-demo-stop-verb">{stop.verb}</span>
                </li>
              );
            })}
          </ol>
          {(phase === 'running' || phase === 'sent') && (
            <span
              className="control-demo-token"
              aria-hidden="true"
              style={{ left: `calc(${(phase === 'sent' ? 0 : step) + 0.5} * (100% / ${stops.length}))` }}
            >
              {card.short}
            </span>
          )}
        </div>
        <p className="control-demo-caption" aria-live="polite">{caption}</p>
      </div>

      <style>{`
        .control-demo {
          display: grid;
          gap: var(--space-8);
          align-items: center;
          max-width: 1040px;
          margin: 0 auto;
        }
        @media (min-width: 900px) {
          .control-demo { grid-template-columns: 360px 1fr; }
        }
        /* Stacked on narrow screens: the track goes above the phone so it stays in view while it animates. */
        @media (max-width: 899px) {
          .control-demo-track-panel { order: -1; }
        }
        .control-demo-phone {
          width: 100%;
          max-width: 360px;
          margin: 0 auto;
          padding: var(--space-4);
          border: 8px solid var(--bg-dark, #0f0f1a);
          border-radius: 32px;
          background: var(--bg-secondary);
          box-shadow: 0 20px 40px rgba(15, 15, 26, 0.12);
        }
        .control-demo-phone-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-3);
          font-weight: 600;
          color: var(--text-primary);
        }
        .control-demo-example {
          padding: 2px 10px;
          border-radius: 999px;
          background: var(--bg-tertiary);
          border: 1px dashed var(--text-muted);
          color: var(--text-secondary);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .control-demo-screen { display: grid; }
        .control-demo-screen > * { grid-area: 1 / 1; min-width: 0; }
        .control-demo-cards.is-hidden { opacity: 0; }
        .control-demo-cards { list-style: none; padding: 0; margin: 0; display: grid; gap: var(--space-3); }
        .control-demo-card {
          padding: var(--space-3);
          border-radius: var(--radius-lg);
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
        }
        .control-demo-picture { display: block; width: 100%; height: auto; max-height: 96px; }
        .control-demo-picture .cd-frame { fill: var(--bg-primary); stroke: var(--text-muted); stroke-width: 1.5; }
        .control-demo-picture .cd-block { fill: var(--bg-tertiary); stroke: var(--border-light); }
        .control-demo-picture .cd-accent { fill: var(--color-primary-500); }
        .control-demo-picture .cd-arrow { fill: none; stroke: var(--text-secondary); stroke-width: 2; stroke-linecap: round; }
        .control-demo-picture .cd-label { fill: var(--text-secondary); font-size: 10px; font-family: inherit; }
        .control-demo-card-title {
          display: block;
          margin: var(--space-2) 0 var(--space-1);
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .control-demo-card-why { margin: 0 0 var(--space-3); font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5; }
        .control-demo-actions { display: flex; flex-wrap: wrap; gap: var(--space-2); }
        .control-demo-btn { min-height: 40px; }
        .control-demo-btn:focus-visible,
        .control-demo-note:focus-visible,
        .control-demo-status:focus-visible {
          outline: 3px solid var(--color-primary-500);
          outline-offset: 2px;
        }
        .control-demo-status { display: grid; gap: var(--space-4); justify-items: start; align-content: start; padding-top: var(--space-4); outline: none; }
        .control-demo-chip {
          display: inline-block;
          padding: var(--space-2) var(--space-4);
          border-radius: 999px;
          background: var(--color-primary-500);
          color: #ffffff;
          font-size: var(--text-sm);
          font-weight: 600;
          animation: control-demo-collapse 0.4s ease-out;
        }
        .control-demo-chip.is-released { background: var(--color-success, #10b981); }
        .control-demo-message { margin: 0; font-size: var(--text-lg); font-weight: 600; color: var(--text-primary); }
        .control-demo-form { display: grid; gap: var(--space-3); width: 100%; }
        .control-demo-note {
          width: 100%;
          padding: var(--space-3);
          border-radius: var(--radius-md, 8px);
          border: 1px solid var(--border-default, #d4d4d4);
          background: var(--bg-primary);
          color: var(--text-primary);
          font: inherit;
          font-size: var(--text-sm);
          resize: vertical;
        }
        .control-demo-track-panel {
          padding: var(--space-6);
          border-radius: var(--radius-xl);
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
        }
        .control-demo-track-title { margin: 0 0 var(--space-6); font-weight: 600; color: var(--text-primary); }
        .control-demo-track-wrap { position: relative; padding-top: var(--space-6); }
        .control-demo-track {
          position: relative;
          display: grid;
          grid-template-columns: repeat(${stops.length}, 1fr);
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .control-demo-track::before {
          content: '';
          position: absolute;
          top: 24px;
          left: calc(100% / ${stops.length * 2});
          right: calc(100% / ${stops.length * 2});
          height: 2px;
          background: var(--border-light);
        }
        .control-demo-stop {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2px;
          min-width: 0;
          transition: opacity 0.3s ease;
        }
        .control-demo-stop.is-upcoming { opacity: 0.45; }
        .control-demo-avatar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          margin-bottom: var(--space-1);
          border-radius: 50%;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          box-shadow: 0 0 0 3px var(--bg-primary);
          transition: box-shadow 0.3s ease;
        }
        .control-demo-avatar img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; display: block; }
        .control-demo-icon.is-released { background: var(--color-success, #10b981); color: #ffffff; }
        .control-demo-stop.is-current .control-demo-avatar,
        .control-demo-stop.is-done .control-demo-avatar {
          box-shadow: 0 0 0 3px var(--bg-primary), 0 0 0 5px var(--color-primary-500);
        }
        .control-demo-stop-name { font-size: var(--text-sm); font-weight: 600; color: var(--text-primary); overflow-wrap: anywhere; }
        .control-demo-stop-verb { font-size: var(--text-xs); color: var(--text-secondary); }
        .control-demo-token {
          position: absolute;
          top: -8px;
          transform: translateX(-50%);
          padding: 2px 10px;
          border-radius: 999px;
          background: var(--color-primary-500);
          color: #ffffff;
          font-size: var(--text-xs);
          font-weight: 600;
          line-height: 1.5;
          white-space: nowrap;
          box-shadow: 0 0 0 3px var(--color-primary-100);
          transition: left 0.6s ease-in-out;
        }
        .control-demo-caption {
          min-height: 3.2em;
          margin: var(--space-6) 0 0;
          font-size: var(--text-lg);
          color: var(--text-primary);
          line-height: 1.6;
        }
        @keyframes control-demo-collapse {
          from { transform: scale(1.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 480px) {
          .control-demo-track-panel { padding: var(--space-4); }
          .control-demo-avatar, .control-demo-avatar img { width: 40px; height: 40px; }
          .control-demo-track::before { top: 20px; }
          .control-demo-stop-name { font-size: var(--text-xs); }
        }
        @media (prefers-reduced-motion: reduce) {
          .control-demo-chip { animation: none; }
          .control-demo-token, .control-demo-stop, .control-demo-avatar { transition: none; }
        }
      `}</style>
    </div>
  );
};

export default ControlDemo;
