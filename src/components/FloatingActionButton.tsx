
import React, { useState } from "react";
import { Plus, Calendar, Target, Lightbulb } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FloatingActionButton: React.FC = () => {
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [noteType, setNoteType] = useState("regular");
  
  const { folders, createNote } = useApp();
  
  const handleCreateNote = () => {
    if (newNoteTitle.trim()) {
      let title = newNoteTitle;
      let content = "";
      
      // Add template content based on note type
      if (noteType === "daily") {
        const today = new Date().toLocaleDateString();
        title = title || `Daily Note - ${today}`;
        content = `# Daily Note - ${today}\n\n## Tasks\n- [ ] \n\n## Notes\n\n## Reflections\n`;
      } else if (noteType === "idea") {
        title = title || "Quick Idea";
        content = `# Quick Idea\n\n## Description\n\n## Potential\n\n## Next Steps\n`;
      }
      
      createNote({
        title,
        content,
        folderId: selectedFolder || folders[0]?.id || "",
        isPinned: false,
        tags: [],
      });
      
      setNewNoteTitle("");
      setSelectedFolder("");
      setNoteType("regular");
      setIsCreateNoteOpen(false);
    }
  };
  
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="fixed right-6 bottom-6 rounded-full shadow-lg w-14 h-14 p-0 animate-bounce hover:animate-none hover:scale-110 transition-transform"
              onClick={() => setIsCreateNoteOpen(true)}
            >
              <Plus size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Let's write! ✨</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <Dialog open={isCreateNoteOpen} onOpenChange={setIsCreateNoteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={noteType === "regular" ? "default" : "outline"}
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => setNoteType("regular")}
              >
                <Lightbulb size={18} />
                <span className="text-xs">Regular Note</span>
              </Button>
              <Button
                variant={noteType === "daily" ? "default" : "outline"}
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => setNoteType("daily")}
              >
                <Calendar size={18} />
                <span className="text-xs">Daily Note</span>
              </Button>
              <Button
                variant={noteType === "idea" ? "default" : "outline"}
                className="flex flex-col items-center gap-1 h-auto py-3"
                onClick={() => setNoteType("idea")}
              >
                <Lightbulb size={18} />
                <span className="text-xs">Quick Idea</span>
              </Button>
            </div>
            
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
