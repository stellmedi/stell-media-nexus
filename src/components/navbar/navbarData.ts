
import { Target, TrendingUp, Search, Palette, Box, Users, Database, BarChart, Zap } from "lucide-react";

export const realEstateServices = [
  {
    title: "Lead Generation & Marketing",
    href: "/services/lead-generation",
    description: "Automated lead generation campaigns and comprehensive digital marketing strategies",
    icon: <Target className="h-4 w-4" />
  },
  {
    title: "Performance Marketing",
    href: "/services/sem",
    description: "Data-driven performance marketing campaigns designed to maximize ROI",
    icon: <TrendingUp className="h-4 w-4" />
  },
  {
    title: "SEO & Content Strategy",
    href: "/services/seo",
    description: "Drive organic traffic with strategic SEO and compelling content",
    icon: <Search className="h-4 w-4" />
  },
  {
    title: "Creative & Branding",
    href: "/contact",
    description: "Complete brand development and visual identity solutions",
    icon: <Palette className="h-4 w-4" />
  },
  {
    title: "3D Animation & Visualization",
    href: "/services/3d-visualization",
    description: "Stunning 3D animations and architectural visualization",
    icon: <Box className="h-4 w-4" />
  },
  {
    title: "CRM & Lead Management",
    href: "/services/crm-lead-management",
    description: "Complete customer relationship management systems",
    icon: <Users className="h-4 w-4" />
  }
];

export const ecommerceServices = [
  {
    title: "Product Discovery",
    href: "/ecommerce",
    description: "Advanced product discovery and search optimization",
    icon: <Search className="h-4 w-4" />
  },
  {
    title: "Catalog SEO",
    href: "/ecommerce",
    description: "Large-scale catalog optimization and data enrichment",
    icon: <Database className="h-4 w-4" />
  },
  {
    title: "Performance Marketing",
    href: "/ecommerce",
    description: "Data-driven performance marketing campaigns",
    icon: <BarChart className="h-4 w-4" />
  },
  {
    title: "Conversion Optimization",
    href: "/ecommerce",
    description: "Comprehensive conversion rate optimization",
    icon: <Zap className="h-4 w-4" />
  }
];
