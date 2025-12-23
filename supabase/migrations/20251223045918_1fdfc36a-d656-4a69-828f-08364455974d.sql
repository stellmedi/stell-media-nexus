-- Drop the existing check constraint if it exists
ALTER TABLE public.page_sections DROP CONSTRAINT IF EXISTS page_sections_section_type_check;

-- Add new check constraint with additional section types
ALTER TABLE public.page_sections ADD CONSTRAINT page_sections_section_type_check 
  CHECK (section_type IN ('hero', 'text', 'list', 'features', 'testimonials', 'faq', 'services', 'stats', 'cta', 'clients', 'gallery', 'team', 'pricing', 'contact'));