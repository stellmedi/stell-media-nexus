
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/use-supabase-admin";
import { getActivityLogs, subscribeToAdminChanges, type AdminActivityLog } from "@/services/adminService";
import { Activity, User, Settings, FileText } from "lucide-react";

const ActivityLogs = () => {
  const { adminUser, isAuthenticated, isLoading } = useAdminAuth();
  const [logs, setLogs] = useState<AdminActivityLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  const loadLogs = async () => {
    try {
      setLoadingLogs(true);
      const data = await getActivityLogs(100);
      setLogs(data);
    } catch (error) {
      console.error('Error loading activity logs:', error);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && (adminUser?.role === 'admin' || adminUser?.role === 'editor')) {
      loadLogs();

      // Set up real-time subscription
      const channel = subscribeToAdminChanges('admin_activity_logs', (payload) => {
        console.log('Activity logs real-time update:', payload);
        loadLogs(); // Reload logs on any change
      });

      return () => {
        channel.unsubscribe();
      };
    }
  }, [isAuthenticated, adminUser]);

  const getActionIcon = (action: string) => {
    if (action.includes('user') || action.includes('login') || action.includes('logout')) {
      return <User className="h-4 w-4" />;
    }
    if (action.includes('setting')) {
      return <Settings className="h-4 w-4" />;
    }
    if (action.includes('content')) {
      return <FileText className="h-4 w-4" />;
    }
    return <Activity className="h-4 w-4" />;
  };

  const getActionColor = (action: string) => {
    if (action === 'login') return 'text-green-600';
    if (action === 'logout') return 'text-gray-600';
    if (action.includes('delete')) return 'text-red-600';
    if (action.includes('create')) return 'text-blue-600';
    if (action.includes('update')) return 'text-orange-600';
    return 'text-gray-800';
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  if (adminUser?.role === 'viewer') {
    return (
      <AdminLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Access Denied</h1>
          <p>You do not have permission to view activity logs.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Activity Logs</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{logs.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">User Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {logs.filter(log => log.resource === 'admin_users').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Login Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {logs.filter(log => log.action === 'login').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Settings Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {logs.filter(log => log.resource === 'admin_settings').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow">
          {loadingLogs ? (
            <div className="text-center py-8">Loading activity logs...</div>
          ) : (
            <Table>
              <TableCaption>Recent admin activity logs</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className={getActionColor(log.action)}>
                        {getActionIcon(log.action)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {log.admin_users?.name || 'System'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {log.admin_users?.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getActionColor(log.action)}`}>
                        {log.action.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.resource}
                    </TableCell>
                    <TableCell>
                      {log.details && Object.keys(log.details).length > 0 && (
                        <details className="text-sm">
                          <summary className="cursor-pointer text-blue-600">
                            View details
                          </summary>
                          <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-x-auto">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(log.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ActivityLogs;
