// src/components/contact/SimpleContactForm.tsx
import React, { useRef, useState } from 'react';
import { sendContactEmail } from '@/utils/emailService';

const SimpleContactForm: React.FC<{ className?: string }> = ({ className }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await sendContactEmail(formRef.current);
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error', err);
      setStatus('error');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={className}>
      {/* Hidden field routes messages to info@stellmedia.com */}
      <input type="hidden" name="to_email" value="info@stellmedia.com" />

      <div className="space-y-4">
        <input
          name="from_name"
          type="text"
          placeholder="Your name"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          name="reply_to"
          type="email"
          placeholder="Your email"
          required
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

        {status === 'success' && (
          <p className="text-green-600">Your message was sent!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
};

export default SimpleContactForm;
