
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

/**
 * Configuration for EmailJS
 * Replace these values with your actual EmailJS credentials
 * Get these from your EmailJS dashboard at https://dashboard.emailjs.com/
 */
const SERVICE_ID = "replace_with_your_service_id"; // Your EmailJS Service ID
const PUBLIC_KEY = "replace_with_your_public_key"; // Your EmailJS Public Key

// Template IDs for different forms
export const TEMPLATES = {
  CONTACT: "replace_with_your_contact_template_id", // Your EmailJS Contact Form Template ID
  CONSULTATION: "replace_with_your_consultation_template_id", // Your EmailJS Consultation Form Template ID
};

/**
 * Initialize EmailJS with your public key
 * This should be done as early as possible in your application
 */
export const initEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
  console.log("EmailJS initialized");
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

  try {
    console.log("Sending email with params:", templateParams);
    const response = await emailjs.send(
      SERVICE_ID,
      templateId, 
      templateParams,
      PUBLIC_KEY
    );
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
