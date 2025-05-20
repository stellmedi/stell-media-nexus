
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
 * TODO: Replace these placeholder values with your actual EmailJS credentials
 * Get these from your EmailJS dashboard at https://dashboard.emailjs.com/
 */
// IMPORTANT: Replace with your actual EmailJS Service ID
const SERVICE_ID = "replace_with_your_service_id";  

// IMPORTANT: Replace with your actual EmailJS Public Key
const PUBLIC_KEY = "replace_with_your_public_key";

// Email where notifications will be sent
const NOTIFICATION_EMAIL = "info@stellmedia.com"; 

// Template IDs for different forms
export const TEMPLATES = {
  // IMPORTANT: Replace with your actual EmailJS Contact Form Template ID
  CONTACT: "replace_with_your_contact_template_id", 
  
  // IMPORTANT: Replace with your actual EmailJS Consultation Form Template ID
  CONSULTATION: "replace_with_your_consultation_template_id", 
};

/**
 * Initialize EmailJS with your public key
 * This should be done as early as possible in your application
 */
export const initEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
  console.log("EmailJS initialized with key:", PUBLIC_KEY);
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
    to_email: NOTIFICATION_EMAIL, // Adding notification email as parameter
  };

  try {
    console.log("Sending email with params:", templateParams);
    
    if (SERVICE_ID === "replace_with_your_service_id" || 
        PUBLIC_KEY === "replace_with_your_public_key" || 
        templateId.includes("replace_with_your")) {
      console.error("EmailJS is not configured properly. Please replace the placeholder credentials with your actual EmailJS credentials.");
      throw new Error("EmailJS configuration error: Please update your credentials in emailService.ts");
    }
    
    const response = await emailjs.send(
      SERVICE_ID,
      templateId, 
      templateParams,
      PUBLIC_KEY
    );
    console.log("Email sent successfully:", response);
    
    // Log notification for tracking purposes
    console.log(`Notification sent to ${NOTIFICATION_EMAIL}`);
    
    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
