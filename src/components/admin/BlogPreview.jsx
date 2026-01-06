import React from 'react';
import {
  getWordCount,
  getReadingTime,
  formatReadingTime,
  hasMinimumHeadings,
  generateSeoScore,
  stripHtml,
} from '../../utils/blogUtils';

/**
 * BlogPreview Component
 * Live preview of blog content matching actual published blog page layout
 */
const BlogPreview = ({ formData }) => {
  const wordCount = getWordCount(formData.content);
  const readingTime = getReadingTime(formData.content);
  const seoScore = generateSeoScore(formData);

  return (
    <div
      style={{
        backgroundColor: '#f9fafb',
        padding: '20px',
        borderRadius: '8px',
        fontSize: '14px',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
        Live Preview
      </h3>

      {/* SEO Score */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '12px',
          borderLeft: `4px solid ${
            seoScore.score >= 80
              ? '#10b981'
              : seoScore.score >= 60
              ? '#f59e0b'
              : '#ef4444'
          }`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <span style={{ fontWeight: '600' }}>SEO Score</span>
          <span
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color:
                seoScore.score >= 80
                  ? '#10b981'
                  : seoScore.score >= 60
                  ? '#f59e0b'
                  : '#ef4444',
            }}
          >
            {seoScore.score}/100
          </span>
        </div>
        {seoScore.issues.length > 0 && (
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#6b7280', fontSize: '13px' }}>
            {seoScore.issues.map((issue, i) => (
              <li key={i} style={{ marginBottom: '4px' }}>
                {issue}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Content Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '12px',
            borderRadius: '6px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
            Word Count
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#667eea' }}>
            {wordCount}
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            padding: '12px',
            borderRadius: '6px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
            Reading Time
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#667eea' }}>
            {formatReadingTime(readingTime)}
          </div>
        </div>
      </div>

      {/* Validation Checklist */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '12px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>
          Publish Checklist
        </div>
        <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#6b7280' }}>
          <li style={{ marginBottom: '4px', color: formData.title ? '#059669' : '#ef4444' }}>
            {formData.title ? '✓' : '✗'} Title
          </li>
          <li style={{ marginBottom: '4px', color: formData.slug ? '#059669' : '#ef4444' }}>
            {formData.slug ? '✓' : '✗'} Slug (unique)
          </li>
          <li style={{ marginBottom: '4px', color: formData.metaTitle ? '#059669' : '#ef4444' }}>
            {formData.metaTitle ? '✓' : '✗'} Meta title
          </li>
          <li
            style={{
              marginBottom: '4px',
              color: formData.metaDescription ? '#059669' : '#ef4444',
            }}
          >
            {formData.metaDescription ? '✓' : '✗'} Meta description
          </li>
          <li
            style={{
              marginBottom: '4px',
              color: hasMinimumHeadings(formData.content) ? '#059669' : '#ef4444',
            }}
          >
            {hasMinimumHeadings(formData.content) ? '✓' : '✗'} At least one H2 heading
          </li>
          <li
            style={{
              marginBottom: '4px',
              color: wordCount > 300 ? '#059669' : '#ef4444',
            }}
          >
            {wordCount > 300 ? '✓' : '✗'} 300+ words ({wordCount} now)
          </li>
        </ul>
      </div>

      {/* Meta Info Preview */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '6px',
          fontSize: '13px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px' }}>Search Result Preview</div>
        <div
          style={{
            marginBottom: '8px',
            color: '#1e40af',
            textDecoration: 'underline',
            wordBreak: 'break-word',
          }}
        >
          {formData.metaTitle || formData.title || 'Blog Title'}
        </div>
        <div style={{ color: '#6b7280', marginBottom: '8px', lineHeight: '1.5' }}>
          {formData.metaDescription || stripHtml(formData.content).substring(0, 160) || 'No description'}
        </div>
        <div style={{ color: '#6b7280', fontSize: '12px' }}>
          solidevelectrosoft.com/blog/{formData.slug || 'slug'}
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
