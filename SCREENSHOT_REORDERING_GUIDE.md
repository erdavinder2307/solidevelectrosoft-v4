# Screenshot Drag-and-Drop Reordering Guide

## Overview
This guide documents the implementation of drag-and-drop screenshot reordering in the Admin CMS using React + Firebase/Firestore.

## Tech Stack
- **Frontend**: React 19 + Vite
- **DnD Library**: @dnd-kit (compatible with React 19)
- **Backend**: Firebase/Firestore
- **Animation**: Framer Motion

## Features Implemented

### 1. **Data Model Enhancement**
Each screenshot now includes a `displayOrder` field:
```javascript
{
  id: 'unique-id',
  url: 'https://...',
  type: 'web' | 'mobile' | 'both',
  displayOrder: 1, // Sequential ordering (1, 2, 3...)
  caption: 'Optional caption'
}
```

### 2. **Admin UI - Drag-and-Drop Interface**
Location: [`src/pages/admin/ProductForm.jsx`](src/pages/admin/ProductForm.jsx)

**Key Components:**
- `SortableScreenshot` - Individual draggable screenshot item
- `DndContext` - Drag-and-drop context provider
- `SortableContext` - Container for sortable items

**Features:**
- Visual drag handle with order number (`⋮⋮ #1`)
- Real-time reordering in UI
- "Save Order" button appears when changes are made
- Platform badge (Web/Mobile/Both)
- Remove button per screenshot

**User Flow:**
1. Upload screenshots (automatically assigned sequential `displayOrder`)
2. Drag screenshots to reorder
3. Visual feedback shows new order
4. Click "Save Order" to persist changes to Firestore
5. Success message confirms save

### 3. **Data Persistence**
**Save Handler:**
```javascript
const handleSaveOrder = async () => {
  const screenshotsToSave = formData.screenshots.map(({ url, type, displayOrder, caption }) => ({
    url,
    type,
    displayOrder,
    ...(caption && { caption }),
  }));

  await updateDoc(doc(db, 'products', id), {
    screenshots: screenshotsToSave,
    updatedAt: new Date().toISOString(),
  });
};
```

**Firestore Update:**
- Only updates `screenshots` array and `updatedAt` timestamp
- Does NOT re-upload images
- Preserves all screenshot metadata

### 4. **Public Display Ordering**
Location: [`src/components/products/ProductCard.jsx`](src/components/products/ProductCard.jsx)

**Sorting Logic:**
```javascript
const sortedScreenshots = [...screenshots].sort((a, b) => {
  const orderA = a.displayOrder ?? 999;
  const orderB = b.displayOrder ?? 999;
  return orderA - orderB;
});
```

**Behavior:**
- Screenshots always display in `displayOrder` ascending order
- Legacy screenshots without `displayOrder` appear last
- Consistent ordering across all public pages

## Implementation Details

### Dependencies Installed
```json
{
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "@dnd-kit/utilities": "^3.2.2"
}
```

### Key Files Modified

1. **[src/pages/admin/ProductForm.jsx](src/pages/admin/ProductForm.jsx)**
   - Added DnD imports and setup
   - Created `SortableScreenshot` component
   - Added drag sensors and handlers
   - Implemented `handleDragEnd` for reordering
   - Added `handleSaveOrder` for persistence
   - Updated screenshot upload to include `displayOrder`

2. **[src/components/products/ProductCard.jsx](src/components/products/ProductCard.jsx)**
   - Added sorting logic for screenshots
   - Updated screenshot display to use sorted array
   - Ensured consistent ordering in gallery

### State Management
```javascript
const [hasOrderChanges, setHasOrderChanges] = useState(false); // Tracks unsaved changes
const [savingOrder, setSavingOrder] = useState(false);          // Save button state
```

### Migration Support
**Backward Compatibility:**
- Existing products without `displayOrder` are automatically assigned sequential order on load:
  ```javascript
  displayOrder: screenshot.displayOrder ?? index + 1
  ```
