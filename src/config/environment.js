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
  azure: {
    // Azure Communication Services connection strings
    // These should be set in .env.local file for security
    primaryConnectionString: getEnvVar('VITE_AZURE_COMMUNICATION_CONNECTION_STRING', ''),
    secondaryConnectionString: getEnvVar('VITE_AZURE_COMMUNICATION_SECONDARY_CONNECTION_STRING', ''),
  },
  email: {
    senderName: 'Solidev Electrosoft',
    senderEmail: 'donotreply@solidevelectrosoft.com',
    recipientEmails: {
      primary: 'admin@solidevelectrosoft.com',
      cc: 'davinder@solidevelectrosoft.com'
    }
  }
};

// Production environment override
if (getEnvVar('NODE_ENV') === 'production') {
  environment.production = true;
}
