import { useState } from "react";
import { RecordButton } from "@/components/RecordButton";
import { FileUpload } from "@/components/FileUpload";
import { TranscriptionResult } from "@/components/TranscriptionResult";
import { toast } from "sonner";

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast.success("بدأ التسجيل...");
      // Simulate recording for demo
      setTimeout(() => {
        setIsRecording(false);
        setTranscription("هذا نص تجريبي للتحويل من الصوت إلى نص. في التطبيق الفعلي، سيتم استخدام Whisper API لتحويل الصوت المسجل إلى نص بدقة عالية.");
        setShowResult(true);
        toast.success("تم التحويل بنجاح!");
      }, 3000);
    } else {
      setIsRecording(false);
      toast.info("تم إيقاف التسجيل");
    }
  };

  const handleFileSelect = (file: File) => {
    toast.success(`تم اختيار الملف: ${file.name}`);
    // Simulate processing
    setTimeout(() => {
      setTranscription(`تم تحميل الملف: ${file.name}\n\nهذا نص تجريبي. في التطبيق الفعلي، سيتم معالجة الملف الصوتي وتحويله إلى نص.`);
      setShowResult(true);
      toast.success("تم التحويل بنجاح!");
    }, 2000);
  };

  const handleBack = () => {
    setShowResult(false);
    setTranscription("");
  };

  if (showResult) {
    return (
      <TranscriptionResult
        text={transcription}
        onTextChange={setTranscription}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          تحويل الصوت إلى نص
        </h1>
        <p className="text-muted-foreground text-lg">
          سجّل صوتك أو حمّل ملف صوتي للحصول على نص دقيق
        </p>
      </div>

      <RecordButton
        isRecording={isRecording}
        onToggleRecording={handleToggleRecording}
      />

      <div className="flex items-center gap-4">
        <div className="h-px w-20 bg-border"></div>
        <span className="text-sm text-muted-foreground">أو</span>
        <div className="h-px w-20 bg-border"></div>
      </div>

      <FileUpload onFileSelect={handleFileSelect} />

      <div className="text-center text-xs text-muted-foreground max-w-md">
        <p>الصيغ المدعومة: MP3, WAV, M4A</p>
      </div>
    </div>
  );
};

export default Home;
