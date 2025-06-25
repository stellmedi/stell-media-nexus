
import { supabase } from '@/integrations/supabase/client';
import { PageContent, PageSection, addPageSection, updatePageContent } from '@/services/contentService';

// Live website content that needs to be imported into the database
const liveContentData = {
  '/': {
    title: 'Stell Media | Digital Growth for Real Estate & E-commerce',
    metaTitle: 'Stell Media | E-commerce Optimization & Product Discovery Experts',
    metaDescription: 'Transform your e-commerce platform with Stell Media\'s AI-powered product discovery, search optimization, and conversion enhancement services. Boost sales with data-driven solutions.',
    sections: [
      {
        section_key: 'hero',
        title: 'Helping real estate developers close faster and e-commerce brands sell smarter with powerful automation, product discovery, and digital performance strategies.',
        content: 'Digital Growth for Real Estate Developers and eCommerce Brands',
        section_type: 'hero' as const,
        display_order: 1,
        is_active: true
      },
      {
        section_key: 'services',
        title: 'Our Digital Growth Services',
        content: 'Comprehensive digital marketing solutions designed to accelerate growth for real estate developers and e-commerce businesses',
        section_type: 'services' as const,
        display_order: 2,
        is_active: true
      }
    ]
  }
};

export const importLiveContentToDatabase = async (): Promise<boolean> => {
  try {
    console.log('Starting content import from live website...');
    
    for (const [pagePath, pageData] of Object.entries(liveContentData)) {
      console.log(`Importing content for page: ${pagePath}`);
      
      // First, check if page content exists
      const { data: existingPage, error: pageError } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_path', pagePath)
        .maybeSingle();

      if (pageError) {
        console.error('Error checking existing page:', pageError);
        continue;
      }

      // Update or create page content
      if (existingPage) {
        console.log(`Updating existing page: ${pagePath}`);
        await updatePageContent(pagePath, {
          title: pageData.title,
          meta_title: pageData.metaTitle,
          meta_description: pageData.metaDescription,
          is_published: true
        });
      } else {
        console.log(`Creating new page: ${pagePath}`);
        const { error: insertError } = await supabase
          .from('page_content')
          .insert({
            page_path: pagePath,
            title: pageData.title,
            meta_title: pageData.metaTitle,
            meta_description: pageData.metaDescription,
            is_published: true
          });

        if (insertError) {
          console.error('Error creating page:', insertError);
          continue;
        }
      }

      // Import sections
      for (const sectionData of pageData.sections) {
        console.log(`Importing section: ${sectionData.section_key} for page: ${pagePath}`);
        
        // Check if section already exists
        const { data: existingSection, error: sectionError } = await supabase
          .from('page_sections')
          .select('*')
          .eq('page_path', pagePath)
          .eq('section_key', sectionData.section_key)
          .maybeSingle();

        if (sectionError) {
          console.error('Error checking existing section:', sectionError);
          continue;
        }

        if (existingSection) {
          console.log(`Updating existing section: ${sectionData.section_key}`);
          const { error: updateError } = await supabase
            .from('page_sections')
            .update({
              title: sectionData.title,
              content: sectionData.content,
              section_type: sectionData.section_type,
              display_order: sectionData.display_order,
              is_active: sectionData.is_active,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingSection.id);

          if (updateError) {
            console.error('Error updating section:', updateError);
          }
        } else {
          console.log(`Creating new section: ${sectionData.section_key}`);
          await addPageSection(pagePath, {
            page_path: pagePath,
            section_key: sectionData.section_key,
            title: sectionData.title,
            content: sectionData.content,
            section_type: sectionData.section_type,
            display_order: sectionData.display_order,
            is_active: sectionData.is_active
          });
        }
      }
    }

    console.log('Content import completed successfully!');
    
    // Dispatch event to notify components to refresh
    window.dispatchEvent(new CustomEvent('contentImported', {
      detail: { success: true }
    }));

    return true;
  } catch (error) {
    console.error('Error importing content:', error);
    return false;
  }
};

export const checkContentSync = async (): Promise<{
  isInSync: boolean;
  issues: string[];
}> => {
  const issues: string[] = [];
  
  try {
    // Check if database has the correct hero content
    const { data: heroSection } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_path', '/')
      .eq('section_key', 'hero')
      .maybeSingle();

    if (!heroSection) {
      issues.push('Hero section missing from database');
    } else if (heroSection.content !== 'Digital Growth for Real Estate Developers and eCommerce Brands') {
      issues.push('Hero section content does not match live website');
    }

    // Check services section
    const { data: servicesSection } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_path', '/')
      .eq('section_key', 'services')
      .maybeSingle();

    if (!servicesSection) {
      issues.push('Services section missing from database');
    }

    return {
      isInSync: issues.length === 0,
      issues
    };
  } catch (error) {
    console.error('Error checking content sync:', error);
    return {
      isInSync: false,
      issues: ['Error checking content sync']
    };
  }
};
