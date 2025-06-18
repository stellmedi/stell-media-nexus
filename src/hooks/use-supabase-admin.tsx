
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  auth_user_id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

interface AdminAuthContextType {
  user: User | null;
  adminUser: AdminUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, role: "admin" | "editor" | "viewer") => Promise<boolean>;
  updateAdminUser: (data: Partial<AdminUser>) => Promise<boolean>;
  logActivity: (action: string, resource: string, resourceId?: string, details?: any) => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load admin user profile
  const loadAdminUser = async (authUserId: string) => {
    try {
      console.log('Loading admin user for auth ID:', authUserId);
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('auth_user_id', authUserId)
        .single();

      if (error) {
        console.error('Error loading admin user:', error);
        return null;
      }

      console.log('Admin user data loaded:', data);
      return data as AdminUser;
    } catch (error) {
      console.error('Error in loadAdminUser:', error);
      return null;
    }
  };

  // Update last login
  const updateLastLogin = async (adminUserId: string) => {
    try {
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminUserId);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  };

  // Log admin activity
  const logActivity = async (action: string, resource: string, resourceId?: string, details?: any) => {
    try {
      await supabase.rpc('log_admin_activity', {
        p_action: action,
        p_resource: resource,
        p_resource_id: resourceId,
        p_details: details || {}
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        console.log('Authentication successful, loading admin user...');
        const adminUserData = await loadAdminUser(data.user.id);
        
        if (!adminUserData) {
          console.error('No admin user found for authenticated user');
          toast.error("Admin access denied. User not found in admin_users table.");
          await supabase.auth.signOut();
          return false;
        }

        if (!adminUserData.is_active) {
          console.error('Admin user is not active');
          toast.error("Admin access denied. Account is not active.");
          await supabase.auth.signOut();
          return false;
        }

        console.log('Admin user loaded successfully:', adminUserData);
        setUser(data.user);
        setSession(data.session);
        setAdminUser(adminUserData);
        await updateLastLogin(adminUserData.id);
        await logActivity('login', 'admin_auth');
        toast.success("Login successful");
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed");
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (adminUser) {
        await logActivity('logout', 'admin_auth');
      }
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setAdminUser(null);
      toast.info("Logged out successfully");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Register new admin user
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: "admin" | "editor" | "viewer"
  ): Promise<boolean> => {
    try {
      console.log('Attempting to register new admin user:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      if (error) {
        console.error('Registration error:', error);
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        // Create admin user profile
        const { error: profileError } = await supabase
          .from('admin_users')
          .insert({
            auth_user_id: data.user.id,
            name,
            email,
            role
          });

        if (profileError) {
          console.error('Error creating admin profile:', profileError);
          toast.error("Failed to create admin profile");
          return false;
        }

        await logActivity('user_created', 'admin_users', data.user.id, { name, email, role });
        toast.success("Admin user created successfully");
        return true;
      }

      return false;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Registration failed");
      return false;
    }
  };

  // Update admin user
  const updateAdminUser = async (data: Partial<AdminUser>): Promise<boolean> => {
    if (!adminUser) return false;

    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', adminUser.id);

      if (error) {
        console.error('Error updating admin user:', error);
        toast.error("Failed to update profile");
        return false;
      }

      setAdminUser({ ...adminUser, ...data });
      await logActivity('profile_updated', 'admin_users', adminUser.id, data);
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      console.error('Update error:', error);
      toast.error("Update failed");
      return false;
    }
  };

  // Initialize auth state
  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (session?.user) {
          const adminUserData = await loadAdminUser(session.user.id);
          if (adminUserData && adminUserData.is_active) {
            setUser(session.user);
            setSession(session);
            setAdminUser(adminUserData);
          } else {
            console.log('User not authorized for admin access, signing out');
            if (event !== 'SIGNED_OUT') {
              await supabase.auth.signOut();
            }
          }
        } else {
          setUser(null);
          setSession(null);
          setAdminUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadAdminUser(session.user.id).then((adminUserData) => {
          if (adminUserData && adminUserData.is_active) {
            setUser(session.user);
            setSession(session);
            setAdminUser(adminUserData);
          }
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        adminUser,
        session,
        isAuthenticated: !!user && !!adminUser,
        isLoading,
        login,
        logout,
        register,
        updateAdminUser,
        logActivity,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
