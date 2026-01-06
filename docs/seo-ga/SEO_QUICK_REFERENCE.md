# SEO Quick Reference - Adding SEO to New Pages

## 🚀 Quick Start: Add SEO to a Page

### Step 1: Import useSEO Hook
```javascript
import { useSEO } from '../hooks/useSEO';
import { pageSEO } from '../utils/seo';
import { getCommonSchemas, generateBreadcrumbSchema } from '../utils/structuredData';
```

### Step 2: Call useSEO in Component
```javascript
const MyPage = () => {
  // Add SEO configuration
  useSEO({
    title: pageSEO.mypage.title,
    description: pageSEO.mypage.description,
    keywords: pageSEO.mypage.keywords,
    canonical: pageSEO.mypage.canonical,
    ogType: 'website',
    schemas: [
      ...getCommonSchemas(),
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
        { name: 'My Page', url: 'https://www.solidevelectrosoft.com/mypage' },
      ]),
    ],
  });

  return (
    // ... page content
  );
};
```

### Step 3: Add Page Config to seo.js
```javascript
// In src/utils/seo.js → pageSEO object
export const pageSEO = {
  // ... existing pages
  
  mypage: {
    title: 'My Page Title',
    description: 'Compelling meta description under 160 characters',
    keywords: 'primary keyword, secondary keyword, related keyword',
    canonical: '/mypage',
    ogType: 'website',
  },
};
```

### Step 4: Update Sitemap
```xml
<!-- In public/sitemap.xml -->
<url>
  <loc>https://www.solidevelectrosoft.com/mypage</loc>
  <lastmod>2025-12-22</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## 📝 Common Patterns

### Service Page SEO
```javascript
import { generateServiceSchema } from '../utils/structuredData';

useSEO({
  title: 'Web Application Development Services',
  description: 'Expert web development using React, Node.js, .NET Core. Build scalable apps.',
  canonical: '/services/web-development',
  ogType: 'service',
  schemas: [
    ...getCommonSchemas(),
    generateServiceSchema({
      name: 'Web Application Development',
      offerings: [
        { name: 'Custom Web Apps', description: 'Tailored solutions' },
        { name: 'SaaS Platforms', description: 'Scalable platforms' },
      ],
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
      { name: 'Services', url: 'https://www.solidevelectrosoft.com/services' },
      { name: 'Web Development', url: 'https://www.solidevelectrosoft.com/services/web-development' },
    ]),
  ],
});
```

### Product Page SEO (Dynamic)
```javascript
useSEO({
  title: product.title,
  description: product.description,
  canonical: `/product/${product.id}`,
  ogImage: product.thumbnailUrl,
  ogType: 'product',
  schemas: [
    generateSoftwareApplicationSchema(product),
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
      { name: 'Products', url: 'https://www.solidevelectrosoft.com/products' },
      { name: product.title, url: `https://www.solidevelectrosoft.com/product/${product.id}` },
    ]),
  ],
});
```

### FAQ Page SEO
```javascript
import { generateFAQSchema } from '../utils/structuredData';

const faqs = [
  { question: 'How long does development take?', answer: '4-12 weeks depending...' },
  { question: 'What technologies do you use?', answer: 'React, Node.js, .NET Core...' },
];

useSEO({
  title: 'FAQ | Common Questions About Our Services',
  description: 'Answers to common questions about software development services.',
  canonical: '/faq',
  schemas: [
    ...getCommonSchemas(),
    generateFAQSchema(faqs),
  ],
});
```

---

## 🎯 SEO Content Guidelines

### Title Best Practices
✅ **Good**:
- "Custom Web Application Development Services"
- "MVP Development for Startups | 4-Week Launch"
- "AI & Machine Learning Solutions"

❌ **Bad**:
- "Services" (too generic)
- "Custom Software Development Custom Web Apps Mobile Apps" (keyword stuffing)
- "Best Software Company in the World!!!" (hyperbolic)

### Description Best Practices
✅ **Good**:
- "Expert web development using React, Node.js, .NET Core. Build scalable, high-performance apps. 10+ years experience."
- "Fast MVP development for startups. Validate your idea in 4 weeks. $499 start. Free consultation."

❌ **Bad**:
- "We are the best company that provides quality services." (generic)
- "In today's digital landscape, businesses need..." (AI filler)
- Too long (over 160 characters)

### H1 Structure
**Rule**: One H1 per page

✅ **Good**:
```jsx
<h1>Custom Web Application Development Services</h1>
<h2>What We Build</h2>
<h3>SaaS Platforms</h3>
<h3>Enterprise Systems</h3>
<h2>Our Process</h2>
```

❌ **Bad**:
```jsx
<h1>Services</h1>
<h1>Web Development</h1> <!-- Multiple H1s -->
<div className="heading">Our Services</div> <!-- Use proper H tags -->
```

---

## 🔗 Internal Linking

### Add Contextual Links
```jsx
// Example: In service page
<p>
  See our <Link to="/products">custom web applications</Link> built for clients worldwide.
  View <Link to="/portfolio">successful projects</Link> in your industry.
