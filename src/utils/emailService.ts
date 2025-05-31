
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

// Track initialization state
let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

// Initialize EmailJS with proper error handling
export function initEmailJS(): Promise<void> {
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = new Promise((resolve, reject) => {
    console.log('EmailJS: Starting initialization...');
    
    try {
      emailjs.init(USER_ID);
      isInitialized = true;
      console.log('EmailJS: Initialization successful');
      resolve();
    } catch (error) {
      console.error('EmailJS: Initialization failed:', error);
      isInitialized = false;
      reject(error);
    }
  });

  return initializationPromise;
}

// Check if EmailJS is configured
export function isEmailJSConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && USER_ID);
}

// Check if EmailJS is initialized
export function isEmailJSInitialized(): boolean {
  return isInitialized;
}

// Test EmailJS connection
export async function testEmailJSConnection(): Promise<boolean> {
  console.log('EmailJS: Testing connection...');
  
  if (!isEmailJSConfigured()) {
    console.error('EmailJS: Not configured');
    return false;
  }
  
  if (!isEmailJSInitialized()) {
    try {
      await initEmailJS();
    } catch (error) {
      console.error('EmailJS: Failed to initialize during connection test:', error);
      return false;
    }
  }
  
  return true;
}

// Send email with proper template parameter mapping
export async function sendEmail(templateId: string, data: EmailFormData): Promise<any> {
  console.log('EmailJS: Starting email send process...');
  console.log('EmailJS: Form data received:', data);
  
  // Ensure EmailJS is initialized
  if (!isEmailJSInitialized()) {
    console.log('EmailJS: Not initialized, initializing now...');
    try {
      await initEmailJS();
    } catch (error) {
      throw new Error('EmailJS initialization failed. Please refresh the page and try again.');
    }
  }
  
  // Validate configuration
  if (!isEmailJSConfigured()) {
    throw new Error('EmailJS is not properly configured.');
  }
  
  // Enhanced template parameters with more comprehensive contact information
  const templateParams = {
    // Primary contact information
    from_name: data.name || 'Anonymous',
    from_email: data.email || 'no-email@example.com',
    user_name: data.name || 'Anonymous',
    user_email: data.email || 'no-email@example.com',
    
    // Message content
    message: data.message || 'No message provided',
    user_message: data.message || 'No message provided',
    
    // Additional information
    subject: data.subject || 'Contact Form Submission',
    company: data.company || 'Not specified',
    
    // Recipient information
    to_name: 'Stell Media Team',
    reply_to: data.email || 'no-reply@example.com',
    
    // Contact details formatted for easy reading
    contact_info: `Name: ${data.name || 'Not provided'}\nEmail: ${data.email || 'Not provided'}\nCompany: ${data.company || 'Not specified'}`,
    
    // Full formatted message
    full_message: `
Contact Information:
- Name: ${data.name || 'Not provided'}
- Email: ${data.email || 'Not provided'}
- Company: ${data.company || 'Not specified'}

Message:
${data.message || 'No message provided'}
    `.trim(),
  };

  console.log('EmailJS: Sending with enhanced parameters:', templateParams);
  
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      templateId || TEMPLATE_ID,
      templateParams,
      USER_ID
    );
    
    console.log('EmailJS: Email sent successfully:', response);
    return response;
  } catch (error: any) {
    console.error('EmailJS: Send failed with error:', error);
    
    let errorMessage = 'Failed to send email. ';
    
    if (error?.status === 400) {
      errorMessage += 'Please check all required fields are filled correctly.';
    } else if (error?.status === 401) {
      errorMessage += 'Authentication failed. Please contact support.';
    } else if (error?.status === 404) {
      errorMessage += 'Email service configuration error. Please contact support.';
    } else if (error?.text) {
      errorMessage += `Error: ${error.text}`;
    } else {
      errorMessage += 'Please try again or contact us directly at +91 98771 00369.';
    }
    
    throw new Error(errorMessage);
  }
}

// Original function for backward compatibility
export function sendContactEmail(form: HTMLFormElement): Promise<any> {
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
}
