# SmartImage Integration Examples

## Quick Reference

### Import
```javascript
import { SmartImage } from '../components/ui';
```

### Basic Usage
```jsx
<SmartImage
  src="/path/to/image.jpg"
  thumbnailSrc="/path/to/thumbnail.jpg"
  alt="Image description"
  aspectRatio={16/9}
/>
```

---

## Use Cases & Examples

### 1. Product Card (E-commerce)

**Before**:
```jsx
<div className="product-card">
  <img
    src={product.image}
    alt={product.name}
    loading="lazy"
    style={{ width: '100%', height: 'auto' }}
  />
  <h3>{product.name}</h3>
</div>
```

**After**:
```jsx
<div className="product-card">
  <SmartImage
    src={product.imageUrl}
    thumbnailSrc={product.imageThumbnailUrl}
    alt={product.name}
    aspectRatio={1}
    style={{
      borderRadius: '12px',
      marginBottom: '12px'
    }}
  />
  <h3>{product.name}</h3>
</div>
```

---

### 2. Portfolio Grid Item

**Before**:
```jsx
<div className="portfolio-item">
  <img
    src={project.image}
    alt={project.title}
    loading="lazy"
  />
  <h3>{project.title}</h3>
</div>
```

**After**:
```jsx
<Link to={`/portfolio/${project.id}`}>
  <SmartImage
    src={project.image}
    thumbnailSrc={project.imageThumbnail}
    alt={project.title}
    aspectRatio={16/9}
    style={{
      borderRadius: '8px',
      width: '100%',
      marginBottom: '16px'
    }}
  />
  <h3>{project.title}</h3>
</Link>
```

---

### 3. Team Member Profile Card

**Before**:
```jsx
<div className="team-member">
  <img
    src={member.image}
    alt={member.name}
    className="avatar"
  />
  <h4>{member.name}</h4>
  <p>{member.role}</p>
</div>
```

**After**:
```jsx
<div className="team-member">
  <div className="avatar-container">
    <SmartImage
      src={member.profileImageUrl}
      thumbnailSrc={member.profileImageThumbnail}
      alt={member.name}
      aspectRatio={1}
      style={{
        borderRadius: '50%',
        border: '4px solid #667eea'
      }}
    />
  </div>
  <h4>{member.name}</h4>
  <p>{member.role}</p>
</div>
```

---

### 4. Testimonial Avatar

**Before**:
```jsx
<div className="testimonial">
  <div className="client-avatar">
    <img src={testimonial.clientImage} alt={testimonial.clientName} />
  </div>
  <p className="quote">{testimonial.quote}</p>
  <p className="client-name">{testimonial.clientName}</p>
</div>
```

**After**:
```jsx
<div className="testimonial">
  <div className="client-avatar">
    <SmartImage
      src={testimonial.clientImageUrl}
      thumbnailSrc={testimonial.clientImageThumbnail}
      alt={testimonial.clientName}
      aspectRatio={1}
      style={{ borderRadius: '50%' }}
    />
  </div>
  <p className="quote">{testimonial.quote}</p>
  <p className="client-name">{testimonial.clientName}</p>
</div>
```

---

### 5. Hero Section Image

**Before**:
```jsx
<section className="hero">
  <img
    src={heroImage}
    alt="Hero"
    style={{ width: '100%', height: 'auto' }}
  />
  <h1>Welcome</h1>
</section>
```

**After**:
```jsx
<section className="hero">
  <SmartImage
    src={heroImage}
    thumbnailSrc={heroImageThumbnail}
    alt="Hero background"
    aspectRatio={16/9}
    style={{
      width: '100%',
      borderRadius: '12px',
      marginBottom: '24px'
    }}
    lazy={false} {/* Above-fold, don't lazy load */}
  />
  <h1>Welcome</h1>
</section>
```

---

### 6. Gallery / Carousel

**Before**:
```jsx
<div className="carousel">
  {images.map((image, idx) => (
    <img
      key={idx}
      src={image.url}
      alt={`Gallery ${idx}`}
      loading="lazy"
    />
  ))}
</div>
```

**After**:
```jsx
<div className="carousel">
  {images.map((image, idx) => (
    <SmartImage
      key={idx}
      src={image.url}
      thumbnailSrc={image.thumbnailUrl}
      alt={`Gallery ${idx}`}
      aspectRatio={1}
      lazy={true}
    />
  ))}
</div>
```

---

### 7. Product Detail Page - Main Image

**Before**:
```jsx
<div className="product-detail">
  <div className="main-image">
    <img
      src={selectedImage}
      alt={product.name}
      style={{ width: '100%' }}
    />
  </div>
  <div className="thumbnails">
    {product.images.map((img, idx) => (
      <img
        key={idx}
        src={img}
        alt={`Product ${idx}`}
        onClick={() => setSelectedImage(img)}
        style={{ width: '80px', height: '80px' }}
      />
    ))}
  </div>
</div>
```

**After**:
```jsx
<div className="product-detail">
  <div className="main-image">
    <SmartImage
      src={selectedImage}
      thumbnailSrc={selectedImageThumbnail}
      alt={product.name}
      aspectRatio={1}
      lazy={false}
    />
  </div>
  <div className="thumbnails">
    {product.images.map((img, idx) => (
      <SmartImage
        key={idx}
        src={img}
        thumbnailSrc={product.imageThumbnails?.[idx]}
        alt={`Product ${idx}`}
        aspectRatio={1}
        style={{ width: '80px', height: '80px', cursor: 'pointer' }}
        onClick={() => setSelectedImage(img)}
      />
    ))}
  </div>
</div>
```

---

### 8. Background Image (CSS)

