
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Upload, Image, FileText, Film } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
  onUploadMedia?: (file: File) => void;
}

export function MediaManager({ mediaItems, onDeleteMedia, onUploadMedia }: MediaManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Filter media items based on search term
  const filteredMedia = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (selectedFile && onUploadMedia) {
      onUploadMedia(selectedFile);
      setSelectedFile(null);
      setUploadDialogOpen(false);
      toast.success("File uploaded successfully");
    } else {
      toast.error("Please select a file to upload");
    }
  };

  // Open media details dialog
  const openMediaDetails = (media: MediaItem) => {
    setSelectedMedia(media);
    setDetailsDialogOpen(true);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search media files..."
            className="pl-9"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" /> Upload New Media
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.length > 0 ? (
          filteredMedia.map(media => (
            <Card key={media.id} className="overflow-hidden">
              <div 
                className="aspect-square bg-gray-100 relative cursor-pointer"
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
                  {media.type} • {media.size}
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
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDeleteMedia(media.id)}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center py-8">No media found</div>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Upload images, documents, or other media files to your library.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-md p-6">
              {selectedFile ? (
                <div className="text-center">
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Drag and drop or click to upload</p>
                </div>
              )}
              
              <Input 
                id="fileUpload" 
                type="file" 
                className="hidden" 
                onChange={handleFileSelect}
              />
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('fileUpload')?.click()}
              >
                Select File
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fileName">File Name (optional)</Label>
              <Input 
                id="fileName" 
                placeholder="Enter a custom file name" 
                defaultValue={selectedFile?.name} 
              />
            </div>
            
            {selectedFile?.type.startsWith("image/") && (
              <div className="space-y-2">
                <Label htmlFor="altText">Alt Text</Label>
                <Input id="altText" placeholder="Describe this image for accessibility" />
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedFile(null);
                setUploadDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleUpload}>Upload</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
