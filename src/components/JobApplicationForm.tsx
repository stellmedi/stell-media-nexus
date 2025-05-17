
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Linkedin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  linkedin: z.string().url({ message: "Please enter a valid LinkedIn URL." }).optional(),
  resume: z.instanceof(FileList).refine(files => files.length > 0, {
    message: "Please upload your resume."
  }),
  coverLetter: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface JobApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ 
  isOpen, 
  onClose,
  jobTitle
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      coverLetter: "",
    }
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      // Format email subject and body
      const subject = `${jobTitle} Application from ${data.fullName}`;
      const body = 
        `Name: ${data.fullName}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone || 'Not provided'}\n` +
        `LinkedIn: ${data.linkedin || 'Not provided'}\n\n` +
        `${data.coverLetter ? `Cover Letter:\n${data.coverLetter}\n\n` : ''}` +
        `Note: Resume is attached to this email.`;

      // Download the resume file for manual attachment
      if (data.resume && data.resume.length > 0) {
        const fileURL = URL.createObjectURL(data.resume[0]);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = data.resume[0].name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(fileURL), 100);
      }

      // Create mailto link and open default email client
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
      const mailtoLink = `mailto:info@stellmedia.com?subject=${encodedSubject}&body=${encodedBody}`;
      
      window.location.href = mailtoLink;

      toast({
        title: "Application initiated",
        description: "Please complete sending the email with your resume attached.",
      });

      // Log for tracking
      console.log("Job application initiated for:", jobTitle, "by", data.fullName);
      
      // Reset form
      setTimeout(() => {
        form.reset();
        onClose();
      }, 1000);

    } catch (error) {
      console.error("Error in application:", error);
      setFormError("There was a problem with your application. Please try again or email us directly at info@stellmedia.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Complete this form to apply. Your default email client will open with your application.
          </DialogDescription>
        </DialogHeader>
        
        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
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
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Linkedin className="text-blue-600 h-5 w-5" />
                      <Input placeholder="https://linkedin.com/in/your-profile" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Share your LinkedIn profile URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="resume"
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => onChange(e.target.files)}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload your resume (PDF, DOC, or DOCX format)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us why you're interested in this position..." 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;
