import React, { useEffect, useRef, useState } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { aiBadgeStyle } from '../../data/aiTeam';

// Example task only, never real work.
const EXAMPLE_TASK = 'Booking page: faster first screen';

const SpottedPicture = () => (
  <svg viewBox="0 0 240 100" className="task-story-picture" aria-hidden="true">
    <rect x="50" y="10" width="140" height="76" rx="8" className="ts-frame" />
    <circle cx="74" cy="34" r="12" className="ts-accent" />
    <text x="74" y="39" textAnchor="middle" className="ts-on-accent">!</text>
    <rect x="94" y="26" width="80" height="8" rx="3" className="ts-block" />
    <rect x="94" y="40" width="56" height="8" rx="3" className="ts-block" />
    <text x="66" y="72" className="ts-label">First screen feels slow</text>
  </svg>
);

const ProposedPicture = () => (
  <svg viewBox="0 0 240 100" className="task-story-picture" aria-hidden="true">
    <rect x="84" y="4" width="72" height="88" rx="8" className="ts-frame ts-dashed" />
    <rect x="94" y="16" width="52" height="22" rx="3" className="ts-accent" />
    <rect x="94" y="44" width="52" height="10" rx="3" className="ts-block" />
    <rect x="94" y="60" width="52" height="10" rx="3" className="ts-block" />
    <text x="164" y="30" className="ts-label">Size S</text>
    <text x="164" y="46" className="ts-label">Done when:</text>
    <text x="164" y="60" className="ts-label">under 1.5 s</text>
  </svg>
);

const ApprovedPicture = () => (
  <svg viewBox="0 0 240 100" className="task-story-picture" aria-hidden="true">
    <rect x="92" y="4" width="56" height="92" rx="10" className="ts-frame" />
    <rect x="100" y="16" width="40" height="8" rx="3" className="ts-block" />
    <rect x="100" y="30" width="40" height="8" rx="3" className="ts-block" />
    <rect x="100" y="56" width="40" height="18" rx="9" className="ts-accent" />
    <text x="120" y="69" textAnchor="middle" className="ts-on-accent">Go</text>
  </svg>
);

const BuiltPicture = () => (
  <svg viewBox="0 0 240 100" className="task-story-picture" aria-hidden="true">
    <rect x="40" y="8" width="160" height="84" rx="8" className="ts-frame" />
    <text x="54" y="30" className="ts-code">{'<Hero lazy />'}</text>
    <rect x="54" y="40" width="96" height="8" rx="3" className="ts-accent" />
    <rect x="66" y="54" width="110" height="8" rx="3" className="ts-block" />
    <rect x="66" y="68" width="70" height="8" rx="3" className="ts-block" />
  </svg>
);

const CheckedPicture = () => (
  <svg viewBox="0 0 240 100" className="task-story-picture" aria-hidden="true">
    {[18, 44, 70].map((y) => (
      <g key={y}>
        <circle cx="66" cy={y} r="9" className="ts-success" />
        <path d={`M61 ${y} l4 4 l7 -8`} className="ts-tick" />
        <rect x="84" y={y - 4} width="96" height="8" rx="3" className="ts-block" />
      </g>
    ))}
  </svg>
);

const ReviewedPicture = () => (
  <svg viewBox="0 0 240 100" className="task-story-picture" aria-hidden="true">
    <path d="M50 12 h140 a8 8 0 0 1 8 8 v44 a8 8 0 0 1 -8 8 h-108 l-16 16 v-16 h-16 a8 8 0 0 1 -8 -8 v-44 a8 8 0 0 1 8 -8 z" className="ts-frame" />
    <text x="62" y="36" className="ts-label">Verdict</text>
    <rect x="62" y="44" width="72" height="18" rx="9" className="ts-success" />
    <text x="98" y="57" textAnchor="middle" className="ts-on-accent">Ready</text>
  </svg>
);

const ReleasedPicture = () => (
  <svg viewBox="0 0 240 100" className="task-story-picture" aria-hidden="true">
    <rect x="40" y="8" width="160" height="84" rx="8" className="ts-frame" />
    <line x1="40" y1="24" x2="200" y2="24" className="ts-line" />
    <circle cx="186" cy="16" r="4" className="ts-success" />
    <text x="178" y="19" textAnchor="end" className="ts-label">Live</text>
    <rect x="52" y="34" width="136" height="24" rx="4" className="ts-accent" />
    <text x="52" y="78" className="ts-label">First screen: 1.4 s</text>
  </svg>
);

const pictures = {
  spotted: SpottedPicture,
  proposed: ProposedPicture,
  approved: ApprovedPicture,
  built: BuiltPicture,
  checked: CheckedPicture,
  reviewed: ReviewedPicture,
  released: ReleasedPicture,
};

const Who = ({ step }) => (
  <span className="task-story-who">
    {step.member ? (
      <span className="task-story-avatar">
        <img src={step.member.image} alt="" width={40} height={40} loading="lazy" decoding="async" />
        <span style={{ ...aiBadgeStyle, right: '-4px', bottom: '-4px', padding: '0 5px', fontSize: '9px' }}>AI</span>
      </span>
    ) : (
      <span className="task-story-avatar task-story-you">
        <FaUserCheck size={18} />
      </span>
    )}
    <span className="task-story-who-name">{step.member ? step.member.name : 'You'}</span>
  </span>
);

