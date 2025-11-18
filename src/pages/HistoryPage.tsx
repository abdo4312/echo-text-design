import { useState } from "react";
import { HistoryList } from "@/components/HistoryList";
import { TranscriptionResult } from "@/components/TranscriptionResult";

interface HistoryItem {
  id: string;
  text: string;
  duration: string;
  date: string;
}

const HistoryPage = () => {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [items] = useState<HistoryItem[]>([
    {
      id: "1",
      text: "هذا نص تجريبي للتحويل الأول من الصوت إلى نص. يحتوي على معلومات مهمة...",
      duration: "2:30",
      date: "2024-01-15",
    },
    {
      id: "2",
      text: "تحويل آخر من ملف صوتي تم رفعه مسبقاً...",
      duration: "1:45",
      date: "2024-01-14",
    },
    {
      id: "3",
      text: "مثال على تسجيل صوتي قصير تم تحويله بنجاح...",
      duration: "0:58",
      date: "2024-01-13",
    },
  ]);

  const handleItemClick = (item: HistoryItem) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  const handleTextChange = (text: string) => {
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, text });
    }
  };

  if (selectedItem) {
    return (
      <TranscriptionResult
        text={selectedItem.text}
        onTextChange={handleTextChange}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">السجل</h1>
        <p className="text-muted-foreground">آخر التحويلات التي قمت بها</p>
      </div>

      <HistoryList items={items} onItemClick={handleItemClick} />
    </div>
  );
};

export default HistoryPage;
