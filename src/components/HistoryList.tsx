import { FileText, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryItem {
  id: string;
  text: string;
  duration: string;
  date: string;
}

interface HistoryListProps {
  items: HistoryItem[];
  onItemClick: (item: HistoryItem) => void;
}

export const HistoryList = ({ items, onItemClick }: HistoryListProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
        <p>لا توجد تحويلات سابقة</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
            onClick={() => onItemClick(item)}
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2 mb-2">
                  {item.text}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.duration}
                  </span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
