
import React from 'react';
import { useContactFormConfig } from '@/hooks/use-contact-form-config';
import { ContactFormConfig } from '@/types/contactFormConfig';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContactFormConfigurationProps {
  onClose?: () => void;
}

export const ContactFormConfiguration: React.FC<ContactFormConfigurationProps> = ({ onClose }) => {
  const { config: contactConfig, saveConfig: saveContactConfig, resetConfig: resetContactConfig } = 
    useContactFormConfig('contact');
  
  const { config: consultationConfig, saveConfig: saveConsultationConfig, resetConfig: resetConsultationConfig } = 
    useContactFormConfig('consultation');

  const handleSave = (formType: 'contact' | 'consultation') => {
    const success = formType === 'contact' 
      ? saveContactConfig(contactConfig) 
      : saveConsultationConfig(consultationConfig);
    
    if (success) {
      toast.success(`${formType === 'contact' ? 'Contact' : 'Consultation'} form settings saved!`);
      if (onClose) onClose();
    } else {
      toast.error(`Failed to save ${formType} form settings.`);
    }
  };

  const handleReset = (formType: 'contact' | 'consultation') => {
    const success = formType === 'contact' 
      ? resetContactConfig() 
      : resetConsultationConfig();
    
    if (success) {
      toast.success(`${formType === 'contact' ? 'Contact' : 'Consultation'} form settings reset to default.`);
    } else {
      toast.error(`Failed to reset ${formType} form settings.`);
    }
  };

  const updateField = (
    formType: 'contact' | 'consultation',
    fieldName: keyof ContactFormConfig['fields'], 
    property: keyof (typeof contactConfig.fields.name), 
    value: any
  ) => {
    if (formType === 'contact') {
      saveContactConfig({
        ...contactConfig,
        fields: {
          ...contactConfig.fields,
          [fieldName]: {
            ...contactConfig.fields[fieldName],
            [property]: value
          }
        }
      });
    } else {
      saveConsultationConfig({
        ...consultationConfig,
        fields: {
          ...consultationConfig.fields,
          [fieldName]: {
            ...consultationConfig.fields[fieldName],
            [property]: value
          }
        }
      });
    }
  };

  const updateConfig = (
    formType: 'contact' | 'consultation',
    property: keyof ContactFormConfig,
    value: any
  ) => {
    if (formType === 'contact') {
      saveContactConfig({
        ...contactConfig,
        [property]: value
      });
    } else {
      saveConsultationConfig({
        ...consultationConfig,
        [property]: value
      });
    }
  };

  const FormFieldsEditor = ({ formType, config }: { formType: 'contact' | 'consultation', config: ContactFormConfig }) => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="fields">
        <AccordionTrigger>Form Fields Configuration</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {Object.entries(config.fields).map(([fieldName, fieldConfig]) => (
              <div key={fieldName} className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor={`${formType}-${fieldName}-enabled`} className="text-base font-medium">
                    {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} Field
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`${formType}-${fieldName}-enabled`}>Enabled</Label>
                    <Switch
                      id={`${formType}-${fieldName}-enabled`}
                      checked={fieldConfig.enabled}
                      onCheckedChange={(checked) => updateField(formType, fieldName as any, 'enabled', checked)}
                    />
                  </div>
                </div>
                
                {fieldConfig.enabled && (
                  <>
                    <div className="flex items-center space-x-2 mt-2">
                      <Label htmlFor={`${formType}-${fieldName}-required`}>Required</Label>
                      <Switch
                        id={`${formType}-${fieldName}-required`}
                        checked={fieldConfig.required}
                        onCheckedChange={(checked) => updateField(formType, fieldName as any, 'required', checked)}
                      />
                    </div>
                    
                    <div className="mt-2">
                      <Label htmlFor={`${formType}-${fieldName}-label`}>Custom Label</Label>
                      <Input
                        id={`${formType}-${fieldName}-label`}
                        value={fieldConfig.label || ""}
                        onChange={(e) => updateField(formType, fieldName as any, 'label', e.target.value)}
                        placeholder={`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`}
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="form-settings">
        <AccordionTrigger>Form Settings</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor={`${formType}-form-title`}>Form Title</Label>
              <Input
                id={`${formType}-form-title`}
                value={config.formTitle}
                onChange={(e) => updateConfig(formType, 'formTitle', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`${formType}-button-text`}>Button Text</Label>
              <Input
                id={`${formType}-button-text`}
                value={config.buttonText}
                onChange={(e) => updateConfig(formType, 'buttonText', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`${formType}-success-message`}>Success Message</Label>
              <Textarea
                id={`${formType}-success-message`}
                value={config.successMessage}
                onChange={(e) => updateConfig(formType, 'successMessage', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="notification">
        <AccordionTrigger>Notification Settings</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor={`${formType}-notification-email`}>Notification Email</Label>
              <Input
                id={`${formType}-notification-email`}
                type="email"
                value={config.notificationEmail}
                onChange={(e) => updateConfig(formType, 'notificationEmail', e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Form submissions will be sent to this email address.
              </p>
            </div>
            
            <div>
              <Label htmlFor={`${formType}-template-id`}>Email Template ID</Label>
              <Input
                id={`${formType}-template-id`}
                value={config.templateId}
                onChange={(e) => updateConfig(formType, 'templateId', e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Template ID from EmailJS for this form.
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Contact Form Settings</CardTitle>
        <CardDescription>
          Configure your contact forms, including fields, notification settings, and appearance.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="contact">
          <TabsList className="mb-4">
            <TabsTrigger value="contact">Contact Form</TabsTrigger>
            <TabsTrigger value="consultation">Consultation Form</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <FormFieldsEditor formType="contact" config={contactConfig} />
            
            <div className="flex justify-end mt-4 space-x-2">
              <Button 
                variant="outline" 
                onClick={() => handleReset('contact')}
              >
                Reset to Default
              </Button>
              <Button 
                onClick={() => handleSave('contact')}
              >
                Save Contact Form Settings
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="consultation">
            <FormFieldsEditor formType="consultation" config={consultationConfig} />
            
            <div className="flex justify-end mt-4 space-x-2">
              <Button 
                variant="outline" 
                onClick={() => handleReset('consultation')}
              >
                Reset to Default
              </Button>
              <Button 
                onClick={() => handleSave('consultation')}
              >
                Save Consultation Form Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
