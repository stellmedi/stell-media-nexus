
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
    console.log('EmailJS: SERVICE_ID =', SERVICE_ID);
    console.log('EmailJS: TEMPLATE_ID =', TEMPLATE_ID);
    console.log('EmailJS: USER_ID =', USER_ID);
    
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
  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && USER_ID);
  console.log('EmailJS: Configuration check:', { SERVICE_ID, TEMPLATE_ID, USER_ID, configured });
  return configured;
}

// Check if EmailJS is initialized
export function isEmailJSInitialized(): boolean {
  console.log('EmailJS: Initialization check:', isInitialized);
  return isInitialized;
}

// Test EmailJS connection with proper error handling
export async function testEmailJSConnection(): Promise<boolean> {
  console.log('EmailJS: Testing connection...');
  
  if (!isEmailJSConfigured()) {
    console.error('EmailJS: Not configured');
    return false;
  }
  
  if (!isEmailJSInitialized()) {
    console.error('EmailJS: Not initialized, attempting to initialize...');
    try {
      await initEmailJS();
    } catch (error) {
      console.error('EmailJS: Failed to initialize during connection test:', error);
      return false;
    }
  }
  
  return true;
}

// Enhanced function that works with data objects
export async function sendEmail(templateId: string, data: EmailFormData): Promise<any> {
  console.log('EmailJS: Starting email send process...');
  console.log('EmailJS: Template ID:', templateId);
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
    const error = new Error('EmailJS is not properly configured. Missing SERVICE_ID, TEMPLATE_ID, or USER_ID.');
    console.error('EmailJS: Configuration error:', error.message);
    throw error;
  }
  
  // Prepare template parameters with standardized naming that matches EmailJS templates
  const templateParams = {
    // Standard EmailJS template fields
    from_name: data.name,
    from_email: data.email,
    to_email: 'info@stellmedia.com',
    reply_to: data.email,
    subject: data.subject || 'Contact Form Submission',
    message: data.message || '',
    
    // Additional fields
    company: data.company || '',
    phone: data.phone || '',
    website: data.website || '',
    
    // Backup field names for different template configurations
    user_name: data.name,
    user_email: data.email,
    user_subject: data.subject || 'Contact Form Submission',
    user_message: data.message || '',
    user_company: data.company || '',
    user_phone: data.phone || '',
    user_website: data.website || '',
  };

  console.log('EmailJS: Template parameters being sent:', templateParams);
  
  try {
    console.log('EmailJS: Calling emailjs.send...');
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
    
    // Provide specific error messages based on the error type
    let errorMessage = 'Failed to send email. ';
    
    if (error?.status === 400) {
      errorMessage += 'Invalid request. Please check all required fields are filled.';
    } else if (error?.status === 401) {
      errorMessage += 'Authentication failed. Please contact support.';
    } else if (error?.status === 404) {
      errorMessage += 'Email service configuration error. Please contact support.';
    } else if (error?.status === 422) {
      errorMessage += 'Invalid email template parameters. Please contact support.';
    } else if (error?.text?.includes('network') || error?.message?.includes('fetch')) {
      errorMessage += 'Network error. Please check your internet connection and try again.';
    } else {
      errorMessage += error?.message || 'Unknown error occurred. Please try again or contact support.';
    }
    
    const enhancedError = new Error(errorMessage);
    console.error('EmailJS: Enhanced error message:', enhancedError.message);
    throw enhancedError;
  }
}

// Original function for backward compatibility
export function sendContactEmail(form: HTMLFormElement): Promise<any> {
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
}
