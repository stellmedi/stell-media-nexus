
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Upload, Image, FileText, Film, Trash, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedOn: string;
  url: string;
}

interface MediaManagerProps {
  mediaItems: MediaItem[];
  onDeleteMedia: (id: string) => void;
  onUploadMedia?: (file: File, metadata?: { name?: string; altText?: string }) => void;
}

export function MediaManager({ mediaItems, onDeleteMedia, onUploadMedia }: MediaManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customFileName, setCustomFileName] = useState("");
  const [altText, setAltText] = useState("");
  const [mediaTypeFilter, setMediaTypeFilter] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Filter media items based on search term and media type filter
  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTypeFilter = mediaTypeFilter === null || 
      (mediaTypeFilter === 'image' && item.type.startsWith('image/')) ||
      (mediaTypeFilter === 'document' && item.type.includes('pdf')) || 
      (mediaTypeFilter === 'video' && item.type.includes('video'));
      
    return matchesSearch && matchesTypeFilter;
  });

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setCustomFileName(file.name);
      generatePreview(file);
    }
  };

  const generatePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (selectedFile && onUploadMedia) {
      setIsUploading(true);
      
      try {
        onUploadMedia(selectedFile, {
          name: customFileName || selectedFile.name,
          altText: altText
        });
        
        // Clear form
        setSelectedFile(null);
        setCustomFileName("");
        setAltText("");
        setPreviewUrl(null);
        setUploadDialogOpen(false);
        toast.success("File uploaded successfully");
      } catch (error) {
        toast.error("Upload failed. Please try again.");
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    } else {
      toast.error("Please select a file to upload");
    }
  };

  // Open media details dialog
  const openMediaDetails = (media: MediaItem) => {
    setSelectedMedia(media);
    setDetailsDialogOpen(true);
  };

  // Handle drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setCustomFileName(file.name);
      generatePreview(file);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 min-w-[250px] max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search media files..."
            className="pl-9"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <div className="dropdown">
            <Button variant="outline" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter: {mediaTypeFilter || 'All'}</span>
            </Button>
            <div className="dropdown-content">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => setMediaTypeFilter(null)}
              >
                All
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => setMediaTypeFilter('image')}
              >
                Images
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => setMediaTypeFilter('document')}
              >
                Documents
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => setMediaTypeFilter('video')}
              >
                Videos
              </Button>
            </div>
          </div>
          
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Upload New Media
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMedia.length > 0 ? (
          filteredMedia.map(media => (
            <Card key={media.id} className="overflow-hidden h-full">
              <div 
                className="aspect-square bg-gray-100 relative cursor-pointer transition-all hover:opacity-90"
                onClick={() => openMediaDetails(media)}
              >
                {media.type.startsWith("image/") ? (
                  <img 
                    src={media.url} 
                    alt={media.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {media.type.includes("video") ? (
                      <Film className="h-12 w-12 text-gray-400" />
                    ) : (
                      <FileText className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-medium mb-1 truncate" title={media.name}>
                  {media.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {media.type.split('/')[1]?.toUpperCase() || media.type} • {media.size}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {media.uploadedOn}
                  </span>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => openMediaDetails(media)}
                    >
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Are you sure you want to delete ${media.name}?`)) {
                          onDeleteMedia(media.id);
                          toast.success("Media deleted successfully");
                        }
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <h3 className="text-lg font-medium">No media found</h3>
            <p className="text-gray-500 mb-4">
              {mediaItems.length === 0 
                ? "Your media library is empty." 
                : "No media matches your search criteria."}
            </p>
            {mediaItems.length === 0 && (
              <Button onClick={() => setUploadDialogOpen(true)}>
                <Upload className="mr-2 h-4 w-4" /> Upload Media
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Media Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Media Details</DialogTitle>
          </DialogHeader>
          
          {selectedMedia && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                {selectedMedia.type.startsWith("image/") ? (
                  <img 
                    src={selectedMedia.url} 
                    alt={selectedMedia.name} 
                    className="w-full h-full object-contain" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {selectedMedia.type.includes("video") ? (
                      <Film className="h-16 w-16 text-gray-400" />
                    ) : (
                      <FileText className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">File Name</Label>
                  <p className="font-medium">{selectedMedia.name}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">File Type</Label>
                  <p className="font-medium">{selectedMedia.type}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">Size</Label>
                  <p className="font-medium">{selectedMedia.size}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">Uploaded On</Label>
                  <p className="font-medium">{selectedMedia.uploadedOn}</p>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-500">Uploaded By</Label>
                  <p className="font-medium">{selectedMedia.uploadedBy}</p>
                </div>
              </div>
              
              {selectedMedia.type.startsWith("image/") && (
                <div className="space-y-2">
                  <Label htmlFor="altText">Alt Text</Label>
                  <Input id="altText" placeholder="Describe this image for accessibility" />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="fileUrl">File URL</Label>
                <div className="flex">
                  <Input id="fileUrl" value={selectedMedia.url} readOnly />
                  <Button 
                    className="ml-2" 
                    variant="outline" 
                    onClick={() => {
                      navigator.clipboard.writeText(selectedMedia.url);
                      toast.success("URL copied to clipboard");
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    onDeleteMedia(selectedMedia.id);
                    setDetailsDialogOpen(false);
                    toast.success("Media deleted successfully");
                  }}
                >
                  Delete
                </Button>
                
                <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Upload images, documents, or other media files to your library.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div 
              className={cn(
                "flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-md p-6",
                "transition-colors duration-200",
                dragActive ? "border-primary bg-primary/5" : "",
                previewUrl ? "bg-gray-50" : ""
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {previewUrl ? (
                <div className="text-center">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="mx-auto h-32 object-contain mb-4" 
                  />
                  <p className="text-sm font-medium">{selectedFile?.name}</p>
                  <p className="text-xs text-gray-500">
                    {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + " MB" : ""}
                  </p>
                </div>
              ) : selectedFile ? (
                <div className="text-center">
                  {selectedFile.type.includes("video") ? (
                    <Film className="h-20 w-20 text-gray-400 mx-auto mb-2" />
                  ) : (
                    <FileText className="h-20 w-20 text-gray-400 mx-auto mb-2" />
                  )}
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    {dragActive 
                      ? "Drop your file here" 
                      : "Drag and drop or click to upload"}
                  </p>
                  <p className="text-xs text-gray-400">Supports images, documents, and videos up to 10MB</p>
                </div>
              )}
              
              <Input 
                id="fileUpload" 
                type="file" 
                className="hidden" 
                onChange={handleFileSelect} 
                accept="image/*,video/*,application/pdf"
              />
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => document.getElementById('fileUpload')?.click()}
              >
                {selectedFile ? "Change File" : "Select File"}
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fileName">File Name (optional)</Label>
              <Input 
                id="fileName" 
                placeholder="Enter a custom file name" 
                value={customFileName}
                onChange={(e) => setCustomFileName(e.target.value)}
              />
            </div>
            
            {selectedFile?.type.startsWith("image/") && (
              <div className="space-y-2">
                <Label htmlFor="altText">Alt Text</Label>
                <Input 
                  id="altText" 
                  placeholder="Describe this image for accessibility" 
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedFile(null);
                setCustomFileName("");
                setAltText("");
                setPreviewUrl(null);
                setUploadDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .dropdown {
          position: relative;
          display: inline-block;
        }
        
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: white;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
          z-index: 1;
          border-radius: 0.375rem;
          padding: 0.5rem;
          margin-top: 0.25rem;
        }
        
        .dropdown:hover .dropdown-content {
          display: block;
        }
      `}</style>
    </>
  );
}
