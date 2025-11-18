import { Home, History, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "الرئيسية" },
    { to: "/history", icon: History, label: "السجل" },
    { to: "/settings", icon: Settings, label: "الإعدادات" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg md:relative md:border-0 md:shadow-none md:bg-transparent">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto md:flex-col md:h-auto md:gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 py-2 rounded-lg transition-all",
              "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            activeClassName="text-primary bg-primary/10 hover:text-primary hover:bg-primary/10"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs md:text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
