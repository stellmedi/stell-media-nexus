
import React, { ReactNode, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Search,
  LogOut,
  Mail,
  Activity
} from "lucide-react";
import { useAdminAuth } from "@/hooks/use-supabase-admin";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated, adminUser, isLoading, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setHasCheckedAuth(true);
    }
  }, [isLoading]);

  if (isLoading || !hasCheckedAuth) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated && hasCheckedAuth) {
    console.log('AdminLayout: User not authenticated, redirecting to login');
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/admin", { replace: true });
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Users", path: "/admin/users", adminOnly: true },
    { icon: FileText, label: "Content", path: "/admin/content" },
    { icon: Mail, label: "Form Submissions", path: "/admin/emails" },
    { icon: Activity, label: "Activity Logs", path: "/admin/activity", adminOnly: true },
    { icon: Search, label: "SEO", path: "/admin/seo" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.adminOnly || adminUser?.role === 'admin'
  );

  return (
    <div className="min-h-screen bg-indigo-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-500">Stell Media CMS</p>
          {adminUser && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
              <p className="font-medium">{adminUser.name}</p>
              <p className="text-gray-600">{adminUser.email}</p>
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                adminUser.role === 'admin' ? 'bg-red-100 text-red-800' :
                adminUser.role === 'editor' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {adminUser.role}
              </span>
            </div>
          )}
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {filteredMenuItems.map((item) => {
              const isActive = window.location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </nav>
        
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
