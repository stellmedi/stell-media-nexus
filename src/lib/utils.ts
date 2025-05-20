
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileTypeIcon(type: string) {
  if (type.startsWith('image/')) return 'image';
  if (type.includes('video')) return 'video';
  if (type.includes('pdf')) return 'pdf';
  if (type.includes('excel') || type.includes('spreadsheet')) return 'spreadsheet';
  if (type.includes('word') || type.includes('document')) return 'document';
  return 'file';
}
