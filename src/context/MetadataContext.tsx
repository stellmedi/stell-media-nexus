
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export interface PageMetadata {
  id: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  noIndex: boolean;
  noFollow: boolean;
  schemaType: string;
  schemaProperties: string;
  aiDescription: string;
  aiKeywords: string;
  aiExpertise: string;
  aiServices: string;
  isSystemPage: boolean;
  lastUpdated: string;
}

interface MetadataContextType {
  pagesMetadata: PageMetadata[];
  currentPageMetadata: PageMetadata | null;
  updatePageMetadata: (path: string, metadata: Partial<PageMetadata>) => void;
  setCurrentPage: (path: string) => void;
  normalizeUrl: (url: string) => string;
}

const defaultContext: MetadataContextType = {
  pagesMetadata: [],
  currentPageMetadata: null,
  updatePageMetadata: () => {},
  setCurrentPage: () => {},
  normalizeUrl: (url) => url
};

const MetadataContext = createContext<MetadataContextType>(defaultContext);

// Mock initial metadata for demo purposes
const initialMetadata: PageMetadata[] = [
  {
    id: "home",
    path: "/",
    title: "Stell Media | Data-Driven Solutions for E-commerce Growth",
    metaTitle: "Stell Media | Data-Driven Solutions for E-commerce Growth",
    metaDescription: "Stell Media helps e-commerce businesses grow through data-driven product discovery, SEO optimization, and AI-powered solutions.",
    canonicalUrl: "https://stellmedia.com/",
    ogTitle: "Stell Media | Innovative E-commerce Solutions",
    ogDescription: "Data-driven solutions for e-commerce growth, powered by AI and machine learning.",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    noIndex: false,
    noFollow: false,
    schemaType: "Organization",
    schemaProperties: JSON.stringify({
      name: "Stell Media",
      url: "https://stellmedia.com",
      logo: "https://stellmedia.com/logo.png"
    }),
    aiDescription: "Stell Media provides data-driven e-commerce solutions including product discovery, SEO, and AI implementations.",
    aiKeywords: "e-commerce, product discovery, SEO, AI solutions",
    aiExpertise: "e-commerce optimization, search algorithms, product data management",
    aiServices: "SEO, Content Creation, Product Discovery, Data Enrichment",
    isSystemPage: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: "seo",
    path: "/services/seo",
    title: "Expert E-commerce SEO Services | Data-Driven Results | Stell Media",
    metaTitle: "Expert E-commerce SEO Services | Data-Driven Results | Stell Media",
    metaDescription: "Boost your e-commerce visibility with Stell Media's data-driven SEO strategies. Our technical expertise improves rankings, increases organic traffic, and maximizes ROI for large product catalogs.",
    canonicalUrl: "https://stellmedia.com/services/seo",
    ogTitle: "Expert E-commerce SEO Services | Stell Media",
    ogDescription: "Boost your e-commerce visibility with data-driven SEO strategies tailored for large product catalogs.",
    ogImage: "/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    noIndex: false,
    noFollow: false,
    schemaType: "Service",
    schemaProperties: JSON.stringify({
      serviceType: "SEO Service",
      name: "E-commerce SEO Services"
    }),
    aiDescription: "Stell Media provides comprehensive SEO services for e-commerce sites, focusing on technical optimization and scalable solutions for large product catalogs.",
    aiKeywords: "e-commerce SEO, product catalog optimization, technical SEO",
    aiExpertise: "e-commerce SEO, technical SEO, product page optimization",
    aiServices: "Technical SEO Audits, Product Page Optimization, Schema Markup Implementation",
    isSystemPage: false,
    lastUpdated: new Date().toISOString()
  }
];

export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error("useMetadata must be used within a MetadataProvider");
  }
  return context;
};

interface MetadataProviderProps {
  children: ReactNode;
}

