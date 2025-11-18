import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecordButtonProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

export const RecordButton = ({ isRecording, onToggleRecording }: RecordButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Button
        onClick={onToggleRecording}
        size="lg"
        className={cn(
          "h-32 w-32 rounded-full transition-all duration-300",
          isRecording
            ? "bg-recording hover:bg-recording/90 animate-pulse-soft shadow-lg shadow-recording/50"
            : "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105"
        )}
      >
        {isRecording ? (
          <Square className="h-12 w-12" fill="currentColor" />
        ) : (
          <Mic className="h-12 w-12" />
        )}
      </Button>
      <p className="text-sm text-muted-foreground font-medium">
        {isRecording ? "اضغط لإيقاف التسجيل" : "اضغط لبدء التسجيل"}
      </p>
    </div>
  );
};
