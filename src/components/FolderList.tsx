
import React from "react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { MoreVertical, Edit, Trash, Copy, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "./EmptyState";

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
            "flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-all duration-200",
            activeFolder === folder.id
              ? "bg-secondary text-secondary-foreground"
              : "hover:bg-secondary/50"
          )}
          onClick={() => handleFolderClick(folder.id)}
        >
          <div className="flex items-center gap-2">
            <div 
              className={`w-6 h-6 rounded-md flex items-center justify-center bg-folder-${folder.color} transition-transform duration-200 hover:scale-110 hover:rotate-3 group-hover:animate-bounce`}
            >
              <span className="text-xs">{folder.icon}</span>
            </div>
            <span className="text-sm font-medium truncate">{folder.name}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100">
                <MoreVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="flex items-center">
                <Edit size={14} className="mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <Copy size={14} className="mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center">
                <FileDown size={14} className="mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center text-destructive focus:text-destructive" 
                onClick={() => deleteFolder(folder.id)}
              >
                <Trash size={14} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
      {folders.length === 0 && (
        <EmptyState 
          title="No folders yet" 
          description="Create your first folder to organize your notes"
          icon="📁"
          mini
        />
      )}
    </div>
  );
};

export default FolderList;
