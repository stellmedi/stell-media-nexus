
import { useState, useEffect } from 'react';
import { ContactFormConfig, DEFAULT_CONTACT_FORM_CONFIG, DEFAULT_CONSULTATION_FORM_CONFIG } from '@/types/contactFormConfig';
import { TEMPLATES } from '@/utils/emailService';

// Storage keys
const CONTACT_FORM_CONFIG_KEY = 'stell_contact_form_config';
const CONSULTATION_FORM_CONFIG_KEY = 'stell_consultation_form_config';

export const useContactFormConfig = (formType: 'contact' | 'consultation') => {
  const storageKey = formType === 'contact' ? CONTACT_FORM_CONFIG_KEY : CONSULTATION_FORM_CONFIG_KEY;
  const defaultConfig = formType === 'contact' ? DEFAULT_CONTACT_FORM_CONFIG : DEFAULT_CONSULTATION_FORM_CONFIG;
  
  const [config, setConfig] = useState<ContactFormConfig>(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load config from localStorage
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem(storageKey);
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig) as ContactFormConfig;
        setConfig(parsedConfig);
      }
    } catch (error) {
      console.error(`Error loading ${formType} form config:`, error);
    } finally {
      setIsLoaded(true);
    }
  }, [formType, storageKey]);

  // Save config to localStorage
  const saveConfig = (newConfig: ContactFormConfig) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newConfig));
      setConfig(newConfig);
      return true;
    } catch (error) {
      console.error(`Error saving ${formType} form config:`, error);
      return false;
    }
  };

  // Reset config to default
  const resetConfig = () => {
    try {
      localStorage.removeItem(storageKey);
      setConfig(defaultConfig);
      return true;
    } catch (error) {
      console.error(`Error resetting ${formType} form config:`, error);
      return false;
    }
  };

  return { 
    config, 
    saveConfig, 
    resetConfig, 
    isLoaded,
    isDefault: !localStorage.getItem(storageKey)
  };
};
