
import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Pin, PinOff, ArrowLeft, Tag as TagIcon, Save, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/helpers";

interface NoteEditorProps {
  onBack: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ onBack }) => {
  const { 
    notes, 
    folders, 
    activeNote, 
    updateNote, 
    deleteNote,
    togglePinNote 
  } = useApp();
  
  const note = notes.find((n) => n.id === activeNote);
  
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [folderId, setFolderId] = useState(note?.folderId || "");
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Update state when active note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setFolderId(note.folderId);
      setTags(note.tags);
    }
  }, [note]);

  // Auto-save note when content changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (note && (title !== note.title || content !== note.content || folderId !== note.folderId)) {
        updateNote(note.id, {
          title,
          content,
          folderId,
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, folderId, note, updateNote]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      if (note) {
        updateNote(note.id, { tags: updatedTags });
      }
      setNewTag("");
      setIsAddingTag(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    if (note) {
      updateNote(note.id, { tags: updatedTags });
    }
  };

  const handleFolderChange = (value: string) => {
    setFolderId(value);
    if (note) {
      updateNote(note.id, { folderId: value });
    }
  };

  const handleDeleteNote = () => {
    if (note) {
      deleteNote(note.id);
      onBack();
      setIsConfirmingDelete(false);
    }
  };

  const handleTogglePin = () => {
    if (note) {
      togglePinNote(note.id);
    }
  };

  if (!note) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 z-10 bg-background border-b border-border p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="md:hidden"
          >
            <ArrowLeft size={18} />
          </Button>
          <Select value={folderId} onValueChange={handleFolderChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>
            <SelectContent>
              {folders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id}>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-folder-${folder.color}`} />
                    {folder.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-xs text-muted-foreground">
            {formatDate(note.updatedAt)}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleTogglePin}
            className="text-primary"
            title={note.isPinned ? "Unpin note" : "Pin note"}
          >
            {note.isPinned ? <Pin size={16} /> : <PinOff size={16} />}
          </Button>
          
          <Button 
            variant="destructive" 
            size="icon" 
            onClick={() => setIsConfirmingDelete(true)}
            title="Delete note"
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="text-xl font-medium border-none p-0 focus-visible:ring-0 mb-4"
        />
        
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="min-h-[300px] resize-none border-none focus-visible:ring-0 text-base"
        />
      </div>
      
      <div className="sticky bottom-0 bg-background border-t border-border p-3">
        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="flex items-center gap-1"
            >
              #{tag}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 rounded-full p-0"
                onClick={() => handleRemoveTag(tag)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </Button>
            </Badge>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            className="h-7"
            onClick={() => setIsAddingTag(true)}
          >
            <TagIcon className="mr-1" size={14} /> Add Tag
          </Button>
        </div>
      </div>
      
      <Dialog open={isAddingTag} onOpenChange={setIsAddingTag}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Tag</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter tag name"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTag();
                  }
                }}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddingTag(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAddTag}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isConfirmingDelete} onOpenChange={setIsConfirmingDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
          </DialogHeader>
          
          <p>Are you sure you want to delete this note? This action cannot be undone.</p>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmingDelete(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteNote}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoteEditor;
