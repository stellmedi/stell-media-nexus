
import emailjs from 'emailjs-com';
import { toast } from 'sonner';

// Add TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params: object) => void;
  }
}

// Types for form submissions
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

/**
 * Configuration for EmailJS
 * 
 * IMPORTANT: How to set up EmailJS for this website:
 * 1. Create an account at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create two email templates:
 *    - One for contact form (use template ID for CONTACT)
 *    - One for consultation form (use template ID for CONSULTATION)
 * 4. Make sure your templates include these parameters:
 *    - from_name (sender's name)
 *    - from_email (sender's email)
 *    - company (if applicable)
 *    - website (if applicable)
 *    - subject (if applicable)
 *    - message (the message content)
 *    - budget (if applicable for consultation)
 *    - timeline (if applicable for consultation)
 *    - phone (if applicable)
 *    - to_email (recipient's email)
 * 5. Replace the placeholder values below with your actual credentials
 */

// Get EmailJS settings from various sources
const getEmailJSSettings = () => {
  // First try to get from localStorage
  try {
    const emailSettings = localStorage.getItem('emailjs_settings');
    if (emailSettings) {
      const settings = JSON.parse(emailSettings);
      return {
        serviceId: settings.emailjsServiceId,
        publicKey: settings.emailjsPublicKey,
        contactTemplateId: settings.emailjsContactTemplateId,
        consultationTemplateId: settings.emailjsConsultationTemplateId
      };
    }
  } catch (error) {
    console.error("Error reading EmailJS settings from localStorage:", error);
  }

  // Fall back to environment variables
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_example",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
    contactTemplateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || "template_contact",
    consultationTemplateId: import.meta.env.VITE_EMAILJS_CONSULTATION_TEMPLATE_ID || "template_consult"
  };
};

// Get settings
const emailJSSettings = getEmailJSSettings();

// Your EmailJS Service ID from dashboard.emailjs.com/admin/services
const SERVICE_ID = emailJSSettings.serviceId;  

// Your EmailJS Public Key from dashboard.emailjs.com/admin/account
const PUBLIC_KEY = emailJSSettings.publicKey;

// Email where notifications will be sent
let NOTIFICATION_EMAIL = "info@stellmedia.com"; 

// Try to get configuration from localStorage
try {
  const contactConfig = localStorage.getItem('stell_contact_form_config');
  if (contactConfig) {
    const parsedConfig = JSON.parse(contactConfig);
    if (parsedConfig.notificationEmail) {
      NOTIFICATION_EMAIL = parsedConfig.notificationEmail;
    }
  }
} catch (error) {
  console.error("Error reading notification email from config:", error);
}

// Template IDs from dashboard.emailjs.com/admin/templates
export const TEMPLATES = {
  // Template ID for Contact Form
  get CONTACT() {
    try {
      const contactConfig = localStorage.getItem('stell_contact_form_config');
      if (contactConfig) {
        const parsedConfig = JSON.parse(contactConfig);
        if (parsedConfig.templateId) {
          return parsedConfig.templateId;
        }
      }
    } catch (error) {
      console.error("Error reading template ID from contact config:", error);
    }
    return emailJSSettings.contactTemplateId;
  },
  
  // Consultation Form - Check localStorage first, fallback to env var
  get CONSULTATION() {
    try {
      const consultConfig = localStorage.getItem('stell_consultation_form_config');
      if (consultConfig) {
        const parsedConfig = JSON.parse(consultConfig);
        if (parsedConfig.templateId) {
          return parsedConfig.templateId;
        }
      }
    } catch (error) {
      console.error("Error reading template ID from config:", error);
    }
    return emailJSSettings.consultationTemplateId;
  }
};

// Helper to get notification email from configs
export const getNotificationEmail = (): string => {
  try {
    // Try to get from contact config first
    const contactConfig = localStorage.getItem('stell_contact_form_config');
    if (contactConfig) {
      const parsedConfig = JSON.parse(contactConfig);
      if (parsedConfig.notificationEmail) {
        return parsedConfig.notificationEmail;
      }
    }
    
    // Try consultation config next
    const consultConfig = localStorage.getItem('stell_consultation_form_config');
    if (consultConfig) {
      const parsedConfig = JSON.parse(consultConfig);
      if (parsedConfig.notificationEmail) {
        return parsedConfig.notificationEmail;
      }
    }
    
    // Try site settings
    const siteSettings = localStorage.getItem('site_settings');
    if (siteSettings) {
      const parsedSettings = JSON.parse(siteSettings);
      if (parsedSettings.contactEmail) {
        return parsedSettings.contactEmail;
      }
    }
  } catch (error) {
    console.error("Error reading notification email from configs:", error);
  }
  
  // Fall back to default
  return NOTIFICATION_EMAIL;
};

