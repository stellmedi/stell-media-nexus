
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
  
  // Prepare template parameters - using simple field names that match most EmailJS templates
  const templateParams = {
    // Primary fields that should work with most templates
    name: data.name || '',
    email: data.email || '',
    message: data.message || '',
    subject: data.subject || 'Contact Form Submission',
    
    // Optional fields
    company: data.company || '',
    
    // Alternative field names for different template configurations
    from_name: data.name || '',
    from_email: data.email || '',
    user_name: data.name || '',
    user_email: data.email || '',
    user_message: data.message || '',
    reply_to: data.email || '',
  };

  console.log('EmailJS: Template parameters being sent:', templateParams);
  
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
      errorMessage += 'Invalid request. Please check all required fields.';
    } else if (error?.status === 401) {
      errorMessage += 'Authentication failed. Please contact support.';
    } else if (error?.status === 404) {
      errorMessage += 'Email service configuration error. Please contact support.';
    } else {
      errorMessage += 'Please try again or contact us directly.';
    }
    
    throw new Error(errorMessage);
  }
}

// Original function for backward compatibility
export function sendContactEmail(form: HTMLFormElement): Promise<any> {
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
}
