import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ModernHeader from '../components/layout/ModernHeader';
import ModernFooter from '../components/layout/ModernFooter';
import CTABanner from '../components/sections/CTABanner';
import ControlDemo from '../components/sections/ControlDemo';
import TaskStory from '../components/sections/TaskStory';
import { FloatingCTA } from '../components/ui';
import AIProjectAssistant from '../components/ai/AIProjectAssistant';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { useAiTeamStats, formatStatsDate } from '../hooks/useAiTeamStats';
import {
  FaUserCheck,
  FaRocket, FaCalendarCheck, FaKey, FaTrashAlt, FaCodeBranch, FaUserSecret,
  FaUsers, FaClock, FaInbox, FaComments, FaDesktop, FaCalendarAlt,
  FaMobileAlt, FaImage, FaShieldAlt, FaDatabase, FaVial, FaSearch,
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
  { member: aiTeam.kabir, description: 'Checks our code changes twice a day and writes a plain-language verdict — ready, fix first, or don\'t merge — before a person decides.' },
  { member: aiTeam.naina, description: 'Finds customers. Researches the market, spots what stops people from buying, and drafts the plan and the messages to win them — a person approves and sends every one.' },
  { icon: FaUserCheck, title: 'You', description: 'Make every call. Approve tasks, review the work, and decide what reaches your customers.', human: true },
];

const workingDay = [
  { time: '09:00', title: 'Morning plan', description: 'Checks what came in overnight and suggests today\'s list.' },
  { time: 'Hourly', title: 'Build and check', description: 'One task built and one tested, every hour of the working day.' },
  { time: '13:30', title: 'Midday top-up', description: 'Suggests more work if the list is running low.' },
  { time: '18:30', title: 'Day report', description: 'What got done, what is stuck, and what needs a decision.' },
];

const taskSteps = [
  { title: 'Spotted', description: 'A bug, a test finding or a new idea.', member: aiTeam.asha, picture: 'spotted' },
  { title: 'Proposed', description: 'The manager writes down why, how big, and what done means.', member: aiTeam.asha, picture: 'proposed' },
  { title: 'Approved', description: 'You reply "go" or "skip".', you: true, picture: 'approved' },
  { title: 'Built', description: 'The developer makes the change on a separate copy.', member: aiTeam.arjun, picture: 'built' },
  { title: 'Checked', description: 'The tester tries it on a test machine.', member: aiTeam.meera, picture: 'checked' },
  { title: 'Reviewed', description: 'Kabir, our AI reviewer, reads the change and says whether it is ready.', member: aiTeam.kabir, picture: 'reviewed' },
  { title: 'Released', description: 'You review it and publish it.', you: true, picture: 'released' },
];

const controlPoints = [
  { icon: FaMobileAlt, title: 'One page, one tap', description: 'Approve, skip or ask for a change. Your AI team picks it up within 30 minutes.' },
  { icon: FaImage, title: 'A picture for every decision', description: 'A sketch of the screen, a before-and-after diagram or a simple chart. No code to read.' },
  { icon: FaShieldAlt, title: 'Nothing risky without you', description: 'Changes to live data, releases and merges wait for your tap.' },
];

