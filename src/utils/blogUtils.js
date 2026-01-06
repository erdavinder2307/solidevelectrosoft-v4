/**
 * Blog content utilities
 * Functions for processing and analyzing blog content
 */

/**
 * Strip HTML tags and get plain text
 */
export const stripHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

/**
 * Calculate word count from HTML content
 */
export const getWordCount = (html) => {
  if (!html) return 0;
  const text = stripHtml(html);
  return text.split(/\s+/).filter(Boolean).length;
};

/**
 * Calculate estimated reading time in minutes
 * Based on average reading speed of 200 words per minute
 */
export const getReadingTime = (html) => {
  const wordCount = getWordCount(html);
  const minutesPerWord = 200;
  const minutes = Math.ceil(wordCount / minutesPerWord);
  return Math.max(1, minutes); // Minimum 1 minute
};

/**
 * Generate excerpt from HTML content
 * Extracts first 150-200 characters of plain text
 */
export const generateExcerpt = (html, length = 160) => {
  if (!html) return '';
  const text = stripHtml(html);
  if (text.length <= length) return text;
  
  // Find the last space before the length limit
  const lastSpace = text.lastIndexOf(' ', length);
  const excerptLength = lastSpace > 0 ? lastSpace : length;
  return text.substring(0, excerptLength).trim() + '…';
};

/**
 * Extract first H2 from HTML content
 */
export const getFirstHeading = (html) => {
  if (!html) return null;
  const h2Match = html.match(/<h2[^>]*>([^<]+)<\/h2>/);
  return h2Match ? h2Match[1] : null;
};

/**
 * Check if content has at least one H2 heading
 */
export const hasMinimumHeadings = (html) => {
  if (!html) return false;
  return /<h2[^>]*>/.test(html);
};

/**
 * Generate SEO score for blog content
 * Checks for best practices
 */
export const generateSeoScore = ({
  title,
  metaTitle,
  metaDescription,
  content,
  slug,
}) => {
  let score = 0;
  const issues = [];

  // Check title
  if (title && title.length > 3) {
    score += 10;
  } else {
    issues.push('Title is too short');
  }

  // Check slug
  if (slug && slug.length > 3 && /^[a-z0-9-]+$/.test(slug)) {
    score += 10;
  } else {
    issues.push('Slug must be lowercase alphanumeric with hyphens');
  }

  // Check meta title
  if (metaTitle) {
    if (metaTitle.length < 60) {
      score += 20;
    } else {
      issues.push(`Meta title is ${metaTitle.length} chars (max 60)`);
    }
  } else {
    issues.push('Meta title is missing');
  }

  // Check meta description
  if (metaDescription) {
    if (metaDescription.length < 160) {
      score += 20;
    } else {
      issues.push(`Meta description is ${metaDescription.length} chars (max 160)`);
    }
  } else {
    issues.push('Meta description is missing');
  }

  // Check content
  if (content) {
    const wordCount = getWordCount(content);
    if (wordCount > 300) {
      score += 15;
    } else {
      issues.push(`Content is only ${wordCount} words (recommended 300+)`);
    }

    if (hasMinimumHeadings(content)) {
      score += 15;
    } else {
      issues.push('Content must contain at least one H2 heading');
    }
  } else {
    issues.push('Content is empty');
  }

  return { score: Math.min(100, score), issues };
};

/**
 * Format reading time as human-readable string
 */
export const formatReadingTime = (minutes) => {
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
};
