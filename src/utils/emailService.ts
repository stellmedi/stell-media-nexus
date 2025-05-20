
import emailjs from 'emailjs-com';

// Types for form submissions
export interface EmailFormData {
  name: string;
  email: string;
  company?: string;
  website?: string;
  subject?: string;
  message: string;
}

// Service configuration
const SERVICE_ID = "service_your_service_id"; // Replace with your actual service ID
const PUBLIC_KEY = "your_public_key"; // Replace with your actual public key

// Template IDs for different forms
export const TEMPLATES = {
  CONTACT: "template_your_template_id", // Replace with contact template ID
  CONSULTATION: "template_your_template_id", // Replace with consultation template ID
};

/**
 * Sends an email using EmailJS
 * 
 * @param templateId - The EmailJS template ID
 * @param data - The form data
 * @returns Promise that resolves with EmailJS response
 */
export const sendEmail = async (templateId: string, data: EmailFormData) => {
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    company: data.company || "Not provided",
    website: data.website || "Not provided",
    subject: data.subject || "Message from website",
    message: data.message,
  };

  return emailjs.send(
    SERVICE_ID,
    templateId, 
    templateParams,
    PUBLIC_KEY
  );
};
