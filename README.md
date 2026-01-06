# Solidev Electrosoft Website - React Migration

This project is a React.js migration of the original HTML website for Solidev Electrosoft Pvt. Ltd.

## Project Structure

```
src/
├── components/
│   ├── layout/           # Layout components (Header, Footer)
│   ├── sections/         # Page sections (Hero, About, Team, etc.)
│   ├── ui/              # UI components (FloatingMenu, PreLoader, etc.)
│   └── styles/          # Custom CSS for React components
├── assets/              # Static assets (CSS, JS, images, fonts)
└── App.jsx             # Main application component
```

## Components Overview

### Layout Components
- **Header.jsx** - Main navigation header with logo, menu, search, and offcanvas
- **Footer.jsx** - Footer with social links, company info, and contact details

### Section Components
- **Hero.jsx** - Hero slider with multiple slides and call-to-action
- **About.jsx** - Company description and services overview
- **CTA.jsx** - Call-to-action section with establishment year
- **Gallery.jsx** - Quote images gallery section
- **Team.jsx** - Team members showcase with social links
- **Feature.jsx** - Feature section with business tips
- **Testimonials.jsx** - Client testimonials carousel
- **Clients.jsx** - Client logos/brands showcase
- **ContactCTA.jsx** - Contact call-to-action button section

### UI Components
- **PreLoader.jsx** - Loading screen component
- **BackToTop.jsx** - Scroll-to-top button with progress indicator
- **MouseCursor.jsx** - Custom mouse cursor effects
- **FloatingMenu.jsx** - Multi-action floating menu (Call, WhatsApp, Query)

## Features

### Interactive Elements
- Responsive design with Bootstrap grid system
- Hero slider with automatic rotation
- Testimonials carousel
- Floating action menu with contact options
- Custom mouse cursor effects
- Smooth scroll animations
- Mobile-responsive navigation

### SEO & Analytics
- Google Analytics integration (GT-KFNT9K9X, GT-MBLK2C2Q)
- Proper meta tags and descriptions
- Favicon and social media integration
- Schema markup ready structure

### AI Project Requirements Assistant
- **Backend**: Firebase Functions (Node.js 20)
- **AI**: Claude Sonnet 4.5 API for intelligent requirements gathering
- **Email**: Azure Communication Services with verified domain
- **Features**: 
  - Two modes: Requirements gathering & Consultation
  - Real-time chat interface with markdown support
  - Quick reply suggestions from AI
  - Email delivery of conversation summaries
  - Mobile-first responsive design
  - Dark theme with glassmorphism effects

### Contact Integration
- Phone call functionality
- WhatsApp integration
- Contact form modal
- Email links
- Social media links
- Azure Communication Services email (admin@solidevelectrosoft.com)

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Assets

All original assets (CSS, images, fonts, JavaScript) have been preserved from the original website and are located in `src/assets/`. The original styling and functionality have been maintained while converting to React components.

## Migration Notes

### Converted Features
- ✅ Header with navigation and offcanvas menu
- ✅ Hero slider with multiple backgrounds
- ✅ About section with company information
- ✅ Team showcase with social links
- ✅ Testimonials carousel
- ✅ Client logos section
- ✅ Footer with contact information
- ✅ Floating action menu
- ✅ Google Analytics integration
- ✅ Responsive design
- ✅ Custom mouse cursor
- ✅ Back to top functionality
- ✅ AI Project Requirements Assistant
- ✅ Azure Communication Services email integration
- ✅ Firebase Functions backend
- ✅ Claude AI integration for intelligent conversations

### React-Specific Improvements
- Component-based architecture
- State management for interactive elements
- Event handling with React patterns
- Cleaner code organization
- Better maintainability
- Modern ES6+ syntax

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Documentation

- [AZURE_EMAIL_INTEGRATION.md](./docs/azure/AZURE_EMAIL_INTEGRATION.md) - Complete guide for Azure Communication Services setup, configuration, and testing
- [AZURE_EMAIL_SETUP.md](./docs/azure/AZURE_EMAIL_SETUP.md) - Azure Communication Services initial setup documentation
- [CONTACT_FORM_SETUP.md](./docs/guides/CONTACT_FORM_SETUP.md) - Contact form implementation details
- [ABOUT_PAGE_IMPLEMENTATION.md](./docs/guides/ABOUT_PAGE_IMPLEMENTATION.md) - About page structure and features
- [MODERN_UX_ENHANCEMENTS.md](./docs/guides/MODERN_UX_ENHANCEMENTS.md) - Modern UX features and enhancements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2024 Solidev Electrosoft (OPC) Pvt. Ltd. All rights reserved.
