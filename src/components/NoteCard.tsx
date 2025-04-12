
import React from "react";
import { useApp } from "@/context/AppContext";
import { Note } from "@/types";
import { formatDate, truncateText, getFolderById } from "@/lib/helpers";
import { Pin, PinOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const { setActiveNote, activeNote, folders, togglePinNote } = useApp();
  const folder = getFolderById(folders, note.folderId);
  
  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePinNote(note.id);
  };
  
  return (
    <div 
      className={`relative bg-card rounded-lg p-4 note-shadow cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md ${
        activeNote === note.id ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => setActiveNote(note.id)}
    >
      <div className="absolute top-3 right-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handlePinClick}
        >
          {note.isPinned ? (
            <Pin size={16} className="fill-primary text-primary" />
          ) : (
            <PinOff size={16} className="text-muted-foreground" />
          )}
        </Button>
      </div>
      
      <h3 className="font-medium text-base mb-1 pr-6">{note.title}</h3>
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {truncateText(note.content, 100)}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {formatDate(note.updatedAt)}
        </div>
        
        {folder && (
          <div className={`text-xs px-2 py-1 rounded-md bg-folder-${folder.color}`}>
            {folder.name}
          </div>
        )}
      </div>
      
      {note.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {note.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground">
              #{tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default NoteCard;