**Before**:
```jsx
<div
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  Content
</div>
```

**After** (Use regular img with overlay):
```jsx
<div style={{ position: 'relative' }}>
  <SmartImage
    src={backgroundImage}
    thumbnailSrc={backgroundImageThumbnail}
    alt="Background"
    aspectRatio={16/9}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 0
    }}
  />
  <div style={{ position: 'relative', zIndex: 1 }}>
    Content
  </div>
</div>
```

---

### 9. Admin Form - Product Image Preview

**Before**:
```jsx
{formData.image && (
  <img
    src={formData.image}
    alt="Preview"
    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
  />
)}
```

**After**:
```jsx
{formData.image && (
  <SmartImage
    src={formData.image}
    alt="Product preview"
    aspectRatio={1}
    lazy={false}
    style={{ width: '200px', height: '200px' }}
  />
)}
```

---

### 10. Client Logo / Partner Logo

**Before**:
```jsx
<div className="partners-grid">
  {partners.map(partner => (
    <img
      key={partner.id}
      src={partner.logo}
      alt={partner.name}
      style={{ height: '80px', width: 'auto' }}
    />
  ))}
</div>
```

**After**:
```jsx
<div className="partners-grid">
  {partners.map(partner => (
    <SmartImage
      key={partner.id}
      src={partner.logoUrl}
      thumbnailSrc={partner.logoThumbnail}
      alt={partner.name}
      aspectRatio={2/1}
      style={{ height: '80px' }}
    />
  ))}
</div>
```

---

## Integration with Firestore

### Admin Upload (ProductForm.jsx Example)

```javascript
import { uploadImageWithThumbnail } from '../../utils/imageOptimization';

const handleImageSelected = async (imageFile) => {
  try {
    setUploading(true);
    
    // Upload original + generate thumbnail automatically
    const { originalUrl, thumbnailUrl } = await uploadImageWithThumbnail(
      imageFile,
      uploadImageToFirebase,
      'products'
    );
    
    // Store in form
    setFormData(prev => ({
      ...prev,
      imageUrl: originalUrl,
      imageThumbnailUrl: thumbnailUrl
    }));
    
  } catch (error) {
    console.error('Upload failed:', error);
  } finally {
    setUploading(false);
  }
};

// When saving form to Firestore
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const docRef = doc(db, 'products', productId);
  await setDoc(docRef, {
    name: formData.name,
    description: formData.description,
    imageUrl: formData.imageUrl,
    imageThumbnailUrl: formData.imageThumbnailUrl, // New!
    // ... other fields
  });
};
```

### Public Page Usage

```javascript
const ModernProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      setProducts(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        // Now includes: imageUrl, imageThumbnailUrl
      })));
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <SmartImage
            src={product.imageUrl}
            thumbnailSrc={product.imageThumbnailUrl}
            alt={product.name}
            aspectRatio={1}
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};
```

---

## Migration Strategy

### 1. Start with One Section
Pick one component and migrate it completely:
```jsx
// pages/ModernProducts.jsx
- Replace img tags with SmartImage
- Update Firestore queries to include thumbnail URLs
- Test performance improvement
```

### 2. Scale to Other Sections
- ModernPortfolio.jsx
- ModernAbout.jsx (team images)
- ModernTestimonials.jsx
- ProductDetails.jsx
- PortfolioDetails.jsx

### 3. Update Admin Forms
- ProductForm.jsx → uploadImageWithThumbnail
- PortfolioForm.jsx → uploadImageWithThumbnail
- TeamMemberForm.jsx → uploadImageWithThumbnail
- TestimonialForm.jsx → uploadImageWithThumbnail

### 4. Monitor & Optimize
- Check Lighthouse scores
- Monitor Core Web Vitals
- Adjust thumbnail sizes if needed

---

## Performance Checklist

After implementing SmartImage:

- [ ] Lazy loading working (images not loaded until needed)
- [ ] Blur placeholder visible while loading
- [ ] Smooth fade-in transition
- [ ] No layout shift (CLS = 0)
- [ ] Thumbnail loads faster than main image
- [ ] Error handling working (fallback UI shows)
- [ ] Mobile performance improved
- [ ] Desktop performance improved
- [ ] Lighthouse score improved
- [ ] Bundle size acceptable (~5KB added)

---

## Common Mistakes to Avoid

❌ **Wrong**: Not providing aspectRatio
```jsx
<SmartImage src={image} /> // Layout shift will occur
```

✅ **Right**: Always provide aspectRatio
```jsx
<SmartImage src={image} aspectRatio={16/9} />
```

---

❌ **Wrong**: Using without thumbnailSrc
```jsx
<SmartImage src={image} /> // No blur placeholder benefit
```

✅ **Right**: Provide both URLs
```jsx
<SmartImage src={image} thumbnailSrc={thumbnail} />
```

---

❌ **Wrong**: Setting lazy={true} for above-fold
```jsx
<SmartImage
  src={heroImage}
  lazy={true} // Will delay LCP
/>
```

✅ **Right**: Only lazy load below-fold images
```jsx
<SmartImage
  src={heroImage}
  lazy={false} // Loads immediately for LCP
/>
```

---

## Troubleshooting

**Images not showing?**
- Check URLs are accessible
- Ensure CORS is configured on Firebase
- Check console for errors

**Placeholder not visible?**
- Verify thumbnailSrc is provided
- Check thumbnailSrc URL is valid
- Increase blur value if needed

**Layout shift occurring?**
- Set correct aspectRatio
- Use fixed-size containers
- Test with DevTools Device Emulation

**Slow on mobile?**
- Reduce thumbnail size to 200px
- Increase lazy loading rootMargin
- Check network throttling in DevTools
