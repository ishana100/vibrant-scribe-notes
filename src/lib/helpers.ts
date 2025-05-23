import { Folder, Note } from "../types";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getRecentNotes = (notes: Note[], limit: number = 5): Note[] => {
  return [...notes]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
};

export const getPinnedNotes = (notes: Note[]): Note[] => {
  return notes.filter(note => note.isPinned);
};

export const searchNotes = (notes: Note[], query: string): Note[] => {
  const lowerCaseQuery = query.toLowerCase();
  return notes.filter(note => 
    note.title.toLowerCase().includes(lowerCaseQuery) || 
    note.content.toLowerCase().includes(lowerCaseQuery) ||
    note.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
};

export const searchFolders = (folders: Folder[], query: string): Folder[] => {
  const lowerCaseQuery = query.toLowerCase();
  return folders.filter(folder => 
    folder.name.toLowerCase().includes(lowerCaseQuery)
  );
};

export const getNotesInFolder = (notes: Note[], folderId: string): Note[] => {
  return notes.filter(note => note.folderId === folderId);
};

export const getRandomId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const getFolderById = (folders: Folder[], id: string): Folder | undefined => {
  return folders.find(folder => folder.id === id);
};

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y ago`;
}
