import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EducationSidebar } from "@/components/ui/education-sidebar";
import { Navbar } from "@/components/ui/navbar";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

interface Group {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  students: number;
  maxStudents: number;
  level: string;
  status: "active" | "completed" | "upcoming";
  startDate: string;
  endDate: string;
  schedule: string;
  price: number;
  branch: string;
}

export default function GroupsManagement() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data for groups
  const [groups] = useState<Group[]>([
    {
      id: "1",
      name: "Beginner-1",
      subject: "Ingliz tili",
      teacher: "Javohir Karimov",
      students: 12,
      maxStudents: 15,
      level: "Beginner",
      status: "active",
      startDate: "2023-11-01",
      endDate: "2024-01-31",
      schedule: "Dush, Chor, Juma 14:00-16:00",
      price: 800000,
      branch: "Asosiy filial",
    },
    {
      id: "2",
      name: "Intermediate-2",
      subject: "Ingliz tili",
      teacher: "Malika Toshmatova",
      students: 14,
      maxStudents: 15,
      level: "Intermediate",
      status: "active",
      startDate: "2023-10-15",
      endDate: "2024-01-15",
      schedule: "Sesh, Pay, Juma 16:00-18:00",
      price: 900000,
      branch: "Asosiy filial",
    },
    {
      id: "3",
      name: "IELTS-Advanced",
      subject: "IELTS",
      teacher: "Javohir Karimov",
      students: 8,
      maxStudents: 10,
      level: "Advanced",
      status: "active",
      startDate: "2023-11-15",
      endDate: "2024-02-15",
      schedule: "Dush, Chor 18:00-20:00",
      price: 1200000,
      branch: "Asosiy filial",
    },
    {
      id: "4",
      name: "Business English",
      subject: "Ingliz tili",
      teacher: "Malika Toshmatova",
      students: 6,
      maxStudents: 12,
      level: "Advanced",
      status: "upcoming",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      schedule: "Sesh, Juma 19:00-21:00",
      price: 1000000,
      branch: "Asosiy filial",
    },
    {
      id: "5",
      name: "Elementary-3",
      subject: "Ingliz tili",
      teacher: "Bobur Mirzayev",
      students: 15,
      maxStudents: 15,
      level: "Elementary",
      status: "completed",
      startDate: "2023-08-01",
      endDate: "2023-10-31",
      schedule: "Dush, Chor, Juma 10:00-12:00",
      price: 750000,
      branch: "Asosiy filial",
    },
  ]);

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

  // Filter groups based on selected branch
  const branchFilteredGroups = groups.filter(
    (group) => group.branch === adminData.selectedBranch,
  );

  // Apply filters
  const filteredGroups = branchFilteredGroups.filter((group) => {
    const matchesSearch =
      searchQuery === "" ||
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || group.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: branchFilteredGroups.length,
    active: branchFilteredGroups.filter((g) => g.status === "active").length,
    upcoming: branchFilteredGroups.filter((g) => g.status === "upcoming")
      .length,
    completed: branchFilteredGroups.filter((g) => g.status === "completed")
      .length,
    totalStudents: branchFilteredGroups.reduce(
      (sum, group) => sum + group.students,
      0,
    ),
    avgStudentsPerGroup: Math.round(
      branchFilteredGroups.reduce((sum, group) => sum + group.students, 0) /
        branchFilteredGroups.length,
    ),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700">
            <Clock className="w-3 h-3 mr-1" />
            Faol
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-700">
            <Calendar className="w-3 h-3 mr-1" />
            Kelayotgan
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-700">
            <GraduationCap className="w-3 h-3 mr-1" />
            Yakunlangan
          </Badge>
        );
      default:
        return null;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-red-100 text-red-700";
      case "elementary":
        return "bg-orange-100 text-orange-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Guruhlar boshqaruvi
            </h1>
            <p className="text-gray-600">
              {adminData.selectedBranch} filiali guruhlari
            </p>
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
                      Jami guruhlar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Faol guruhlar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.active}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami talabalar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalStudents}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      O'rtacha talabalar
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.avgStudentsPerGroup}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("all")}
              >
                Barchasi ({stats.total})
              </Button>
              <Button
                variant={selectedStatus === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("active")}
              >
                Faol ({stats.active})
              </Button>
              <Button
                variant={selectedStatus === "upcoming" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("upcoming")}
              >
                Kelayotgan ({stats.upcoming})
              </Button>
              <Button
                variant={selectedStatus === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("completed")}
              >
                Yakunlangan ({stats.completed})
              </Button>
            </div>
          </div>

          {/* Filters and Actions */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Guruh qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Guruh yaratish
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Yangi guruh yaratish</DialogTitle>
                      <DialogDescription>
                        Yangi guruh ma'lumotlarini kiriting
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Guruh nomi</Label>
                        <Input placeholder="Masalan: Advanced-1" />
                      </div>
                      <div className="space-y-2">
                        <Label>Fan</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Fanni tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">Ingliz tili</SelectItem>
                            <SelectItem value="ielts">IELTS</SelectItem>
                            <SelectItem value="german">Nemis tili</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>O'qituvchi</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="O'qituvchini tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="javohir">
                              Javohir Karimov
                            </SelectItem>
                            <SelectItem value="malika">
                              Malika Toshmatova
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Daraja</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Darajani tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="elementary">
                              Elementary
                            </SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Maksimal talabalar</Label>
                          <Input type="number" placeholder="15" />
                        </div>
                        <div className="space-y-2">
                          <Label>Narx (so'm)</Label>
                          <Input type="number" placeholder="800000" />
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddDialogOpen(false)}
                          className="flex-1"
                        >
                          Bekor qilish
                        </Button>
                        <Button
                          onClick={() => setIsAddDialogOpen(false)}
                          className="flex-1"
                        >
                          Yaratish
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {group.subject}
                      </CardDescription>
                    </div>
                    {getStatusBadge(group.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">O'qituvchi:</span>
                    <span className="text-sm font-medium">{group.teacher}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Talabalar:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {group.students}/{group.maxStudents}
                      </span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${(group.students / group.maxStudents) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Daraja:</span>
                    <Badge className={getLevelColor(group.level)}>
                      {group.level}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Jadval:</span>
                    </div>
                    <p className="text-xs text-gray-500">{group.schedule}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Narx:</span>
                    <span className="text-sm font-medium">
                      {group.price.toLocaleString()} so'm
                    </span>
                  </div>

                  <div className="pt-4 border-t flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Ko'rish
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Tahrirlash
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <UserPlus className="w-4 h-4 mr-1" />
                      Talaba +
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <UserMinus className="w-4 h-4 mr-1" />
                      Talaba -
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
