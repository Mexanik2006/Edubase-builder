import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Home,
  Settings,
  Users,
  Building,
  BarChart3,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  onLogout?: () => void;
}

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
    active: true,
  },
  {
    title: "Loyihalar",
    icon: BookOpen,
    href: "/projects",
  },
  {
    title: "Filiallar",
    icon: Building,
    href: "/branches",
  },
  {
    title: "Foydalanuvchilar",
    icon: Users,
    href: "/users",
  },
  {
    title: "Hisobotlar",
    icon: BarChart3,
    href: "/reports",
  },
  {
    title: "Sozlamalar",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Yordam",
    icon: HelpCircle,
    href: "/help",
  },
];

export function Sidebar({ className, onLogout }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col bg-white border-r border-gray-200",
        className,
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-edubase-blue">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">EduBase</h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.title}
              variant={item.active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-10",
                item.active &&
                  "bg-edubase-blue-light text-edubase-blue hover:bg-edubase-blue-light",
              )}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.title}
            </Button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Chiqish
        </Button>
      </div>
    </div>
  );
}
