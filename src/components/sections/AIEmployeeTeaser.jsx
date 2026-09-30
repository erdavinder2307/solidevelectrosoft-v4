import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { activeAITeam, aiBadgeStyle, AI_TEAM_DISCLOSURE } from '../../data/aiTeam';
import { useAiTeamStats } from '../../hooks/useAiTeamStats';

const teaserStats = (stats) => [
  { value: stats.improvementsShipped, label: 'improvements shipped' },
  { value: stats.checksRun, label: 'checks run' },
  { value: '83 min', label: 'fastest rescue' },
];

/**
 * AI Employee Teaser
 * Short homepage section that points to the /ai-employee page
 */
const AIEmployeeTeaser = () => {
  const stats = useAiTeamStats();

  return (
    <section className="modern-section-sm" style={{ background: 'var(--bg-primary)' }}>
      <div className="modern-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          style={{
            padding: 'var(--space-8)',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-light)',
            display: 'grid',
            gap: 'var(--space-8)',
          }}
          className="ai-employee-teaser"
        >
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex' }}>
                {activeAITeam.map((member, index) => (
                  <div key={member.name} style={{ position: 'relative', marginLeft: index === 0 ? 0 : '-12px' }}>
                    <img
                      src={member.image}
                      alt={member.alt}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      style={{
                        display: 'block',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--bg-secondary)',
                      }}
                    />
                    {/* zIndex keeps each badge above the next overlapping portrait */}
                    <span style={{ ...aiBadgeStyle, right: '-4px', bottom: '-4px', padding: '0 5px', fontSize: '9px', zIndex: 1 }}>AI</span>
                  </div>
                ))}
              </div>
              <div>
                <span style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  Asha, Arjun, Meera and Kabir · our AI team
                </span>
                <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  {AI_TEAM_DISCLOSURE}
                </span>
              </div>
            </div>
            <span className="modern-label modern-mb-4" style={{ display: 'block' }}>
              New · AI Employee
            </span>
            <h2 className="modern-h3" style={{ marginBottom: 'var(--space-4)' }}>
              We run our own software team on AI — and we can build yours
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
              An AI project manager, developer and tester plan, build and test our software every hour on Claude, with
              a person approving every step. Need a team without hiring? We'll build one for you.
            </p>
            <Link to="/ai-employee" className="modern-btn modern-btn-primary">
              Meet the AI employee
              <span>→</span>
            </Link>
          </div>

          <div style={{ display: 'grid', gap: 'var(--space-4)', alignContent: 'center' }}>
            {teaserStats(stats).map((stat) => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                <span style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: 'var(--color-primary-500)', minWidth: '7rem' }}>
                  {stat.value}
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .ai-employee-teaser { grid-template-columns: 2fr 1fr; }
        }
      `}</style>
    </section>
  );
};

export default AIEmployeeTeaser;
