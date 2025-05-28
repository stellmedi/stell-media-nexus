
// src/utils/emailService.ts
import emailjs from 'emailjs-com';

// Configuration constants
export const SERVICE_ID = 'service_xkel7zm';
export const TEMPLATE_ID = 'template_5ep34jd';
export const USER_ID = '1lrNuoabQwmNT0aKU';

// Template IDs for different form types
export const TEMPLATES = {
  contact: TEMPLATE_ID,
  consultation: TEMPLATE_ID, // Using same template for now
};

// Email data interface
export interface EmailFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message?: string;
  website?: string;
  phone?: string;
  [key: string]: string | undefined; // Allow any additional fields
}

// Initialize EmailJS
emailjs.init(USER_ID);

// Check if EmailJS is configured
export function isEmailJSConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && USER_ID);
}

// Original function for backward compatibility
export function sendContactEmail(form: HTMLFormElement): Promise<any> {
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
}

// New function that works with data objects
export function sendEmail(templateId: string, data: EmailFormData): Promise<any> {
  // Add recipient email to ensure emails go to info@stellmedia.com
  const templateParams = {
    ...data,
    to_email: 'info@stellmedia.com',
    reply_to: data.email || 'info@stellmedia.com',
  };

  console.log('Sending email with params:', templateParams);
  
  return emailjs.send(
    SERVICE_ID,
    templateId || TEMPLATE_ID,
    templateParams,
    USER_ID
  ).then(response => {
    console.log('Email sent successfully:', response);
    return response;
  }).catch(error => {
    console.error('Failed to send email:', error);
    throw error;
  });
}
