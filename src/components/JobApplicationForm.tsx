
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
import { Linkedin, Copy, Mail, Download, CheckCircle } from "lucide-react";
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
  const [emailSubjectCopied, setEmailSubjectCopied] = React.useState(false);
  const [emailBodyCopied, setEmailBodyCopied] = React.useState(false);

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
  };

  const handleDownloadResume = () => {
    if (applicationData?.fileUrl) {
      const link = document.createElement('a');
      link.href = applicationData.fileUrl;
      link.download = applicationData.fileName;
      link.click();
    }
  };

  const copyToClipboard = (text: string, type: 'subject' | 'body') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'subject') {
        setEmailSubjectCopied(true);
        setTimeout(() => setEmailSubjectCopied(false), 2000);
      } else {
        setEmailBodyCopied(true);
        setTimeout(() => setEmailBodyCopied(false), 2000);
      }
      
      toast({
        title: `${type === 'subject' ? 'Subject' : 'Email body'} copied to clipboard`,
        description: "You can now paste it into your email client",
      });
    });
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
              <DialogTitle className="text-xl">Complete Your Application</DialogTitle>
              <DialogDescription>
                Follow these steps to submit your application to info@stellmedia.com
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <Alert className="mb-6 bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Your application form has been processed! Please complete the process by sending an email to info@stellmedia.com with your resume.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-6 text-gray-700">
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <h3 className="font-medium text-lg mb-2">Option 1: Use Your Default Email Client</h3>
                  <p className="mb-3">Click the button below to open your email client with a pre-filled message.</p>
                  <Button 
                    onClick={handleSendEmail} 
                    className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 mb-2"
                  >
                    <Mail className="mr-2 h-4 w-4" /> Open Email Application
                  </Button>
                  <p className="text-sm text-gray-500 mt-1 italic">
                    Note: This will also download your resume, which you'll need to attach to the email.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <h3 className="font-medium text-lg mb-2">Option 2: Manual Email Method</h3>
                  <p className="mb-3">If the button above doesn't work, follow these steps:</p>
                  
                  <ol className="list-decimal pl-5 space-y-4">
                    <li>
                      <p className="font-medium">Download your resume first</p>
                      <Button 
                        variant="outline" 
                        onClick={handleDownloadResume}
                        className="mt-1 border-indigo-200"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download Resume
                      </Button>
                    </li>
                    
                    <li>
                      <p className="font-medium">Copy this subject line:</p>
                      <div className="flex items-center mt-1 bg-white border rounded p-2">
                        <p className="flex-1 text-sm">{applicationData?.subject}</p>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => applicationData?.subject && copyToClipboard(applicationData.subject, 'subject')}
                          className="ml-2"
                        >
                          {emailSubjectCopied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </li>
                    
                    <li>
                      <p className="font-medium">Copy the email body (optional):</p>
                      <div className="mt-1 bg-white border rounded">
                        <div className="p-2 text-sm whitespace-pre-wrap">
                          {applicationData?.body}
                        </div>
                        <div className="border-t p-2 flex justify-end bg-gray-50">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => applicationData?.body && copyToClipboard(applicationData.body, 'body')}
                          >
                            {emailBodyCopied ? <CheckCircle className="h-4 w-4 mr-1 text-green-500" /> : <Copy className="h-4 w-4 mr-1" />} Copy text
                          </Button>
                        </div>
                      </div>
                    </li>
                    
                    <li>
                      <p className="font-medium">Send your email:</p>
                      <p className="text-sm mt-1">
                        Compose a new email to <a href="mailto:info@stellmedia.com" className="text-blue-600 hover:underline">info@stellmedia.com</a> with the copied subject and body, and attach your downloaded resume.
                      </p>
                    </li>
                  </ol>
                </div>
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
