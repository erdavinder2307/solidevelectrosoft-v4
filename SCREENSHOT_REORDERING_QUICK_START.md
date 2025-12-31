# Screenshot Reordering - Quick Start

## For Content Admins

### Reorder Screenshots in 3 Steps:

1. **Navigate**: Admin → Products → Edit Product
2. **Drag**: Click the `⋮⋮` handle and drag screenshots
3. **Save**: Click the **"💾 Save Order"** button

✅ That's it! Order is now live on your public pages.

---

## For Developers

### Display Screenshots (Automatic Sorting)
```jsx
import ProductCard from './components/products/ProductCard';

// Screenshots are automatically sorted by displayOrder
<ProductCard product={product} />
```

### Add New Screenshot
```javascript
const newScreenshot = {
  id: `new-${Date.now()}`,
  url: uploadedUrl,
  type: 'web', // or 'mobile' or 'both'
  displayOrder: screenshots.length + 1, // Add to end
};
```

### Manual Sorting (if needed)
```javascript
const sortedScreenshots = [...screenshots].sort((a, b) => 
  (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
);
```

### Save Order to Firestore
```javascript
await updateDoc(doc(db, 'products', productId), {
  screenshots: screenshots.map(({ url, type, displayOrder }) => ({
    url,
    type,
    displayOrder,
  })),
  updatedAt: new Date().toISOString(),
});
```

---

## Tech Stack
- **DnD**: @dnd-kit (React 19 compatible)
- **Backend**: Firebase/Firestore
- **State**: React hooks

## Key Files
- Admin: [`src/pages/admin/ProductForm.jsx`](src/pages/admin/ProductForm.jsx)
- Public: [`src/components/products/ProductCard.jsx`](src/components/products/ProductCard.jsx)

📖 **Full docs**: [SCREENSHOT_REORDERING_GUIDE.md](SCREENSHOT_REORDERING_GUIDE.md)
