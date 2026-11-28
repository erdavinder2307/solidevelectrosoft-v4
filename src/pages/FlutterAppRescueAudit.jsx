import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBug,
  FaSyncAlt,
  FaBan,
  FaUserSlash,
  FaTachometerAlt,
  FaArrowRight,
} from 'react-icons/fa';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import { useSEO } from '../hooks/useSEO';
import { getCommonSchemas, generateBreadcrumbSchema } from '../utils/structuredData';
import { trackCTAClick } from '../utils/analytics';

const AUDIT_EMAIL = 'admin@solidevelectrosoft.com';
const BOOK_HREF = `mailto:${AUDIT_EMAIL}?subject=App%20Rescue%20Audit`;

const problems = [
  { icon: FaBug, text: 'Crashes or freezes that users report but nobody can reproduce' },
  { icon: FaSyncAlt, text: 'A build that fails after a Flutter or package upgrade' },
  { icon: FaBan, text: 'An App Store or Google Play update that got rejected' },
  { icon: FaUserSlash, text: 'A previous developer left, and nobody knows the codebase any more' },
  { icon: FaTachometerAlt, text: 'Slow screens, battery drain or a growing list of 1-star reviews' },
];

const deliverables = [
  {
    title: 'A plain-English report (PDF)',
    text: 'The top 10 problems, ranked by how much they hurt your users or your release, each with the file or area where it lives and why it happens.',
  },
  {
    title: 'A fix plan with a fixed price per item',
    text: "You choose what to fix, or you take the report to anyone else. It's yours.",
  },
  {
    title: 'Build and release check',
    text: 'Does it build cleanly for iOS and Android today, which packages are out of date or abandoned, and what would block your next store submission.',
  },
  {
    title: 'A 30-minute call',
    text: 'We go through the report together and answer your questions.',
  },
];

const needs = [
  'Read access to the repo (GitHub, GitLab or Bitbucket invite). Never send passwords.',
  'Optional: crash reports (Firebase Crashlytics or Sentry export), the store rejection message, a list of what users complain about.',
  "We'll sign your NDA, or send ours.",
];

const apps = [
  {
    name: 'SolidTrack Fitness',
    text: 'Workout logging, custom routines and progress tracking.',
    href: 'https://apps.apple.com/in/app/solidtrack-fitness/id6751640011',
  },
  {
    name: 'Mindset Fuel',
    text: 'A live app with a production AI (Claude) feature.',
    href: 'https://apps.apple.com/in/app/mindset-fuel/id6757799330',
  },
];

const smallPrint = [
  'The App Rescue Audit is offered by Solidev Electrosoft (OPC) Private Limited.',
  "The audit is advice and a fix plan; it doesn't include fixing (that's quoted separately, at a fixed price per item).",
  "We don't guarantee App Store or Google Play approval; we explain each rejection reason and the fix.",
];

const cardStyle = {
  background: 'var(--bg-primary)',
  border: '1px solid var(--border-light)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-6)',
};

const bodyText = { color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 };

const SectionHeading = ({ children }) => (
  <h2
    className="modern-h2"
    style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-8)', textAlign: 'center' }}
  >
    {children}
  </h2>
);

/**
 * Flutter App Rescue Audit
 * Fixed-price offer page. Booking is an email: no form, no backend.
 */
