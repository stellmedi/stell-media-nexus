
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/hooks/use-supabase-admin";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AdminLogin = () => {
  const { login, register, isAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const redirectedRef = useRef(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Handle redirect only once when authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading && !redirectedRef.current) {
      console.log('AdminLogin: User authenticated, redirecting to dashboard');
      redirectedRef.current = true;
      // Use setTimeout to defer navigation and prevent rapid state changes
      setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 100);
    }
  }, [isAuthenticated, isLoading, navigate]);

  const onLoginSubmit = async (data: LoginFormValues) => {
    if (isSubmitting || redirectedRef.current) return;
    
    setIsSubmitting(true);
    try {
      const success = await login(data.email, data.password);
      if (success) {
        console.log('Login successful, waiting for redirect...');
        // Don't navigate here, let the useEffect handle it
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const success = await register(data.name, data.email, data.password, 'admin');
      if (success) {
        setIsSignupMode(false);
        signupForm.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If already authenticated and redirected, don't render anything
  if (isAuthenticated && redirectedRef.current) {
    return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>;
  }

  // If authenticated but haven't redirected yet, show loading
  if (isAuthenticated && !redirectedRef.current) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <Helmet>
        <title>{isSignupMode ? 'Admin Signup' : 'Admin Login'} | Stell Media</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isSignupMode ? 'Create Admin Account' : 'Admin Login'}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignupMode 
              ? 'Create your admin account to access the panel'
              : 'Enter your credentials to access the admin panel'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSignupMode ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@stellmedia.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || redirectedRef.current}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@stellmedia.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setIsSignupMode(!isSignupMode)}
            disabled={isSubmitting || redirectedRef.current}
          >
            {isSignupMode 
              ? "Already have an account? Login" 
              : "Need to create an account? Sign up"
            }
          </Button>
          <p className="text-xs text-center text-gray-600 mt-2">
            Use @stellmedia.com email to create admin accounts
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
