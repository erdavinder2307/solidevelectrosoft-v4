## Solidev Electrosoft v4 — AI contributor instructions

Use this as your quick-start map to work productively in this repo. Keep edits aligned with current patterns; don’t introduce new frameworks or server runtimes.

### Fast facts
- Stack: React 19 + Vite 7 (plugin: @vitejs/plugin-react-swc), React Router, react-slick, slick-carousel.
- App entry: `index.html` → `/src/main.jsx` → `/src/App.jsx` (Router + global CSS imports).
- Build scripts (package.json): `dev`, `build` (tsc + vite), `preview`, `lint`.
- Styling: legacy CSS in `src/assets/css/**` plus a few React-specific fixes in `src/components/styles/`.

### Run, build, lint
- Dev: `npm run dev` (Vite default port 5173).
- Build: `npm run build` → output served with `npm run preview`.
- Lint: `npm run lint` (ESLint 9, config in `eslint.config.js`). No tests configured.

### Project structure you’ll reuse
- Pages: `src/pages/*.jsx` exported via `src/pages/index.js`. Routes are defined in `App.jsx`.
- Sections: `src/components/sections/**` with barrel export `index.js` for grouped imports.
- Layout: `src/components/layout/{Header,Footer}.jsx` with barrel `index.js`.
- UI: `src/components/ui/**` (PreLoader, BackToTop, MouseCursor, FloatingMenu…) with barrel `index.js`.
- Assets: `src/assets/**` (css, js, fonts, images). Keep class names and paths stable—legacy JS/CSS depend on them.

### Routing conventions
- SPA routes in `App.jsx` via `<Routes>`; each page often has a legacy `*.html` alias, e.g. `/about` and `/about.html`.
- When adding a page, create `src/pages/NewPage.jsx`, export it in `src/pages/index.js`, then add both `/newpage` and `/newpage.html` routes.

### Page-level SEO and analytics pattern (follow this in pages)
Inside each page’s `useEffect`:
- Set `document.title` and the `<meta name="description">` content.
- Ensure a canonical link exists/updated: `link[rel="canonical"]`.
- Fire GA gtag events using the global IDs (already injected): `GT-KFNT9K9X` and `GT-MBLK2C2Q`.
See `src/pages/Home.jsx` and `src/pages/Contact.jsx` for examples.

### Email flow and environment configuration
- Primary email path: client-side Azure Communication Services via `src/services/emailService.js`.
- Config source: `src/config/environment.js` reads Vite env vars.
- Expected env vars in `.env.local` (Vite style):
  - `VITE_AZURE_COMMUNICATION_CONNECTION_STRING`
  - `VITE_AZURE_COMMUNICATION_SECONDARY_CONNECTION_STRING` (optional fallback)
- Sender/recipients live in `environment.email`. Don’t hardcode in components.
- Templates: confirmation template loaded from `/assets/templates/customer-email-template.html` (public). If missing, service falls back to `getDefaultEmailTemplate()`.
- Behavior: tries primary ACS, then secondary; if none/failure, uses `sendEmailFallback()` which simulates success (development-friendly).

Example (reuse service, don’t call EmailClient directly):
```js
const result = await emailService.sendContactFormEmail({ name, email, phone, subject, message });
if (result.success) await emailService.sendConfirmationEmail(email, name, message);
```

### Legacy JS compatibility
- If you must enable original jQuery plugins, use `useOriginalJS` from `src/hooks/useOriginalJS.js` in a page-level component (once per page). It sequentially loads scripts from `src/assets/js/**` and wires scroll/observer behavior.
- `useModernUX.js` exists but is currently empty.
- Caution: hardcoded script paths start with `/src/assets/js/...`; verify behavior in production before relying on them for new features.

### CSS/UX conventions
- Global CSS is imported in `App.jsx` and selected fixes in `main.jsx` (slick CSS, carousel fixes). Prefer adding new CSS to `src/assets/css/` and import in `App.jsx` unless it’s component-scoped.
- Keep IDs/classes used by UI widgets (BackToTop, sticky header `#header-sticky`, `#CurrentYear`)—they’re referenced in hooks and legacy code.

### Adding a new section or page (example)
- Section: create `src/components/sections/FeatureTwo.jsx`, export it via `src/components/sections/index.js`, then compose it in a page.
- Page: create `src/pages/Services.jsx`, export in `src/pages/index.js`, add routes in `App.jsx` for `/services` and `/services.html`, and add SEO useEffect like in `Home.jsx`.

### External integrations present
- Google Analytics via gtag in `index.html` and page useEffects (IDs: GT-KFNT9K9X, GT-MBLK2C2Q).
- Azure Communication Services for email (see above). A legacy PHP fallback exists at `public/mail.php` for server-side environments; don’t add new PHP.

### Do/Don’t
- Do reuse barrel exports (`components/sections`, `components/layout`, `components/ui`).
- Do update canonical/description/title per page.
- Don’t bypass `emailService`; add capabilities there if needed.
- Don’t move/rename asset paths casually; legacy scripts/styles may break.

Questions or gaps? If a pattern isn’t covered here (e.g., tests, CI), ask before introducing new tech.
