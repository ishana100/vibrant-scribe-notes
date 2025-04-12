import React from "react";
import { useApp } from "@/context/AppContext";
import NoteCard from "./NoteCard";
import { searchNotes, getNotesInFolder, getPinnedNotes } from "@/lib/helpers";

const NotesGrid: React.FC = () => {
  const { notes, activeFolder, searchQuery } = useApp();
  
  let filteredNotes = notes;
  
  // Filter by folder if one is selected
  if (activeFolder) {
    filteredNotes = getNotesInFolder(notes, activeFolder);
  }
  
  // Filter by search query if provided
  if (searchQuery) {
    filteredNotes = searchNotes(filteredNotes, searchQuery);
  }
  
  // Separate pinned notes
  const pinnedNotes = getPinnedNotes(filteredNotes);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);
  
  return (
    <div className="space-y-6">
      {/* Pinned notes section */}
      {pinnedNotes.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-2">
            Pinned Notes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
      
      {/* Other notes section */}
      {unpinnedNotes.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-2">
            {pinnedNotes.length > 0 ? "Other Notes" : "Notes"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unpinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
      
      {/* No notes message */}
      {filteredNotes.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {searchQuery
              ? "No notes match your search"
              : activeFolder
              ? "No notes in this folder yet"
              : "No notes yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotesGrid;
