
import React, { useState } from "react";
import { Folder, Plus, Search, Settings, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import FolderList from "./FolderList";
import TagsList from "./TagsList";

const Sidebar: React.FC = () => {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("mint");
  const [folderIcon, setFolderIcon] = useState("📁");
  
  const { 
    searchQuery, 
    setSearchQuery, 
    isDarkMode, 
    toggleDarkMode,
    createFolder
  } = useApp();

  const folderColors = [
    { name: "mint", color: "bg-folder-mint" },
    { name: "lavender", color: "bg-folder-lavender" },
    { name: "peach", color: "bg-folder-peach" },
    { name: "blue", color: "bg-folder-blue" },
    { name: "yellow", color: "bg-folder-yellow" },
    { name: "pink", color: "bg-folder-pink" },
    { name: "orange", color: "bg-folder-orange" },
    { name: "gray", color: "bg-folder-gray" },
  ];

  const icons = ["📁", "✨", "💼", "💡", "✈️", "🍳", "🎵", "📚", "🎮", "🏠", "💰", "🎓"];

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder({
        name: newFolderName,
        color: selectedColor,
        icon: folderIcon,
      });
      setNewFolderName("");
      setSelectedColor("mint");
      setFolderIcon("📁");
      setIsCreateFolderOpen(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Vibrant Notes</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="text-primary"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-muted-foreground">Folders</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCreateFolderOpen(true)}
          className="h-6 w-6"
        >
          <Plus size={14} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4">
        <FolderList />
      </div>
      
      <div className="mb-4">
        <h2 className="text-sm font-medium text-muted-foreground mb-2">Tags</h2>
        <TagsList />
      </div>
      
      <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Give your folder a name and choose a color.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-folder-mint">
                {folderIcon}
              </div>
              <Input
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="flex-1"
                autoFocus
              />
            </div>
            
            <div className="grid grid-cols-8 gap-2">
              {folderColors.map((folderColor) => (
                <Button
                  key={folderColor.name}
                  type="button"
                  variant="ghost"
                  className={`w-8 h-8 rounded-full p-0 ${folderColor.color} ${
                    selectedColor === folderColor.name
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(folderColor.name)}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {icons.map((icon) => (
                <Button
                  key={icon}
                  type="button"
                  variant="ghost"
                  className={`w-10 h-10 rounded-lg ${
                    folderIcon === icon
                      ? "bg-secondary"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => setFolderIcon(icon)}
                >
                  {icon}
                </Button>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateFolderOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateFolder}>
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
