
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Mail, 
  LogOut,
  Search
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Stell Media
          </h2>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
        
        <div className="px-4 py-2">
          <div className="border-t border-gray-200 my-4"></div>
          
          {/* User Info */}
          <div className="mb-6 p-2">
            <p className="font-medium">{user?.name || "Admin User"}</p>
            <p className="text-sm text-gray-500">{user?.email || "admin@example.com"}</p>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/admin/dashboard")}
            >
              <LayoutDashboard className="mr-2" />
              Dashboard
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/admin/users")}
            >
              <Users className="mr-2" />
              Users
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/admin/content")}
            >
              <FileText className="mr-2" />
              Content
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/admin/seo")}
            >
              <Search className="mr-2" />
              SEO
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/admin/emails")}
            >
              <Mail className="mr-2" />
              Emails
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/admin/settings")}
            >
              <Settings className="mr-2" />
              Settings
            </Button>
            
            <div className="pt-4">
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
