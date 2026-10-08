// Environment configuration
// Note: In Vite, import.meta.env is used instead of process.env
const getEnvVar = (key, defaultValue = '') => {
  // Check if we're in a Vite environment
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  // Fallback for other environments
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  return defaultValue;
};

export const environment = {
  production: false,
  emailApi: {
    // Solidev email API (Azure Function); it accepts this site's origin for the website use cases.
    sendUrl: 'https://solidev-email-api.azurewebsites.net/api/send',
  }
};

// Production environment override
if (getEnvVar('NODE_ENV') === 'production') {
  environment.production = true;
}
