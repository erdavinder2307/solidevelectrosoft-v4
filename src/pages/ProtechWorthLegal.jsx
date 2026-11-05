import React from 'react';
import { Link } from 'react-router-dom';
import { ModernHeader, ModernFooter } from '../components/layout';
import { useSEO } from '../hooks/useSEO';
import { getCommonSchemas, generateBreadcrumbSchema } from '../utils/structuredData';
import { LEGAL_PAGES, PROTECH_WORTH } from '../data/protechWorthLegal';

const BASE = '/apps/protech-worth';
const SITE = 'https://www.solidevelectrosoft.com';

// Linkify the support email inside plain text.
const withEmailLinks = (text) =>
  text.split(PROTECH_WORTH.email).flatMap((part, i, arr) =>
    i < arr.length - 1
      ? [part, <a key={i} href={`mailto:${PROTECH_WORTH.email}`}>{PROTECH_WORTH.email}</a>]
      : [part],
  );

/** Privacy / Terms / Support pages for the Protech Worth app (SE-4182). */
const ProtechWorthLegal = ({ page }) => {
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
        { name: `${PROTECH_WORTH.name} ${content.title}`, url: `${SITE}${path}` },
      ]),
    ],
  });

  return (
    <>
      <ModernHeader />
      <main style={{ background: 'var(--color-neutral-50, #fafafa)' }}>
        <div className="modern-container" style={{ maxWidth: 820, padding: '140px 20px 80px' }}>
          <p style={{ margin: 0, color: 'var(--color-primary-600, #0068d6)', fontWeight: 600 }}>
            {PROTECH_WORTH.name}
          </p>
          <h1 style={{ margin: '8px 0 8px', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>{content.title}</h1>
          <p style={{ color: '#6b7280', marginBottom: 32 }}>Last updated: {PROTECH_WORTH.updated}</p>

          <nav aria-label="Protech Worth pages" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
            {Object.values(LEGAL_PAGES).map((p) =>
              p.slug === content.slug ? (
                <strong key={p.slug}>{p.title}</strong>
              ) : (
                <Link key={p.slug} to={`${BASE}/${p.slug}`}>{p.title}</Link>
              ),
            )}
          </nav>

          {content.intro.map((t) => (
            <p key={t} style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>{withEmailLinks(t)}</p>
          ))}

          {content.sections.map((s) => (
            <section key={s.heading} style={{ marginTop: 36 }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: 12 }}>{s.heading}</h2>
              {(s.paragraphs || []).map((t) => (
                <p key={t} style={{ lineHeight: 1.7 }}>{withEmailLinks(t)}</p>
              ))}
              {s.bullets && (
                <ul style={{ paddingLeft: 22, lineHeight: 1.7, fontSize: '1rem' }}>
                  {s.bullets.map((t) => (
                    <li key={t} style={{ marginBottom: 8, listStyle: 'disc' }}>{withEmailLinks(t)}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p style={{ marginTop: 48, color: '#6b7280' }}>
            {PROTECH_WORTH.name} is made by {PROTECH_WORTH.company}.
          </p>
        </div>
      </main>
      <ModernFooter />
    </>
  );
};

export default ProtechWorthLegal;
