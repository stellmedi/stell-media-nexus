
import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : 'https://stellmedia.com',
  title = 'Stell Media - Digital Growth Partner',
  description = 'Your trusted digital growth partner for real estate and e-commerce solutions',
  className = ''
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    instagram: 'https://www.instagram.com/stellmediaglobal/' // Direct link to Instagram profile
  };

  const handleShare = (platform: string, shareUrl: string) => {
    if (platform === 'instagram') {
      // For Instagram, just open the profile page
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    } else {
      // For Facebook and LinkedIn, open share dialog
      window.open(
        shareUrl,
        `share-${platform}`,
        'width=600,height=400,scrollbars=no,resizable=no'
      );
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-gray-700 mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook', shareLinks.facebook)}
        className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
        aria-label="Share on Facebook"
      >
        <Facebook size={16} className="text-blue-600" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin', shareLinks.linkedin)}
        className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} className="text-blue-700" />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('instagram', shareLinks.instagram)}
        className="flex items-center gap-2 hover:bg-pink-50 hover:border-pink-200"
        aria-label="Follow us on Instagram"
      >
        <Instagram size={16} className="text-pink-600" />
        <span className="hidden sm:inline">Instagram</span>
      </Button>
    </div>
  );
};

export default SocialShareButtons;
