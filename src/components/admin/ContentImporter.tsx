
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Import, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { importLiveContentToDatabase, checkContentSync } from '@/utils/contentImporter';

const ContentImporter: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    isInSync: boolean;
    issues: string[];
    lastChecked?: Date;
  } | null>(null);

  const handleImportContent = async () => {
    setIsImporting(true);
    try {
      const success = await importLiveContentToDatabase();
      if (success) {
        toast.success('Content imported successfully! Your live website content is now in the database.');
        // Refresh sync status after import
        await handleCheckSync();
      } else {
        toast.error('Failed to import content. Please check console for details.');
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Error during content import');
    } finally {
      setIsImporting(false);
    }
  };

  const handleCheckSync = async () => {
    setIsChecking(true);
    try {
      const result = await checkContentSync();
      setSyncStatus({
        ...result,
        lastChecked: new Date()
      });
      
      if (result.isInSync) {
        toast.success('Content is in sync with live website!');
      } else {
        toast.warning(`Found ${result.issues.length} sync issues`);
      }
    } catch (error) {
      console.error('Sync check error:', error);
      toast.error('Error checking content sync');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Import className="h-5 w-5" />
          Content Sync Manager
        </CardTitle>
        <CardDescription>
          Import your live website content into the database and manage synchronization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sync Status Display */}
        {syncStatus && (
          <div className="p-4 rounded-lg border bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Content Sync Status</h4>
              <Badge variant={syncStatus.isInSync ? "default" : "destructive"}>
                {syncStatus.isInSync ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    In Sync
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Out of Sync
                  </>
                )}
              </Badge>
            </div>
            
            {syncStatus.issues.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-red-600">Issues Found:</p>
                <ul className="text-sm text-red-600 space-y-1">
                  {syncStatus.issues.map((issue, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {syncStatus.lastChecked && (
              <p className="text-xs text-gray-500 mt-2">
                Last checked: {syncStatus.lastChecked.toLocaleString()}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={handleImportContent} 
            disabled={isImporting}
            className="flex items-center gap-2"
          >
            {isImporting ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Import className="h-4 w-4" />
            )}
            {isImporting ? 'Importing...' : 'Import Live Content'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleCheckSync} 
            disabled={isChecking}
            className="flex items-center gap-2"
          >
            {isChecking ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            {isChecking ? 'Checking...' : 'Check Sync Status'}
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Import Live Content:</strong> This will copy all current content from your live website components into the database.</p>
          <p><strong>Check Sync Status:</strong> This will verify if your database content matches your live website content.</p>
          <p className="text-amber-600">
            <strong>Note:</strong> After importing, your admin panel edits will immediately reflect on the live website.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentImporter;
