/**
 * Get the API base URL, considering Codespaces environment
 */
export function getApiBaseUrl(): string {
  if (process.env.CODESPACE_NAME) {
    // Running in GitHub Codespaces
    return `https://${process.env.CODESPACE_NAME}-8000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'preview.app.github.dev'}`;
  }

  if (process.env.NODE_ENV === 'production') {
    // Production environment
    return process.env.API_URL || 'https://api.octofit-tracker.com';
  }

  // Local development
  return `http://localhost:${process.env.PORT ?? 8000}`;
}

/**
 * Get the frontend URL, considering Codespaces environment
 */
export function getFrontendUrl(): string {
  if (process.env.CODESPACE_NAME) {
    // Running in GitHub Codespaces
    return `https://${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'preview.app.github.dev'}`;
  }

  if (process.env.NODE_ENV === 'production') {
    // Production environment
    return process.env.FRONTEND_URL || 'https://octofit-tracker.com';
  }

  // Local development
  return 'http://localhost:5173';
}
