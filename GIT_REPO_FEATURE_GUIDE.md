# Git Repository URL Feature Implementation

## Overview
Added support for storing and displaying Git repository URLs (GitHub, GitLab, Gitea, etc.) for products. Features a GitHub-style clone dropdown with HTTPS URL display and copy-to-clipboard functionality.

## Changes Made

### 1. ProductForm.jsx (`/src/pages/admin/ProductForm.jsx`)
Added Git repository URL field to the product creation/editing form.

**Changes:**
- **Line 34**: Added `gitRepoUrl: ''` to `formData` state initialization
- **Line 67**: Added `gitRepoUrl: data.gitRepoUrl || ''` to load existing repo URL from Firestore
- **Line 249**: Added `gitRepoUrl: formData.gitRepoUrl || ''` to save repo URL to Firestore
- **Lines 930-951**: Added Git Repository URL input field in the admin form with:
  - GitHub icon (SVG)
  - URL input field
  - Helper text explaining the feature
  - Matching styling with other URL fields

### 2. ProductCard.jsx (`/src/components/products/ProductCard.jsx`)
Updated product card display with GitHub-style repository clone dropdown.

**Changes:**
- **Line 4**: Added `FaGithub, FaCheck` to imports from `react-icons/fa`
- **Line 21**: Added `showCloneDropdown` and `copiedUrl` state for dropdown interaction
- **Line 29**: Added `gitRepoUrl` to product destructuring
- **Line 58**: Added `gitRepoUrl ? 1 : 0` to button count for responsive grid
- **Lines 63-76**: Added `useEffect` to close dropdown when clicking outside with click delegation
- **Line 79**: Updated `getButtonGridCols()` to handle 5-6 buttons with 3-column layout
- **Line 336**: Updated conditional to include `gitRepoUrl || hasScreenshots`
- **Lines 494-583**: Added Git Repository button with GitHub-style clone dropdown featuring:
  - Dark GitHub-themed button
  - Dropdown showing repository URL
  - Copy-to-clipboard button with success feedback
  - "Open in Browser" link
  - Click-outside detection to close dropdown

## Features

### Admin Panel
- **Git Repository URL Field**: New input field in ProductForm after iOS App URL field
- **URL Validation**: HTML5 URL input validation
- **Optional Field**: Git URL is completely optional (products without it won't show button)

### Product Card Display
- **GitHub-style Button**: Dark themed button with GitHub icon
- **Clone Dropdown**: Shows when button is clicked with:
  - URL display field
  - Copy button that shows "Copied" confirmation
  - "Open in Browser" link to visit the repository
  - Auto-closes when clicking outside
  - GitHub-style dark theme matching GitHub's UI

### Responsive Design
- Dropdown width: 300px minimum
- Positioned absolutely below the button
- Grid layout automatically adjusts with 6 buttons total possible per product
- Mobile-optimized

## Firestore Integration

The feature automatically saves/loads from Firestore:
- Saves to `products/{productId}.gitRepoUrl`
- Loads existing URLs when editing products
- Falls back to empty string if not provided

## URL Format Support

The input accepts any valid Git repository URL:
- `https://github.com/username/repo`
- `https://gitlab.com/username/repo`
- `https://gitea.example.com/username/repo`
- Any other Git hosting service URL

## User Experience

1. **Admin**: Adds git URL in ProductForm → Saves to Firestore
2. **Customer**: 
   - Sees "Repo" button on product card
   - Clicks to open dropdown
   - Can copy URL or open in browser
   - Dropdown closes when clicking outside

## Styling Details

- **Button Color**: `#24292e` (GitHub dark gray)
- **Hover Color**: `#1a1e22` (GitHub darker)
- **Dropdown Background**: `#ffffff` (white)
- **Dropdown Border**: `#d0d7de` (light gray)
- **Text Color**: `#24292e` (dark gray)
- **Input Background**: `#f6f8fa` (GitHub light gray)
- **Copy Success Color**: `#2da44e` (GitHub green)

## Testing Checklist

- [ ] Admin can add git URL in ProductForm
- [ ] Git URL is optional (form works without it)
- [ ] Git URL saves to Firestore
- [ ] Git URL loads when editing existing product
- [ ] Product card shows "Repo" button when URL exists
- [ ] Dropdown opens/closes on button click
- [ ] Copy button copies URL to clipboard
- [ ] Copy button shows "Copied" confirmation for 2 seconds
- [ ] "Open in Browser" link opens URL in new tab
- [ ] Dropdown closes when clicking outside
- [ ] Responsive layout works on mobile
- [ ] Button grid adjusts with git URL included (1-6 buttons)

## Future Enhancements

- Support for different clone methods (HTTP, SSH, GitHub CLI)
- Display git provider icon automatically (GitHub, GitLab, etc.)
- Link to clone command generation
- Support for multiple repositories per product
