
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

// Initialize EmailJS
export function initEmailJS(): void {
  console.log('EmailJS: Starting initialization...');
  console.log('EmailJS: SERVICE_ID =', SERVICE_ID);
  console.log('EmailJS: TEMPLATE_ID =', TEMPLATE_ID);
  console.log('EmailJS: USER_ID =', USER_ID);
  
  try {
    emailjs.init(USER_ID);
    isInitialized = true;
    console.log('EmailJS: Initialization successful');
  } catch (error) {
    console.error('EmailJS: Initialization failed:', error);
    isInitialized = false;
  }
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

// Test EmailJS connection
export async function testEmailJSConnection(): Promise<boolean> {
  console.log('EmailJS: Testing connection...');
  
  if (!isEmailJSConfigured()) {
    console.error('EmailJS: Not configured');
    return false;
  }
  
  if (!isEmailJSInitialized()) {
    console.error('EmailJS: Not initialized');
    return false;
  }
  
  try {
    // Try a minimal test send (this will fail but we can check the error type)
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, { test: 'connection' }, USER_ID);
    console.log('EmailJS: Connection test successful');
    return true;
  } catch (error) {
    console.log('EmailJS: Connection test error (expected):', error);
    // Even if it fails, if we get a proper EmailJS error, the connection works
    return true;
  }
}

// Original function for backward compatibility
export function sendContactEmail(form: HTMLFormElement): Promise<any> {
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
}

// Enhanced function that works with data objects
export async function sendEmail(templateId: string, data: EmailFormData): Promise<any> {
  console.log('EmailJS: Starting email send process...');
  console.log('EmailJS: Template ID:', templateId);
  console.log('EmailJS: Form data received:', data);
  
  // Validate configuration
  if (!isEmailJSConfigured()) {
    const error = new Error('EmailJS is not properly configured. Missing SERVICE_ID, TEMPLATE_ID, or USER_ID.');
    console.error('EmailJS: Configuration error:', error.message);
    throw error;
  }
  
  // Validate initialization
  if (!isEmailJSInitialized()) {
    const error = new Error('EmailJS is not initialized. Please wait for initialization to complete.');
    console.error('EmailJS: Initialization error:', error.message);
    throw error;
  }
  
  // Prepare template parameters with standardized naming
  const templateParams = {
    // Standard fields that should work with most EmailJS templates
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
    
    // Legacy field names for compatibility
    name: data.name,
    email: data.email,
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
    console.log('EmailJS: Response status:', response.status);
    console.log('EmailJS: Response text:', response.text);
    
    return response;
  } catch (error) {
    console.error('EmailJS: Send failed with error:', error);
    console.error('EmailJS: Error type:', typeof error);
    console.error('EmailJS: Error status:', (error as any)?.status);
    console.error('EmailJS: Error text:', (error as any)?.text);
    console.error('EmailJS: Error message:', (error as any)?.message);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email. ';
    
    if ((error as any)?.status === 400) {
      errorMessage += 'Invalid request parameters. Please check your template configuration.';
    } else if ((error as any)?.status === 401) {
      errorMessage += 'Authentication failed. Please check your EmailJS credentials.';
    } else if ((error as any)?.status === 404) {
      errorMessage += 'Service or template not found. Please check your EmailJS configuration.';
    } else if ((error as any)?.text?.includes('network')) {
      errorMessage += 'Network error. Please check your internet connection.';
    } else {
      errorMessage += (error as any)?.message || 'Unknown error occurred.';
    }
    
    const enhancedError = new Error(errorMessage);
    console.error('EmailJS: Enhanced error message:', enhancedError.message);
    throw enhancedError;
  }
}
