
export interface ContactFieldConfig {
  enabled: boolean;
  required: boolean;
  label?: string;
}

export interface ContactFormConfig {
  notificationEmail: string;
  formTitle: string;
  buttonText: string;
  successMessage: string;
  fields: {
    name: ContactFieldConfig;
    email: ContactFieldConfig;
    phone: ContactFieldConfig;
    company: ContactFieldConfig;
    website: ContactFieldConfig;
    subject: ContactFieldConfig;
    message: ContactFieldConfig;
  };
  templateId: string;
}

export const DEFAULT_CONTACT_FORM_CONFIG: ContactFormConfig = {
  notificationEmail: "info@stellmedia.com",
  formTitle: "Send Us a Message",
  buttonText: "Send Message",
  successMessage: "Thank you! Your message has been sent successfully.",
  fields: {
    name: { enabled: true, required: true },
    email: { enabled: true, required: true },
    phone: { enabled: false, required: false },
    company: { enabled: true, required: false, label: "Company (Optional)" },
    subject: { enabled: true, required: true },
    website: { enabled: false, required: false },
    message: { enabled: true, required: true },
  },
  templateId: "template_contact"
};

export const DEFAULT_CONSULTATION_FORM_CONFIG: ContactFormConfig = {
  notificationEmail: "info@stellmedia.com",
  formTitle: "Book a Consultation",
  buttonText: "Request Consultation",
  successMessage: "Thank you! We'll get back to you shortly.",
  fields: {
    name: { enabled: true, required: true },
    email: { enabled: true, required: true },
    phone: { enabled: true, required: false },
    company: { enabled: true, required: true },
    website: { enabled: true, required: true },
    subject: { enabled: false, required: false },
    message: { enabled: true, required: true },
  },
  templateId: "template_consult"
};
