
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
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [applicationData, setApplicationData] = React.useState<{
    subject: string;
    body: string;
    fileName: string;
    fileUrl: string | null;
  } | null>(null);

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
      
      // Create a downloadable version of the resume
      const resumeURL = URL.createObjectURL(resumeFile);
      
      // Store application data for later use
      setApplicationData({
        subject: emailSubject,
        body: emailBody,
        fileName: resumeFile.name,
        fileUrl: resumeURL
      });
      
      // Show success message with instructions
      toast({
        title: "Application submitted successfully",
        description: "Please follow the next instructions to complete your application.",
      });
      
      setShowInstructions(true);
      
    } catch (error) {
      console.error("Error in application submission:", error);
      setFormError("There was a problem with your application. Please try again or email your resume directly to info@stellmedia.com with the job title in the subject line.");
      
      toast({
        title: "Application not submitted",
        description: "Please email your resume directly to info@stellmedia.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!applicationData) return;
    
    // Create mailto link for the user's default email client
    const mailtoLink = `mailto:info@stellmedia.com?subject=${encodeURIComponent(applicationData.subject)}&body=${encodeURIComponent(applicationData.body)}`;
    
    // Open email client in a new window
    window.open(mailtoLink, '_blank');
    
    // Download resume file for the user to attach
    if (applicationData.fileUrl) {
      const link = document.createElement('a');
      link.href = applicationData.fileUrl;
      link.download = applicationData.fileName;
      link.click();
    }
    
    // Reset form and close dialog
    form.reset();
    onClose();
  };

  const handleClose = () => {
    // Clean up any object URLs to prevent memory leaks
    if (applicationData?.fileUrl) {
      URL.revokeObjectURL(applicationData.fileUrl);
    }
    
    // Reset states
    setShowInstructions(false);
    setApplicationData(null);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {!showInstructions ? (
          <>
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
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Application Instructions</DialogTitle>
              <DialogDescription>
                Follow these steps to complete your application
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <Alert className="mb-6 bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Your application form has been submitted successfully! Please follow these steps to complete your application:
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 text-gray-700">
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <p className="font-medium mb-2">Step 1: Send your application email</p>
                  <p className="mb-3">Click the button below to open your email client with a pre-filled message. This will open in a new window.</p>
                  <Button 
                    onClick={handleSendEmail} 
                    className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600"
                  >
                    Open Email Application
                  </Button>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <p className="font-medium mb-2">Step 2: Attach your resume</p>
                  <p>Your resume will be downloaded automatically. Please attach it to the email before sending.</p>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <p className="font-medium mb-2">Step 3: Send the email</p>
                  <p>Review your application details and click send in your email client.</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 border border-amber-200 rounded-md bg-amber-50 text-amber-800">
                <p className="font-medium mb-2">Important Note:</p>
                <p>If your email client doesn't open automatically, please send an email to info@stellmedia.com with the following:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Subject: {applicationData?.subject || "Job Application"}</li>
                  <li>Attach your resume</li>
                  <li>Include your contact details and the position you're applying for</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleClose}>Close</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;
