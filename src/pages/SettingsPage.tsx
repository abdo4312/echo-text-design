import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Globe, Mic, Moon } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">الإعدادات</h1>
        <p className="text-muted-foreground">خصص تجربتك في التطبيق</p>
      </div>

      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <Label htmlFor="language" className="text-base font-semibold">
                اللغة
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                اختر لغة واجهة التطبيق
              </p>
            </div>
            <Select defaultValue="ar">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <Mic className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <Label htmlFor="model" className="text-base font-semibold">
                موديل Whisper
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                اختر جودة التحويل
              </p>
            </div>
            <Select defaultValue="base">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tiny">Tiny (سريع)</SelectItem>
                <SelectItem value="base">Base (متوازن)</SelectItem>
                <SelectItem value="small">Small (دقيق)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-secondary">
              <Moon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <Label htmlFor="dark-mode" className="text-base font-semibold">
                الوضع الليلي
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                تفعيل الثيم الداكن
              </p>
            </div>
            <Switch id="dark-mode" />
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-2">حول التطبيق</h3>
        <p className="text-sm text-muted-foreground">
          تطبيق تحويل الصوت إلى نص باستخدام تقنية Whisper من OpenAI.
          يدعم التسجيل المباشر ورفع الملفات الصوتية.
        </p>
        <p className="text-xs text-muted-foreground mt-4">الإصدار 1.0.0</p>
      </Card>
    </div>
  );
};

export default SettingsPage;
