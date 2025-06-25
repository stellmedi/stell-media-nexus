
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getPageContent, PageContent, subscribeToContentChanges, unsubscribeFromContentChanges } from '@/services/contentService';

interface ContentContextType {
  getContent: (pagePath: string) => PageContent | null;
  refreshContent: (pagePath: string) => Promise<void>;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [contentCache, setContentCache] = useState<Record<string, PageContent>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Record<string, any>>({});

  const getContent = (pagePath: string): PageContent | null => {
    return contentCache[pagePath] || null;
  };

  const refreshContent = async (pagePath: string) => {
    setIsLoading(true);
    try {
      const content = await getPageContent(pagePath);
      if (content) {
        setContentCache(prev => ({ ...prev, [pagePath]: content }));
        
        // Set up real-time subscription if not already subscribed
        if (!subscriptions[pagePath]) {
          const channel = subscribeToContentChanges(pagePath, () => {
            // Refresh content when changes occur
            refreshContent(pagePath);
          });
          
          setSubscriptions(prev => ({ ...prev, [pagePath]: channel }));
        }
      }
    } catch (error) {
      console.error('Error refreshing content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for content updates from the admin panel
  useEffect(() => {
    const handleContentUpdate = (event: CustomEvent) => {
      const { pagePath, content } = event.detail;
      setContentCache(prev => ({ ...prev, [pagePath]: content }));
    };

    window.addEventListener('contentUpdated', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate as EventListener);
    };
  }, []);

  // Cleanup subscriptions on unmount
  useEffect(() => {
    return () => {
      Object.values(subscriptions).forEach(channel => {
        unsubscribeFromContentChanges(channel);
      });
    };
  }, [subscriptions]);

  const value = {
    getContent,
    refreshContent,
    isLoading
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