- No manual migration required

## Usage Instructions

### For Admins

**Adding Screenshots:**
1. Navigate to Admin → Products → Edit Product
2. Select platform type (Web/Mobile/Both)
3. Upload screenshot (automatically gets next `displayOrder`)
4. Repeat for multiple screenshots

**Reordering Screenshots:**
1. Hover over a screenshot's drag handle (`⋮⋮` icon)
2. Click and drag to new position
3. Release to drop
4. Order numbers update in real-time
5. Click **"💾 Save Order"** button when satisfied
6. Wait for success message

**Per-Platform Ordering:**
- Web, Mobile, and Both screenshots can be mixed
- Order applies across all platforms
- Filter/group by platform if needed in future enhancement

### For Developers

**Fetching Products:**
```javascript
const docSnap = await getDoc(doc(db, 'products', id));
const product = docSnap.data();
// Screenshots include displayOrder field
```

**Displaying Screenshots:**
```javascript
// Sorting is handled automatically in ProductCard
<ProductCard product={product} />
```

**Adding New Screenshot Fields:**
```javascript
const newScreenshot = {
  id: `new-${Date.now()}`,
  url: uploadedUrl,
  type: screenshotType,
  displayOrder: formData.screenshots.length + 1,
  caption: '', // Optional
  // Add your custom fields here
};
```

## API Reference

### DnD-Kit Hooks Used

**`useSortable`**
```javascript
const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
  id: screenshot.id 
});
```

**`useSensors`**
```javascript
const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  })
);
```

### Firestore Schema

**Product Document:**
```javascript
{
  title: string,
  description: string,
  category: string,
  logo: string,
  screenshots: [
    {
      url: string,
      type: 'web' | 'mobile' | 'both',
      displayOrder: number,
      caption?: string
    }
  ],
  status: 'active' | 'coming-soon' | 'archived',
  displayOrder: number, // Product order
  createdAt: string (ISO),
  updatedAt: string (ISO)
}
```

## Best Practices

1. **Always Save Order**: Changes are NOT auto-saved - users must click "Save Order"
2. **Sequential Ordering**: Maintain 1, 2, 3... numbering without gaps
3. **Remove Before Reorder**: If removing multiple screenshots, save order after each removal
4. **Upload Strategy**: Upload all screenshots first, then reorder as final step
5. **Testing**: Always verify order on public-facing pages after changes

## Future Enhancements

Potential improvements for consideration:
- [ ] Bulk screenshot upload with drag-to-order
- [ ] Per-platform ordering (Web screenshots order independently from Mobile)
- [ ] Screenshot captions/descriptions
- [ ] Preview mode before saving
- [ ] Undo/redo functionality
- [ ] Keyboard shortcuts for reordering
- [ ] Auto-save with debounce

## Troubleshooting

**Order Not Saving:**
- Check browser console for Firestore errors
- Verify user has write permissions
- Ensure product ID is valid

**Drag Not Working:**
- Confirm @dnd-kit packages are installed
- Check for React version compatibility
- Verify no CSS conflicts with `cursor` or `pointer-events`

**Order Not Displaying:**
- Check ProductCard is using `sortedScreenshots`
- Verify `displayOrder` exists in Firestore
- Clear browser cache if seeing stale data

## Related Files
- [src/pages/admin/ProductForm.jsx](src/pages/admin/ProductForm.jsx) - Admin editor
- [src/components/products/ProductCard.jsx](src/components/products/ProductCard.jsx) - Public display
- [src/components/products/ProductGrid.jsx](src/components/products/ProductGrid.jsx) - Grid layout
- [src/pages/ModernProducts.jsx](src/pages/ModernProducts.jsx) - Products page
- [package.json](package.json) - Dependencies

## Support
For questions or issues, refer to:
- [@dnd-kit Documentation](https://docs.dndkit.com/)
- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [React 19 Migration Guide](https://react.dev/blog/2024/04/25/react-19)
