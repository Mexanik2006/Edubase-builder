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
import { EducationSidebar } from "@/components/ui/education-sidebar";
import { Navbar } from "@/components/ui/navbar";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Target,
  Award,
  FileText,
  UserCheck,
  UserX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

export default function EducationDashboard() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    // Check if admin is logged in
    const adminString = localStorage.getItem("current_admin");
    if (!adminString) {
      navigate("/login");
      return;
    }

    const admin = JSON.parse(adminString) as User;
    if (admin.projectId !== "education") {
      navigate("/admin-dashboard");
      return;
    }

    setCurrentAdmin(admin);

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
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // Mock data for education dashboard
  const dashboardStats = {
    totalStudents: 245,
    activeStudents: 230,
    totalTeachers: 18,
    activeTeachers: 16,
    totalGroups: 24,
    activeGroups: 22,
    totalSubjects: 12,
    totalLessons: 156,
    completedLessons: 132,
    revenue: 45600000,
    monthlyGrowth: 12.5,
    attendanceRate: 87.2,
    satisfactionRate: 94.1,
  };

  const recentActivities = [
    {
      id: 1,
      type: "student",
      action: "Yangi talaba qo'shildi",
      details: "Aziza Karimova - IELTS guruhiga",
      time: "5 daqiqa oldin",
      status: "success",
    },
    {
      id: 2,
      type: "lesson",
      action: "Dars yakunlandi",
      details: "Ingliz tili - Beginner guruhi",
      time: "15 daqiqa oldin",
      status: "success",
    },
    {
      id: 3,
      type: "payment",
      action: "To'lov qabul qilindi",
      details: "Bobur Toshmatov - 1,200,000 so'm",
      time: "1 soat oldin",
      status: "success",
    },
    {
      id: 4,
      type: "attendance",
      action: "Davomat belgilandi",
      details: "Advanced guruhi - 18/20 talaba",
      time: "2 soat oldin",
      status: "warning",
    },
    {
      id: 5,
      type: "exam",
      action: "Imtihon rejalashtirildi",
      details: "Grammar test - 15 dekabr",
      time: "3 soat oldin",
      status: "info",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Intermediate guruhi imtihoni",
      date: "Bugun, 14:00",
      type: "exam",
    },
    {
      id: 2,
      title: "Yangi o'qituvchi suhbati",
      date: "Ertaga, 10:00",
      type: "interview",
    },
    {
      id: 3,
      title: "Ota-onalar yig'ilishi",
      date: "15 dekabr, 18:00",
      type: "meeting",
    },
    {
      id: 4,
      title: "IELTS Mock test",
      date: "18 dekabr, 9:00",
      type: "test",
    },
  ];

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <EducationSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          userType="admin"
          userName={adminData.personalInfo.fullName}
          projectName={currentAdmin.projectName}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Ta'lim Dashboard
            </h1>
            <p className="text-gray-600">
              {adminData.selectedBranch} filiali - Bugungi holat
            </p>
          </div>

          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami talabalar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardStats.totalStudents}
                    </p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">+12 bu oy</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      O'qituvchilar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardStats.totalTeachers}
                    </p>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">
                        {dashboardStats.activeTeachers} faol
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Guruhlar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardStats.totalGroups}
                    </p>
                    <div className="flex items-center mt-1">
                      <Activity className="w-3 h-3 text-purple-500 mr-1" />
                      <span className="text-xs text-purple-600">
                        {dashboardStats.activeGroups} faol
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Oylik daromad
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(dashboardStats.revenue / 1000000).toFixed(1)}M
                    </p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">
                        +{dashboardStats.monthlyGrowth}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Davomat</p>
                    <p className="text-xl font-bold text-gray-900">
                      {dashboardStats.attendanceRate}%
                    </p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Mamnunlik</p>
                    <p className="text-xl font-bold text-gray-900">
                      {dashboardStats.satisfactionRate}%
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Tugallangan darslar</p>
                    <p className="text-xl font-bold text-gray-900">
                      {dashboardStats.completedLessons}/
                      {dashboardStats.totalLessons}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Fanlar</p>
                    <p className="text-xl font-bold text-gray-900">
                      {dashboardStats.totalSubjects}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">So'nggi faollik</CardTitle>
                <CardDescription>Bugungi eng muhim voqealar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`w-3 h-3 rounded-full mt-2 ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "warning"
                              ? "bg-yellow-500"
                              : activity.status === "info"
                                ? "bg-blue-500"
                                : "bg-red-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.details}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Yaqinlashayotgan tadbirlar
                </CardTitle>
                <CardDescription>Rejalashtirangan voqealar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          event.type === "exam"
                            ? "bg-red-100 text-red-600"
                            : event.type === "interview"
                              ? "bg-blue-100 text-blue-600"
                              : event.type === "meeting"
                                ? "bg-green-100 text-green-600"
                                : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {event.type === "exam" ? (
                          <FileText className="w-5 h-5" />
                        ) : event.type === "interview" ? (
                          <Users className="w-5 h-5" />
                        ) : event.type === "meeting" ? (
                          <Users className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tezkor amallar</CardTitle>
              <CardDescription>
                Eng ko'p ishlatiladigan funksiyalar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => navigate("/admin-dashboard/staff")}
                >
                  <Users className="w-6 h-6" />
                  <span className="text-sm">Xodimlar</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => navigate("/admin-dashboard/groups")}
                >
                  <BookOpen className="w-6 h-6" />
                  <span className="text-sm">Guruhlar</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => navigate("/admin-dashboard/schedule")}
                >
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm">Jadval</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => navigate("/admin-dashboard/lessons")}
                >
                  <GraduationCap className="w-6 h-6" />
                  <span className="text-sm">Darslar</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
