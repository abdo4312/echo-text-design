import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ["audio/mpeg", "audio/wav", "audio/mp4", "audio/m4a"];
      if (validTypes.includes(file.type)) {
        onFileSelect(file);
      } else {
        toast.error("يرجى اختيار ملف صوتي صالح (MP3, WAV, M4A)");
      }
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        id="audio-upload"
      />
      <Button
        variant="outline"
        size="lg"
        className="gap-2 shadow-md hover:shadow-lg transition-all"
        asChild
      >
        <label htmlFor="audio-upload" className="cursor-pointer">
          <Upload className="h-5 w-5" />
          تحميل ملف صوتي
        </label>
      </Button>
    </div>
  );
};
