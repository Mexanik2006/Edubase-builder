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
  Building,
  Users,
  ChevronRight,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PROJECTS = [
  {
    id: "education",
    name: "EduBase-Ta'lim boshqaruvi",
    description: "Ta'lim jarayonini boshqarish tizimi",
    icon: GraduationCap,
    color: "bg-blue-500",
    stats: { total: 245, active: 230 },
  },
  {
    id: "ielts",
    name: "EduBase-IELTS MOCK test",
    description: "IELTS test tayyorlash va baholash",
    icon: TestTube,
    color: "bg-green-500",
    stats: { total: 89, active: 76 },
  },
  {
    id: "kitchen",
    name: "EduBase-Oshxona",
    description: "Oshxona va ovqatlanish boshqaruvi",
    icon: ChefHat,
    color: "bg-orange-500",
    stats: { total: 156, active: 142 },
  },
  {
    id: "dormitory",
    name: "EduBase-Yotoqxona",
    description: "Yotoqxona va turar joy boshqaruvi",
    icon: Bed,
    color: "bg-purple-500",
    stats: { total: 324, active: 298 },
  },
  {
    id: "library",
    name: "EduBase-Kutubxona",
    description: "Kutubxona resurslarini boshqarish",
    icon: BookMarked,
    color: "bg-red-500",
    stats: { total: 178, active: 165 },
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [directorData, setDirectorData] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const isActivated = localStorage.getItem("director_activated") === "true";
    if (!isActivated) {
      navigate("/login");
      return;
    }

    const data = localStorage.getItem("director_data");
    if (data) {
      setDirectorData(JSON.parse(data));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("director_activated");
    localStorage.removeItem("director_data");
    navigate("/login");
  };

  const handleProjectClick = (projectId: string) => {
    // In a real app, this would navigate to the specific project
    alert(`${projectId} loyihasiga o'tilmoqda...`);
  };

  if (!directorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-edubase-blue-light via-white to-edubase-blue-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-edubase-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-edubase-gray">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  const selectedProjects = PROJECTS.filter((project) =>
    directorData.selectedProjects.includes(project.id),
  );

  const totalStats = selectedProjects.reduce(
    (acc, project) => ({
      total: acc.total + project.stats.total,
      active: acc.active + project.stats.active,
    }),
    { total: 0, active: 0 },
  );

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          userType="director"
          userName={directorData.personalInfo.fullName}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Xush kelibsiz, {directorData.personalInfo.fullName}!
            </h1>
            <p className="text-gray-600">
              {directorData.centerInfo.name} markazini boshqaring
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-edubase-blue/10 flex items-center justify-center">
                    <Building className="w-6 h-6 text-edubase-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami filiallar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {directorData.centerInfo.branches.length}
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
                      Faol loyihalar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedProjects.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami foydalanuvchilar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalStats.total}
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
                      Faol foydalanuvchilar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalStats.active}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Loyihalar boshqaruvi
              </h2>
              <Button variant="outline" size="sm">
                Barchasi
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedProjects.map((project) => {
                const IconComponent = project.icon;
                const admin = directorData.projectAdmins.find(
                  (a: any) => a.projectId === project.id,
                );

                return (
                  <Card
                    key={project.id}
                    className="hover:shadow-lg transition-all cursor-pointer group border-0 shadow-sm"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg ${project.color} flex items-center justify-center`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {project.description}
                      </p>

                      <div className="space-y-2">
                        {admin && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Admin:
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {admin.adminLogin}
                            </Badge>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Foydalanuvchilar:
                          </span>
                          <span className="text-xs font-medium">
                            {project.stats.active}/{project.stats.total}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Center Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Markaz ma'lumotlari
            </h2>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {directorData.centerInfo.name}
                  <Badge variant="outline">
                    {directorData.centerInfo.branches.length} filial
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Asosiy filial: {directorData.centerInfo.mainBranch}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {directorData.centerInfo.branches.map(
                    (branch: any, index: number) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">
                          {branch.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {branch.location}
                        </p>
                        {branch.description && (
                          <p className="text-sm text-gray-500">
                            {branch.description}
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
