// src/utils/emailService.ts
```typescript
import emailjs from 'emailjs-com';
import { toast } from 'sonner';

// Analytics declaration
declare global {
  interface Window {
    gtag: (command: string, action: string, params: object) => void;
  }
}

// Payload for form submissions
export interface EmailFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// EmailJS configuration
const SERVICE_ID = 'service_xkel7zm';
const TEMPLATE_ID = 'template_5ep34jd';
const USER_ID = '1lrNuoabQwmNT0aKU';

// Initialize EmailJS SDK
export function initEmailJS(): void {
  try {
    emailjs.init(USER_ID);
    console.log('EmailJS initialized');
  } catch (error) {
    console.error('EmailJS init failed:', error);
    toast.error('Failed to initialize email service');
  }
}

// Check if EmailJS is configured
export function isEmailJSConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && USER_ID);
}

// Send email via EmailJS
export async function sendEmail(form: HTMLFormElement): Promise<void> {
  const params = new FormData(form);
  params.append('to_email', 'info@stellmedia.com');

  try {
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
    console.log('Email sent');
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'form_submission', {
        event_category: 'contact_form',
        event_label: params.get('email'),
      });
    }
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}
```

// src/components/contact/SimpleContactForm.tsx
```tsx
import React, { useEffect, useRef, useState } from 'react';
import { initEmailJS, isEmailJSConfigured, sendEmail } from '@/utils/emailService';

const SimpleContactForm: React.FC<{ className?: string }> = ({ className }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const configured = isEmailJSConfigured();

  useEffect(() => {
    if (configured) initEmailJS();
  }, [configured]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || !configured) return;
    setStatus('sending');
    try {
      await sendEmail(formRef.current);
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

  if (!configured) {
    return <p className="text-red-600">Email service not configured.</p>;
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your phone (optional)"
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="message"
          placeholder="Your message"
          required
          className="w-full px-4 py-2 border rounded h-32"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-6 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
        >
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
