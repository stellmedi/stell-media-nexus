
export interface PageContent {
  id: string;
  page_path: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical_url?: string;
  robots_index?: boolean;
  robots_follow?: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  updated_by?: string;
  sections: PageSection[];
}

export interface PageSection {
  id: string;
  page_path: string;
  section_key: string;
  title: string;
  content: string;
  section_type: 'hero' | 'text' | 'list' | 'features' | 'testimonials' | 'faq' | 'services';
  display_order: number;
  is_active: boolean;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface ContentVersion {
  id: string;
  page_path: string;
  content_data: any;
  version_number: number;
  created_by?: string;
  created_at: string;
  change_description?: string;
}
