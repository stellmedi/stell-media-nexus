
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  Trash2, 
  Edit,
  Download,
  Search,
  Filter,
  Grid,
  List,
  Save
} from "lucide-react";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  size: string;
  url: string;
  altText: string;
  uploadDate: string;
  dimensions?: string;
}

const MediaManager: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedAltText, setEditedAltText] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: '38799a3e-2ae4-428c-b111-c6d907dcda42.png',
      type: 'image',
      size: '245 KB',
      url: '/lovable-uploads/38799a3e-2ae4-428c-b111-c6d907dcda42.png',
      altText: 'Stell Media logo with gradient background for brand identity',
      uploadDate: '2024-01-15',
      dimensions: '800x600'
    },
    {
      id: '2',
      name: 'd1aeb466-efb1-4d25-900f-37414e5d0863.png',
      type: 'image',
      size: '312 KB',
      url: '/lovable-uploads/d1aeb466-efb1-4d25-900f-37414e5d0863.png',
      altText: 'Professional team photo showcasing Stell Media expertise in digital marketing',
      uploadDate: '2024-01-14',
      dimensions: '1200x800'
    },
    {
      id: '3',
      name: 'f34fc50c-3811-4db5-bb67-307d487ce8a1.png',
      type: 'image',
      size: '189 KB',
      url: '/lovable-uploads/f34fc50c-3811-4db5-bb67-307d487ce8a1.png',
      altText: 'Stell Media brand logo for social media and marketing materials',
      uploadDate: '2024-01-13',
      dimensions: '600x400'
    }
  ]);

  // Update edited alt text when file selection changes
  React.useEffect(() => {
    if (selectedFile) {
      setEditedAltText(selectedFile.altText);
      setHasUnsavedChanges(false);
    }
  }, [selectedFile]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="h-8 w-8 text-blue-500" />;
      case 'document': return <FileText className="h-8 w-8 text-green-500" />;
      case 'video': return <Video className="h-8 w-8 text-purple-500" />;
      default: return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const handleUpload = () => {
    toast.success("File uploaded successfully!");
  };

  const handleDelete = (fileId: string) => {
    setMediaFiles(prev => prev.filter(file => file.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
    toast.success("File deleted successfully!");
  };

  const handleSaveAltText = () => {
    if (!selectedFile) return;
    
    // Update the media files array with new alt text
    setMediaFiles(prev => prev.map(file => 
      file.id === selectedFile.id 
        ? { ...file, altText: editedAltText }
        : file
    ));
    
    // Update selected file
    setSelectedFile(prev => prev ? { ...prev, altText: editedAltText } : null);
    
    // Save to localStorage for persistence
    try {
      const updatedFiles = mediaFiles.map(file => 
        file.id === selectedFile.id 
          ? { ...file, altText: editedAltText }
          : file
      );
      localStorage.setItem('stellmedia_media_files', JSON.stringify(updatedFiles));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    
    setHasUnsavedChanges(false);
    toast.success("Alt text updated successfully!");
  };

  const handleAltTextChange = (value: string) => {
    setEditedAltText(value);
    setHasUnsavedChanges(value !== selectedFile?.altText);
  };

  const filteredFiles = mediaFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Media Manager</h2>
          <p className="text-gray-600">Upload and manage images, documents, and videos with alt text</p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleUpload}>
          <Upload className="h-4 w-4" />
          Upload Files
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Media Library */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Media Library</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-2 top-2.5 text-gray-400" />
                  <Input
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-48"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                >
                  {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedFile?.id === file.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="flex flex-col items-center text-center">
                      {file.type === 'image' ? (
                        <img 
                          src={file.url} 
                          alt={file.altText}
                          className="w-full h-24 object-cover rounded mb-2"
                        />
                      ) : (
                        <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded mb-2">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                      <h4 className="font-medium text-sm truncate w-full">{file.name}</h4>
                      <p className="text-xs text-gray-500">{file.size}</p>
                      <Badge className="mt-1 text-xs">{file.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedFile?.id === file.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <h4 className="font-medium text-sm">{file.name}</h4>
                        <p className="text-xs text-gray-500">
                          {file.size} • {file.uploadDate}
                          {file.dimensions && ` • ${file.dimensions}`}
                        </p>
                      </div>
                    </div>
                    <Badge className="text-xs">{file.type}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* File Details & Alt Text Editor */}
        <Card>
          <CardHeader>
            <CardTitle>File Details & Alt Text</CardTitle>
            <CardDescription>Edit file information and alt text for accessibility</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedFile ? (
              <div className="space-y-4">
                {/* File Preview */}
                <div className="text-center">
                  {selectedFile.type === 'image' ? (
                    <img 
                      src={selectedFile.url} 
                      alt={selectedFile.altText}
                      className="w-full max-h-48 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded">
                      {getFileIcon(selectedFile.type)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="fileName">File Name</Label>
                    <Input id="fileName" value={selectedFile.name} readOnly />
                  </div>

                  <div>
                    <Label htmlFor="fileUrl">URL</Label>
                    <div className="flex gap-2">
                      <Input id="fileUrl" value={selectedFile.url} readOnly />
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="altText">Alt Text {hasUnsavedChanges && <span className="text-yellow-600">(unsaved)</span>}</Label>
                    <Textarea 
                      id="altText"
                      value={editedAltText}
                      onChange={(e) => handleAltTextChange(e.target.value)}
                      placeholder="Describe this file for accessibility and SEO"
                      className="h-20"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Good alt text is descriptive but concise. It helps screen readers and improves SEO.
                    </p>
                  </div>

                  {selectedFile.dimensions && (
                    <div>
                      <Label>Dimensions</Label>
                      <p className="text-sm text-gray-600">{selectedFile.dimensions}</p>
                    </div>
                  )}

                  <div>
                    <Label>File Size</Label>
                    <p className="text-sm text-gray-600">{selectedFile.size}</p>
                  </div>

                  <div>
                    <Label>Upload Date</Label>
                    <p className="text-sm text-gray-600">{selectedFile.uploadDate}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button 
                    size="sm" 
                    onClick={handleSaveAltText}
                    disabled={!hasUnsavedChanges}
                    className={hasUnsavedChanges ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    <Save className="h-4 w-4 mr-1" />
                    {hasUnsavedChanges ? 'Save Alt Text' : 'Saved'}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(selectedFile.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No File Selected</h3>
                <p className="text-gray-600">Select a file to view and edit its alt text</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Files</CardTitle>
          <CardDescription>Drag and drop files or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</p>
            <p className="text-gray-600 mb-4">Supports images, documents, and videos up to 50MB</p>
            <Button variant="outline">Browse Files</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaManager;
