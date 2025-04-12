
import React from "react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const FolderList: React.FC = () => {
  const { folders, activeFolder, setActiveFolder, deleteFolder } = useApp();
  
  const handleFolderClick = (folderId: string) => {
    setActiveFolder(activeFolder === folderId ? null : folderId);
  };

  return (
    <div className="space-y-1">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className={cn(
            "flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors",
            activeFolder === folder.id
              ? "bg-secondary text-secondary-foreground"
              : "hover:bg-secondary/50"
          )}
          onClick={() => handleFolderClick(folder.id)}
        >
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-md flex items-center justify-center bg-folder-${folder.color}`}>
              <span className="text-xs">{folder.icon}</span>
            </div>
            <span className="text-sm font-medium truncate">{folder.name}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => deleteFolder(folder.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
      {folders.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-2">
          No folders yet
        </p>
      )}
    </div>
  );
};

export default FolderList;
