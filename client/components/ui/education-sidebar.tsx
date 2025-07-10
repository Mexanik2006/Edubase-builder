import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Home,
  BarChart3,
  Users,
  UsersRound,
  BookMarked,
  Calendar,
  GraduationCap,
  Settings,
  HelpCircle,
  Bell,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface EducationSidebarProps {
  className?: string;
  onLogout?: () => void;
}

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/admin-dashboard/education",
    key: "dashboard",
  },
  {
    title: "Statistika",
    icon: BarChart3,
    href: "/admin-dashboard/statistics",
    key: "statistics",
  },
  {
    title: "Xodimlar",
    icon: Users,
    href: "/admin-dashboard/staff",
    key: "staff",
  },
  {
    title: "Guruhlar",
    icon: UsersRound,
    href: "/admin-dashboard/groups",
    key: "groups",
  },
  {
    title: "Fanlar",
    icon: BookMarked,
    href: "/admin-dashboard/subjects",
    key: "subjects",
  },
  {
    title: "Jadval",
    icon: Calendar,
    href: "/admin-dashboard/schedule",
    key: "schedule",
  },
  {
    title: "Darslar",
    icon: GraduationCap,
    href: "/admin-dashboard/lessons",
    key: "lessons",
  },
  {
    title: "Sozlamalar",
    icon: Settings,
    href: "/admin-dashboard/settings",
    key: "settings",
  },
  {
    title: "Yordam",
    icon: HelpCircle,
    href: "/admin-dashboard/help",
    key: "help",
  },
];

export function EducationSidebar({
  className,
  onLogout,
}: EducationSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const isActive = (href: string) => {
    if (href === "/admin-dashboard") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

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
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Ta'lim</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Button
              key={item.key}
              variant={active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-10",
                active && "bg-blue-100 text-blue-700 hover:bg-blue-100",
              )}
              onClick={() => handleNavigation(item.href)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.title}
              {item.key === "help" && (
                <Badge
                  variant="secondary"
                  className="ml-auto bg-red-100 text-red-700 text-xs"
                >
                  3
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Notifications */}
      <div className="border-t border-gray-200 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start h-10 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
          onClick={() => navigate("/admin-dashboard/notifications")}
        >
          <Bell className="mr-3 h-4 w-4" />
          Bildirishnomalar
          <Badge
            variant="secondary"
            className="ml-auto bg-red-100 text-red-700 text-xs"
          >
            5
          </Badge>
        </Button>
      </div>

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