const StepCard = ({ step, index, total, compact = false }) => {
  const Picture = pictures[step.picture];
  return (
    <div className={`task-story-card${compact ? ' is-compact' : ''}`} aria-hidden="true">
      {!compact && <p className="task-story-task">{EXAMPLE_TASK}</p>}
      {!compact && <p className="task-story-progress">Step {index + 1} of {total} · {step.title}</p>}
      <Picture />
      <Who step={step} />
    </div>
  );
};

/**
 * "How one task travels" as a scroll story: the sticky example card follows the step nearest the middle of the
 * screen. Phones get the card state inline under each step instead. The page renders the static list for
 * reduced motion.
 */
const TaskStory = ({ steps }) => {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    const items = Array.from(listRef.current?.children ?? []);
    if (!items.length || typeof IntersectionObserver === 'undefined') return undefined;
    // Fine thresholds make the observer fire often; each call recomputes from positions, so a fast scroll that
    // skips entries still lands on the right step.
    const update = () => {
      const middle = window.innerHeight / 2;
      let current = 0;
      items.forEach((item, index) => {
        if (item.getBoundingClientRect().top <= middle) current = index;
      });
      setActive(current);
    };
    const observer = new IntersectionObserver(update, { threshold: Array.from({ length: 11 }, (_, i) => i / 10) });
    items.forEach((item) => observer.observe(item));
    update();
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className="task-story">
      <div className="task-story-sticky">
        <StepCard step={steps[active]} index={active} total={steps.length} />
        <p className="task-story-caption">{steps[active].description}</p>
      </div>
      <ol ref={listRef} className="task-story-steps">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`task-story-step${index === active ? ' is-active' : ''}${step.you ? ' is-you' : ''}`}
            aria-current={index === active ? 'step' : undefined}
          >
            <div className="task-story-step-head">
              <span className="task-story-number">{index + 1}</span>
              {step.you && <span className="modern-badge task-story-you-badge">You</span>}
            </div>
            <h3 className="task-story-title">{step.title}</h3>
            <p className="task-story-text">{step.description}</p>
            <div className="task-story-inline">
              <StepCard step={step} index={index} total={steps.length} compact />
            </div>
          </li>
        ))}
      </ol>

      <style>{`
        .task-story { display: grid; gap: var(--space-8); }
        .task-story-steps { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-4); }
        .task-story-sticky { display: none; }
        .task-story-step {
          padding: var(--space-6);
          border-radius: var(--radius-xl);
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
        }
        .task-story-step.is-you { border: 2px solid var(--color-primary-500); }
        .task-story-step-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
        .task-story-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: var(--text-sm);
        }
        .task-story-step.is-you .task-story-number { background: var(--color-primary-500); color: #ffffff; }
        .task-story-you-badge { background: var(--color-primary-500); color: #ffffff; }
        .task-story-title { margin: var(--space-3) 0 var(--space-2); font-size: var(--text-lg); font-weight: 600; color: var(--text-primary); }
        .task-story-text { margin: 0; color: var(--text-secondary); line-height: 1.6; }
        .task-story-inline { margin-top: var(--space-4); }
        .task-story-card {
          padding: var(--space-4);
          border-radius: var(--radius-lg);
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
        }
        .task-story-task { margin: 0; font-weight: 600; color: var(--text-primary); }
        .task-story-progress { margin: var(--space-1) 0 var(--space-3); font-size: var(--text-sm); color: var(--text-secondary); }
        .task-story-picture { display: block; width: 100%; height: auto; max-height: 120px; }
        .task-story-card.is-compact .task-story-picture { max-height: 88px; }
        .task-story-picture .ts-frame { fill: var(--bg-primary); stroke: var(--text-muted); stroke-width: 1.5; }
        .task-story-picture .ts-dashed { stroke-dasharray: 5 4; }
        .task-story-picture .ts-block { fill: var(--bg-tertiary); stroke: var(--border-light); }
        .task-story-picture .ts-accent { fill: var(--color-primary-500); }
        .task-story-picture .ts-success { fill: var(--color-success, #10b981); }
        .task-story-picture .ts-tick { fill: none; stroke: #ffffff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .task-story-picture .ts-line { stroke: var(--border-light); }
        .task-story-picture .ts-label { fill: var(--text-secondary); font-size: 10px; font-family: inherit; }
        .task-story-picture .ts-code { fill: var(--text-secondary); font-size: 11px; font-family: ui-monospace, monospace; }
        .task-story-picture .ts-on-accent { fill: #ffffff; font-size: 11px; font-weight: 700; font-family: inherit; }
        .task-story-who { display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-3); }
        .task-story-avatar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .task-story-avatar img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; display: block; }
        .task-story-you { background: var(--color-primary-500); color: #ffffff; }
        .task-story-who-name { font-size: var(--text-sm); font-weight: 600; color: var(--text-primary); }
        .task-story-caption { margin: var(--space-4) 0 0; font-size: var(--text-lg); color: var(--text-primary); line-height: 1.6; }

        @media (min-width: 768px) {
          .task-story { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); align-items: start; }
          .task-story-sticky {
            display: block;
            position: sticky;
            top: 96px;
            padding: var(--space-6);
            border-radius: var(--radius-xl);
            background: var(--bg-primary);
            border: 1px solid var(--border-light);
          }
          .task-story-inline { display: none; }
          .task-story-steps { gap: 0; }
          .task-story-step {
            min-height: 40vh;
            margin-bottom: var(--space-4);
            transition: box-shadow 0.25s ease;
          }
          .task-story-step:last-child { margin-bottom: 0; }
          .task-story-step.is-active { box-shadow: 0 0 0 3px var(--color-primary-200, #99ceff); }
        }
      `}</style>
    </div>
  );
};

export default TaskStory;
