
import React from "react";
import { useApp } from "@/context/AppContext";
import { Note } from "@/types";
import { formatDate, truncateText, getFolderById } from "@/lib/helpers";
import { Pin, PinOff, MoreVertical, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

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
    <HoverCard openDelay={500}>
      <HoverCardTrigger asChild>
        <div 
          className={`relative bg-card rounded-lg p-4 note-shadow cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md border ${
            activeNote === note.id ? "ring-2 ring-primary" : "border-transparent hover:border-border"
          }`}
          onClick={() => setActiveNote(note.id)}
          style={{
            background: folder ? `linear-gradient(to bottom right, var(--card), rgb(var(--folder-${folder.color}-rgb)/0.1))` : undefined
          }}
        >
          <div className="absolute top-3 right-3 flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                // Like functionality would go here
              }}
            >
              <Heart size={14} className="text-muted-foreground" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handlePinClick}
            >
              {note.isPinned ? (
                <Pin size={16} className="fill-primary text-primary" />
              ) : (
                <PinOff size={16} className="text-muted-foreground opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity" />
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0">
        <div className="p-4">
          <h4 className="text-sm font-semibold">{note.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">
            {note.content.substring(0, 200)}
            {note.content.length > 200 ? '...' : ''}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default NoteCard;
