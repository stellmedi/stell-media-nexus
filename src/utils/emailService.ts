```typescript
// src/utils/emailService.ts
import emailjs from 'emailjs-com';
import { toast } from 'sonner';

// TypeScript declaration for analytics
declare global {
  interface Window {
    gtag: (command: string, action: string, params: object) => void;
  }
}

// Data shape for form submissions
export interface EmailFormData {
  name: string;
  email: string;
  company?: string;
  website?: string;
  subject?: string;
  budget?: string;
  timeline?: string;
  message: string;
  phone?: string;
}

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_xkel7zm',          // your Service ID
  publicKey: '1lrNuoabQwmNT0aKU',        // your Public (User) Key
  contactTemplateId: 'template_5ep34jd', // your Contact Template ID
};

// Template constants
export const TEMPLATES = {
  CONTACT: EMAILJS_CONFIG.contactTemplateId,
};

// Helper for the recipient address
export const getNotificationEmail = (): string => 'info@stellmedia.com';

/** Initialize EmailJS SDK **/
export const initEmailJS = (): void => {
  try {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('EmailJS initialized');
  } catch (error) {
    console.error('EmailJS init failed', error);
    toast.error('Email service initialization failed');
  }
};

/** Check configuration validity **/
export const isEmailJSConfigured = (): boolean => {
  return Boolean(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.publicKey &&
    EMAILJS_CONFIG.contactTemplateId
  );
};

/** Send an email using EmailJS **/
export const sendEmail = async (
  templateId: string,
  data: EmailFormData
): Promise<any> => {
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    company: data.company || 'Not provided',
    website: data.website || 'Not provided',
    subject: data.subject || `Message from ${data.name}`,
    budget: data.budget || 'Not specified',
    timeline: data.timeline || 'Not specified',
    message: data.message,
    phone: data.phone || 'Not provided',
    to_email: getNotificationEmail(),
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );
    console.log('Email sent:', response);

    // Analytics event
    if (typeof window?.gtag === 'function') {
      window.gtag('event', 'form_submission', {
        event_category: 'contact_form',
        event_label: data.email,
      });
    }

    return response;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};


// src/components/contact/SimpleContactForm.tsx
import React, { useState, useEffect } from 'react';
import { initEmailJS, isEmailJSConfigured, sendEmail, TEMPLATES, EmailFormData } from '@/utils/emailService';

const SimpleContactForm: React.FC<{ className?: string }> = ({ className }) => {
  const [formData, setFormData] = useState<EmailFormData>({
    name: '', email: '', company: '', website: '', subject: '', budget: '', timeline: '', message: '', phone: ''
  });
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const configured = isEmailJSConfigured();

  useEffect(() => {
    if (configured) initEmailJS();
  }, [configured]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!configured) return;
    setStatus('sending');
    try {
      await sendEmail(TEMPLATES.CONTACT, formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', website: '', subject: '', budget: '', timeline: '', message: '', phone: '' });
    } catch {
      setStatus('error');
    }
  };

  if (!configured) {
    return <p className="text-red-600">Email service not configured.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="w-full px-4 py-2 border rounded" />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your email" required className="w-full px-4 py-2 border rounded" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone (optional)" className="w-full px-4 py-2 border rounded" />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message" required className="w-full px-4 py-2 border rounded h-32" />
        <button type="submit" disabled={status === 'sending'} className="px-6 py-2 bg-indigo-600 text-white rounded disabled:opacity-50">
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'success' && <p className="text-green-600">Message sent!</p>}
        {status === 'error' && <p className="text-red-600">Error sending message.</p>}
      </div>
    </form>
  );
};

export default SimpleContactForm;
```
