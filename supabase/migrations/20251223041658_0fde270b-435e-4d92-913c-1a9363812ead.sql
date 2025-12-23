-- Create case_studies table
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  image TEXT,
  client TEXT,
  results JSONB DEFAULT '[]'::jsonb,
  challenge TEXT,
  solution TEXT,
  implementation JSONB DEFAULT '[]'::jsonb,
  testimonial JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public can read published, Admins can manage all
CREATE POLICY "Public can read published case studies"
ON public.case_studies
FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage case studies"
ON public.case_studies
FOR ALL
USING (is_admin_user());

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_case_studies_updated_at
BEFORE UPDATE ON public.case_studies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial case studies data
INSERT INTO public.case_studies (slug, title, description, category, image, client, results, challenge, solution, implementation, testimonial, is_published, display_order) VALUES
(
  'luxury-real-estate-360-campaign',
  'Luxury Real Estate 360° Marketing Campaign',
  'Comprehensive digital marketing strategy that increased property inquiries by 340% through integrated virtual tours, targeted advertising, and data-driven lead nurturing.',
  'Real Estate',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'Premium Properties Dubai',
  '[{"metric": "340%", "label": "Increase in Inquiries"}, {"metric": "45%", "label": "Reduction in Cost Per Lead"}, {"metric": "2.5M", "label": "Monthly Impressions"}, {"metric": "28%", "label": "Conversion Rate"}]'::jsonb,
  'Premium Properties Dubai faced challenges in reaching high-net-worth individuals in a competitive luxury real estate market. Traditional marketing methods were yielding diminishing returns, and the cost per qualified lead was unsustainably high.',
  'We implemented a comprehensive 360° marketing approach combining immersive virtual property tours, precision-targeted social media campaigns, and an AI-powered lead scoring system. This allowed us to identify and engage serious buyers while filtering out casual browsers.',
  '["Developed 50+ interactive 3D virtual tours for luxury properties", "Created targeted ad campaigns across Google, Meta, and LinkedIn", "Implemented CRM integration with automated lead nurturing sequences", "Built custom analytics dashboard for real-time performance monitoring"]'::jsonb,
  '{"quote": "Stell Media transformed our digital presence completely. The virtual tours alone have revolutionized how we showcase properties, and the lead quality has never been better.", "author": "Ahmed Al-Rashid", "role": "Marketing Director", "company": "Premium Properties Dubai"}'::jsonb,
  true,
  1
),
(
  'ecommerce-performance-optimization',
  'E-Commerce Performance Marketing Transformation',
  'Data-driven e-commerce optimization that achieved 520% ROAS improvement through advanced audience segmentation, dynamic product ads, and conversion rate optimization.',
  'E-Commerce',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
  'Fashion Forward UAE',
  '[{"metric": "520%", "label": "ROAS Improvement"}, {"metric": "180%", "label": "Revenue Growth"}, {"metric": "35%", "label": "Cart Abandonment Reduction"}, {"metric": "4.2x", "label": "Customer Lifetime Value"}]'::jsonb,
  'Fashion Forward UAE was struggling with high customer acquisition costs and low return on ad spend. Their broad targeting approach was inefficient, and cart abandonment rates were significantly above industry averages.',
  'We restructured their entire digital marketing funnel with advanced audience segmentation, implemented dynamic product advertising based on browsing behavior, and deployed a comprehensive cart abandonment recovery system with personalized email and SMS sequences.',
  '["Segmented audiences into 15+ behavioral cohorts for precise targeting", "Deployed dynamic product catalog ads with real-time inventory sync", "Created automated cart recovery sequences with personalized incentives", "Implemented A/B testing framework for continuous optimization"]'::jsonb,
  '{"quote": "The results speak for themselves. Our ROAS went from barely breaking even to consistently delivering 5x+ returns. Stell Media truly understands e-commerce performance marketing.", "author": "Sarah Chen", "role": "CEO", "company": "Fashion Forward UAE"}'::jsonb,
  true,
  2
),
(
  'b2b-lead-generation-campaign',
  'B2B Lead Generation & CRM Integration',
  'Multi-channel B2B lead generation campaign that generated 850+ qualified leads in 6 months with an innovative content marketing and LinkedIn outreach strategy.',
  'B2B',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
  'TechScale Solutions',
  '[{"metric": "850+", "label": "Qualified Leads"}, {"metric": "67%", "label": "Lead-to-Meeting Rate"}, {"metric": "42%", "label": "Pipeline Conversion"}, {"metric": "$2.4M", "label": "Pipeline Value"}]'::jsonb,
  'TechScale Solutions needed to scale their B2B lead generation beyond founder-led sales. They lacked a systematic approach to identifying and nurturing enterprise prospects, and their CRM data was fragmented and underutilized.',
  'We developed a multi-pronged approach combining thought leadership content, targeted LinkedIn campaigns, and automated outreach sequences. We also cleaned and enriched their CRM data, implementing lead scoring to prioritize high-value prospects.',
  '["Created 12 industry-specific whitepapers and case studies", "Built automated LinkedIn outreach sequences with personalization", "Implemented HubSpot CRM with custom lead scoring", "Developed ABM campaigns targeting 200 enterprise accounts"]'::jsonb,
  '{"quote": "Stell Media helped us build a predictable lead generation engine. We now have a consistent flow of qualified opportunities, and our sales team can focus on closing deals instead of prospecting.", "author": "Michael Torres", "role": "VP of Sales", "company": "TechScale Solutions"}'::jsonb,
  true,
  3
),
(
  'real-estate-virtual-tours',
  'Virtual Tour Innovation for Property Marketing',
  'Revolutionary virtual tour implementation that reduced property viewing time by 60% while increasing serious buyer engagement by 200%.',
  'Real Estate',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  'Horizon Developers',
  '[{"metric": "200%", "label": "Buyer Engagement"}, {"metric": "60%", "label": "Time Savings"}, {"metric": "45", "label": "Properties Showcased"}, {"metric": "89%", "label": "Viewer Satisfaction"}]'::jsonb,
  'Horizon Developers had a portfolio of 45 luxury properties but struggled to efficiently showcase them to international buyers who couldn''t easily visit in person. Physical viewings were time-consuming and often unqualified.',
  'We created an immersive virtual tour platform with 360° walkthroughs, interactive floor plans, and integrated scheduling for serious buyers. The platform included virtual staging options and neighborhood exploration features.',
  '["Produced 45 high-quality 360° virtual property tours", "Integrated booking system for qualified buyer appointments", "Added virtual staging capabilities for under-construction properties", "Created neighborhood exploration modules with amenity mapping"]'::jsonb,
  '{"quote": "The virtual tour platform has completely changed how we sell properties. International buyers can now explore our entire portfolio from anywhere in the world, and when they do visit, they''re already serious about buying.", "author": "Fatima Al-Mansouri", "role": "Sales Director", "company": "Horizon Developers"}'::jsonb,
  true,
  4
);