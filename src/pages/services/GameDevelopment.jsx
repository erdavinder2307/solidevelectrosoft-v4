import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModernHeader from '../../components/layout/ModernHeader';
import ModernFooter from '../../components/layout/ModernFooter';
import CTABanner from '../../components/sections/CTABanner';
import { FloatingCTA } from '../../components/ui';
import AIProjectAssistant from '../../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import { FaMobileAlt, FaPuzzlePiece, FaFlask, FaGlobe, FaMagic, FaStore } from 'react-icons/fa';
import { useSEO } from '../../hooks/useSEO';
import { pageSEO } from '../../utils/seo';
import { getCommonSchemas, generateBreadcrumbSchema, generateServiceSchema } from '../../utils/structuredData';

/**
 * Small teaser card for one of our own games.
 * The image is optional: pass `image` (a URL) once real in-game captures are available.
 */
const GameTeaserCard = ({ label, title, text, image, imageAlt = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    style={{
      maxWidth: '720px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-light)',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden',
    }}
  >
    {image && (
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
    )}
    <div style={{ padding: 'var(--space-8)' }}>
      <span
        style={{
          display: 'inline-block',
          padding: 'var(--space-1) var(--space-3)',
          background: 'rgba(168, 85, 247, 0.15)',
          color: '#c084fc',
          fontSize: 'var(--text-xs)',
          fontWeight: '700',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: 'var(--space-4)',
        }}
      >
        {label}
      </span>
      <h2
        className="modern-h2"
        style={{ color: 'white', marginBottom: 'var(--space-3)', letterSpacing: '0.04em' }}
      >
        {title}
      </h2>
      <p style={{ color: 'var(--color-neutral-400)', fontSize: 'var(--text-lg)', lineHeight: 1.7, margin: 0 }}>
        {text}
      </p>
    </div>
  </motion.div>
);

/**
 * Game Development Service Page
 */
const GameDevelopmentService = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();

  // SEO Configuration
  useSEO({
    title: pageSEO.servicesGameDev.title,
    description: pageSEO.servicesGameDev.description,
    keywords: pageSEO.servicesGameDev.keywords,
    canonical: pageSEO.servicesGameDev.canonical,
    ogType: pageSEO.servicesGameDev.ogType,
    schemas: [
      ...getCommonSchemas(),
      generateServiceSchema({
        name: 'Mobile Game Development',
        description: pageSEO.servicesGameDev.description,
        offerings: [
          { name: 'Unity mobile games', description: 'Unity 6 with URP, tuned for phones first' },
          { name: '2D casual games', description: 'Puzzle, runner and arcade games for players with five spare minutes' },
          { name: 'Game prototypes', description: 'A rough but playable build in weeks, so you can test the fun before paying for full art' },
          { name: 'Store release support', description: 'Builds, store listings, screenshots and the review back-and-forth for the App Store and Android stores' },
        ],
      }),
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
        { name: 'Services', url: 'https://www.solidevelectrosoft.com/services' },
        { name: 'Game Development', url: 'https://www.solidevelectrosoft.com/services/game-development' },
      ]),
    ],
  });

  const features = [
    {
      icon: FaMobileAlt,
      title: 'Unity mobile games',
      description: 'Unity 6 with URP, tuned for phones first: steady frame rate, small downloads, touch controls that feel right.',
    },
    {
      icon: FaPuzzlePiece,
      title: 'Casual and 2D games',
      description: 'Puzzle, runner and arcade games for players with five spare minutes.',
    },
    {
      icon: FaFlask,
      title: 'Playable prototypes',
      description: 'A rough but playable build in weeks, so you can test the fun before paying for full art.',
    },
    {
      icon: FaGlobe,
      title: 'Web builds',
      description: 'Unity WebGL games that run in the browser, like the one on our own site.',
    },
    {
      icon: FaMagic,
      title: 'AI-assisted art',
      description: 'Models blocked out in Blender, then textures and detail from AI tools, then checked and cut down until they run on a phone.',
    },
    {
      icon: FaStore,
      title: 'Store release help',
      description: 'Builds, store listings, screenshots and the review back-and-forth for the App Store and Android stores.',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Idea to one-page plan',
      description: 'Core loop, target players, platforms, and what "fun" means for this game.',
    },
    {
      step: '02',
      title: 'Prototype',
      description: 'Grey boxes and placeholder art, on a real phone, as early as possible.',
    },
    {
      step: '03',
      title: 'Build in small steps',
      description: 'Each change is a small, reviewed piece. Automated checks run on every build (compile, tests, performance limits).',
    },
    {
      step: '04',
      title: 'Polish and release',
      description: 'Art pass, sound, playtests, store listing, submission.',
    },
  ];

  const faqs = [
    {
      question: 'Which engines do you use?',
      answer: 'Unity for most mobile games (Unity 6). For simple 2D games inside a Flutter app we can also use Flutter\'s Flame engine.',
    },
    {
      question: 'Can you start from my idea or my existing project?',
      answer: 'Yes. We can start from a one-page idea, or take over an existing Unity project and fix, finish or port it.',
    },
    {
      question: 'How do you use AI for art?',
      answer: 'AI tools help with textures, detail and first drafts. A person checks every asset, and we only ship assets whose licence allows commercial use.',
    },
    {
      question: 'Who owns the game?',
      answer: 'You do. Code, art and store accounts are yours when the work is paid for.',
    },
    {
      question: 'How much does a game cost?',
      answer: 'It depends on scope. We usually start with a fixed-price prototype, so you see something playable before committing to the full build. Tell us your idea and we will send a fixed quote.',
    },
  ];

  return (
    <>
      <ModernHeader />
      <main>
        {/* Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
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
                radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
              `,
            }}
          />

          <div className="modern-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '800px' }}>
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-6)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-neutral-500)',
                }}
              >
                <Link to="/" style={{ color: 'var(--color-neutral-500)', textDecoration: 'none' }}>
                  Home
                </Link>
                <span>/</span>
                <Link to="/services" style={{ color: 'var(--color-neutral-500)', textDecoration: 'none' }}>
                  Services
                </Link>
                <span>/</span>
                <span style={{ color: 'var(--color-primary-400)' }}>Game Development</span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-badge"
                style={{ marginBottom: 'var(--space-4)' }}
              >
                Game development
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="modern-h1"
                style={{
                  color: 'white',
                  marginBottom: 'var(--space-6)',
                  lineHeight: 1.1,
                }}
              >
                Mobile games,{' '}
                <span className="gradient-text">built in Unity</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--color-neutral-400)',
                  marginBottom: 'var(--space-8)',
                  lineHeight: 1.7,
                }}
              >
                We build iOS and Android games from first prototype to store release. Our AI game
                developer does the heavy lifting and a person checks every change before it ships.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)',
                }}
              >
                <Link to="/contact" className="modern-btn modern-btn-primary modern-btn-lg">
                  Talk about your game
                  <span>→</span>
                </Link>
                <a
                  href="/ai-team-game/index.html"
                  className="modern-btn modern-btn-outline modern-btn-lg"
                  style={{ borderColor: 'white', color: 'white' }}
                >
                  Play our office game
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What we build */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                What we build
              </h2>
            </motion.div>

            <div className="modern-grid modern-grid-3" style={{ gap: 'var(--space-6)' }}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    style={{
                      padding: 'var(--space-8)',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid var(--border-light)',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'all var(--transition-default)',
                      textAlign: 'center',
                    }}
                    className="feature-card-game"
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 16px rgba(168, 85, 247, 0.2)',
                        margin: '0 auto var(--space-4)',
                      }}
                    >
                      <Icon size={28} color="#ffffff" />
                    </div>
                    <h3
                      style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-2)',
                        lineHeight: 1.3,
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Add CSS for hover effects */}
        <style>{`
          .feature-card-game:hover {
            border-color: #a855f7;
            box-shadow: 0 20px 40px rgba(168, 85, 247, 0.15);
          }
        `}</style>

        {/* How we work */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                How we work
              </h2>
            </motion.div>

            <div className="modern-grid modern-grid-2" style={{ gap: 'var(--space-6)' }}>
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-6)',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-3xl)',
                      fontWeight: '700',
                      color: 'var(--color-primary-500)',
                      opacity: 0.3,
                      lineHeight: 1,
                    }}
                  >
                    {step.step}
                  </span>
                  <div>
                    <h3 className="modern-h5" style={{ marginBottom: 'var(--space-2)' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI game developer, with a person in charge */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                An AI game developer, with a person in charge
              </h2>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-lg)',
                  lineHeight: 1.7,
                  marginBottom: 'var(--space-8)',
                }}
              >
                Our AI game developer writes code, builds levels and runs the tests inside the Unity
                project. It never ships on its own: every change is a small pull request that a person
                reviews and approves first. You get the speed of AI and the judgement of an experienced
                developer.
              </p>
              <Link to="/ai-employee" className="modern-btn modern-btn-outline modern-btn-lg">
                Meet the AI team
                <span>→</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Our own game (text only until real in-game captures are available) */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-secondary)' }}>
          <div className="modern-container">
            <GameTeaserCard
              label="Our own game"
              title="ASHFALL"
              text="An endless survival runner made in Unity. In development."
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ padding: 'var(--space-20) 0', background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
            >
              <h2 className="modern-h2" style={{ marginBottom: 'var(--space-4)' }}>
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{
                    padding: 'var(--space-6)',
                    borderBottom: '1px solid var(--border-color)',
                  }}
                >
                  <h3 className="modern-h5" style={{ marginBottom: 'var(--space-2)' }}>
                    {faq.question}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          variant="gradient"
          title="Have a game idea?"
          subtitle="Tell us about it. We reply with questions, a plan and a fixed quote for a first playable prototype."
          primaryCTA={{
            text: 'Talk about your game',
            link: '/contact',
          }}
          showSecondary={false}
        />
      </main>
      <ModernFooter />
      <FloatingCTA onQuoteClick={openAI} />
      <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />
    </>
  );
};

export default GameDevelopmentService;
