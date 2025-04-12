
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  folderId: string;
  isPinned: boolean;
  tags: string[];
}

export interface Folder {
  id: string;
  name: string;
  color: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export type FolderColor = 
  | "mint"
  | "lavender"
  | "peach"
  | "blue"
  | "yellow"
  | "pink"
  | "orange"
  | "gray";

export interface Tag {
  id: string;
  name: string;
}

export interface Version {
  id: string;
  noteId: string;
  content: string;
  createdAt: string;
}
