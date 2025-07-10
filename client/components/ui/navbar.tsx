import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  userType: "director" | "admin";
  userName: string;
  projectName?: string;
  onMenuClick?: () => void;
  onLogout?: () => void;
}

export function Navbar({
  userType,
  userName,
  projectName,
  onMenuClick,
  onLogout,
}: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Qidirish..." className="pl-10 h-9 w-80" />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 h-9">
              <div className="w-7 h-7 rounded-full bg-edubase-blue flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">{userName}</div>
                <div className="flex items-center space-x-1">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-edubase-blue-light text-edubase-blue"
                  >
                    {userType === "director" ? "Director" : "Admin"}
                  </Badge>
                  {projectName && (
                    <span className="text-xs text-gray-500">
                      • {projectName}
                    </span>
                  )}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Sozlamalar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Chiqish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
