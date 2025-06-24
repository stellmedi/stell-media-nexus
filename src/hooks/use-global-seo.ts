
import { useState, useEffect } from 'react';

interface GlobalSEOConfig {
  siteName: string;
  siteDescription: string;
  defaultOgImage: string;
  googleAnalyticsId: string;
  googleSearchConsoleVerification: string;
  googleTagManagerId: string;
  bingWebmasterVerification: string;
  facebookDomainVerification: string;
}

const defaultConfig: GlobalSEOConfig = {
  siteName: "Stell Media",
  siteDescription: "Leading e-commerce optimization agency specializing in product discovery, search optimization, and conversion enhancement services",
  defaultOgImage: "/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png",
  googleAnalyticsId: "G-X430SJ0QPS",
  googleSearchConsoleVerification: "",
  googleTagManagerId: "",
  bingWebmasterVerification: "",
  facebookDomainVerification: ""
};

export function useGlobalSEO() {
  const [config, setConfig] = useState<GlobalSEOConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = () => {
      try {
        const saved = localStorage.getItem('stellmedia_global_seo_config');
        if (saved) {
          const data = JSON.parse(saved);
          setConfig({ ...defaultConfig, ...data });
        }
      } catch (error) {
        console.error('Error loading global SEO config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();

    // Listen for updates
    const handleGlobalSEOUpdate = (event: CustomEvent) => {
      setConfig(event.detail.config);
    };

    window.addEventListener('globalSEOUpdated', handleGlobalSEOUpdate as EventListener);

    return () => {
      window.removeEventListener('globalSEOUpdated', handleGlobalSEOUpdate as EventListener);
    };
  }, []);

  return { config, isLoading };
}
