
import React, { createContext, useContext, useState, useEffect } from "react";
import { Note, Folder, Tag } from "../types";
import { mockFolders, mockNotes, mockTags } from "../data/mockData";
import { getRandomId } from "../lib/helpers";
import { toast } from "@/components/ui/use-toast";

interface AppContextType {
  notes: Note[];
  folders: Folder[];
  tags: Tag[];
  activeFolder: string | null;
  activeNote: string | null;
  searchQuery: string;
  isDarkMode: boolean;
  isMenuOpen: boolean;
  createNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  createFolder: (folder: Omit<Folder, "id" | "createdAt" | "updatedAt">) => void;
  updateFolder: (id: string, folder: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  togglePinNote: (id: string) => void;
  setActiveFolder: (id: string | null) => void;
  setActiveNote: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleDarkMode: () => void;
  toggleMenu: () => void;
  createTag: (name: string) => void;
  deleteTag: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [folders, setFolders] = useState<Folder[]>(mockFolders);
  const [tags, setTags] = useState<Tag[]>(mockTags);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Check for dark mode preference on initial render
  useEffect(() => {
    const darkModePreference = window.localStorage.getItem("darkMode");
    if (darkModePreference === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("darkMode", String(newDarkMode));
  };

  // Toggle menu for mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Create a new note
  const createNote = (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    const newNote: Note = {
      ...note,
      id: getRandomId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    toast({ title: "Note created", description: "Your note has been created successfully." });
  };

  // Update an existing note
  const updateNote = (id: string, noteUpdates: Partial<Note>) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { ...note, ...noteUpdates, updatedAt: new Date().toISOString() } 
          : note
      )
    );
  };

  // Delete a note
  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNote === id) {
      setActiveNote(null);
    }
    toast({ title: "Note deleted", description: "Your note has been deleted successfully." });
  };

  // Create a new folder
  const createFolder = (folder: Omit<Folder, "id" | "createdAt" | "updatedAt">) => {
    const newFolder: Folder = {
      ...folder,
      id: getRandomId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setFolders([...folders, newFolder]);
    setActiveFolder(newFolder.id);
    toast({ title: "Folder created", description: "Your folder has been created successfully." });
  };

  // Update an existing folder
  const updateFolder = (id: string, folderUpdates: Partial<Folder>) => {
    setFolders(prevFolders => 
      prevFolders.map(folder => 
        folder.id === id 
          ? { ...folder, ...folderUpdates, updatedAt: new Date().toISOString() } 
          : folder
      )
    );
  };

  // Delete a folder and all notes in it
  const deleteFolder = (id: string) => {
    setFolders(folders.filter(folder => folder.id !== id));
    setNotes(notes.filter(note => note.folderId !== id));
    if (activeFolder === id) {
      setActiveFolder(null);
    }
    toast({ title: "Folder deleted", description: "Your folder has been deleted successfully." });
  };

  // Toggle pin status of a note
  const togglePinNote = (id: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { ...note, isPinned: !note.isPinned, updatedAt: new Date().toISOString() } 
          : note
      )
    );
  };

  // Create a new tag
  const createTag = (name: string) => {
    const newTag: Tag = {
      id: getRandomId(),
      name,
    };
    setTags([...tags, newTag]);
  };

  // Delete a tag
  const deleteTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
    // Remove tag from all notes that have it
    setNotes(prevNotes => 
      prevNotes.map(note => {
        const tagName = tags.find(tag => tag.id === id)?.name;
        if (tagName && note.tags.includes(tagName)) {
          return {
            ...note,
            tags: note.tags.filter(tag => tag !== tagName),
            updatedAt: new Date().toISOString(),
          };
        }
        return note;
      })
    );
  };

  const value = {
    notes,
    folders,
    tags,
    activeFolder,
    activeNote,
    searchQuery,
    isDarkMode,
    isMenuOpen,
    createNote,
    updateNote,
    deleteNote,
    createFolder,
    updateFolder,
    deleteFolder,
    togglePinNote,
    setActiveFolder,
    setActiveNote,
    setSearchQuery,
    toggleDarkMode,
    toggleMenu,
    createTag,
    deleteTag,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