/**
 * Initialize EmailJS with your public key
 * This should be done as early as possible in your application
 */
export const initEmailJS = () => {
  try {
    emailjs.init(PUBLIC_KEY);
    console.log("EmailJS initialized with key:", PUBLIC_KEY);
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    toast.error("Email service initialization failed");
  }
};

/**
 * Checks if EmailJS is correctly configured
 * @returns boolean indicating if EmailJS is configured properly
 */
export const isEmailJSConfigured = (): boolean => {
  const settings = getEmailJSSettings();
  return !(
    settings.serviceId === "service_example" || 
    settings.publicKey === "YOUR_PUBLIC_KEY" || 
    settings.contactTemplateId === "template_contact" || 
    settings.consultationTemplateId === "template_consult"
  );
};

/**
 * Sends an email using EmailJS with retry capability
 * 
 * @param templateId - The EmailJS template ID
 * @param data - The form data
 * @param maxRetries - Maximum number of retries (default: 2)
 * @returns Promise that resolves with EmailJS response
 */
export const sendEmail = async (
  templateId: string, 
  data: EmailFormData, 
  maxRetries = 2
): Promise<any> => {
  const notificationEmail = getNotificationEmail();
  
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    company: data.company || "Not provided",
    website: data.website || "Not provided",
    subject: data.subject || `Message from ${data.name}`,
    budget: data.budget || "Not specified",
    timeline: data.timeline || "Not specified",
    message: data.message,
    phone: data.phone || "Not provided",
    to_email: notificationEmail,
    timestamp: new Date().toISOString(),
  };

  // Refresh settings on each call to ensure we have latest
  const settings = getEmailJSSettings();
  const serviceId = settings.serviceId;
  const publicKey = settings.publicKey;

  // Check for proper configuration first
  if (!isEmailJSConfigured()) {
    console.error(
      "EmailJS is not configured properly. Please set up EmailJS credentials by:" +
      "\n1. Create an account at https://www.emailjs.com/" +
      "\n2. Create an email service and get your Service ID" +
      "\n3. Create email templates for contact and consultation forms" +
      "\n4. Go to Admin -> Settings -> Email Settings and enter your credentials"
    );
    throw new Error("EmailJS configuration error: Please set up your EmailJS credentials");
  }

  let lastError: any = null;
  let retryCount = 0;

  // Attempt to send with retries
  while (retryCount <= maxRetries) {
    try {
      console.log(`Sending email attempt ${retryCount + 1}/${maxRetries + 1} with params:`, templateParams);
      console.log(`Using service ID: ${serviceId}, template ID: ${templateId}`);
      
      const response = await emailjs.send(
        serviceId,
        templateId, 
        templateParams,
        publicKey
      );
      
      console.log(`Email sent successfully on attempt ${retryCount + 1}:`, response);
      console.log(`Notification sent to ${notificationEmail}`);

      // Track successful submission for analytics if gtag is available
      if (window && typeof window.gtag === 'function') {
        window.gtag('event', 'form_submission', {
          'event_category': templateId === TEMPLATES.CONTACT ? 'contact_form' : 'consultation_form',
          'event_label': data.email,
        });
      }
      
      return response;
    } catch (error) {
      lastError = error;
      console.error(`Email send attempt ${retryCount + 1} failed:`, error);
      retryCount++;
      
      // If we've reached max retries, throw the error
      if (retryCount > maxRetries) {
        throw lastError;
      }
      
      // Wait before retrying (exponential backoff)
      const waitTime = Math.min(1000 * (2 ** retryCount), 8000);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      console.log(`Retrying after ${waitTime}ms...`);
    }
  }

  // This should never be reached due to the throw above, but TypeScript might complain without it
  throw lastError || new Error("Failed to send email for unknown reason");
};

