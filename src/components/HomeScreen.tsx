
import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotesGrid from "./NotesGrid";
import NoteEditor from "./NoteEditor";
import FloatingActionButton from "./FloatingActionButton";
import EmptyState from "./EmptyState";
import { getRecentNotes } from "@/lib/helpers";

const HomeScreen: React.FC = () => {
  const { 
    notes, 
    activeNote, 
    activeFolder, 
    setActiveNote, 
    searchQuery, 
    toggleMenu,
    folders 
  } = useApp();
  
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  // Check if this is the first visit
  useEffect(() => {
    const visited = localStorage.getItem("vibrantNotesVisited");
    if (visited) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem("vibrantNotesVisited", "true");
      setTimeout(() => setIsFirstVisit(false), 3000); // Auto-dismiss after 3 seconds
    }
  }, []);
  
  // Function to get folder name
  const getFolderName = (folderId: string) => {
    return folders.find(folder => folder.id === folderId)?.name || "Unknown";
  };
  
  return (
    <div className="h-full flex flex-col relative">
      {/* Welcome overlay for first-time users */}
      {isFirstVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card p-6 rounded-lg max-w-lg text-center animate-scale-in">
            <h2 className="text-2xl font-bold mb-4">Welcome to Vibrant Notes!</h2>
            <p className="mb-6">
              A beautiful way to organize your thoughts, ideas, and tasks with colorful folders and powerful features.
            </p>
            <Button onClick={() => setIsFirstVisit(false)}>Get Started</Button>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="bg-background sticky top-0 z-20 border-b border-border p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden mr-2">
          <Menu size={20} />
        </Button>
        
        <div>
          <h1 className="text-xl font-bold">
            {activeNote
              ? "Edit Note"
              : activeFolder
              ? getFolderName(activeFolder)
              : searchQuery
              ? `Search: ${searchQuery}`
              : "All Notes"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {activeNote 
              ? "Edit your note" 
              : `${notes.length} note${notes.length === 1 ? "" : "s"}`}
          </p>
        </div>
      </header>
      
      {/* Main content area */}
      <main className="flex-1 overflow-auto p-4">
        {notes.length === 0 && !activeNote && (
          <EmptyState
            title="No Notes Yet"
            description="Create your first note to get started. You can organize notes in folders and use tags for easy filtering."
            action={() => {}} // This will be handled by the FloatingActionButton
            actionLabel="Create Note"
          />
        )}
        
        {notes.length > 0 && !activeNote && <NotesGrid />}
        
        {activeNote && (
          <NoteEditor onBack={() => setActiveNote(null)} />
        )}
      </main>
      
      {/* Floating action button */}
      <FloatingActionButton />
    </div>
  );
};

export default HomeScreen;
