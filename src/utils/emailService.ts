
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
 *    - to_email (recipient's email - already set to info@stellmedia.com)
 * 5. Replace the placeholder values below with your actual credentials
 */

// Your EmailJS Service ID from dashboard.emailjs.com/admin/services
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID || "service_example";  

// Your EmailJS Public Key from dashboard.emailjs.com/admin/account
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

// Email where notifications will be sent
const NOTIFICATION_EMAIL = "info@stellmedia.com"; 

// Template IDs from dashboard.emailjs.com/admin/templates
export const TEMPLATES = {
  // Template ID for Contact Form
  CONTACT: process.env.EMAILJS_CONTACT_TEMPLATE_ID || "template_contact",
  
  // Template ID for Consultation Form
  CONSULTATION: process.env.EMAILJS_CONSULTATION_TEMPLATE_ID || "template_consult",
};

/**
 * Initialize EmailJS with your public key
 * This should be done as early as possible in your application
 */
export const initEmailJS = () => {
  try {
    emailjs.init(PUBLIC_KEY);
    console.log("EmailJS initialized");
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
  return !(
    SERVICE_ID === "service_example" || 
    PUBLIC_KEY === "YOUR_PUBLIC_KEY" || 
    TEMPLATES.CONTACT === "template_contact" || 
    TEMPLATES.CONSULTATION === "template_consult"
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
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    company: data.company || "Not provided",
    website: data.website || "Not provided",
    subject: data.subject || `Message from ${data.name}`,
    budget: data.budget || "Not specified",
    timeline: data.timeline || "Not specified",
    message: data.message,
    to_email: NOTIFICATION_EMAIL,
    timestamp: new Date().toISOString(),
  };

  // Check for proper configuration first
  if (!isEmailJSConfigured()) {
    console.error(
      "EmailJS is not configured properly. Please set up EmailJS credentials by:" +
      "\n1. Create an account at https://www.emailjs.com/" +
      "\n2. Create an email service and get your Service ID" +
      "\n3. Create email templates for contact and consultation forms" +
      "\n4. Update environment variables or the constants in emailService.ts with your credentials"
    );
    throw new Error("EmailJS configuration error: Please set up your EmailJS credentials");
  }

  let lastError: any = null;
  let retryCount = 0;

  // Attempt to send with retries
  while (retryCount <= maxRetries) {
    try {
      console.log(`Sending email attempt ${retryCount + 1}/${maxRetries + 1} with params:`, templateParams);
      
      const response = await emailjs.send(
        SERVICE_ID,
        templateId, 
        templateParams,
        PUBLIC_KEY
      );
      
      console.log(`Email sent successfully on attempt ${retryCount + 1}:`, response);
      console.log(`Notification sent to ${NOTIFICATION_EMAIL}`);

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
