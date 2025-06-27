
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Plus, Edit, Trash2, User, Shield, Eye, Mail, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-supabase-admin";
import { getAdminUsers, updateAdminUser, deleteAdminUser } from "@/services/adminService";
import { supabase } from "@/integrations/supabase/client";
import type { AdminUser } from "@/services/adminService";

const UserManagement = () => {
  const { adminUser, register } = useAdminAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer'
  });

  // Load users from Supabase
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const userData = await getAdminUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error("Error loading users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'viewer'
    });
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: AdminUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    if (!editingUser && !formData.password.trim()) {
      toast.error("Password is required for new users");
      return;
    }

    // Check for duplicate email
    const existingUser = users.find(u => u.email === formData.email && u.id !== editingUser?.id);
    if (existingUser) {
      toast.error("A user with this email already exists");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingUser) {
        // Update existing user
        await updateAdminUser(editingUser.id, {
          name: formData.name,
          email: formData.email,
          role: formData.role
        });
        toast.success("User updated successfully");
      } else {
        // Create new user using Supabase auth
        const success = await register(
          formData.name,
          formData.email,
          formData.password,
          formData.role
        );

        if (success) {
          setShowConfirmationAlert(true);
          toast.success("User created successfully! Please check email confirmation settings.");
        } else {
          return; // Error already shown by register function
        }
      }

      await loadUsers(); // Reload users
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error("Error saving user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (user.email === adminUser?.email) {
      toast.error("Cannot delete your own account");
      return;
    }

    if (user.role === 'admin' && users.filter(u => u.role === 'admin' && u.is_active).length === 1) {
      toast.error("Cannot delete the last active admin user");
      return;
    }

    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteAdminUser(userId);
        await loadUsers();
        toast.success("User deleted successfully");
      } catch (error) {
        console.error('Delete error:', error);
        toast.error("Error deleting user");
      }
    }
  };

  const handleToggleStatus = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (user.email === adminUser?.email) {
      toast.error("Cannot deactivate your own account");
      return;
    }

    if (user.role === 'admin' && user.is_active && 
        users.filter(u => u.role === 'admin' && u.is_active).length === 1) {
      toast.error("Cannot deactivate the last active admin user");
      return;
    }

    try {
      await updateAdminUser(userId, { is_active: !user.is_active });
      await loadUsers();
      toast.success(`User ${user.is_active ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error('Toggle status error:', error);
      toast.error("Error updating user status");
    }
  };

  const handleResendConfirmation = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      if (error) {
        toast.error("Failed to resend confirmation email");
      } else {
        toast.success("Confirmation email resent successfully");
      }
    } catch (error) {
      console.error('Resend confirmation error:', error);
      toast.error("Error resending confirmation email");
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'editor': return <Edit className="h-4 w-4" />;
      case 'viewer': return <Eye className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Only admins can access user management
  if (adminUser?.role !== 'admin') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You do not have permission to manage users.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>
          Create and manage admin users with different roles and permissions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {showConfirmationAlert && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> New users need to confirm their email before they can login. 
              If email confirmation is disabled in Supabase Auth settings, users can login immediately. 
              Otherwise, they'll receive a confirmation email first.
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2"
                onClick={() => setShowConfirmationAlert(false)}
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-4 text-sm text-gray-600">
            <span>Total Users: {users.length}</span>
            <span>Active: {users.filter(u => u.is_active).length}</span>
            <span>Admins: {users.filter(u => u.role === 'admin').length}</span>
          </div>
          <Button onClick={handleCreateUser}>
            <Plus className="h-4 w-4 mr-2" />
            Create User
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading users...</div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={`${getRoleBadgeColor(user.role)} border-none`}>
                        <span className="flex items-center gap-1">
                          {getRoleIcon(user.role)}
                          {user.role}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={user.is_active ? 'default' : 'secondary'}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResendConfirmation(user.email)}
                          title="Resend confirmation email"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(user.id)}
                          disabled={user.email === adminUser?.email}
                        >
                          {user.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.email === adminUser?.email}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Role Descriptions */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Role Descriptions & Email Confirmation</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-600" />
              <span className="font-medium">Admin:</span>
              <span className="text-gray-600">Full access to all features including user management</span>
            </div>
            <div className="flex items-center gap-2">
              <Edit className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Editor:</span>
              <span className="text-gray-600">Can manage content and SEO settings</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-gray-600" />
              <span className="font-medium">Viewer:</span>
              <span className="text-gray-600">Read-only access to dashboard and analytics</span>
            </div>
            <div className="flex items-center gap-2 mt-3 p-2 bg-blue-50 rounded">
              <Mail className="h-4 w-4 text-blue-600" />
              <span className="text-blue-800 text-xs">
                <strong>Note:</strong> New users may need to confirm their email before logging in. 
                Use the mail icon to resend confirmation emails if needed.
              </span>
            </div>
          </div>
        </div>

        {/* Create/Edit User Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Edit User' : 'Create New User'}
              </DialogTitle>
              <DialogDescription>
                {editingUser ? 'Update user information and role.' : 'Create a new admin user with specific permissions. Note: User may need to confirm their email before first login.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@stellmedia.com"
                  required
                  className="mt-1"
                />
              </div>
              
              {!editingUser && (
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    User will receive a confirmation email before they can login
                  </p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium">Role</label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value: 'admin' | 'editor' | 'viewer') => 
                    setFormData(prev => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Admin
                      </div>
                    </SelectItem>
                    <SelectItem value="editor">
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Editor
                      </div>
                    </SelectItem>
                    <SelectItem value="viewer">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Viewer
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (editingUser ? 'Updating...' : 'Creating...') : (editingUser ? 'Update User' : 'Create User')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
