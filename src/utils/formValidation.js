/**
 * Form Validation Utilities
 * Reusable validation functions for admin forms
 */

export const validateProduct = (data) => {
  const errors = {};

  // Title validation
  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (data.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters';
  } else if (data.title.trim().length > 100) {
    errors.title = 'Title must not exceed 100 characters';
  }

  // Description validation
  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  // Category validation
  if (!data.category || data.category.trim().length === 0) {
    errors.category = 'Category is required';
  }

  // Logo validation (required for new products)
  // ProductForm uses `logo` (existing URL) and `logoFile` (new file) fields.
  if (data.isNew) {
    const hasLogo = !!(data.logo && String(data.logo).trim().length > 0);
    const hasLogoFile = !!data.logoFile;
    if (!hasLogo && !hasLogoFile) {
      errors.logo = 'Logo is required';
    }
  }

  // Technologies validation
  if (!Array.isArray(data.technologies) || data.technologies.length === 0) {
    errors.technologies = 'At least one technology is required';
  }

  return errors;
};

export const validatePortfolio = (data) => {
  const errors = {};

  // Project name validation
  if (!data.projectName || data.projectName.trim().length === 0) {
    errors.projectName = 'Project name is required';
  } else if (data.projectName.trim().length < 5) {
    errors.projectName = 'Project name must be at least 5 characters';
  }

  // Client validation
  if (!data.client || data.client.trim().length === 0) {
    errors.client = 'Client name is required';
  }

  // Description validation
  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  // Category validation
  if (!data.category || data.category.trim().length === 0) {
    errors.category = 'Category is required';
  }

  // Images validation (at least one required for new portfolios)
  // Images are optional; no validation required

  // Thumbnail validation (required for new portfolios)
  // Thumbnail is optional; no validation required

  // Technologies validation
  if (!Array.isArray(data.technologies) || data.technologies.length === 0) {
    errors.technologies = 'At least one technology is required';
  }

  // Team size validation
  if (!data.teamSize || parseInt(data.teamSize) < 1) {
    errors.teamSize = 'Team size must be at least 1';
  }

  // Duration validation
  if (!data.duration || data.duration.trim().length === 0) {
    errors.duration = 'Duration is required';
  }

  return errors;
};

export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

export const getErrorMessage = (errors, field) => {
  return errors[field] || '';
};
