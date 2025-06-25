import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Users, Settings, Plus, Edit, Trash2, Eye, Calendar, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/use-supabase-admin";

const EmailManagement = () => {
  const { isAuthenticated, isLoading, adminUser } = useAdminAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Management</CardTitle>
            <CardDescription>Manage email templates and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This feature is under development.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EmailManagement;
