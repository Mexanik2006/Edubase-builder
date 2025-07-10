import React, { useState, useEffect } from "react";
import { EducationSidebar } from "@/components/ui/education-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  Clock,
  Calendar,
  Award,
  Target,
  Download,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

export default function StatisticsPage() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("students");

  useEffect(() => {
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

  // Mock statistical data
  const statisticsData = {
    overview: {
      totalStudents: 245,
      totalTeachers: 18,
      totalGroups: 24,
      totalRevenue: 45600000,
      monthlyGrowth: {
        students: 12.5,
        teachers: 8.3,
        groups: 15.2,
        revenue: 18.7,
      },
    },
    performance: {
      attendanceRate: 87.2,
      completionRate: 94.1,
      satisfactionRate: 91.8,
      retentionRate: 88.5,
    },
    enrollments: {
      thisMonth: 28,
      lastMonth: 22,
      thisYear: 145,
      lastYear: 120,
    },
    subjects: [
      { name: "Ingliz tili", students: 156, revenue: 25600000, growth: 15.2 },
      { name: "IELTS", students: 45, revenue: 12000000, growth: 22.1 },
      { name: "Nemis tili", students: 28, revenue: 5400000, growth: 8.7 },
      { name: "Fransuz tili", students: 16, revenue: 2600000, growth: -2.3 },
    ],
    ageGroups: [
      { range: "16-20", count: 68, percentage: 27.8 },
      { range: "21-25", count: 89, percentage: 36.3 },
      { range: "26-30", count: 54, percentage: 22.0 },
      { range: "31-35", count: 24, percentage: 9.8 },
      { range: "36+", count: 10, percentage: 4.1 },
    ],
    monthlyData: [
      { month: "Yanvar", students: 45, revenue: 7200000 },
      { month: "Fevral", students: 52, revenue: 8100000 },
      { month: "Mart", students: 48, revenue: 7800000 },
      { month: "Aprel", students: 61, revenue: 9200000 },
      { month: "May", students: 57, revenue: 8900000 },
      { month: "Iyun", students: 63, revenue: 9800000 },
    ],
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <EducationSidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          userType="admin"
          userName={adminData.personalInfo.fullName}
          projectName={currentAdmin.projectName}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Statistika va tahlillar
                </h1>
                <p className="text-gray-600">
                  {adminData.selectedBranch} filiali - Batafsil ma'lumotlar
                </p>
              </div>
              <div className="flex space-x-3">
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Davr" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Hafta</SelectItem>
                    <SelectItem value="month">Oy</SelectItem>
                    <SelectItem value="quarter">Chorak</SelectItem>
                    <SelectItem value="year">Yil</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Overview Stats */}
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
                      {statisticsData.overview.totalStudents}
                    </p>
                    <div className="flex items-center mt-1">
                      {getGrowthIcon(
                        statisticsData.overview.monthlyGrowth.students,
                      )}
                      <span
                        className={`text-xs ml-1 ${getGrowthColor(statisticsData.overview.monthlyGrowth.students)}`}
                      >
                        +{statisticsData.overview.monthlyGrowth.students}% bu oy
                      </span>
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
                      {statisticsData.overview.totalTeachers}
                    </p>
                    <div className="flex items-center mt-1">
                      {getGrowthIcon(
                        statisticsData.overview.monthlyGrowth.teachers,
                      )}
                      <span
                        className={`text-xs ml-1 ${getGrowthColor(statisticsData.overview.monthlyGrowth.teachers)}`}
                      >
                        +{statisticsData.overview.monthlyGrowth.teachers}% bu oy
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
                      {statisticsData.overview.totalGroups}
                    </p>
                    <div className="flex items-center mt-1">
                      {getGrowthIcon(
                        statisticsData.overview.monthlyGrowth.groups,
                      )}
                      <span
                        className={`text-xs ml-1 ${getGrowthColor(statisticsData.overview.monthlyGrowth.groups)}`}
                      >
                        +{statisticsData.overview.monthlyGrowth.groups}% bu oy
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
                      {(statisticsData.overview.totalRevenue / 1000000).toFixed(
                        1,
                      )}
                      M
                    </p>
                    <div className="flex items-center mt-1">
                      {getGrowthIcon(
                        statisticsData.overview.monthlyGrowth.revenue,
                      )}
                      <span
                        className={`text-xs ml-1 ${getGrowthColor(statisticsData.overview.monthlyGrowth.revenue)}`}
                      >
                        +{statisticsData.overview.monthlyGrowth.revenue}% bu oy
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Davomat</p>
                    <p className="text-xl font-bold text-gray-900">
                      {statisticsData.performance.attendanceRate}%
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Tugallanish</p>
                    <p className="text-xl font-bold text-gray-900">
                      {statisticsData.performance.completionRate}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Mamnunlik</p>
                    <p className="text-xl font-bold text-gray-900">
                      {statisticsData.performance.satisfactionRate}%
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
                    <p className="text-sm text-gray-600">Saqlanish</p>
                    <p className="text-xl font-bold text-gray-900">
                      {statisticsData.performance.retentionRate}%
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Subject Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Fanlar bo'yicha statistika</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statisticsData.subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {subject.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {subject.students} talaba •{" "}
                          {(subject.revenue / 1000000).toFixed(1)}M so'm
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getGrowthIcon(subject.growth)}
                        <span
                          className={`text-sm font-medium ${getGrowthColor(subject.growth)}`}
                        >
                          {subject.growth > 0 ? "+" : ""}
                          {subject.growth}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Age Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Yosh guruhlari taqsimoti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statisticsData.ageGroups.map((group, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{group.range} yosh</span>
                        <span>
                          {group.count} kishi ({group.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${group.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Oylik tendentsiya</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {statisticsData.monthlyData.map((month, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gray-50 rounded-lg"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {month.month}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      {month.students}
                    </p>
                    <p className="text-xs text-gray-600">talaba</p>
                    <p className="text-sm font-medium text-green-600 mt-1">
                      {(month.revenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
