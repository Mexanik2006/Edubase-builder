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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  GraduationCap,
  TestTube,
  ChefHat,
  Bed,
  BookMarked,
  Settings,
  LogOut,
  User,
  Building,
  Users,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PROJECTS = [
  {
    id: "education",
    name: "EduBase-Ta'lim boshqaruvi",
    description: "Ta'lim jarayonini boshqarish tizimi",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    id: "ielts",
    name: "EduBase-IELTS MOCK test",
    description: "IELTS test tayyorlash va baholash",
    icon: TestTube,
    color: "bg-green-500",
  },
  {
    id: "kitchen",
    name: "EduBase-Oshxona",
    description: "Oshxona va ovqatlanish boshqaruvi",
    icon: ChefHat,
    color: "bg-orange-500",
  },
  {
    id: "dormitory",
    name: "EduBase-Yotoqxona",
    description: "Yotoqxona va turar joy boshqaruvi",
    icon: Bed,
    color: "bg-purple-500",
  },
  {
    id: "library",
    name: "EduBase-Kutubxona",
    description: "Kutubxona resurslarini boshqarish",
    icon: BookMarked,
    color: "bg-red-500",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [directorData, setDirectorData] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-edubase-blue-light via-white to-edubase-blue-light">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-edubase-blue">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduBase</h1>
                <p className="text-xs text-edubase-gray">Director Dashboard</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-edubase-blue flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">
                    {directorData.personalInfo.fullName}
                  </span>
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
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Chiqish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Xush kelibsiz, {directorData.personalInfo.fullName}!
          </h2>
          <p className="text-edubase-gray">
            EduBase platformasida {directorData.centerInfo.name} markazini
            boshqaring
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-edubase-blue/10 flex items-center justify-center">
                  <Building className="w-6 h-6 text-edubase-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium text-edubase-gray">
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
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-edubase-gray">
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
                  <p className="text-sm font-medium text-edubase-gray">
                    Adminlar
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {directorData.projectAdmins.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Loyihalar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedProjects.map((project) => {
              const IconComponent = project.icon;
              const admin = directorData.projectAdmins.find(
                (a: any) => a.projectId === project.id,
              );

              return (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
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
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {project.name}
                    </h4>
                    <p className="text-sm text-edubase-gray mb-3">
                      {project.description}
                    </p>
                    {admin && (
                      <Badge variant="secondary" className="text-xs">
                        Admin: {admin.adminLogin}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Center Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Markaz ma'lumotlari
          </h3>
          <Card>
            <CardHeader>
              <CardTitle>{directorData.centerInfo.name}</CardTitle>
              <CardDescription>
                Asosiy filial: {directorData.centerInfo.mainBranch}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Filiallar:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {directorData.centerInfo.branches.map(
                    (branch: any, index: number) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <h5 className="font-medium text-gray-900 mb-1">
                          {branch.name}
                        </h5>
                        <p className="text-sm text-edubase-gray mb-2">
                          📍 {branch.location}
                        </p>
                        {branch.description && (
                          <p className="text-sm text-gray-600">
                            {branch.description}
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
