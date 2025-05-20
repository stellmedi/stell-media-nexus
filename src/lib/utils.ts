
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { File, Image, Music, Video, FileText, FileCode, Package } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a file size in bytes to a human-readable string
 * @param sizeInBytes - File size in bytes or string representation
 * @returns Formatted file size string
 */
export function formatFileSize(sizeInBytes: number | string): string {
  // If it's already a string with MB, KB, etc., return it
  if (typeof sizeInBytes === 'string' && /[KMG]B$/.test(sizeInBytes)) {
    return sizeInBytes;
  }
  
  // Convert string to number if needed
  const bytes = typeof sizeInBytes === 'string' ? 
    parseFloat(sizeInBytes) : sizeInBytes;
  
  // Handle invalid input
  if (isNaN(bytes) || bytes === 0) return "0 B";
  
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  // Handle overflow (file size too large)
  if (i >= sizes.length) return "File too large";
  
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Returns the appropriate icon component based on file type
 * @param fileType - MIME type of the file
 * @returns The icon component to use
 */
export function getFileTypeIcon(fileType: string) {
  if (!fileType) return File;
  
  const type = fileType.toLowerCase();
  
  if (type.startsWith('image/')) {
    return Image;
  } else if (type.startsWith('video/')) {
    return Video;
  } else if (type.startsWith('audio/')) {
    return Music;
  } else if (type.includes('text/') || type.includes('document')) {
    return FileText;
  } else if (type.includes('application/json') || 
             type.includes('application/javascript') || 
             type.includes('text/html') || 
             type.includes('text/css')) {
    return FileCode;
  } else if (type.includes('zip') || type.includes('compressed')) {
    return Package;
  } else {
    return File;
  }
}
