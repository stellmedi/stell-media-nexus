
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormValues } from "../schemas/contactFormSchema";

interface ContactFormFieldsProps {
  form: UseFormReturn<FormValues>;
  isSubmitting: boolean;
}

const ContactFormFields = ({ form, isSubmitting }: ContactFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Your name" 
                {...field} 
                disabled={isSubmitting}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 placeholder:text-gray-500"
                autoComplete="name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="Your phone number" 
                {...field} 
                disabled={isSubmitting}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 placeholder:text-gray-500"
                autoComplete="tel"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">How can we help you?</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell us about your project or how we can help..." 
                className="h-24 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 placeholder:text-gray-500 resize-none" 
                {...field} 
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactFormFields;
