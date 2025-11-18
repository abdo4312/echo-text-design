import { Copy, Download, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface TranscriptionResultProps {
  text: string;
  onTextChange: (text: string) => void;
  onBack: () => void;
}

export const TranscriptionResult = ({
  text,
  onTextChange,
  onBack,
}: TranscriptionResultProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("تم نسخ النص بنجاح");
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcription-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("تم تحميل الملف بنجاح");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Transcription",
          text: text,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2 hover:gap-3 transition-all"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للتسجيل
      </Button>

      <Card className="p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">النص المحول</h2>
        <Textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="min-h-[300px] text-base leading-relaxed resize-none"
          placeholder="سيظهر النص المحول هنا..."
        />
      </Card>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={handleCopy} variant="outline" className="gap-2">
          <Copy className="h-4 w-4" />
          نسخ النص
        </Button>
        <Button onClick={handleDownload} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          حفظ كملف
        </Button>
        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          مشاركة
        </Button>
      </div>
    </div>
  );
};
