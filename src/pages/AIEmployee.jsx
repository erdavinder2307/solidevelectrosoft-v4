import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import CTABanner from '../components/sections/CTABanner';
import { FloatingCTA } from '../components/ui';
import AIProjectAssistant from '../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../hooks/useAIAssistant';
import {
  FaUserCheck,
  FaRocket, FaCalendarCheck, FaKey, FaTrashAlt, FaCodeBranch, FaUserSecret,
  FaUsers, FaClock, FaInbox, FaComments, FaDesktop, FaCalendarAlt,
} from 'react-icons/fa';
import { useSEO } from '../hooks/useSEO';
import { pageSEO } from '../utils/seo';
import { getCommonSchemas, generateBreadcrumbSchema } from '../utils/structuredData';
import { TRADEMARK_LINE } from '../utils/trademarks';
import { aiTeam, aiBadgeStyle, PORTRAIT_SIZE, AI_TEAM_DISCLOSURE } from '../data/aiTeam';

const team = [
  { member: aiTeam.asha, description: 'Plans the day. Reads email, tasks and code, suggests the day\'s work, and reports morning and evening.' },
  { member: aiTeam.arjun, description: 'Builds the work. Takes one approved task each hour and makes the change on its own copy of the code.' },
  { member: aiTeam.meera, description: 'Checks the work. Tries every change on a separate test machine and a virtual phone, then writes up what it found.' },
  { icon: FaUserCheck, title: 'You', description: 'Make every call. Approve tasks, review the work, and decide what reaches your customers.', human: true },
];

const workingDay = [
  { time: '09:00', title: 'Morning plan', description: 'Checks what came in overnight and suggests today\'s list.' },
  { time: 'Hourly', title: 'Build and check', description: 'One task built and one tested, every hour of the working day.' },
  { time: '13:30', title: 'Midday top-up', description: 'Suggests more work if the list is running low.' },
  { time: '18:30', title: 'Day report', description: 'What got done, what is stuck, and what needs a decision.' },
];

const taskSteps = [
  { title: 'Spotted', description: 'A bug, a test finding or a new idea.' },
  { title: 'Proposed', description: 'The manager writes down why, how big, and what done means.' },
  { title: 'Approved', description: 'You reply "go" or "skip".', you: true },
  { title: 'Built', description: 'The developer makes the change on a separate copy.' },
  { title: 'Checked', description: 'The tester tries it on a test machine.' },
  { title: 'Released', description: 'You review it and publish it.', you: true },
];

const guardrails = [
  { icon: FaRocket, title: 'Never releases to customers', description: 'publishing stays with you.' },
  { icon: FaCalendarCheck, title: 'Never handles money or filings', description: 'it prepares checklists; it never pays, files or signs.' },
  { icon: FaKey, title: 'Never types a password', description: 'a person signs in once; the agents reuse that session.' },
  { icon: FaTrashAlt, title: 'Never deletes anything', description: 'files, tasks and history always stay.' },
  { icon: FaCodeBranch, title: 'Works on its own copy', description: 'your team\'s unfinished work is never touched.' },
  { icon: FaUserSecret, title: 'Keeps secrets out', description: 'no passwords or keys in reports, chats or code.' },
];

const toolGroups = [
  { title: 'AI', tools: ['Claude (Claude Code, routines and scheduled tasks)', 'Cursor', 'GitHub Copilot', 'ChatGPT'] },
  { title: 'Where the work happens', tools: ['GitHub', 'Jira', 'Confluence', 'Microsoft Teams', 'OneDrive and Microsoft 365', 'Outlook', 'Gmail'] },
  { title: 'Testing', tools: ['Chrome', 'Android emulator'] },
];

const whyPoints = [
  { title: 'Starts in days, not months', description: 'no recruiting, onboarding or notice periods.' },
  { title: 'Works every hour of the working day', description: 'and writes down everything it does.' },
  { title: 'Senior engineers behind it', description: '13+ years of shipping software, so the AI\'s work is set up and checked by people who know what good looks like.' },
];

