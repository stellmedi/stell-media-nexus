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
      // Get the resume file
      const resumeFile = data.resume[0];
      
      // Prepare application data summary
      const applicationSummary = {
        name: data.fullName,
        email: data.email, 
        phone: data.phone || 'Not provided',
        linkedin: data.linkedin || 'Not provided',
        position: jobTitle,
        resumeFileName: resumeFile.name
      };
      
      console.log("Submitting application:", applicationSummary);
      
      // Create application email content
      const emailSubject = `${jobTitle} Application from ${data.fullName}`;
      const emailBody = `
A new application has been received for the ${jobTitle} position.

Applicant Details:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}
- LinkedIn: ${data.linkedin || 'Not provided'}
- Resume Filename: ${resumeFile.name}

${data.coverLetter ? `Cover Letter:\n${data.coverLetter}` : 'No cover letter provided.'}

Please contact the applicant directly to proceed with the application process.
      `;
      
      // Create mailto link to directly open email client with pre-filled content
      const mailtoLink = `mailto:info@stellmedia.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Create a downloadable version of the resume
      const resumeURL = URL.createObjectURL(resumeFile);
      const resumeLink = document.createElement('a');
      resumeLink.href = resumeURL;
      resumeLink.download = resumeFile.name;
      
      // Show success message with instructions
      toast({
        title: "Application submitted",
        description: "Please check your email for instructions to complete your application.",
      });
      
      // Open email client with pre-filled content
      window.open(mailtoLink, '_blank');
      
      // Also trigger resume download
      resumeLink.click();
      
      // Cleanup
      URL.revokeObjectURL(resumeURL);
      
      // Reset form and close dialog
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error in application submission:", error);
      setFormError("There was a problem with your application. Please email your resume directly to info@stellmedia.com with the job title in the subject line.");
      
      toast({
        title: "Application not submitted",
        description: "Please email your resume directly to info@stellmedia.com",
        variant: "destructive"
      });
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
            Complete the form below to apply. All applications will be sent to info@stellmedia.com
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
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;
