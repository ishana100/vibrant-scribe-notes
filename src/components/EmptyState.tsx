
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: () => void;
  actionLabel?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  actionLabel,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6 animate-bounce">
        <FileText className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-center mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {description}
      </p>
      {action && actionLabel && (
        <Button onClick={action}>
          <Plus className="mr-2 h-4 w-4" /> {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
