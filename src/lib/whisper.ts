import { pipeline, AutomaticSpeechRecognitionPipeline } from "@huggingface/transformers";

let transcriber: AutomaticSpeechRecognitionPipeline | null = null;

export interface TranscriptionProgress {
  status: "loading" | "processing" | "complete" | "error";
  progress: number;
  message: string;
}

export const initWhisper = async (
  onProgress?: (progress: TranscriptionProgress) => void
): Promise<AutomaticSpeechRecognitionPipeline> => {
  if (transcriber) return transcriber;

  try {
    onProgress?.({
      status: "loading",
      progress: 0,
      message: "جاري تحميل موديل Whisper...",
    });

    // @ts-ignore - Complex type inference
    const model: AutomaticSpeechRecognitionPipeline = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-base.quant"
    );

    transcriber = model;

    onProgress?.({
      status: "loading",
      progress: 100,
      message: "تم تحميل الموديل بنجاح!",
    });

    return model;
  } catch (error) {
    console.error("Error loading Whisper model:", error);
    onProgress?.({
      status: "error",
      progress: 0,
      message: "فشل تحميل الموديل. جرب مرة أخرى.",
    });
    throw error;
  }
};

export const transcribeAudio = async (
  audioFile: File,
  onProgress?: (progress: TranscriptionProgress) => void
): Promise<string> => {
  try {
    onProgress?.({
      status: "loading",
      progress: 10,
      message: "جاري تحضير الموديل...",
    });

    const model = await initWhisper(onProgress);

    onProgress?.({
      status: "processing",
      progress: 50,
      message: "جاري معالجة الصوت...",
    });

    // Convert audio file to array buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    
    // Create audio context to decode the audio
    const audioContext = new AudioContext({ sampleRate: 16000 });
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Get the audio data as Float32Array
    const audioData = audioBuffer.getChannelData(0);

    onProgress?.({
      status: "processing",
      progress: 70,
      message: "جاري تحويل الصوت إلى نص...",
    });

    const result = await model(audioData, {
      language: "arabic",
      task: "transcribe",
      return_timestamps: false,
      chunk_length_s: 30,
      stride_length_s: 5,
    }) as { text: string };

    onProgress?.({
      status: "complete",
      progress: 100,
      message: "تم التحويل بنجاح!",
    });

    return result.text || "";
  } catch (error) {
    console.error("Error transcribing audio:", error);
    onProgress?.({
      status: "error",
      progress: 0,
      message: "حدث خطأ أثناء التحويل. يرجى المحاولة مرة أخرى.",
    });
    throw error;
  }
};

export const recordAudio = async (): Promise<Blob> => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      sampleRate: 16000,
      channelCount: 1,
      echoCancellation: true,
      noiseSuppression: true,
    },
  });

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: "audio/webm;codecs=opus",
  });

  const chunks: Blob[] = [];

  return new Promise((resolve, reject) => {
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      stream.getTracks().forEach((track) => track.stop());
      resolve(blob);
    };

    mediaRecorder.onerror = (e) => {
      stream.getTracks().forEach((track) => track.stop());
      reject(e);
    };

    mediaRecorder.start();

    // Return a function to stop recording manually
    (mediaRecorder as any)._stop = () => mediaRecorder.stop();
  });
};