const guardrails = [
  { icon: FaRocket, title: 'Never releases to customers', description: 'publishing stays with you.' },
  { icon: FaCalendarCheck, title: 'Never handles money or filings', description: 'it prepares checklists; it never pays, files or signs.' },
  { icon: FaKey, title: 'Never types a password', description: 'a person signs in once; the agents reuse that session.' },
  { icon: FaTrashAlt, title: 'Never deletes anything', description: 'files, tasks and history always stay.' },
  { icon: FaCodeBranch, title: 'Works on its own copy', description: 'your team\'s unfinished work is never touched.' },
  { icon: FaUserSecret, title: 'Keeps secrets out', description: 'no passwords or keys in reports, chats or code.' },
  { icon: FaDatabase, title: 'Live data changes', description: 'a dry run first, the real run only on your tap.' },
  { icon: FaVial, title: 'Releases go to test users first', description: 'you submit to the store.' },
  { icon: FaSearch, title: 'An AI reviewer checks our code changes before they ship', description: 'you decide to merge.' },
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

const liveCounters = (stats) => [
  {
    value: stats.improvementsShipped,
    title: 'Improvements shipped',
    label: 'Fixes and new features our AI team built and a person approved',
  },
  {
    value: stats.checksRun,
    title: 'Checks run',
    label: 'Times our AI tester tried a change the way a real user would',
  },
  {
    value: stats.problemsCaught,
    title: 'Problems caught',
    label: `Bugs our AI tester found before customers reported them — ${stats.problemsFixed} already fixed`,
  },
  stats.reviewsWritten > 0
    ? {
      value: stats.reviewsWritten,
      title: 'Reviews written',
      label: 'Changes our AI reviewer read line by line before a person decided to publish them',
    }
    : { value: 'New', title: 'Reviews written', label: 'Started 30 Sep 2026' },
];

const capabilities = [
  { icon: FaUsers, title: 'AI employees', description: 'A manager, developer, tester, reviewer and growth lead working your task list every hour, with you approving each step.' },
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
  const reduceMotion = useReducedMotion();
  const stats = useAiTeamStats();

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
                We build the whole team for you out of AI — a project manager, a developer, a tester, a reviewer and a growth
                lead that plan, build, test and review your product every hour. Our senior engineers set it up and keep watch; you approve
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
            <div className="modern-grid modern-grid-3">
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
            {reduceMotion ? (
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
            ) : (
              <TaskStory steps={taskSteps} />
            )}
            <motion.p {...fadeUp} style={noteStyle}>
              Steps 3 and 7 are always a person. Nothing reaches your customers without your click.
            </motion.p>
          </div>
        </section>

        {/* You stay in control */}
        <section
          id="you-stay-in-control"
          className="modern-section"
          style={{ background: 'linear-gradient(180deg, var(--color-primary-50) 0%, var(--bg-primary) 100%)' }}
        >
          <div className="modern-container">
            <SectionHeader
              title="You stay in control"
              intro="Everything that needs you sits on one page. Each decision comes with a picture, so you can say yes from your phone in seconds."
            />
            <div className="modern-grid modern-grid-3" style={{ marginBottom: 'var(--space-12)' }}>
              {controlPoints.map((point, index) => (
                <motion.div key={point.title} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.1 }}>
                  <div style={{ ...cardStyle, display: 'flex', gap: 'var(--space-4)' }}>
                    <IconBox icon={point.icon} />
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ ...cardTitleStyle, marginTop: 0 }}>{point.title}</h3>
                      <p style={cardTextStyle}>{point.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <ControlDemo />
            <p style={noteStyle}>
              Every morning your AI team also suggests what to build next from your roadmap, with a picture.
            </p>
            <p style={{ ...noteStyle, marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              The demo uses example tasks. {AI_TEAM_DISCLOSURE}
            </p>
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

        {/* Our AI team, live */}
        <section className="modern-section" style={{ background: 'var(--bg-dark)' }}>
          <div className="modern-container">
            <motion.div {...fadeUp} style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
              <h2 className="modern-h2" style={{ color: 'white', marginBottom: 'var(--space-2)' }}>Our AI team, live</h2>
              <p style={{ color: 'var(--color-neutral-400)', margin: 0 }}>
                Real numbers from our own work since 22 September 2026. Updated every morning.
              </p>
              <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)', margin: 'var(--space-2) 0 0' }}>
                Last updated {formatStatsDate(stats.updated)}
              </p>
            </motion.div>
            <div className="modern-grid modern-grid-4">
              {liveCounters(stats).map((stat, index) => (
                <motion.div key={stat.title} {...fadeUp} transition={{ duration: 0.4, delay: index * 0.1 }}>
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
                    <h3 style={{ ...cardTitleStyle, color: 'white', margin: 'var(--space-3) 0 var(--space-2)' }}>{stat.title}</h3>
                    <p style={{ ...cardTextStyle, color: 'var(--color-neutral-400)' }}>{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p
              {...fadeUp}
              style={{ ...noteStyle, color: 'var(--color-neutral-300)', lineHeight: 1.8, textAlign: 'left' }}
            >
              One Friday, the login on our SolidCare app stopped working. Our AI developer found the real cause and told
              us exactly what to change. We made that one change ourselves, and people could log in again 83 minutes
              after the problem was reported.
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
            .ai-employee-steps { grid-template-columns: repeat(7, 1fr); }
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
