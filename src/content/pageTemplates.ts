// Page templates with default content structures for all pages
// Used to initialize pages in the CMS and provide fallback content

export interface SectionTemplate {
  section_key: string;
  title: string;
  content: string;
  section_type: string;
  display_order: number;
  metadata?: Record<string, any>;
}

export interface PageTemplate {
  page_path: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  sections: SectionTemplate[];
}

// Generate unique ID for items
const generateItemId = () => `item-${Date.now()}-${Math.random().toString(36).substring(7)}`;

export const pageTemplates: Record<string, PageTemplate> = {
  '/': {
    page_path: '/',
    title: 'Home',
    meta_title: 'Stell Media - Digital Marketing Agency',
    meta_description: 'Premier digital marketing agency specializing in e-commerce and real estate marketing solutions.',
    sections: [
      {
        section_key: 'hero',
        title: 'Transform Your Digital Presence',
        content: 'We help businesses grow through innovative digital marketing strategies.',
        section_type: 'hero',
        display_order: 0,
        metadata: {
          cta_text: 'Get Started',
          cta_link: '/consultation',
          cta_secondary_text: 'View Our Work',
          cta_secondary_link: '/case-studies',
          gradient_from: '#3b82f6',
          gradient_to: '#8b5cf6'
        }
      },
      {
        section_key: 'services',
        title: 'Our Services',
        content: 'Comprehensive digital marketing solutions tailored to your needs.',
        section_type: 'services',
        display_order: 1,
        metadata: {
          items: []
        }
      },
      {
        section_key: 'social_proof',
        title: 'Trusted by Leading Brands',
        content: 'Join hundreds of companies that trust us with their digital growth.',
        section_type: 'features',
        display_order: 2,
        metadata: {}
      },
      {
        section_key: 'testimonials',
        title: 'What Our Clients Say',
        content: 'Real stories from real clients who have transformed their business with us.',
        section_type: 'testimonials',
        display_order: 3,
        metadata: {}
      },
      {
        section_key: 'cta',
        title: 'Ready to Grow?',
        content: 'Schedule a free consultation and discover how we can help your business thrive.',
        section_type: 'cta',
        display_order: 4,
        metadata: {
          cta_text: 'Schedule Consultation',
          cta_link: '/consultation',
          gradient_from: '#8b5cf6',
          gradient_to: '#ec4899'
        }
      }
    ]
  },
  '/about': {
    page_path: '/about',
    title: 'About Us',
    meta_title: 'About Stell Media - Our Story & Mission',
    meta_description: 'Learn about our mission, values, and the team behind Stell Media.',
    sections: [
      {
        section_key: 'hero',
        title: 'About Stell Media',
        content: 'We are a passionate team of digital marketing experts dedicated to helping businesses succeed online.',
        section_type: 'hero',
        display_order: 0,
        metadata: {
          gradient_from: '#3b82f6',
          gradient_to: '#06b6d4'
        }
      },
      {
        section_key: 'mission',
        title: 'Our Mission',
        content: 'To empower businesses with innovative digital marketing strategies that drive measurable results and sustainable growth.',
        section_type: 'text',
        display_order: 1,
        metadata: {
          icon_name: 'Target',
          gradient_from: '#3b82f6',
          gradient_to: '#8b5cf6'
        }
      },
      {
        section_key: 'vision',
        title: 'Our Vision',
        content: 'To be the most trusted digital marketing partner for businesses seeking to dominate their online presence.',
        section_type: 'text',
        display_order: 2,
        metadata: {
          icon_name: 'Zap',
          gradient_from: '#f59e0b',
          gradient_to: '#ef4444'
        }
      },
      {
        section_key: 'differentiators',
        title: 'What Sets Us Apart',
        content: 'Discover the unique advantages of partnering with Stell Media.',
        section_type: 'features',
        display_order: 3,
        metadata: {
          items: [
            {
              id: generateItemId(),
              title: 'Industry Expertise',
              description: 'Deep specialization in e-commerce and real estate marketing with proven track records.',
              icon_name: 'Award',
              gradient_from: '#3b82f6',
              gradient_to: '#8b5cf6'
            },
            {
              id: generateItemId(),
              title: 'Data-Driven Approach',
              description: 'Every strategy is backed by comprehensive analytics and market research.',
              icon_name: 'BarChart',
              gradient_from: '#10b981',
              gradient_to: '#06b6d4'
            },
            {
              id: generateItemId(),
              title: 'Proven Results',
              description: 'Consistent track record of delivering ROI-positive campaigns.',
              icon_name: 'TrendingUp',
              gradient_from: '#f59e0b',
              gradient_to: '#ef4444'
            }
          ]
        }
      },
      {
        section_key: 'story',
        title: 'Our Story',
        content: 'Founded with a vision to transform how businesses approach digital marketing, Stell Media has grown into a trusted partner for companies seeking to establish and grow their online presence.\n\nOur journey began when our founders recognized a gap in the market for specialized digital marketing services that truly understand the unique challenges of e-commerce and real estate businesses.\n\nToday, we continue to innovate and adapt to the ever-changing digital landscape, always keeping our clients\' success at the heart of everything we do.',
        section_type: 'text',
        display_order: 4,
        metadata: {}
      },
      {
        section_key: 'cta',
        title: 'Ready to Partner with Us?',
        content: 'Let\'s discuss how we can help transform your digital presence.',
        section_type: 'cta',
        display_order: 5,
        metadata: {
          cta_text: 'Get in Touch',
          cta_link: '/contact',
          gradient_from: '#8b5cf6',
          gradient_to: '#ec4899'
        }
      }
    ]
  },
  '/services': {
    page_path: '/services',
    title: 'Our Services',
    meta_title: 'Digital Marketing Services - Stell Media',
    meta_description: 'Explore our comprehensive digital marketing services including SEO, SEM, and more.',
    sections: [
      {
        section_key: 'hero',
        title: 'Our Services',
        content: 'Comprehensive digital marketing solutions to drive your business growth.',
        section_type: 'hero',
        display_order: 0,
        metadata: {
          gradient_from: '#3b82f6',
          gradient_to: '#8b5cf6'
        }
      },
      {
        section_key: 'services_list',
        title: 'What We Offer',
        content: 'Choose from our range of specialized services.',
        section_type: 'services',
        display_order: 1,
        metadata: {
          items: []
        }
      },
      {
        section_key: 'cta',
        title: 'Need a Custom Solution?',
        content: 'Contact us to discuss your specific requirements.',
        section_type: 'cta',
        display_order: 2,
        metadata: {
          cta_text: 'Contact Us',
          cta_link: '/contact',
          gradient_from: '#8b5cf6',
          gradient_to: '#ec4899'
        }
      }
    ]
  },
  '/contact': {
    page_path: '/contact',
    title: 'Contact Us',
    meta_title: 'Contact Stell Media - Get in Touch',
    meta_description: 'Reach out to our team for inquiries, consultations, or partnership opportunities.',
    sections: [
      {
        section_key: 'hero',
        title: 'Get in Touch',
        content: 'We\'d love to hear from you. Reach out to discuss your project.',
        section_type: 'hero',
        display_order: 0,
        metadata: {
          gradient_from: '#3b82f6',
          gradient_to: '#06b6d4'
        }
      },
      {
        section_key: 'contact_info',
        title: 'Contact Information',
        content: 'Multiple ways to reach our team.',
        section_type: 'features',
        display_order: 1,
        metadata: {
          items: [
            {
              id: generateItemId(),
              title: 'Email',
              description: 'hello@stellmedia.com',
              icon_name: 'Mail'
            },
            {
              id: generateItemId(),
              title: 'Phone',
              description: '+1 (555) 123-4567',
              icon_name: 'Phone'
            },
            {
              id: generateItemId(),
              title: 'Location',
              description: 'New York, NY',
              icon_name: 'MapPin'
            }
          ]
        }
      },
      {
        section_key: 'expectations',
        title: 'What to Expect',
        content: 'Our response process after you reach out.',
        section_type: 'list',
        display_order: 2,
        metadata: {
          list_items: [
            'Response within 24 hours',
            'Free initial consultation',
            'Custom proposal tailored to your needs',
            'Transparent pricing and timeline'
          ]
        }
      }
    ]
  },
  '/careers': {
    page_path: '/careers',
    title: 'Careers',
    meta_title: 'Careers at Stell Media - Join Our Team',
    meta_description: 'Explore career opportunities and join our growing team of digital marketing experts.',
    sections: [
      {
        section_key: 'hero',
        title: 'Join Our Team',
        content: 'Build your career with a team that values innovation and growth.',
        section_type: 'hero',
        display_order: 0,
        metadata: {
          gradient_from: '#10b981',
          gradient_to: '#06b6d4'
        }
      },
      {
        section_key: 'benefits',
        title: 'Why Work With Us',
        content: 'Discover the benefits of being part of the Stell Media team.',
        section_type: 'features',
        display_order: 1,
        metadata: {
          items: [
            {
              id: generateItemId(),
              title: 'Remote-First Culture',
              description: 'Work from anywhere with flexible hours.',
              icon_name: 'Globe'
            },
            {
              id: generateItemId(),
              title: 'Growth Opportunities',
              description: 'Continuous learning and career development.',
              icon_name: 'TrendingUp'
            },
            {
              id: generateItemId(),
              title: 'Competitive Benefits',
              description: 'Health insurance, 401k, and more.',
              icon_name: 'Shield'
            },
            {
              id: generateItemId(),
              title: 'Great Team',
              description: 'Collaborative and supportive environment.',
              icon_name: 'Users'
            }
          ]
        }
      },
      {
        section_key: 'positions',
        title: 'Open Positions',
        content: 'Explore our current job openings.',
        section_type: 'list',
        display_order: 2,
        metadata: {}
      },
      {
        section_key: 'cta',
        title: 'Don\'t See Your Role?',
        content: 'We\'re always looking for talented individuals. Send us your resume!',
        section_type: 'cta',
        display_order: 3,
        metadata: {
          cta_text: 'Send Your Resume',
          cta_link: 'mailto:careers@stellmedia.com'
        }
      }
    ]
  },
  '/blog': {
    page_path: '/blog',
    title: 'Blog',
    meta_title: 'Digital Marketing Blog - Stell Media',
    meta_description: 'Insights, tips, and industry news from our digital marketing experts.',
    sections: [
      {
        section_key: 'hero',
        title: 'Our Blog',
        content: 'Insights and strategies from our digital marketing experts.',
        section_type: 'hero',
        display_order: 0,
        metadata: {
          gradient_from: '#f59e0b',
          gradient_to: '#ef4444'
        }
      }
    ]
  },
  '/case-studies': {
    page_path: '/case-studies',
    title: 'Case Studies',
    meta_title: 'Case Studies - Stell Media Success Stories',
    meta_description: 'Explore our portfolio of successful digital marketing campaigns and client results.',
    sections: [
      {
        section_key: 'hero',
        title: 'Our Work',
        content: 'Real results from real clients. Explore our success stories.',
        section_type: 'hero',
        display_order: 0,
        metadata: {
          gradient_from: '#8b5cf6',
          gradient_to: '#ec4899'
        }
      }
    ]
  },
  '/faq': {
    page_path: '/faq',
    title: 'FAQ',
    meta_title: 'Frequently Asked Questions - Stell Media',
    meta_description: 'Find answers to common questions about our services and processes.',
    sections: [
      {
        section_key: 'hero',
        title: 'Frequently Asked Questions',
        content: 'Find answers to common questions about our services.',
        section_type: 'hero',
        display_order: 0,
        metadata: {}
      }
    ]
  },
  '/real-estate': {
    page_path: '/real-estate',
    title: 'Real Estate Marketing',
    meta_title: 'Real Estate Marketing Services - Stell Media',
    meta_description: 'Specialized digital marketing solutions for real estate professionals and agencies.',
    sections: [
      {
        section_key: 'hero',
        title: 'Real Estate Marketing',
        content: 'Specialized marketing solutions to help real estate professionals stand out.',
        section_type: 'hero',
        display_order: 0,
        metadata: {
          gradient_from: '#10b981',
          gradient_to: '#06b6d4'
        }
      },
      {
        section_key: 'services',
        title: 'Real Estate Services',
        content: 'Comprehensive marketing solutions for the real estate industry.',
        section_type: 'services',
        display_order: 1,
        metadata: {
          items: [
            {
              id: generateItemId(),
              title: 'Virtual Tours',
              description: '360° immersive property experiences.',
              icon_name: 'View',
              link: '/services/virtual-tours'
            },
            {
              id: generateItemId(),
              title: '3D Visualization',
              description: 'Photorealistic property renderings.',
              icon_name: 'Box',
              link: '/services/3d-visualization'
            },
            {
              id: generateItemId(),
              title: 'Lead Generation',
              description: 'Attract qualified property buyers.',
              icon_name: 'Users',
              link: '/services/lead-generation'
            }
          ]
        }
      },
      {
        section_key: 'benefits',
        title: 'Why Choose Us',
        content: 'Benefits of our real estate marketing expertise.',
        section_type: 'features',
        display_order: 2,
        metadata: {
          items: []
        }
      },
      {
        section_key: 'testimonials',
        title: 'Client Success Stories',
        content: 'What our real estate clients say about us.',
        section_type: 'testimonials',
        display_order: 3,
        metadata: {}
      },
      {
        section_key: 'cta',
        title: 'Ready to Elevate Your Listings?',
        content: 'Let\'s discuss how we can help you sell properties faster.',
        section_type: 'cta',
        display_order: 4,
        metadata: {
          cta_text: 'Get Started',
          cta_link: '/consultation'
        }
      }
    ]
  },
  '/ecommerce': {
    page_path: '/ecommerce',
    title: 'E-Commerce Marketing',
    meta_title: 'E-Commerce Marketing Services - Stell Media',
    meta_description: 'Boost your online store with our specialized e-commerce marketing solutions.',
    sections: [
      {
        section_key: 'hero',
        title: 'E-Commerce Marketing',
        content: 'Drive sales and growth for your online store with proven strategies.',
        section_type: 'hero',
        display_order: 0,
        metadata: {
          gradient_from: '#8b5cf6',
          gradient_to: '#ec4899'
        }
      },
      {
        section_key: 'services',
        title: 'E-Commerce Services',
        content: 'Complete marketing solutions for online retailers.',
        section_type: 'services',
        display_order: 1,
        metadata: {
          items: [
            {
              id: generateItemId(),
              title: 'Catalog SEO',
              description: 'Optimize your product listings for search.',
              icon_name: 'Search',
              link: '/services/catalog-seo'
            },
            {
              id: generateItemId(),
              title: 'Performance Marketing',
              description: 'Data-driven advertising campaigns.',
              icon_name: 'TrendingUp',
              link: '/services/ecommerce-performance-marketing'
            },
            {
              id: generateItemId(),
              title: 'Conversion Optimization',
              description: 'Turn visitors into customers.',
              icon_name: 'Target',
              link: '/services/conversion-optimization'
            }
          ]
        }
      },
      {
        section_key: 'cta',
        title: 'Ready to Grow Your Store?',
        content: 'Let\'s build a strategy that drives results.',
        section_type: 'cta',
        display_order: 2,
        metadata: {
          cta_text: 'Get Started',
          cta_link: '/consultation'
        }
      }
    ]
  },
  '/consultation': {
    page_path: '/consultation',
    title: 'Free Consultation',
    meta_title: 'Free Consultation - Stell Media',
    meta_description: 'Schedule a free consultation to discuss your digital marketing needs.',
    sections: [
      {
        section_key: 'hero',
        title: 'Schedule Your Free Consultation',
        content: 'Let\'s discuss how we can help grow your business.',
        section_type: 'hero',
        display_order: 0,
        metadata: {
          gradient_from: '#3b82f6',
          gradient_to: '#8b5cf6'
        }
      }
    ]
  },
  '/privacy': {
    page_path: '/privacy',
    title: 'Privacy Policy',
    meta_title: 'Privacy Policy - Stell Media',
    meta_description: 'Our privacy policy and data handling practices.',
    sections: [
      {
        section_key: 'hero',
        title: 'Privacy Policy',
        content: 'How we handle and protect your data.',
        section_type: 'hero',
        display_order: 0,
        metadata: {}
      },
      {
        section_key: 'content',
        title: 'Privacy Policy Content',
        content: 'Your privacy is important to us. This policy outlines how we collect, use, and protect your information.',
        section_type: 'text',
        display_order: 1,
        metadata: {}
      }
    ]
  },
  '/terms': {
    page_path: '/terms',
    title: 'Terms of Service',
    meta_title: 'Terms of Service - Stell Media',
    meta_description: 'Our terms of service and usage policies.',
    sections: [
      {
        section_key: 'hero',
        title: 'Terms of Service',
        content: 'Please read these terms carefully before using our services.',
        section_type: 'hero',
        display_order: 0,
        metadata: {}
      },
      {
        section_key: 'content',
        title: 'Terms Content',
        content: 'By using our services, you agree to these terms and conditions.',
        section_type: 'text',
        display_order: 1,
        metadata: {}
      }
    ]
  }
};

