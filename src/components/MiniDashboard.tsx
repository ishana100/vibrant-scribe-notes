
import React from "react";
import { useApp } from "@/context/AppContext";
import { Flame, Star, Clock } from "lucide-react";
import { formatRelativeTime } from "@/lib/helpers";

export const MiniDashboard: React.FC = () => {
  const { notes } = useApp();
  
  // Get stats
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const newNotesThisWeek = notes.filter(
    note => new Date(note.createdAt) > oneWeekAgo
  ).length;
  
  const favoriteNotes = notes.filter(note => note.isPinned).length;
  
  const lastUpdatedNote = notes.length > 0 
    ? notes.reduce((latest, note) => 
        new Date(note.updatedAt) > new Date(latest.updatedAt) ? note : latest
      , notes[0])
    : null;

  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground p-2 mb-4 bg-secondary/30 rounded-md">
      <div className="flex items-center">
        <Flame className="w-4 h-4 mr-1 text-orange-500" />
        <span>{newNotesThisWeek} new {newNotesThisWeek === 1 ? 'note' : 'notes'} this week</span>
      </div>
      
      <div className="flex items-center">
        <Star className="w-4 h-4 mr-1 text-yellow-500" />
        <span>{favoriteNotes} {favoriteNotes === 1 ? 'favorite' : 'favorites'}</span>
      </div>
      
      {lastUpdatedNote && (
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-blue-500" />
          <span>Last updated {formatRelativeTime(lastUpdatedNote.updatedAt)}</span>
        </div>
      )}
    </div>
  );
};

export default MiniDashboard;