</p>

// Example: In product page
<p>
  Interested in similar solutions? Learn about our{' '}
  <Link to="/services/web-development">web application development services</Link>.
</p>
```

### Link Text Best Practices
✅ **Good**:
- "custom web applications"
- "MVP development services"
- "view our portfolio"

❌ **Bad**:
- "click here"
- "read more"
- "this link"

---

## 📊 Available Schemas

### Import Schemas
```javascript
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  generateServiceSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  getCommonSchemas, // Shortcut for Org + Website + Local
} from '../utils/structuredData';
```

### Schema Usage

**Organization** (automatic via getCommonSchemas):
- Business name, address, contact
- Used on all pages

**Service**:
```javascript
generateServiceSchema({
  name: 'Web Application Development',
  offerings: [
    { name: 'Custom Apps', description: 'Tailored solutions' },
    { name: 'SaaS', description: 'Scalable platforms' },
  ],
})
```

**Software Application** (for products):
```javascript
generateSoftwareApplicationSchema({
  title: 'MyApp',
  description: 'App description',
  category: 'BusinessApplication',
  platforms: ['Web', 'iOS', 'Android'],
  thumbnailUrl: 'https://...',
  price: '99',
  rating: 4.5,
  ratingCount: 10,
})
```

**Breadcrumb**:
```javascript
generateBreadcrumbSchema([
  { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
  { name: 'Services', url: 'https://www.solidevelectrosoft.com/services' },
  { name: 'Web Dev', url: 'https://www.solidevelectrosoft.com/services/web-development' },
])
```

**FAQ**:
```javascript
generateFAQSchema([
  { question: 'Question 1?', answer: 'Answer 1' },
  { question: 'Question 2?', answer: 'Answer 2' },
])
```

---

## ✅ SEO Checklist for New Pages

Before deploying:

- [ ] useSEO hook added with title, description, canonical
- [ ] Page config added to src/utils/seo.js
- [ ] Appropriate structured data schemas included
- [ ] Breadcrumb navigation added
- [ ] One H1 tag on page
- [ ] Logical H2/H3 structure
- [ ] Internal links to related pages
- [ ] URL added to sitemap.xml
- [ ] Meta description under 160 characters
- [ ] Title under 60 characters
- [ ] Images have alt text
- [ ] No keyword stuffing
- [ ] Content is natural and useful

---

## 🧪 Testing SEO

### 1. View in Browser
```
Right-click page → Inspect → Elements → <head>
```
Check:
- `<title>` tag
- `<meta name="description">`
- `<link rel="canonical">`
- `<script type="application/ld+json">` (structured data)

### 2. Rich Results Test
```
https://search.google.com/test/rich-results
```
Enter page URL to validate structured data

### 3. PageSpeed Insights
```
https://pagespeed.web.dev/
```
Check mobile/desktop performance

### 4. Mobile-Friendly Test
```
https://search.google.com/test/mobile-friendly
```
Ensure mobile optimization

---

## 🐛 Common Issues

### SEO not updating?
```javascript
// Make sure useSEO is called at component level
const MyPage = () => {
  useSEO({ /* config */ }); // ✅ Correct
  
  return /* JSX */;
};

// NOT inside useEffect or conditionals
useEffect(() => {
  useSEO({ /* config */ }); // ❌ Wrong
}, []);
```

### Structured data errors?
- Test with Rich Results Test tool
- Check JSON syntax (no trailing commas)
- Ensure required properties present
- Use schema.org documentation

### Title/description too long?
- Title: Max 60 characters
- Description: Max 160 characters
- Google truncates beyond these limits

---

## 📚 Resources

- **Full Guide**: [SEO_IMPLEMENTATION_GUIDE.md](SEO_IMPLEMENTATION_GUIDE.md)
- **Schema.org**: https://schema.org/
- **Google Search Central**: https://developers.google.com/search
- **Rich Results Test**: https://search.google.com/test/rich-results

---

**Need Help?** Check the full implementation guide or ask the team.