const FlutterAppRescueAudit = () => {
  useSEO({
    title: 'Flutter App Rescue Audit ($149)',
    description:
      'Fixed-price Flutter app audit for $149. In 3 working days from repo access you get a ranked top-10 problem report and a fix plan with a price per item. The $149 is credited to any fixes you order within 30 days.',
    canonical: '/flutter-app-rescue-audit',
    ogType: 'website',
    schemas: [
      ...getCommonSchemas(),
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
        { name: 'Services', url: 'https://www.solidevelectrosoft.com/services' },
        {
          name: 'Flutter App Rescue Audit',
          url: 'https://www.solidevelectrosoft.com/flutter-app-rescue-audit',
        },
      ]),
    ],
  });

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--bg-dark) 0%, #1a1a2e 100%)',
            padding: 'var(--space-24) 0 var(--space-16)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)
              `,
            }}
          />
          <div className="modern-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto' }}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="modern-badge"
              >
                Flutter App Rescue Audit
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-h1"
                style={{
                  color: 'white',
                  fontSize: 'clamp(1.875rem, 1.2rem + 3.4vw, 3.25rem)',
                  marginTop: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                Your Flutter app is stuck.{' '}
                <span className="gradient-text">
                  In 3 working days you&apos;ll know exactly why, and what it costs to fix.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--color-neutral-400)',
                  lineHeight: 1.7,
                  marginBottom: 'var(--space-8)',
                }}
              >
                A fixed-price App Rescue Audit for <strong style={{ color: 'white' }}>$149</strong>.
                If you then hire us to make the fixes within 30 days, the full $149 comes off the fix.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <a
                  href={BOOK_HREF}
                  onClick={() => trackCTAClick('Book the audit', 'rescue_audit_hero')}
                  className="modern-btn modern-btn-primary modern-btn-lg"
                >
                  Book the audit
                  <FaArrowRight size={14} aria-hidden="true" />
                </a>
                <p style={{ color: 'var(--color-neutral-400)', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                  Or ask a question first: one line about your app is enough.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Is this you? */}
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container" style={{ maxWidth: '900px' }}>
            <SectionHeading>Is this you?</SectionHeading>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--space-3)' }}>
              {problems.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  style={{
                    ...cardStyle,
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4) var(--space-5)',
                  }}
                >
                  <span style={{ color: 'var(--color-primary-500)', flexShrink: 0, display: 'flex' }}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What you get */}
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container" style={{ maxWidth: '1000px' }}>
            <SectionHeading>What you get</SectionHeading>
            <p style={{ ...bodyText, textAlign: 'center', marginTop: 'calc(var(--space-4) * -1)', marginBottom: 'var(--space-8)' }}>
              In 3 working days from repo access.
            </p>
            <div className="modern-grid modern-grid-2" style={{ gap: 'var(--space-6)' }}>
              {deliverables.map((item, index) => (
                <div key={item.title} style={cardStyle}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-primary-500)',
                      color: 'var(--text-inverse)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      marginBottom: 'var(--space-4)',
                    }}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </div>
                  <h3 className="modern-h4" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                    {item.title}
                  </h3>
                  <p style={bodyText}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How we check + What we need */}
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container" style={{ maxWidth: '1000px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              <div style={{ ...cardStyle, background: 'var(--bg-secondary)' }}>
                <h2 className="modern-h3" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                  How we check
                </h2>
                <p style={bodyText}>
                  We build and run the app, run Flutter&apos;s own analysis and dependency checks, read the crash
                  logs and store messages you share, and review the code areas behind each complaint. A senior
                  engineer reviews everything, with AI-assisted checks to go faster.
                </p>
                <p style={{ ...bodyText, marginTop: 'var(--space-4)' }}>
                  If your code must not go through any AI tool, tell us and we&apos;ll review it by hand. Same
                  price, one extra day.
                </p>
              </div>

              <div style={{ ...cardStyle, background: 'var(--bg-secondary)' }}>
                <h2 className="modern-h3" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                  What we need from you
                </h2>
                <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'grid', gap: 'var(--space-3)' }}>
                  {needs.map((text) => (
                    <li key={text} style={{ ...bodyText, listStyle: 'disc' }}>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container" style={{ maxWidth: '1000px' }}>
            <SectionHeading>Why us</SectionHeading>
            <p style={{ ...bodyText, textAlign: 'center', marginTop: 'calc(var(--space-4) * -1)', marginBottom: 'var(--space-8)' }}>
              We build and ship our own Flutter apps on the App Store.
            </p>
            <div className="modern-grid modern-grid-2" style={{ gap: 'var(--space-6)' }}>
              {apps.map((app) => (
                <div key={app.name} style={cardStyle}>
                  <h3 className="modern-h4" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                    {app.name}
                  </h3>
                  <p style={{ ...bodyText, marginBottom: 'var(--space-4)' }}>{app.text}</p>
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${app.name} on the App Store`}
                    style={{ color: 'var(--color-primary-600)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    View on the App Store →
                  </a>
                </div>
              ))}
            </div>
            <p style={{ ...bodyText, textAlign: 'center', marginTop: 'var(--space-8)' }}>
              We know the release side first-hand: signing, build numbers, review rejections, store listings.
            </p>
          </div>
        </section>

        {/* Price */}
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container" style={{ maxWidth: '900px' }}>
            <div
              style={{
                ...cardStyle,
                borderTop: '3px solid var(--color-primary-500)',
                padding: 'var(--space-8)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-8)',
                alignItems: 'center',
              }}
            >
              <div style={{ textAlign: 'center', flex: '0 0 auto', margin: '0 auto' }}>
                <div style={{ fontSize: 'var(--text-6xl)', fontWeight: 700, lineHeight: 1, color: 'var(--text-primary)' }}>
                  $149
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontWeight: 600 }}>
                  fixed price
                </div>
              </div>
              <div style={{ flex: '1 1 320px' }}>
                <h2 className="modern-h3" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>
                  Price
                </h2>
                <p style={bodyText}>
                  <strong style={{ color: 'var(--text-primary)' }}>$149, fixed.</strong> Pay upfront by card (after
                  your email, we send you a card payment link on day 1) or Upwork (if you prefer Upwork, we send you a
                  Direct Contract). It&apos;s credited 100% against any
                  fix you order from us within 30 days.
                </p>
                <p style={{ ...bodyText, marginTop: 'var(--space-3)' }}>
                  Not a fit? If we can&apos;t build or open your project at all within the first working day, we
                  refund in full.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Agencies */}
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <h2 className="modern-h3" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
              For agencies (white-label)
            </h2>
            <p style={bodyText}>
              Too many client apps and not enough Flutter hands? We do the same audit and the fixes{' '}
              <strong style={{ color: 'var(--text-primary)' }}>under your brand</strong>: no contact with your
              client unless you want it, NDA first, your repo and your process. Same $149 audit to start, so you
              can test us on one app.
            </p>
          </div>
        </section>

        {/* Call to action */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-800) 100%)',
            padding: 'var(--space-16) 0',
          }}
        >
          <div className="modern-container" style={{ maxWidth: '700px', textAlign: 'center' }}>
            <h2
              className="modern-h2"
              style={{ fontSize: 'var(--text-3xl)', color: 'var(--text-inverse)', marginBottom: 'var(--space-4)' }}
            >
              Ready to find out why your app is stuck?
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, marginBottom: 'var(--space-8)' }}>
              Email us to book the audit. Or ask a question first: one line about your app is enough.
            </p>
            <a
              href={BOOK_HREF}
              onClick={() => trackCTAClick('Book the audit', 'rescue_audit_footer')}
              className="modern-btn modern-btn-white modern-btn-lg"
            >
              Book the audit
              <FaArrowRight size={14} aria-hidden="true" />
            </a>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
              {AUDIT_EMAIL}
            </p>
          </div>
        </section>

        {/* Small print */}
        <section style={{ padding: 'var(--space-10) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container" style={{ maxWidth: '900px' }}>
            <h2 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>
              Small print
            </h2>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'grid', gap: 'var(--space-1)' }}>
              {smallPrint.map((text) => (
                <li key={text} style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)', lineHeight: 1.6, listStyle: 'disc' }}>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <ModernFooter />
    </>
  );
};

export default FlutterAppRescueAudit;
