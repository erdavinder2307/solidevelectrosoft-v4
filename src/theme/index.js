/**
 * Theme Configuration for Solidev Electrosoft
 * Modern SaaS-inspired design tokens
 * Inspired by: Linear, Vercel, Webflow, Stripe
 */

export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      50: '#f0f7ff',
      100: '#e0efff',
      200: '#b9dfff',
      300: '#7cc4ff',
      400: '#36a5ff',
      500: '#0085ff',
      600: '#0068d6',
      700: '#0052ad',
      800: '#00448f',
      900: '#003a76',
      950: '#00254d',
    },
    // Neutral colors for text and backgrounds
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    // Accent/Secondary colors
    accent: {
      purple: '#8b5cf6',
      pink: '#ec4899',
      orange: '#f97316',
      teal: '#14b8a6',
      emerald: '#10b981',
    },
    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f5f5f5',
      dark: '#0a0a0a',
      darkSecondary: '#171717',
    },
    // Text colors
    text: {
      primary: '#171717',
      secondary: '#525252',
      tertiary: '#737373',
      muted: '#a3a3a3',
      inverse: '#ffffff',
    },
    // Border colors
    border: {
      light: '#e5e5e5',
      default: '#d4d4d4',
      dark: '#404040',
    },
    // Gradient presets
    gradients: {
      primary: 'linear-gradient(135deg, #0085ff 0%, #0052ad 100%)',
      dark: 'linear-gradient(135deg, #171717 0%, #0a0a0a 100%)',
      subtle: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
      hero: 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #262626 100%)',
      glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    },
  },

  typography: {
    // Font families
    fontFamily: {
      sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", Consolas, Monaco, "Courier New", monospace',
      display: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    // Font sizes (responsive)
    fontSize: {
      xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
      sm: 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',
      base: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
      lg: 'clamp(1.125rem, 1rem + 0.6vw, 1.25rem)',
      xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
      '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
      '3xl': 'clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem)',
      '4xl': 'clamp(2.25rem, 1.8rem + 2vw, 3rem)',
      '5xl': 'clamp(3rem, 2.2rem + 3vw, 4rem)',
      '6xl': 'clamp(3.75rem, 2.5rem + 5vw, 5rem)',
      '7xl': 'clamp(4.5rem, 3rem + 6vw, 6rem)',
    },
    // Font weights
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    // Line heights
    lineHeight: {
      none: 1,
      tight: 1.1,
      snug: 1.25,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    // Letter spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  spacing: {
    // Spacing scale (based on 4px base unit)
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem',  // 8px
    3: '0.75rem', // 12px
    4: '1rem',    // 16px
    5: '1.25rem', // 20px
    6: '1.5rem',  // 24px
    8: '2rem',    // 32px
    10: '2.5rem', // 40px
    12: '3rem',   // 48px
    16: '4rem',   // 64px
    20: '5rem',   // 80px
    24: '6rem',   // 96px
    32: '8rem',   // 128px
    40: '10rem',  // 160px
    48: '12rem',  // 192px
    // Section spacing
    section: {
      sm: 'clamp(3rem, 2rem + 5vw, 5rem)',
      md: 'clamp(4rem, 3rem + 6vw, 7rem)',
      lg: 'clamp(5rem, 4rem + 8vw, 10rem)',
    },
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    default: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 20px rgba(0, 133, 255, 0.3)',
    glowLg: '0 0 40px rgba(0, 133, 255, 0.4)',
  },

  // Transitions
  transitions: {
    fast: '150ms ease',
    default: '200ms ease',
    slow: '300ms ease',
    slower: '500ms ease',
    // Specific animations
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index scale
  zIndex: {
    behind: -1,
    base: 0,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    popover: 500,
    tooltip: 600,
    toast: 700,
  },

  // Container widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },
};

// CSS custom properties generator
export const getCSSVariables = () => {
  return `
    :root {
      /* Colors - Primary */
      --color-primary-50: ${theme.colors.primary[50]};
      --color-primary-100: ${theme.colors.primary[100]};
      --color-primary-200: ${theme.colors.primary[200]};
      --color-primary-300: ${theme.colors.primary[300]};
      --color-primary-400: ${theme.colors.primary[400]};
      --color-primary-500: ${theme.colors.primary[500]};
      --color-primary-600: ${theme.colors.primary[600]};
      --color-primary-700: ${theme.colors.primary[700]};
      --color-primary-800: ${theme.colors.primary[800]};
      --color-primary-900: ${theme.colors.primary[900]};
      
      /* Colors - Neutral */
      --color-neutral-50: ${theme.colors.neutral[50]};
      --color-neutral-100: ${theme.colors.neutral[100]};
      --color-neutral-200: ${theme.colors.neutral[200]};
      --color-neutral-300: ${theme.colors.neutral[300]};
      --color-neutral-400: ${theme.colors.neutral[400]};
      --color-neutral-500: ${theme.colors.neutral[500]};
      --color-neutral-600: ${theme.colors.neutral[600]};
      --color-neutral-700: ${theme.colors.neutral[700]};
      --color-neutral-800: ${theme.colors.neutral[800]};
      --color-neutral-900: ${theme.colors.neutral[900]};
      --color-neutral-950: ${theme.colors.neutral[950]};
      
      /* Semantic colors */
      --color-success: ${theme.colors.success};
      --color-warning: ${theme.colors.warning};
      --color-error: ${theme.colors.error};
      --color-info: ${theme.colors.info};
      
      /* Typography */
      --font-sans: ${theme.typography.fontFamily.sans};
      --font-mono: ${theme.typography.fontFamily.mono};
      
      /* Shadows */
      --shadow-sm: ${theme.shadows.sm};
      --shadow-default: ${theme.shadows.default};
      --shadow-md: ${theme.shadows.md};
      --shadow-lg: ${theme.shadows.lg};
      --shadow-xl: ${theme.shadows.xl};
      
      /* Transitions */
      --transition-fast: ${theme.transitions.fast};
      --transition-default: ${theme.transitions.default};
      --transition-slow: ${theme.transitions.slow};
    }
  `;
};

export default theme;
