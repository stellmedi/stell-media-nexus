
import { supabase } from "@/integrations/supabase/client";
import { PageContent } from "./types";

// Default content for the home page
const defaultHomePageContent: Omit<PageContent, 'id' | 'created_at' | 'updated_at' | 'sections'> = {
  page_path: '/',
  title: 'Stell Media | Digital Growth for Real Estate & eCommerce Brands',
  meta_title: 'Stell Media | Digital Growth for Real Estate & eCommerce Brands - Lead generation, CRM automation & product findability—done right.',
  meta_description: 'Digital growth for real estate and eCommerce brands. CRM automation, lead gen, and SEO-powered product discovery by Stell Media.',
  keywords: 'digital growth partner, real estate lead generation, ecommerce optimization, CRM automation, product discovery, performance marketing, catalog SEO',
  og_title: 'Stell Media | Digital Growth for Real Estate & eCommerce Brands',
  og_description: 'Digital growth for real estate and eCommerce brands. CRM automation, lead gen, and SEO-powered product discovery by Stell Media.',
  og_image: '/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png',
  twitter_title: 'Stell Media | Digital Growth for Real Estate & eCommerce Brands',
  twitter_description: 'Digital growth for real estate and eCommerce brands. CRM automation, lead gen, and SEO-powered product discovery by Stell Media.',
  twitter_image: '/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png',
  canonical_url: '/',
  robots_index: true,
  robots_follow: true,
  is_published: true,
  updated_by: null
};

// Default sections for the home page
const defaultHomeSections = [
  {
    page_path: '/',
    section_key: 'hero',
    title: 'Digital Growth Partner',
    content: 'We help real estate and eCommerce brands grow through strategic digital solutions.',
    section_type: 'hero' as const,
    display_order: 1,
    is_active: true,
    metadata: {}
  },
  {
    page_path: '/',
    section_key: 'services',
    title: 'Our Services',
    content: 'Lead generation, CRM automation, product discovery, and performance marketing.',
    section_type: 'services' as const,
    display_order: 2,
    is_active: true,
    metadata: {}
  }
];

export const createDefaultPageContent = async (pagePath: string = '/') => {
  try {
    // Check if page content already exists
    const { data: existingPage } = await supabase
      .from('page_content')
      .select('id')
      .eq('page_path', pagePath)
      .single();

    if (existingPage) {
      console.log('Page content already exists for:', pagePath);
      return existingPage;
    }

    // Create the page content
    const { data: pageData, error: pageError } = await supabase
      .from('page_content')
      .insert(defaultHomePageContent)
      .select()
      .single();

    if (pageError) {
      console.error('Error creating default page content:', pageError);
      return null;
    }

    // Create default sections
    const { error: sectionsError } = await supabase
      .from('page_sections')
      .insert(defaultHomeSections);

    if (sectionsError) {
      console.error('Error creating default sections:', sectionsError);
    }

    console.log('Created default page content for:', pagePath);
    return pageData;

  } catch (error) {
    console.error('Error in createDefaultPageContent:', error);
    return null;
  }
};
