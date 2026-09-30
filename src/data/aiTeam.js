import ashaImg from '../assets/img/ai-team/asha-ai-project-manager-800.jpg';
import arjunImg from '../assets/img/ai-team/arjun-ai-developer-800.jpg';
import meeraImg from '../assets/img/ai-team/meera-ai-tester-800.jpg';
import kabirImg from '../assets/img/ai-team/kabir-ai-reviewer-800.jpg';

// AI characters, not staff.
export const aiTeam = {
  asha: { name: 'Asha', role: 'AI Project Manager', image: ashaImg, alt: 'AI-generated illustration of Asha, the AI project manager' },
  arjun: { name: 'Arjun', role: 'AI Developer', image: arjunImg, alt: 'AI-generated illustration of Arjun, the AI developer' },
  meera: { name: 'Meera', role: 'AI Tester', image: meeraImg, alt: 'AI-generated illustration of Meera, the AI tester' },
  kabir: { name: 'Kabir', role: 'AI Reviewer', image: kabirImg, alt: 'AI-generated illustration of Kabir, the AI reviewer' },
};

export const activeAITeam = [aiTeam.asha, aiTeam.arjun, aiTeam.meera, aiTeam.kabir];

export const PORTRAIT_SIZE = 800;

// The small "AI" label placed on a portrait's corner (the parent must be position: relative).
export const aiBadgeStyle = {
  position: 'absolute',
  right: '6%',
  bottom: '6%',
  padding: '2px 8px',
  borderRadius: '999px',
  background: 'var(--color-primary-500, #0085ff)',
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: 700,
  lineHeight: 1.5,
  letterSpacing: '0.04em',
  boxShadow: '0 0 0 2px #ffffff',
};

export const AI_TEAM_DISCLOSURE =
  'Asha, Arjun, Meera and Kabir are AI agents shown as AI-generated illustrations, not real people.';
