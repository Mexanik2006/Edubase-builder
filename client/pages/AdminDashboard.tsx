import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/navbar";
import {
  GraduationCap,
  TestTube,
  ChefHat,
  Bed,
  BookMarked,
  Users,
  Calendar,
  TrendingUp,
  Activity,
  FileText,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

const PROJECT_ICONS = {
  education: GraduationCap,
  ielts: TestTube,
  kitchen: ChefHat,
  dormitory: Bed,
  library: BookMarked,
};

const PROJECT_COLORS = {
  education: "bg-blue-500",
  ielts: "bg-green-500",
  kitchen: "bg-orange-500",
  dormitory: "bg-purple-500",
  library: "bg-red-500",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const adminString = localStorage.getItem("current_admin");
    if (!adminString) {
      navigate("/login");
      return;
    }

    const admin = JSON.parse(adminString) as User;

    // Redirect education admins to their specific dashboard
    if (admin.projectId === "education") {
      navigate("/admin-dashboard/education");
      return;
    }

    setCurrentAdmin(admin);

    // Check if admin is activated
    const adminActivationKey = `admin_${admin.username}_activated`;
    const isActivated = localStorage.getItem(adminActivationKey) === "true";

    if (!isActivated) {
      navigate("/admin-activation");
      return;
    }

    // Get admin data
    const adminDataKey = `admin_${admin.username}_data`;
    const adminDataString = localStorage.getItem(adminDataKey);
    if (adminDataString) {
      setAdminData(JSON.parse(adminDataString));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("current_admin");
    navigate("/login");
  };

  if (!currentAdmin || !adminData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-edubase-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  const IconComponent =
    PROJECT_ICONS[currentAdmin.projectId as keyof typeof PROJECT_ICONS];
  const projectColor =
    PROJECT_COLORS[currentAdmin.projectId as keyof typeof PROJECT_COLORS];

  // Mock data for demo
  const mockStats = {
    totalUsers: Math.floor(Math.random() * 500) + 100,
    activeUsers: Math.floor(Math.random() * 400) + 80,
    todayActivity: Math.floor(Math.random() * 100) + 20,
    pendingTasks: Math.floor(Math.random() * 20) + 5,
  };

  const recentActivities = [
    {
      id: 1,
      action: "Yangi foydalanuvchi qo'shildi",
      user: "Ahmad Karimov",
      time: "5 daqiqa oldin",
      type: "success",
    },
    {
      id: 2,
      action: "Hisobot yaratildi",
      user: "Dilshod Toshmatov",
      time: "15 daqiqa oldin",
      type: "info",
    },
    {
      id: 3,
      action: "Tizim yangilandi",
      user: "Tizim",
      time: "1 soat oldin",
      type: "warning",
    },
    {
      id: 4,
      action: "Backup yaratildi",
      user: "Tizim",
      time: "2 soat oldin",
      type: "success",
    },
  ];

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          userType="admin"
          userName={adminData.personalInfo.fullName}
          projectName={currentAdmin.projectName}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div
                className={`w-12 h-12 rounded-lg ${projectColor} flex items-center justify-center`}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentAdmin.projectName}
                </h1>
                <p className="text-gray-600">
                  Xush kelibsiz, {adminData.personalInfo.fullName}!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="bg-edubase-blue-light text-edubase-blue"
              >
                Admin Dashboard
              </Badge>
              <Badge variant="outline">
                Filial: {adminData.selectedBranch}
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami foydalanuvchilar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockStats.totalUsers}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Faol foydalanuvchilar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockStats.activeUsers}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Bugungi faollik
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockStats.todayActivity}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Kutilayotgan vazifalar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockStats.pendingTasks}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tezkor amallar</CardTitle>
                <CardDescription>
                  Ushbu loyiha uchun asosiy amallar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Foydalanuvchilar boshqaruvi
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Hisobotlar yaratish
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Jadval boshqaruvi
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Faollik monitoringi
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">So'nggi faollik</CardTitle>
                <CardDescription>
                  Loyihadagi eng so'nggi o'zgarishlar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "success"
                            ? "bg-green-500"
                            : activity.type === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Admin ma'lumotlari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">
                    To'liq ism
                  </p>
                  <p className="text-sm text-gray-600">
                    {adminData.personalInfo.fullName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">
                    {adminData.personalInfo.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">Telefon</p>
                  <p className="text-sm text-gray-600">
                    {adminData.personalInfo.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">Loyiha</p>
                  <p className="text-sm text-gray-600">
                    {currentAdmin.projectName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">Filial</p>
                  <p className="text-sm text-gray-600">
                    {adminData.selectedBranch}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">Holat</p>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Aktiv
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
