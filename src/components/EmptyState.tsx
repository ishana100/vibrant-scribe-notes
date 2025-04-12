
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: () => void;
  actionLabel?: string;
  icon?: React.ReactNode | string;
  mini?: boolean;
  quote?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  actionLabel,
  icon = <FileText className="w-12 h-12 text-primary" />,
  mini = false,
  quote,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${mini ? 'py-6' : 'h-full'} p-6 animate-fade-in`}>
      <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6 animate-bounce">
        {typeof icon === 'string' ? (
          <span className="text-4xl">{icon}</span>
        ) : (
          icon
        )}
      </div>
      <h3 className="text-2xl font-bold text-center mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-3">
        {description}
      </p>
      
      {quote && (
        <div className="italic text-sm text-center text-muted-foreground mb-6 max-w-md">
          "{quote}"
        </div>
      )}
      
      {action && actionLabel && (
        <Button onClick={action} className="animate-pulse">
          <Plus className="mr-2 h-4 w-4" /> {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
