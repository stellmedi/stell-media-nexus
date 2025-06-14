
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface Backup {
  id: string;
  name: string;
  type: 'automatic' | 'manual';
  size: string;
  date: string;
  status: 'completed' | 'in-progress' | 'failed';
  includes: string[];
}

const BackupRestore: React.FC = () => {
  const [backups] = useState<Backup[]>([
    {
      id: '1',
      name: 'Weekly Automatic Backup',
      type: 'automatic',
      size: '245 MB',
      date: '2024-01-14T10:30:00Z',
      status: 'completed',
      includes: ['Database', 'Media Files', 'Configuration', 'Content']
    },
    {
      id: '2',
      name: 'Pre-Update Manual Backup',
      type: 'manual',
      size: '238 MB',
      date: '2024-01-10T15:45:00Z',
      status: 'completed',
      includes: ['Database', 'Media Files', 'Configuration']
    },
    {
      id: '3',
      name: 'Daily Automatic Backup',
      type: 'automatic',
      size: '240 MB',
      date: '2024-01-13T02:00:00Z',
      status: 'completed',
      includes: ['Database', 'Configuration', 'Content']
    }
  ]);

  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    setBackupProgress(0);
    
    // Simulate backup creation progress
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCreatingBackup(false);
          toast.success("Backup created successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDownloadBackup = (backupId: string) => {
    toast.success(`Downloading backup ${backupId}...`);
  };

  const handleRestoreBackup = (backupId: string) => {
    toast.info(`Restoring from backup ${backupId}...`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'automatic': return 'bg-blue-100 text-blue-800';
      case 'manual': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Backup & Restore</h2>
        <p className="text-gray-600">Manage website backups and restore points</p>
      </div>

      {/* Backup Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Create Backup
            </CardTitle>
            <CardDescription>Create a manual backup of your website</CardDescription>
          </CardHeader>
          <CardContent>
            {isCreatingBackup ? (
              <div className="space-y-4">
                <Progress value={backupProgress} className="w-full" />
                <p className="text-sm text-gray-600">Creating backup... {backupProgress}%</p>
              </div>
            ) : (
              <Button onClick={handleCreateBackup} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Create Manual Backup
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Restore Options
            </CardTitle>
            <CardDescription>Configure automatic backup settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Daily Backups</span>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Weekly Backups</span>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Retention Period</span>
                <span className="text-sm text-gray-600">30 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
          <CardDescription>Available backups and restore points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{backup.name}</h4>
                    <Badge className={`text-xs ${getStatusColor(backup.status)}`}>
                      {getStatusIcon(backup.status)}
                      <span className="ml-1">{backup.status}</span>
                    </Badge>
                    <Badge className={`text-xs ${getTypeColor(backup.type)}`}>
                      {backup.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(backup.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(backup.date).toLocaleTimeString()}
                    </div>
                    <span>Size: {backup.size}</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {backup.includes.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownloadBackup(backup.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleRestoreBackup(backup.id)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupRestore;
