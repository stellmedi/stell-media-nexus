
import { useEffect, useState } from 'react';
import { getGlobalSEOConfig, saveGlobalSEOConfig, GlobalSEOConfig } from '@/config/seoDefaults';

export function useGlobalSEO() {
  const [config, setConfig] = useState<GlobalSEOConfig>({
    googleAnalyticsId: '',
    googleSearchConsoleVerification: '',
    googleTagManagerId: '',
    bingWebmasterVerification: '',
    facebookDomainVerification: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = () => {
      console.log('useGlobalSEO: Loading global SEO config');
      const loadedConfig = getGlobalSEOConfig();
      console.log('useGlobalSEO: Loaded config:', loadedConfig);
      setConfig(loadedConfig);
      setIsLoading(false);
    };

    loadConfig();

    // Listen for config updates
    const handleConfigUpdate = (e: CustomEvent) => {
      console.log('useGlobalSEO: Config update detected:', e.detail);
      setConfig(e.detail);
    };

    window.addEventListener('globalSEOConfigUpdated', handleConfigUpdate as EventListener);
    
    return () => {
      window.removeEventListener('globalSEOConfigUpdated', handleConfigUpdate as EventListener);
    };
  }, []);

  const updateConfig = (newConfig: GlobalSEOConfig) => {
    console.log('useGlobalSEO: Updating config:', newConfig);
    const success = saveGlobalSEOConfig(newConfig);
    if (success) {
      setConfig(newConfig);
    }
    return success;
  };

  return { config, isLoading, updateConfig };
}
