
import React, { useState, useEffect } from "react";
import { Folder, Plus, Search, Settings, Moon, Sun, X, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import FolderList from "./FolderList";
import TagsList from "./TagsList";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar: React.FC = () => {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("mint");
  const [folderIcon, setFolderIcon] = useState("📁");
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  
  const { 
    searchQuery, 
    setSearchQuery, 
    isDarkMode, 
    toggleDarkMode,
    createFolder,
    notes,
    folders,
    tags
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

  // Add keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && 
          !(e.target instanceof HTMLInputElement) && 
          !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  // Filter results based on search query
  const filteredFolders = searchQuery 
    ? folders.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
    
  const filteredNotes = searchQuery
    ? notes.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        n.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
    
  const filteredTags = searchQuery
    ? tags.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Vibrant Notes</h1>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowKeyboardShortcuts(true)}
                >
                  <Keyboard size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Keyboard Shortcuts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="text-primary"
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          id="search-input"
          placeholder="Search notes... (Press /)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={() => setSearchQuery("")}
          >
            <X size={14} />
          </Button>
        )}
      </div>
      
      {/* Search results */}
      {searchQuery && (filteredFolders.length > 0 || filteredNotes.length > 0 || filteredTags.length > 0) && (
        <div className="mb-4 bg-secondary/50 rounded-lg p-3 animate-fade-in">
          <h3 className="text-sm font-medium mb-2">Search Results</h3>
          
          {filteredFolders.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs text-muted-foreground mb-1">📁 Folders</h4>
              <ul className="space-y-1">
                {filteredFolders.map(folder => (
                  <li key={folder.id} className="text-sm px-2 py-1 hover:bg-secondary rounded-md cursor-pointer">
                    {folder.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {filteredNotes.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs text-muted-foreground mb-1">📝 Notes</h4>
              <ul className="space-y-1">
                {filteredNotes.slice(0, 5).map(note => (
                  <li key={note.id} className="text-sm px-2 py-1 hover:bg-secondary rounded-md cursor-pointer">
                    {note.title}
                  </li>
                ))}
                {filteredNotes.length > 5 && (
                  <li className="text-xs text-muted-foreground">
                    +{filteredNotes.length - 5} more notes
                  </li>
                )}
              </ul>
            </div>
          )}
          
          {filteredTags.length > 0 && (
            <div>
              <h4 className="text-xs text-muted-foreground mb-1">🔖 Tags</h4>
              <div className="flex flex-wrap gap-1">
                {filteredTags.map(tag => (
                  <span key={tag.id} className="text-xs bg-secondary px-2 py-1 rounded-full">
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
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
      
      {/* Folder creation dialog */}
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
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-folder-${selectedColor}`}>
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
      
      {/* Keyboard shortcuts dialog */}
      <Dialog open={showKeyboardShortcuts} onOpenChange={setShowKeyboardShortcuts}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Press <code className="bg-secondary px-2 py-0.5 rounded">/</code></div>
              <div>Focus search</div>
              
              <div>Press <code className="bg-secondary px-2 py-0.5 rounded">Esc</code></div>
              <div>Close dialogs</div>
              
              <div>Press <code className="bg-secondary px-2 py-0.5 rounded">Ctrl+N</code></div>
              <div>New note</div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowKeyboardShortcuts(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
