// src/utils/emailService.ts
import emailjs from 'emailjs-com';

export const SERVICE_ID  = 'service_xkel7zm';
export const TEMPLATE_ID = 'template_5ep34jd';
export const USER_ID     = '1lrNuoabQwmNT0aKU';

// Initialize EmailJS
emailjs.init(USER_ID);

/** Returns true only if all three IDs are set */
export function isEmailJSConfigured(): boolean {
  return Boolean(SERVICE_ID && TEMPLATE_ID && USER_ID);
}

/** Send the form via EmailJS */
export function sendContactEmail(form: HTMLFormElement): Promise<any> {
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, USER_ID);
}