export const MetadataProvider: React.FC<MetadataProviderProps> = ({ children }) => {
  const [pagesMetadata, setPagesMetadata] = useState<PageMetadata[]>(initialMetadata);
  const [currentPageMetadata, setCurrentPageMetadata] = useState<PageMetadata | null>(null);
  const location = useLocation();

  // Normalize URLs to ensure consistency and remove old domain references
  const normalizeUrl = useCallback((url: string): string => {
    if (!url) return "";
    
    // Remove old domain references
    let normalizedUrl = url.replace(/stellmediaglobal\.com/g, "stellmedia.com");
    
    // Ensure URLs start with https:// if they don't have a protocol
    if (normalizedUrl && !normalizedUrl.startsWith('http') && normalizedUrl !== "") {
      normalizedUrl = `https://stellmedia.com${normalizedUrl.startsWith('/') ? normalizedUrl : '/' + normalizedUrl}`;
    }
    
    return normalizedUrl;
  }, []);

  // Update metadata for a specific page with auto-save
  const updatePageMetadata = useCallback((path: string, metadata: Partial<PageMetadata>) => {
    setPagesMetadata(prevState => {
      const updatedMetadata = [...prevState];
      const pageIndex = updatedMetadata.findIndex(page => page.path === path);
      
      const normalizedCanonicalUrl = normalizeUrl(metadata.canonicalUrl || `https://stellmedia.com${path}`);
      
      if (pageIndex >= 0) {
        // Update existing page metadata
        updatedMetadata[pageIndex] = {
          ...updatedMetadata[pageIndex],
          ...metadata,
          canonicalUrl: normalizedCanonicalUrl,
          lastUpdated: new Date().toISOString()
        };
      } else {
        // Add new page metadata
        const newId = `page-${Date.now()}`;
        updatedMetadata.push({
          id: newId,
          path,
          title: metadata.title || `Page ${path}`,
          metaTitle: metadata.metaTitle || metadata.title || `Page ${path}`,
          metaDescription: metadata.metaDescription || "",
          canonicalUrl: normalizedCanonicalUrl,
          ogTitle: metadata.ogTitle || metadata.metaTitle || metadata.title || "",
          ogDescription: metadata.ogDescription || metadata.metaDescription || "",
          ogImage: metadata.ogImage || "",
          twitterTitle: metadata.twitterTitle || "",
          twitterDescription: metadata.twitterDescription || "",
          twitterImage: metadata.twitterImage || "",
          noIndex: metadata.noIndex || false,
          noFollow: metadata.noFollow || false,
          schemaType: metadata.schemaType || "None",
          schemaProperties: metadata.schemaProperties || "",
          aiDescription: metadata.aiDescription || "",
          aiKeywords: metadata.aiKeywords || "",
          aiExpertise: metadata.aiExpertise || "",
          aiServices: metadata.aiServices || "",
          isSystemPage: metadata.isSystemPage || false,
          lastUpdated: new Date().toISOString()
        });
      }
      
      // Auto-save to localStorage
      try {
        localStorage.setItem('stellMedia_pagesMetadata', JSON.stringify(updatedMetadata));
      } catch (error) {
        console.error("Error saving metadata to localStorage:", error);
      }
      return updatedMetadata;
    });
  }, [normalizeUrl]);

  // Set the current page metadata based on path
  const setCurrentPage = useCallback((path: string) => {
    setPagesMetadata(prevMetadata => {
      const pageMetadata = prevMetadata.find(page => page.path === path) || null;
      setCurrentPageMetadata(pageMetadata);
      return prevMetadata; // Don't modify the array, just find the metadata
    });
  }, []);

  // Auto-update current page when location changes - removed pagesMetadata dependency to prevent infinite loop
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  // Load metadata from localStorage on initial mount only - removed normalizeUrl dependency
  useEffect(() => {
    const savedMetadata = localStorage.getItem('stellMedia_pagesMetadata');
    if (savedMetadata) {
      try {
        const parsedMetadata = JSON.parse(savedMetadata);
        // Clean up any old domain references from saved data
        const cleanedMetadata = parsedMetadata.map((page: PageMetadata) => ({
          ...page,
          canonicalUrl: page.canonicalUrl ? page.canonicalUrl.replace(/stellmediaglobal\.com/g, "stellmedia.com") : ""
        }));
        setPagesMetadata(cleanedMetadata);
      } catch (error) {
        console.error("Error parsing saved metadata:", error);
        // If there's an error, fall back to initial metadata
        setPagesMetadata(initialMetadata);
      }
    }
  }, []); // Remove normalizeUrl dependency to prevent infinite loop

  const value = {
    pagesMetadata,
    currentPageMetadata,
    updatePageMetadata,
    setCurrentPage,
    normalizeUrl
  };

  return (
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  );
};

export default MetadataContext;