// Service subpages template generator
const createServicePageTemplate = (
  path: string,
  title: string,
  description: string
): PageTemplate => ({
  page_path: path,
  title,
  meta_title: `${title} - Stell Media`,
  meta_description: description,
  sections: [
    {
      section_key: 'hero',
      title,
      content: description,
      section_type: 'hero',
      display_order: 0,
      metadata: {
        gradient_from: '#3b82f6',
        gradient_to: '#8b5cf6'
      }
    },
    {
      section_key: 'features',
      title: 'Key Features',
      content: 'What makes our service stand out.',
      section_type: 'features',
      display_order: 1,
      metadata: { items: [] }
    },
    {
      section_key: 'process',
      title: 'Our Process',
      content: 'How we deliver results.',
      section_type: 'list',
      display_order: 2,
      metadata: {}
    },
    {
      section_key: 'cta',
      title: 'Ready to Get Started?',
      content: 'Contact us to learn more about this service.',
      section_type: 'cta',
      display_order: 3,
      metadata: {
        cta_text: 'Get Started',
        cta_link: '/consultation'
      }
    }
  ]
});

// Add service subpages
const serviceSubpages = [
  { path: '/services/seo', title: 'SEO Services', description: 'Improve your search rankings with our comprehensive SEO strategies.' },
  { path: '/services/sem', title: 'SEM Services', description: 'Drive targeted traffic with paid search advertising.' },
  { path: '/services/creative', title: 'Creative Services', description: 'Compelling creative content that converts.' },
  { path: '/services/catalog-seo', title: 'Catalog SEO', description: 'Optimize your product catalog for maximum visibility.' },
  { path: '/services/conversion-optimization', title: 'Conversion Optimization', description: 'Turn more visitors into customers.' },
  { path: '/services/ecommerce-performance-marketing', title: 'E-Commerce Performance Marketing', description: 'Data-driven marketing for online stores.' },
  { path: '/services/lead-generation', title: 'Lead Generation', description: 'Generate high-quality leads for your business.' },
  { path: '/services/virtual-tours', title: 'Virtual Tours', description: 'Immersive 360° virtual property tours.' },
  { path: '/services/3d-visualization', title: '3D Visualization', description: 'Photorealistic 3D property renderings.' },
  { path: '/services/data-enrichment', title: 'Data Enrichment', description: 'Enhance your data for better targeting.' },
  { path: '/services/crm-lead-management', title: 'CRM & Lead Management', description: 'Streamline your sales pipeline.' },
  { path: '/services/product-discovery', title: 'Product Discovery', description: 'Help customers find your products.' }
];

serviceSubpages.forEach(service => {
  pageTemplates[service.path] = createServicePageTemplate(service.path, service.title, service.description);
});

// Get all available page paths
export const getAllPagePaths = (): string[] => Object.keys(pageTemplates);

// Get template for a specific page
export const getPageTemplate = (pagePath: string): PageTemplate | undefined => {
  return pageTemplates[pagePath];
};

export default pageTemplates;
