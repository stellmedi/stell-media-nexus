
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
    to_email: NOTIFICATION_EMAIL, // Adding notification email as parameter
  };

  try {
    console.log("Sending email with params:", templateParams);
    
    // Check for default/placeholder values
    if (SERVICE_ID === "service_example" || 
        PUBLIC_KEY === "YOUR_PUBLIC_KEY" || 
        templateId === "template_contact" || 
        templateId === "template_consult") {
      console.error(
        "EmailJS is not configured properly. Please set up EmailJS credentials by:" +
        "\n1. Create an account at https://www.emailjs.com/" +
        "\n2. Create an email service and get your Service ID" +
        "\n3. Create email templates for contact and consultation forms" +
        "\n4. Update environment variables or the constants in emailService.ts with your credentials"
      );
      throw new Error("EmailJS configuration error: Please set up your EmailJS credentials");
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
