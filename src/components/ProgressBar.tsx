import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ProgressBarProps {
  progress: number;
  status: "loading" | "processing" | "complete" | "error";
  message: string;
}

export const ProgressBar = ({ progress, status, message }: ProgressBarProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "text-primary";
      case "processing":
        return "text-accent";
      case "complete":
        return "text-green-600";
      case "error":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 space-y-4 shadow-lg animate-fade-in">
      <div className="flex items-center gap-3">
        {status !== "complete" && status !== "error" && (
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        )}
        <p className={`text-sm font-medium ${getStatusColor()}`}>{message}</p>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground text-left">
        {progress}% مكتمل
      </p>
    </Card>
  );
};
