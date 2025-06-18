
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
      console.log('Creating admin user with email:', email);
      
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
          // User exists, let's check if they have an admin profile
          console.log('User already exists, checking admin profile...');
          
          // Try to sign in to get the user ID
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (!signInError && signInData.user) {
            // Check if admin profile exists
            const { data: adminData, error: adminError } = await supabase
              .from('admin_users')
              .select('*')
              .eq('auth_user_id', signInData.user.id)
              .single();
            
            if (adminError || !adminData) {
              // Create admin profile
              const { error: createProfileError } = await supabase
                .from('admin_users')
                .insert({
                  auth_user_id: signInData.user.id,
                  name: 'Admin User',
                  email: email,
                  role: 'admin'
                });
              
              if (createProfileError) {
                console.error('Error creating admin profile:', createProfileError);
                toast({
                  title: "Error creating admin profile",
                  description: createProfileError.message,
                  variant: "destructive",
                });
              } else {
                toast({
                  title: "Admin profile created",
                  description: "Admin user profile has been created successfully.",
                });
              }
            } else {
              // Update role to admin if needed
              if (adminData.role !== 'admin') {
                const { error: updateError } = await supabase
                  .from('admin_users')
                  .update({ role: 'admin' })
                  .eq('id', adminData.id);
                
                if (updateError) {
                  console.error('Error updating role:', updateError);
                } else {
                  toast({
                    title: "Role updated",
                    description: "User role has been updated to admin.",
                  });
                }
              } else {
                toast({
                  title: "Admin user ready",
                  description: "Admin user already exists and is configured correctly.",
                });
              }
            }
            
            // Sign out after setup
            await supabase.auth.signOut();
          } else {
            toast({
              title: "Error",
              description: "User exists but credentials are incorrect.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Error creating admin user",
            description: error.message,
            variant: "destructive",
          });
        }
      } else if (data.user) {
        // New user created, create admin profile
        const { error: profileError } = await supabase
          .from('admin_users')
          .insert({
            auth_user_id: data.user.id,
            name: 'Admin User',
            email: email,
            role: 'admin'
          });
        
        if (profileError) {
          console.error('Error creating admin profile:', profileError);
          toast({
            title: "Error creating admin profile",
            description: profileError.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Admin user created successfully",
            description: "You can now log in with the provided credentials.",
          });
        }
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
      console.log('Testing login credentials...');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login test failed:', error);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        console.log('Login successful, checking admin profile...');
        
        // Check admin profile
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('auth_user_id', data.user.id)
          .single();
        
        if (adminError || !adminData) {
          toast({
            title: "Admin profile missing",
            description: "User authenticated but no admin profile found. Use 'Create Admin User' button.",
            variant: "destructive",
          });
        } else if (!adminData.is_active) {
          toast({
            title: "Account inactive",
            description: "Admin account exists but is not active.",
            variant: "destructive",
          });
        } else if (adminData.role !== 'admin') {
          toast({
            title: "Insufficient permissions",
            description: `User role is '${adminData.role}', needs 'admin' role.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login successful",
            description: "Admin credentials are working correctly!",
          });
        }
        
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
            {isLoading ? "Setting up Admin User..." : "Create/Fix Admin User"}
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
