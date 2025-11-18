import { useState, useRef, useEffect } from "react";
import { RecordButton } from "@/components/RecordButton";
import { FileUpload } from "@/components/FileUpload";
import { TranscriptionResult } from "@/components/TranscriptionResult";
import { ProgressBar } from "@/components/ProgressBar";
import { toast } from "sonner";
import { initWhisper, transcribeAudio, TranscriptionProgress } from "@/lib/whisper";

const Home = () => {
  useEffect(() => {
    initWhisper();
  }, []);

  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState<TranscriptionProgress | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleToggleRecording = async () => {
    if (!isRecording) {
      try {
        // Start recording
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
          },
        });

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm;codecs=opus",
        });

        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = async () => {
          stream.getTracks().forEach((track) => track.stop());
          
          const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
          const audioFile = new File([audioBlob], "recording.webm", {
            type: "audio/webm",
          });

          // Process the recording
          await processAudioFile(audioFile);
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
        toast.success("بدأ التسجيل...");
      } catch (error) {
        console.error("Error starting recording:", error);
        toast.error("فشل الوصول إلى الميكروفون");
      }
    } else {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        toast.info("جاري معالجة التسجيل...");
      }
    }
  };

  const processAudioFile = async (file: File) => {
    setProgress({ status: "loading", progress: 0, message: "جاري التحضير..." });

    try {
      const text = await transcribeAudio(file, (progressUpdate) => {
        setProgress(progressUpdate);
      });

      setTranscription(text || "لم يتم التعرف على أي كلام في التسجيل.");
      setShowResult(true);
      setProgress(null);
      toast.success("تم التحويل بنجاح!");
    } catch (error) {
      console.error("Transcription error:", error);
      setProgress(null);
      toast.error("حدث خطأ أثناء التحويل");
    }
  };

  const handleFileSelect = async (file: File) => {
    toast.success(`تم اختيار الملف: ${file.name}`);
    await processAudioFile(file);
  };

  const handleBack = () => {
    setShowResult(false);
    setTranscription("");
  };

  if (progress) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <ProgressBar
          progress={progress.progress}
          status={progress.status}
          message={progress.message}
        />
      </div>
    );
  }

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

      <div className="text-center text-sm text-muted-foreground max-w-md space-y-2">
        <p className="font-medium">✨ الميزات:</p>
        <ul className="text-xs space-y-1">
          <li>🎙️ تسجيل مباشر من الميكروفون</li>
          <li>📁 رفع ملفات MP3, WAV, M4A</li>
          <li>🚀 معالجة فورية بدون سيرفر</li>
          <li>🔒 خصوصية تامة - كل شيء يعمل في متصفحك</li>
          <li>💯 مجاني 100%</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
