
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useApp } from "@/context/AppContext";

const FloatingActionButton: React.FC = () => {
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  
  const { folders, createNote } = useApp();
  
  const handleCreateNote = () => {
    if (newNoteTitle.trim()) {
      createNote({
        title: newNoteTitle,
        content: "",
        folderId: selectedFolder || folders[0]?.id || "",
        isPinned: false,
        tags: [],
      });
      
      setNewNoteTitle("");
      setSelectedFolder("");
      setIsCreateNoteOpen(false);
    }
  };
  
  return (
    <>
      <Button
        className="fixed right-6 bottom-6 rounded-full shadow-lg w-14 h-14 p-0"
        onClick={() => setIsCreateNoteOpen(true)}
      >
        <Plus size={24} />
      </Button>
      
      <Dialog open={isCreateNoteOpen} onOpenChange={setIsCreateNoteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Note title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="flex-1"
              autoFocus
            />
            
            <Select value={selectedFolder} onValueChange={setSelectedFolder}>
              <SelectTrigger>
                <SelectValue placeholder="Select a folder" />
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
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateNoteOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateNote}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingActionButton;
