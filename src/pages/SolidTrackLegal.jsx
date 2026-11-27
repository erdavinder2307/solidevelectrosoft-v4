import React from 'react';
import { Link } from 'react-router-dom';
import { ModernHeader, ModernFooter } from '../components/layout';
import { useSEO } from '../hooks/useSEO';
import { getCommonSchemas, generateBreadcrumbSchema } from '../utils/structuredData';
import { LEGAL_PAGES, SOLIDTRACK } from '../data/solidtrackLegal';

const BASE = '/solidtrack';
const SITE = 'https://www.solidevelectrosoft.com';

// Turn the support email and the App Store link inside plain text into links.
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const LINK_PATTERN = new RegExp(`(${escapeRegExp(SOLIDTRACK.email)}|${escapeRegExp(SOLIDTRACK.appStoreUrl)})`);
const withLinks = (text) =>
  text.split(LINK_PATTERN).map((part, i) => {
    if (part === SOLIDTRACK.email) return <a key={i} href={`mailto:${SOLIDTRACK.email}`}>{part}</a>;
    if (part === SOLIDTRACK.appStoreUrl) {
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
    }
    return part;
  });

// A block is text where a line starting with "• " is a bullet (the app's own format): plain lines become
// paragraphs and consecutive bullet lines one list.
const Block = ({ text }) => {
  const parts = [];
  text.split('\n').forEach((line) => {
    const last = parts[parts.length - 1];
    if (line.startsWith('• ')) {
      if (last && last.list) last.items.push(line.slice(2));
      else parts.push({ list: true, items: [line.slice(2)] });
    } else {
      parts.push({ list: false, text: line });
    }
  });
  return parts.map((part, i) =>
    part.list ? (
      <ul key={i} style={{ paddingLeft: 22, lineHeight: 1.7, fontSize: '1rem' }}>
        {part.items.map((item, j) => (
          <li key={j} style={{ marginBottom: 8, listStyle: 'disc' }}>{withLinks(item)}</li>
        ))}
      </ul>
    ) : (
      <p key={i} style={{ lineHeight: 1.7 }}>{withLinks(part.text)}</p>
    ),
  );
};

/** Privacy / Terms / Support pages for the SolidTrack app (SE-4140). Privacy and Terms carry the app's text word for word. */
const SolidTrackLegal = ({ page }) => {
  const content = LEGAL_PAGES[page];
  const path = `${BASE}/${content.slug}`;

  useSEO({
    title: content.seoTitle,
    description: content.description,
    canonical: path,
    ogType: 'article',
    schemas: [
      ...getCommonSchemas(),
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE}/` },
        { name: `${SOLIDTRACK.name} ${content.title}`, url: `${SITE}${path}` },
      ]),
    ],
  });

  return (
    <>
      <ModernHeader />
      <main style={{ background: 'var(--color-neutral-50, #fafafa)' }}>
        <div className="modern-container" style={{ maxWidth: 820, padding: '140px 20px 80px' }}>
          <p style={{ margin: 0, color: 'var(--color-primary-600, #0068d6)', fontWeight: 600 }}>
            {SOLIDTRACK.name}
          </p>
          <h1 style={{ margin: '8px 0 8px', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>{content.title}</h1>
          {content.showUpdated && (
            <p style={{ color: '#6b7280', marginBottom: 32 }}>Last updated: {SOLIDTRACK.updated}</p>
          )}

          <nav aria-label="SolidTrack pages" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
            {Object.values(LEGAL_PAGES).map((p) =>
              p.slug === content.slug ? (
                <strong key={p.slug}>{p.title}</strong>
              ) : (
                <Link key={p.slug} to={`${BASE}/${p.slug}`}>{p.title}</Link>
              ),
            )}
          </nav>

          {content.intro.map((t) => (
            <div key={t} style={{ fontSize: '1.05rem' }}><Block text={t} /></div>
          ))}

          {content.sections.map((s) => (
            <section key={s.heading} style={{ marginTop: 36 }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: 12 }}>{s.heading}</h2>
              {s.body.map((t) => (
                <Block key={t} text={t} />
              ))}
            </section>
          ))}

          <p style={{ marginTop: 48, color: '#6b7280' }}>
            {SOLIDTRACK.name} is made by {SOLIDTRACK.company}.
          </p>
        </div>
      </main>
      <ModernFooter />
    </>
  );
};

export default SolidTrackLegal;