const numbers = [
  { value: '18', label: 'changes built, tested and approved' },
  { value: '14', label: 'test runs, none failed' },
  { value: '₹180', label: 'extra tax a ₹1,000 invoice picked up after editing: a billing bug our AI caught with its own tests, fixed the same day' },
  { value: '83 min', label: 'from "our login page is broken" to working again' },
];

const capabilities = [
  { icon: FaUsers, title: 'AI employees', description: 'A manager, developer and tester working your task list every hour, with you approving each step.' },
  { icon: FaClock, title: 'Scheduled tasks & routines', description: 'Jobs that run every morning, hour or week: reports, reminders, data checks, follow-ups.' },
  { icon: FaInbox, title: 'Inbox & document triage', description: 'Sort incoming mail and documents, draft replies, and flag what needs you. Nothing is sent without approval.' },
  { icon: FaComments, title: 'Reply watchers', description: 'Short replies in Teams or Slack turn into queued work, answers and updated task lists.' },
  { icon: FaDesktop, title: 'AI testing', description: 'Every change checked in real browsers and on phone emulators, with screenshots and a written result.' },
  { icon: FaCalendarAlt, title: 'Deadlines & compliance tracking', description: 'Due-date reminders and ready checklists. It never files or pays.' },
];

const startSteps = [
  { title: 'Free call', description: '30 minutes to pick the one workflow worth automating first.' },
  { title: 'Pilot', description: 'We set up agents for that workflow, with every step on "ask first".' },
  { title: 'Grow', description: 'Add workflows and loosen the guardrails only where the results have earned it.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
};

const SectionHeader = ({ title, intro }) => (
  <motion.div {...fadeUp} style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
    <h2 className="modern-h2" style={{ marginBottom: intro ? 'var(--space-4)' : 0 }}>{title}</h2>
    {intro && <p className="modern-lead">{intro}</p>}
  </motion.div>
);

const IconBox = ({ icon: Icon, muted = false }) => (
  <div
    style={{
      width: '48px',
      height: '48px',
      flexShrink: 0,
      borderRadius: 'var(--radius-lg)',
      background: muted ? 'var(--bg-tertiary)' : 'var(--color-primary-50)',
      color: muted ? 'var(--text-muted)' : 'var(--color-primary-500)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Icon size={22} />
  </div>
);

const cardStyle = {
  height: '100%',
  padding: 'var(--space-6)',
  background: 'var(--bg-primary)',
  borderRadius: 'var(--radius-xl)',
  border: '1px solid var(--border-light)',
};

const cardTitleStyle = {
  fontSize: 'var(--text-lg)',
  fontWeight: '600',
  color: 'var(--text-primary)',
  margin: 'var(--space-4) 0 var(--space-2)',
};

const cardTextStyle = {
  fontSize: 'var(--text-sm)',
  color: 'var(--text-secondary)',
  lineHeight: 1.7,
  margin: 0,
};

const noteStyle = {
  textAlign: 'center',
  maxWidth: '720px',
  margin: 'var(--space-10) auto 0',
  color: 'var(--text-secondary)',
};

const scrollToHowItWorks = () => {
  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * AI Employee page: our own AI software team, and the offer to build one for clients.
 */
const AIEmployee = () => {
  const { isAIOpen, openAI, closeAI } = useAIAssistant();

  useSEO({
    title: pageSEO.aiEmployee.title,
    description: pageSEO.aiEmployee.description,
    keywords: pageSEO.aiEmployee.keywords,
    canonical: pageSEO.aiEmployee.canonical,
    ogType: pageSEO.aiEmployee.ogType,
    schemas: [
      ...getCommonSchemas(),
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
        { name: 'AI Employee', url: 'https://www.solidevelectrosoft.com/ai-employee' },
      ]),
    ],
  });

  return (
    <>
      <ModernHeader />
      <main className="ai-employee-page">
        {/* Hero */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0f0f1a 0%, #0a1a2e 50%, #1a0a2e 100%)',
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
                radial-gradient(circle at 25% 20%, rgba(0, 133, 255, 0.2) 0%, transparent 40%),
                radial-gradient(circle at 75% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)
              `,
            }}
          />
          <div className="modern-container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '820px' }}>
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
                <Link to="/" style={{ color: 'var(--color-neutral-500)', textDecoration: 'none' }}>Home</Link>
                <span>/</span>
                <span style={{ color: 'var(--color-primary-400)' }}>AI Employee</span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="modern-badge"
                style={{ marginBottom: 'var(--space-4)', background: 'rgba(0, 133, 255, 0.2)', color: 'var(--color-primary-300)' }}
              >
                AI Employee · your software team, built with AI
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="modern-h1"
                style={{ color: 'white', margin: 'var(--space-4) 0 var(--space-6)', lineHeight: 1.1 }}
              >
                Need a software team?{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0085ff, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Skip the hiring.
                </span>
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
                We build the whole team for you out of AI — a project manager, a developer and a tester that plan,
                build and test your product every hour. Our senior engineers set it up and keep watch; you approve
                every step.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}
              >
                <button type="button" onClick={openAI} className="modern-btn modern-btn-primary modern-btn-lg">
                  Build my AI team
                  <span>→</span>
                </button>
                <button
                  type="button"
                  onClick={scrollToHowItWorks}
                  className="modern-btn modern-btn-lg"
                  style={{ border: '1px solid white', color: 'white', background: 'transparent' }}
                >
                  See how it works
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Meet the team */}
        <section className="modern-section modern-bg-light">
          <div className="modern-container">
            <SectionHeader title="Meet the team" />
            <div className="modern-grid modern-grid-4">
              {team.map((item, index) => (
                <motion.div key={item.member?.name ?? item.title} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.1 }}>
                  <div
                    style={{
                      ...cardStyle,
                      ...(item.human && {
                        background: 'var(--bg-dark)',
                        border: '1px solid var(--bg-dark)',
                      }),
                    }}
                  >
                    {item.member ? (
                      <>
                        <div style={{ position: 'relative' }}>
                          <img
                            src={item.member.image}
                            alt={item.member.alt}
                            width={PORTRAIT_SIZE}
                            height={PORTRAIT_SIZE}
                            loading="lazy"
                            decoding="async"
                            style={{
                              display: 'block',
                              width: '100%',
                              height: 'auto',
                              aspectRatio: '1 / 1',
                              objectFit: 'cover',
                              borderRadius: 'var(--radius-lg)',
                            }}
                          />
                          <span style={aiBadgeStyle}>AI</span>
                        </div>
                        <h3 style={{ ...cardTitleStyle, marginBottom: 0 }}>{item.member.name}</h3>
                        <p style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-primary-500)', margin: '0 0 var(--space-2)' }}>
                          {item.member.role}
                        </p>
                      </>
                    ) : (
                      <>
                        <IconBox icon={item.icon} />
                        <h3 style={{ ...cardTitleStyle, color: 'white' }}>{item.title}</h3>
                      </>
                    )}
                    <p style={{ ...cardTextStyle, ...(item.human && { color: 'var(--color-neutral-400)' }) }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...fadeUp}
              className="ai-employee-coming-soon"
              style={{
                marginTop: 'var(--space-6)',
                padding: 'var(--space-5) var(--space-6)',
                borderRadius: 'var(--radius-xl)',
                border: '1px dashed var(--border-light)',
                background: 'var(--bg-secondary)',
                opacity: 0.75,
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
              }}
            >
              <img
                src={aiTeam.kabir.image}
                alt={aiTeam.kabir.alt}
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                style={{
                  width: '56px',
                  height: '56px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                  opacity: 0.8,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: '600', color: 'var(--text-secondary)', margin: 0 }}>
                    {aiTeam.kabir.name} · {aiTeam.kabir.role}
                  </h3>
                  <span className="modern-badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                    Coming soon
                  </span>
                </div>
                <p style={{ ...cardTextStyle, color: 'var(--text-muted)' }}>
                  Reads every change before you do. A plain-language review of what changed, what could break, and
                  whether it is ready to release, so your final check takes minutes.
                </p>
              </div>
            </motion.div>

            <p style={{ ...noteStyle, marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              {AI_TEAM_DISCLOSURE}
            </p>
          </div>
        </section>

        {/* A working day */}
        <section className="modern-section" style={{ background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <SectionHeader title="A working day" />
            <div className="modern-grid modern-grid-4">
              {workingDay.map((slot, index) => (
                <motion.div key={slot.title} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.1 }}>
                  <div style={{ ...cardStyle, background: 'var(--bg-secondary)' }}>
                    <span style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'var(--color-primary-500)' }}>
                      {slot.time}
                    </span>
                    <h3 style={{ ...cardTitleStyle, marginTop: 'var(--space-2)' }}>{slot.title}</h3>
                    <p style={cardTextStyle}>{slot.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p
              {...fadeUp}
              style={{
                margin: 'var(--space-8) auto 0',
                maxWidth: '860px',
                padding: 'var(--space-4) var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-primary-50)',
                color: 'var(--text-primary)',
                textAlign: 'center',
              }}
            >
              Every hour it also reads your short replies — "#2 go", "#3 skip" — in Microsoft Teams or Slack and acts on them.
            </motion.p>
          </div>
        </section>

        {/* How one task travels */}
        <section id="how-it-works" className="modern-section modern-bg-light" style={{ scrollMarginTop: '80px' }}>
          <div className="modern-container">
            <SectionHeader title="How one task travels" />
            <ol className="ai-employee-steps" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {taskSteps.map((step, index) => (
                <motion.li key={step.title} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.08 }}>
                  <div
                    style={{
                      ...cardStyle,
                      border: step.you ? '2px solid var(--color-primary-500)' : cardStyle.border,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
                      <span
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: step.you ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                          color: step.you ? 'white' : 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        {index + 1}
                      </span>
                      {step.you && (
                        <span className="modern-badge" style={{ background: 'var(--color-primary-500)', color: 'white' }}>
                          You
                        </span>
                      )}
                    </div>
                    <h3 style={cardTitleStyle}>{step.title}</h3>
                    <p style={cardTextStyle}>{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
            <motion.p {...fadeUp} style={noteStyle}>
              Steps 3 and 6 are always a person. Nothing reaches your customers without your click.
            </motion.p>
          </div>
        </section>

        {/* Guardrails built in */}
        <section className="modern-section" style={{ background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <SectionHeader title="Guardrails built in" />
            <div className="modern-grid modern-grid-3">
              {guardrails.map((rule, index) => (
                <motion.div key={rule.title} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.08 }}>
                  <div style={{ ...cardStyle, background: 'var(--bg-secondary)', display: 'flex', gap: 'var(--space-4)' }}>
                    <IconBox icon={rule.icon} />
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ ...cardTitleStyle, marginTop: 0 }}>{rule.title}</h3>
                      <p style={cardTextStyle}>{rule.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p {...fadeUp} style={noteStyle}>
              You choose how much it does alone: start with "ask first", then let small, safe jobs run by themselves as trust grows.
            </motion.p>
          </div>
        </section>

        {/* Built with the tools you already know */}
        <section className="modern-section modern-bg-light">
          <div className="modern-container">
            <SectionHeader
              title="Built with the tools you already know"
              intro="Our own AI team runs on Claude. For yours we pick what fits your stack and budget."
            />
            <div className="modern-grid modern-grid-3">
              {toolGroups.map((group) => (
                <motion.div key={group.title} {...fadeUp}>
                  <div style={cardStyle}>
                    <h3 style={{ ...cardTitleStyle, marginTop: 0, marginBottom: 'var(--space-4)' }}>{group.title}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                      {group.tools.map((tool) => (
                        <span
                          key={tool}
                          style={{
                            padding: 'var(--space-2) var(--space-3)',
                            background: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--border-light)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p style={{ ...noteStyle, fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{TRADEMARK_LINE}</p>
          </div>
        </section>

        {/* Why an AI team instead of hiring */}
        <section className="modern-section" style={{ background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <SectionHeader title="Why an AI team instead of hiring" />
            <div className="modern-grid modern-grid-3">
              {whyPoints.map((point, index) => (
                <motion.div key={point.title} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.1 }}>
                  <div style={{ ...cardStyle, background: 'var(--bg-secondary)' }}>
                    <h3 style={{ ...cardTitleStyle, marginTop: 0 }}>{point.title}</h3>
                    <p style={cardTextStyle}>{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* We use it every day */}
        <section className="modern-section" style={{ background: 'var(--bg-dark)' }}>
          <div className="modern-container">
            <motion.div {...fadeUp} style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
              <h2 className="modern-h2" style={{ color: 'white', marginBottom: 'var(--space-2)' }}>We use it every day</h2>
              <p style={{ color: 'var(--color-neutral-400)', margin: 0 }}>Our own first week, 22–25 September 2026.</p>
            </motion.div>
            <div className="modern-grid modern-grid-4">
              {numbers.map((stat, index) => (
                <motion.div key={stat.value} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.1 }}>
                  <div
                    style={{
                      ...cardStyle,
                      background: 'var(--bg-dark-secondary)',
                      border: '1px solid var(--color-neutral-800)',
                    }}
                  >
                    <div style={{ fontSize: 'var(--text-4xl)', fontWeight: '700', color: 'var(--color-primary-400)', lineHeight: 1.1 }}>
                      {stat.value}
                    </div>
                    <p style={{ ...cardTextStyle, color: 'var(--color-neutral-400)', marginTop: 'var(--space-3)' }}>{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p
              {...fadeUp}
              style={{ ...noteStyle, color: 'var(--color-neutral-300)', lineHeight: 1.8, textAlign: 'left' }}
            >
              One Friday morning the login page of our SolidCare app started failing. The AI developer looked past the
              misleading error, found the server had lost its database connection, and told us exactly what to change.
              A person made the one change only a person may make, and login was back 83 minutes after the report. By
              the afternoon three follow-up fixes were built and tested.
            </motion.p>
          </div>
        </section>

        {/* Your AI team can also take on */}
        <section className="modern-section modern-bg-light">
          <div className="modern-container">
            <SectionHeader title="Your AI team can also take on" />
            <div className="modern-grid modern-grid-3">
              {capabilities.map((item, index) => (
                <motion.div key={item.title} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.08 }}>
                  <div style={cardStyle}>
                    <IconBox icon={item.icon} />
                    <h3 style={cardTitleStyle}>{item.title}</h3>
                    <p style={cardTextStyle}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How we start */}
        <section className="modern-section" style={{ background: 'var(--bg-primary)' }}>
          <div className="modern-container">
            <SectionHeader title="How we start" />
            <ol className="modern-grid modern-grid-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {startSteps.map((step, index) => (
                <motion.li key={step.title} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.1 }}>
                  <div style={{ ...cardStyle, background: 'var(--bg-secondary)' }}>
                    <span style={{ fontSize: 'var(--text-3xl)', fontWeight: '700', color: 'var(--color-primary-500)' }}>
                      {index + 1}
                    </span>
                    <h3 style={{ ...cardTitleStyle, marginTop: 'var(--space-2)' }}>{step.title}</h3>
                    <p style={cardTextStyle}>{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <CTABanner
          variant="dark"
          title="Your software team is one call away"
          subtitle="Start with one project or workflow. You approve every step until you decide otherwise."
          primaryCTA={{
            text: 'Build my AI team',
            onClick: openAI,
            isButton: true,
          }}
          secondaryCTA={{
            text: 'Schedule a Call',
            link: 'https://wa.me/919115866828',
            external: true,
          }}
        />

        <style>{`
          .ai-employee-steps {
            display: grid;
            gap: var(--space-4);
            grid-template-columns: repeat(1, 1fr);
          }
          @media (min-width: 480px) {
            .ai-employee-steps { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 768px) {
            .ai-employee-steps { grid-template-columns: repeat(3, 1fr); }
          }
          @media (min-width: 1200px) {
            .ai-employee-steps { grid-template-columns: repeat(6, 1fr); }
          }
          .ai-employee-page h3 { overflow-wrap: anywhere; }
        `}</style>
      </main>
      <ModernFooter onQuoteClick={openAI} />
      <FloatingCTA onQuoteClick={openAI} />
      <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} />
    </>
  );
};

export default AIEmployee;
