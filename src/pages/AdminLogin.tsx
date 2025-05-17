
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// This would normally connect to a backend authentication service
// For demo purposes, we'll use a hardcoded admin credential
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "stellmedia2025";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  const onSubmit = (values: LoginFormValues) => {
    setIsLoading(true);
    
    // Simple authentication check
    setTimeout(() => {
      if (values.username === ADMIN_USERNAME && values.password === ADMIN_PASSWORD) {
        // Save authentication state
        localStorage.setItem("stell_admin_authenticated", "true");
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000); // Simulated delay
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <Card className="w-full max-w-md bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
            <CardDescription>
              Login to access the Stell Media admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
                          <User className="ml-3 h-4 w-4 text-gray-500" />
                          <Input 
                            placeholder="Enter your username" 
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-indigo-500 bg-white">
                          <Lock className="ml-3 h-4 w-4 text-gray-500" />
                          <Input 
                            type="password" 
                            placeholder="Enter your password" 
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Authenticating..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
