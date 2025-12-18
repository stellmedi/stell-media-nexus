// SEO Defaults - Minimal fallbacks only
// Primary SEO data should come from the database (page_content table)
// This file provides type definitions and minimal emergency fallbacks

export interface PageSEODefaults {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export interface GlobalSEOConfig {
  googleAnalyticsId: string;
  googleSearchConsoleVerification: string;
  googleTagManagerId: string;
  bingWebmasterVerification: string;
  facebookDomainVerification: string;
}

// Minimal fallback for emergency use only
// All actual SEO data should be stored in the database
export const minimalFallback: PageSEODefaults = {
  metaTitle: "Stell Media",
  metaDescription: "",
  keywords: "",
  ogImage: "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
  ogTitle: "Stell Media",
  ogDescription: "",
  twitterTitle: "Stell Media",
  twitterDescription: "",
  twitterImage: "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png"
};

// Legacy function - returns null to force database usage
// Kept for backwards compatibility during migration
export function getPageDefaults(pagePath: string): PageSEODefaults | null {
  // Return null to ensure database is used as primary source
  // Components should handle null gracefully with minimal fallbacks
  return null;
}

// Legacy function - kept for backwards compatibility
export function getGlobalSEOConfig(): GlobalSEOConfig {
  // Return empty config - actual config should come from database
  return {
    googleAnalyticsId: '',
    googleSearchConsoleVerification: '',
    googleTagManagerId: '',
    bingWebmasterVerification: '',
    facebookDomainVerification: ''
  };
}

// Deprecated - use database instead
export function saveGlobalSEOConfig(config: GlobalSEOConfig): boolean {
  console.warn('saveGlobalSEOConfig is deprecated. Use database via useSaveGlobalMetaSettings hook instead.');
  return false;
}
