
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

// Get EmailJS settings from localStorage or use defaults
const getEmailJSSettings = () => {
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

  // Use working default configuration
  return {
    serviceId: "service_stellmedia",
    publicKey: "user_stellmedia2024",
    contactTemplateId: "template_contact_form",
    consultationTemplateId: "template_consultation_form"
  };
};

// Get settings
const emailJSSettings = getEmailJSSettings();

// Template IDs
export const TEMPLATES = {
  CONTACT: emailJSSettings.contactTemplateId,
  CONSULTATION: emailJSSettings.consultationTemplateId
};

// Helper to get notification email
export const getNotificationEmail = (): string => {
  try {
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
  
  return "info@stellmedia.com";
};

/**
 * Initialize EmailJS with your public key
 */
export const initEmailJS = () => {
  try {
    emailjs.init(emailJSSettings.publicKey);
    console.log("EmailJS initialized successfully");
  } catch (error) {
    console.error("Failed to initialize EmailJS:", error);
    toast.error("Email service initialization failed");
  }
};

/**
 * Checks if EmailJS is correctly configured
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
 * Sends an email using EmailJS
 */
export const sendEmail = async (
  templateId: string, 
  data: EmailFormData
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

  const settings = getEmailJSSettings();

  try {
    console.log("Sending email with params:", templateParams);
    console.log(`Using service ID: ${settings.serviceId}, template ID: ${templateId}`);
    console.log(`Notification will be sent to: ${notificationEmail}`);
    
    const response = await emailjs.send(
      settings.serviceId,
      templateId, 
      templateParams,
      settings.publicKey
    );
    
    console.log("Email sent successfully:", response);

    // Track successful submission for analytics if gtag is available
    if (window && typeof window.gtag === 'function') {
      window.gtag('event', 'form_submission', {
        'event_category': templateId === TEMPLATES.CONTACT ? 'contact_form' : 'consultation_form',
        'event_label': data.email,
      });
    }
    
    return response;
  } catch (error) {
    console.error("Email send failed:", error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
