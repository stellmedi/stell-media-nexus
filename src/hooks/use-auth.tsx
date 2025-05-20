
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

// Define the Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: "admin" | "editor" | "viewer") => Promise<boolean>;
  updateUser: (user: Partial<User>) => void;
}

// Initial sample admin users
const INITIAL_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@stellmedia.com",
    role: "admin",
  }
];

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Password hashing (simplified for MVP - would use bcrypt in production)
const hashPassword = (password: string): string => {
  // This is a simple hash for demo purposes only
  // In production, use bcrypt or another secure hashing library
  return btoa(password + "salt");
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Array<User & { password: string }>>([]);

  // Initialize users from localStorage or use default admin
  useEffect(() => {
    // Load users from localStorage or initialize with default
    const storedUsers = localStorage.getItem("admin_users");
    const storedUser = localStorage.getItem("current_user");
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Set up initial admin user with password
      const initialUsersWithPassword = INITIAL_USERS.map(user => ({
        ...user,
        password: hashPassword("admin123") // Default password for demo
      }));
      
      setUsers(initialUsersWithPassword);
      localStorage.setItem("admin_users", JSON.stringify(initialUsersWithPassword));
    }
    
    // Check if user is already logged in
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("admin_users", JSON.stringify(users));
    }
  }, [users]);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    const hashedPassword = hashPassword(password);
    const foundUser = users.find(u => u.email === email && u.password === hashedPassword);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("current_user", JSON.stringify(userWithoutPassword));
      toast.success("Login successful");
      return true;
    } else {
      toast.error("Invalid email or password");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("current_user");
    toast.info("Logged out successfully");
  };

  // Register new user
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: "admin" | "editor" | "viewer"
  ): Promise<boolean> => {
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      toast.error("User with this email already exists");
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashPassword(password),
      role,
    };
    
    setUsers(prev => [...prev, newUser]);
    toast.success("User registered successfully");
    return true;
  };

  // Update user
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("current_user", JSON.stringify(updatedUser));
    
    // Also update in users array
    setUsers(prev => 
      prev.map(u => 
        u.id === user.id 
          ? { ...u, ...userData } 
          : u
      )
    );
    
    toast.success("User profile updated");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
