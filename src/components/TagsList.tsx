
import React from "react";
import { useApp } from "@/context/AppContext";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TagsList: React.FC = () => {
  const { tags, deleteTag } = useApp();
  
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge 
          key={tag.id} 
          variant="secondary" 
          className="flex items-center gap-1 py-0 h-6"
        >
          #{tag.name}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
            onClick={() => deleteTag(tag.id)}
          >
            <X size={10} />
          </Button>
        </Badge>
      ))}
      {tags.length === 0 && (
        <p className="text-sm text-muted-foreground">No tags yet</p>
      )}
    </div>
  );
};

export default TagsList;
