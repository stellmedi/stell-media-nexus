
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('info@stellmedia.com');
  const [password, setPassword] = useState('admin123');
  const { toast } = useToast();

  const createAdminUser = async () => {
    setIsLoading(true);
    
    try {
      // First, try to sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: 'Admin User' },
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: "User already exists",
            description: "Admin user already exists. Try logging in with the credentials.",
            variant: "default",
          });
        } else {
          toast({
            title: "Error creating admin user",
            description: error.message,
            variant: "destructive",
          });
        }
      } else if (data.user) {
        toast({
          title: "Admin user created successfully",
          description: "You can now log in with the provided credentials.",
        });
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
      toast({
        title: "Error",
        description: "Failed to create admin user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        toast({
          title: "Login successful",
          description: "Admin credentials are working correctly!",
        });
        // Sign out immediately after test
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Error testing login:', error);
      toast({
        title: "Error",
        description: "Failed to test login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Admin Setup & Testing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Button 
            onClick={createAdminUser} 
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            {isLoading ? "Creating Admin User..." : "Create Admin User"}
          </Button>
          <Button 
            onClick={testLogin} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Testing Login..." : "Test Login Credentials"}
          </Button>
        </div>
        <p className="text-xs text-gray-600 text-center">
          Current credentials: info@stellmedia.com / admin123
        </p>
      </CardContent>
    </Card>
  );
};

export default AdminSetup;
