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
import { Textarea } from "@/components/ui/textarea";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  DollarSign,
  Target,
  Mail,
  Phone,
  MapPin,
  Award,
  CheckCircle,
  XCircle,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  joinDate: string;
  status: "active" | "inactive" | "completed" | "dropped";
  paymentStatus: "paid" | "pending" | "overdue";
  notes?: string;
}

interface Schedule {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
  duration: number; // in weeks
  startDate: string;
  endDate: string;
}

interface Group {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  teacherId: string;
  students: Student[];
  maxStudents: number;
  level: string;
  status: "active" | "completed" | "upcoming" | "paused";
  startDate: string;
  endDate: string;
  schedule?: Schedule;
  price: number;
  branch: string;
  description?: string;
  requirements?: string;
  goals?: string;
  materials?: string;
  room?: string;
  createdDate: string;
  completionRate?: number;
  attendanceRate?: number;
}

export default function GroupsManagement() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isStudentManageDialogOpen, setIsStudentManageDialogOpen] =
    useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [newGroup, setNewGroup] = useState({
    name: "",
    subject: "",
    teacher: "",
    level: "",
    maxStudents: "15",
    price: "",
    description: "",
    requirements: "",
    goals: "",
    materials: "",
    room: "",
    startDate: "",
    endDate: "",
  });

  // Available teachers, subjects, schedules, and students for assignments
  const [availableTeachers] = useState([
    { id: "1", name: "Javohir Karimov", subjects: ["Ingliz tili", "IELTS"] },
    { id: "2", name: "Malika Toshmatova", subjects: ["Ingliz tili"] },
    {
      id: "3",
      name: "Bobur Mirzayev",
      subjects: ["Ingliz tili", "Nemis tili"],
    },
  ]);

  const [availableSubjects] = useState([
    "Ingliz tili",
    "IELTS",
    "Nemis tili",
    "Fransuz tili",
    "Business English",
  ]);

  const [availableSchedules] = useState<Schedule[]>([
    {
      id: "1",
      name: "Ertalabki jadval",
      days: ["Dushanba", "Chorshanba", "Juma"],
      startTime: "09:00",
      endTime: "11:00",
      duration: 12,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
    },
    {
      id: "2",
      name: "Kechki jadval",
      days: ["Seshanba", "Payshanba", "Juma"],
      startTime: "18:00",
      endTime: "20:00",
      duration: 12,
      startDate: "2024-01-16",
      endDate: "2024-04-16",
    },
    {
      id: "3",
      name: "Dam olish kuni",
      days: ["Shanba"],
      startTime: "10:00",
      endTime: "14:00",
      duration: 8,
      startDate: "2024-01-20",
      endDate: "2024-03-20",
    },
  ]);

  const [availableStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Ahmad Rahmonov",
      email: "ahmad@gmail.com",
      phone: "+998 90 567 89 01",
      address: "Toshkent shahar, Bektemir tumani",
      birthDate: "2000-09-25",
      joinDate: "2023-11-15",
      status: "active",
      paymentStatus: "paid",
      notes: "Faol va toza talaba",
    },
    {
      id: "2",
      name: "Aziza Yunusova",
      email: "aziza@gmail.com",
      phone: "+998 90 678 90 12",
      address: "Toshkent shahar, Shayxontohur tumani",
      birthDate: "1998-11-30",
      joinDate: "2023-11-10",
      status: "active",
      paymentStatus: "paid",
      notes: "IELTS olish uchun kelgan",
    },
    {
      id: "3",
      name: "Dilshod Qosimov",
      email: "dilshod@gmail.com",
      phone: "+998 90 234 56 78",
      address: "Toshkent shahar, Yunusobod tumani",
      birthDate: "1999-03-12",
      joinDate: "2023-10-20",
      status: "active",
      paymentStatus: "pending",
      notes: "Juda ishqiboz talaba",
    },
    {
      id: "4",
      name: "Fotima Abdullayeva",
      email: "fotima@gmail.com",
      phone: "+998 90 345 67 89",
      address: "Toshkent shahar, Chilonzor tumani",
      birthDate: "2001-07-18",
      joinDate: "2023-11-01",
      status: "active",
      paymentStatus: "paid",
      notes: "Grammatikaga qiziqadi",
    },
    {
      id: "5",
      name: "Sardor Toshmatov",
      email: "sardor@gmail.com",
      phone: "+998 90 456 78 90",
      address: "Toshkent shahar, Mirzo Ulug'bek tumani",
      birthDate: "2000-12-05",
      joinDate: "2023-09-15",
      status: "active",
      paymentStatus: "overdue",
      notes: "To'lov muammosi bor",
    },
  ]);

  // Mock data for groups with complete information
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Beginner-1",
      subject: "Ingliz tili",
      teacher: "Javohir Karimov",
      teacherId: "1",
      students: [
        {
          id: "1",
          name: "Ahmad Rahmonov",
          email: "ahmad@gmail.com",
          phone: "+998 90 567 89 01",
          address: "Toshkent shahar, Bektemir tumani",
          birthDate: "2000-09-25",
          joinDate: "2023-11-15",
          status: "active",
          paymentStatus: "paid",
          notes: "Faol va toza talaba",
        },
        {
          id: "3",
          name: "Dilshod Qosimov",
          email: "dilshod@gmail.com",
          phone: "+998 90 234 56 78",
          address: "Toshkent shahar, Yunusobod tumani",
          birthDate: "1999-03-12",
          joinDate: "2023-10-20",
          status: "active",
          paymentStatus: "pending",
          notes: "Juda ishqiboz talaba",
        },
      ],
      maxStudents: 15,
      level: "Beginner",
      status: "active",
      startDate: "2023-11-01",
      endDate: "2024-01-31",
      schedule: {
        id: "1",
        name: "Ertalabki jadval",
        days: ["Dushanba", "Chorshanba", "Juma"],
        startTime: "09:00",
        endTime: "11:00",
        duration: 12,
        startDate: "2023-11-01",
        endDate: "2024-01-31",
      },
      price: 800000,
      branch: "Asosiy filial",
      description: "Ingliz tili boshlang'ich daraja",
      requirements: "Hech qanday oldindan bilim talab etilmaydi",
      goals: "Asosiy grammatika va so'z boyligini o'rganish",
      materials: "New English File Beginner",
      room: "201-xona",
      createdDate: "2023-10-15",
      completionRate: 75,
      attendanceRate: 87,
    },
    {
      id: "2",
      name: "Intermediate-2",
      subject: "Ingliz tili",
      teacher: "Malika Toshmatova",
      teacherId: "2",
      students: [
        {
          id: "4",
          name: "Fotima Abdullayeva",
          email: "fotima@gmail.com",
          phone: "+998 90 345 67 89",
          address: "Toshkent shahar, Chilonzor tumani",
          birthDate: "2001-07-18",
          joinDate: "2023-11-01",
          status: "active",
          paymentStatus: "paid",
          notes: "Grammatikaga qiziqadi",
        },
      ],
      maxStudents: 15,
      level: "Intermediate",
      status: "active",
      startDate: "2023-10-15",
      endDate: "2024-01-15",
      schedule: {
        id: "2",
        name: "Kechki jadval",
        days: ["Seshanba", "Payshanba", "Juma"],
        startTime: "18:00",
        endTime: "20:00",
        duration: 12,
        startDate: "2023-10-15",
        endDate: "2024-01-15",
      },
      price: 900000,
      branch: "Asosiy filial",
      description: "Ingliz tili o'rta daraja",
      requirements: "Elementary darajasini tugatgan bo'lish",
      goals: "Mustaqil gaplashish va yozish ko'nikmalarini rivojlantirish",
      materials: "New English File Intermediate",
      room: "203-xona",
      createdDate: "2023-09-20",
      completionRate: 60,
      attendanceRate: 92,
    },
    {
      id: "3",
      name: "IELTS-Advanced",
      subject: "IELTS",
      teacher: "Javohir Karimov",
      teacherId: "1",
      students: [
        {
          id: "2",
          name: "Aziza Yunusova",
          email: "aziza@gmail.com",
          phone: "+998 90 678 90 12",
          address: "Toshkent shahar, Shayxontohur tumani",
          birthDate: "1998-11-30",
          joinDate: "2023-11-10",
          status: "active",
          paymentStatus: "paid",
          notes: "IELTS olish uchun kelgan",
        },
      ],
      maxStudents: 10,
      level: "Advanced",
      status: "active",
      startDate: "2023-11-15",
      endDate: "2024-02-15",
      schedule: {
        id: "3",
        name: "Dam olish kuni",
        days: ["Shanba"],
        startTime: "10:00",
        endTime: "14:00",
        duration: 8,
        startDate: "2023-11-15",
        endDate: "2024-02-15",
      },
      price: 1200000,
      branch: "Asosiy filial",
      description: "IELTS imtihoniga tayyorgarlik",
      requirements: "Ingliz tili Upper-Intermediate darajasi",
      goals: "IELTS imtihonida 6.5+ ball olish",
      materials: "IELTS Cambridge Materials",
      room: "205-xona",
      createdDate: "2023-10-01",
      completionRate: 40,
      attendanceRate: 95,
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
      (sum, group) => sum + group.students.length,
      0,
    ),
    avgStudentsPerGroup: Math.round(
      branchFilteredGroups.reduce(
        (sum, group) => sum + group.students.length,
        0,
      ) / branchFilteredGroups.length,
    ),
  };

  const handleAddGroup = () => {
    const group: Group = {
      id: Date.now().toString(),
      name: newGroup.name,
      subject: newGroup.subject,
      teacher:
        availableTeachers.find((t) => t.id === newGroup.teacher)?.name || "",
      teacherId: newGroup.teacher,
      students: [],
      maxStudents: parseInt(newGroup.maxStudents),
      level: newGroup.level,
      status: "upcoming",
      startDate: newGroup.startDate,
      endDate: newGroup.endDate,
      price: parseInt(newGroup.price),
      branch: adminData.selectedBranch,
      description: newGroup.description,
      requirements: newGroup.requirements,
      goals: newGroup.goals,
      materials: newGroup.materials,
      room: newGroup.room,
      createdDate: new Date().toISOString().split("T")[0],
      completionRate: 0,
      attendanceRate: 0,
    };

    setGroups([...groups, group]);
    setNewGroup({
      name: "",
      subject: "",
      teacher: "",
      level: "",
      maxStudents: "15",
      price: "",
      description: "",
      requirements: "",
      goals: "",
      materials: "",
      room: "",
      startDate: "",
      endDate: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditGroup = () => {
    if (!selectedGroup) return;

    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id ? selectedGroup : group,
    );
    setGroups(updatedGroups);
    setIsEditDialogOpen(false);
    setSelectedGroup(null);
  };

  const handleDeleteGroup = (groupId: string) => {
    const updatedGroups = groups.filter((group) => group.id !== groupId);
    setGroups(updatedGroups);
  };

  const handleViewGroup = (group: Group) => {
    setSelectedGroup(group);
    setIsViewDialogOpen(true);
  };

  const handleAddStudentToGroup = (studentId: string) => {
    if (!selectedGroup) return;

    const student = availableStudents.find((s) => s.id === studentId);
    if (!student) return;

    // Check if student is already in the group
    if (selectedGroup.students.find((s) => s.id === studentId)) {
      alert("Bu talaba allaqachon guruhda bor!");
      return;
    }

    // Check if group is full
    if (selectedGroup.students.length >= selectedGroup.maxStudents) {
      alert("Guruh to'la! Boshqa talaba qo'shib bo'lmaydi.");
      return;
    }

    const updatedGroup = {
      ...selectedGroup,
      students: [...selectedGroup.students, student],
    };

    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id ? updatedGroup : group,
    );

    setGroups(updatedGroups);
    setSelectedGroup(updatedGroup);
  };

  const handleRemoveStudentFromGroup = (studentId: string) => {
    if (!selectedGroup) return;

    const updatedGroup = {
      ...selectedGroup,
      students: selectedGroup.students.filter((s) => s.id !== studentId),
    };

    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id ? updatedGroup : group,
    );

    setGroups(updatedGroups);
    setSelectedGroup(updatedGroup);
  };

  const handleAssignSchedule = (scheduleId: string) => {
    if (!selectedGroup) return;

    const schedule = availableSchedules.find((s) => s.id === scheduleId);
    if (!schedule) return;

    const updatedGroup = {
      ...selectedGroup,
      schedule: schedule,
    };

    const updatedGroups = groups.map((group) =>
      group.id === selectedGroup.id ? updatedGroup : group,
    );

    setGroups(updatedGroups);
    setSelectedGroup(updatedGroup);
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
      case "paused":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <XCircle className="w-3 h-3 mr-1" />
            To'xtatilgan
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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            To'langan
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Kutilmoqda
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Muddati o'tgan
          </Badge>
        );
      default:
        return null;
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
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Yangi guruh yaratish</DialogTitle>
                      <DialogDescription>
                        Yangi guruh ma'lumotlarini kiriting
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Guruh nomi</Label>
                          <Input
                            placeholder="Masalan: Advanced-1"
                            value={newGroup.name}
                            onChange={(e) =>
                              setNewGroup({ ...newGroup, name: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Fan</Label>
                          <Select
                            value={newGroup.subject}
                            onValueChange={(value) =>
                              setNewGroup({ ...newGroup, subject: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Fanni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableSubjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>O'qituvchi</Label>
                          <Select
                            value={newGroup.teacher}
                            onValueChange={(value) =>
                              setNewGroup({ ...newGroup, teacher: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="O'qituvchini tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTeachers.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.id}>
                                  {teacher.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Daraja</Label>
                          <Select
                            value={newGroup.level}
                            onValueChange={(value) =>
                              setNewGroup({ ...newGroup, level: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Darajani tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Elementary">
                                Elementary
                              </SelectItem>
                              <SelectItem value="Intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Maksimal talabalar</Label>
                          <Input
                            type="number"
                            placeholder="15"
                            value={newGroup.maxStudents}
                            onChange={(e) =>
                              setNewGroup({
                                ...newGroup,
                                maxStudents: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Narx (so'm)</Label>
                          <Input
                            type="number"
                            placeholder="800000"
                            value={newGroup.price}
                            onChange={(e) =>
                              setNewGroup({
                                ...newGroup,
                                price: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Xona</Label>
                          <Input
                            placeholder="201-xona"
                            value={newGroup.room}
                            onChange={(e) =>
                              setNewGroup({ ...newGroup, room: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Boshlanish sanasi</Label>
                          <Input
                            type="date"
                            value={newGroup.startDate}
                            onChange={(e) =>
                              setNewGroup({
                                ...newGroup,
                                startDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tugash sanasi</Label>
                          <Input
                            type="date"
                            value={newGroup.endDate}
                            onChange={(e) =>
                              setNewGroup({
                                ...newGroup,
                                endDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Ta'rif</Label>
                        <Textarea
                          placeholder="Guruh haqida qisqacha ma'lumot"
                          value={newGroup.description}
                          onChange={(e) =>
                            setNewGroup({
                              ...newGroup,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Talablar</Label>
                        <Textarea
                          placeholder="Guruhga kirish uchun talablar"
                          value={newGroup.requirements}
                          onChange={(e) =>
                            setNewGroup({
                              ...newGroup,
                              requirements: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Maqsadlar</Label>
                        <Textarea
                          placeholder="Guruh maqsadlari"
                          value={newGroup.goals}
                          onChange={(e) =>
                            setNewGroup({ ...newGroup, goals: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>O'quv materiallari</Label>
                        <Input
                          placeholder="Kitob va materiallar"
                          value={newGroup.materials}
                          onChange={(e) =>
                            setNewGroup({
                              ...newGroup,
                              materials: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex space-x-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddDialogOpen(false)}
                          className="flex-1"
                        >
                          Bekor qilish
                        </Button>
                        <Button onClick={handleAddGroup} className="flex-1">
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
                        {group.students.length}/{group.maxStudents}
                      </span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${(group.students.length / group.maxStudents) * 100}%`,
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

                  {group.schedule && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Jadval:</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {group.schedule.days.join(", ")} •{" "}
                        {group.schedule.startTime}-{group.schedule.endTime}
                      </p>
                    </div>
                  )}

                  {group.room && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Xona:</span>
                      <span className="text-sm font-medium">{group.room}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Narx:</span>
                    <span className="text-sm font-medium">
                      {group.price.toLocaleString()} so'm
                    </span>
                  </div>

                  <div className="pt-4 border-t flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewGroup(group)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ko'rish
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedGroup(group);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Tahrirlash
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedGroup(group);
                        setIsStudentManageDialogOpen(true);
                      }}
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Boshqarish
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Trash2 className="w-4 h-4 mr-1" />
                          O'chirish
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Guruhni o'chirish</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bu amalni bekor qilib bo'lmaydi. Guruh butunlay
                            o'chiriladi.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteGroup(group.id)}
                          >
                            O'chirish
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View Group Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{selectedGroup?.name}</span>
                </DialogTitle>
              </DialogHeader>
              {selectedGroup && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Asosiy ma'lumotlar
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Fan:</span>
                          <span className="font-medium">
                            {selectedGroup.subject}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>O'qituvchi:</span>
                          <span className="font-medium">
                            {selectedGroup.teacher}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Daraja:</span>
                          <Badge className={getLevelColor(selectedGroup.level)}>
                            {selectedGroup.level}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Holat:</span>
                          {getStatusBadge(selectedGroup.status)}
                        </div>
                        <div className="flex justify-between">
                          <span>Narx:</span>
                          <span className="font-medium text-green-600">
                            {selectedGroup.price.toLocaleString()} so'm
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Statistika
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Talabalar:</span>
                          <span className="font-medium">
                            {selectedGroup.students.length}/
                            {selectedGroup.maxStudents}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Yakunlanish:</span>
                          <span className="font-medium">
                            {selectedGroup.completionRate || 0}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Davomat:</span>
                          <span className="font-medium">
                            {selectedGroup.attendanceRate || 0}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Boshlanish:</span>
                          <span className="font-medium">
                            {new Date(
                              selectedGroup.startDate,
                            ).toLocaleDateString("uz-UZ")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tugash:</span>
                          <span className="font-medium">
                            {new Date(selectedGroup.endDate).toLocaleDateString(
                              "uz-UZ",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedGroup.description && (
                    <div>
                      <h4 className="font-medium mb-2">Ta'rif</h4>
                      <p className="text-sm text-gray-600">
                        {selectedGroup.description}
                      </p>
                    </div>
                  )}

                  {selectedGroup.requirements && (
                    <div>
                      <h4 className="font-medium mb-2">Talablar</h4>
                      <p className="text-sm text-gray-600">
                        {selectedGroup.requirements}
                      </p>
                    </div>
                  )}

                  {selectedGroup.goals && (
                    <div>
                      <h4 className="font-medium mb-2">Maqsadlar</h4>
                      <p className="text-sm text-gray-600">
                        {selectedGroup.goals}
                      </p>
                    </div>
                  )}

                  {selectedGroup.materials && (
                    <div>
                      <h4 className="font-medium mb-2">O'quv materiallari</h4>
                      <p className="text-sm text-gray-600">
                        {selectedGroup.materials}
                      </p>
                    </div>
                  )}

                  {selectedGroup.schedule && (
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Dars jadvali
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Kunlar:</span>
                            <p>{selectedGroup.schedule.days.join(", ")}</p>
                          </div>
                          <div>
                            <span className="font-medium">Vaqt:</span>
                            <p>
                              {selectedGroup.schedule.startTime} -{" "}
                              {selectedGroup.schedule.endTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedGroup.students.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Guruh talablari ({selectedGroup.students.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedGroup.students.map((student) => (
                          <div
                            key={student.id}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h5 className="font-medium text-gray-900">
                                  {student.name}
                                </h5>
                                <p className="text-sm text-gray-600 flex items-center">
                                  <Mail className="w-3 h-3 mr-1" />
                                  {student.email}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {student.phone}
                                </p>
                              </div>
                              {getPaymentStatusBadge(student.paymentStatus)}
                            </div>
                            <p className="text-xs text-gray-500 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {student.address}
                            </p>
                            {student.notes && (
                              <p className="text-xs text-gray-500 mt-2">
                                {student.notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Group Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Guruhni tahrirlash</DialogTitle>
              </DialogHeader>
              {selectedGroup && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Guruh nomi</Label>
                      <Input
                        value={selectedGroup.name}
                        onChange={(e) =>
                          setSelectedGroup({
                            ...selectedGroup,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Holat</Label>
                      <Select
                        value={selectedGroup.status}
                        onValueChange={(value) =>
                          setSelectedGroup({
                            ...selectedGroup,
                            status: value as
                              | "active"
                              | "completed"
                              | "upcoming"
                              | "paused",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Kelayotgan</SelectItem>
                          <SelectItem value="active">Faol</SelectItem>
                          <SelectItem value="paused">To'xtatilgan</SelectItem>
                          <SelectItem value="completed">Yakunlangan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Maksimal talabalar</Label>
                      <Input
                        type="number"
                        value={selectedGroup.maxStudents}
                        onChange={(e) =>
                          setSelectedGroup({
                            ...selectedGroup,
                            maxStudents: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Narx (so'm)</Label>
                      <Input
                        type="number"
                        value={selectedGroup.price}
                        onChange={(e) =>
                          setSelectedGroup({
                            ...selectedGroup,
                            price: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ta'rif</Label>
                    <Textarea
                      value={selectedGroup.description || ""}
                      onChange={(e) =>
                        setSelectedGroup({
                          ...selectedGroup,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Xona</Label>
                    <Input
                      value={selectedGroup.room || ""}
                      onChange={(e) =>
                        setSelectedGroup({
                          ...selectedGroup,
                          room: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditDialogOpen(false)}
                      className="flex-1"
                    >
                      Bekor qilish
                    </Button>
                    <Button onClick={handleEditGroup} className="flex-1">
                      Saqlash
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Student Management Dialog */}
          <Dialog
            open={isStudentManageDialogOpen}
            onOpenChange={setIsStudentManageDialogOpen}
          >
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>
                    {selectedGroup?.name} - Talabalar va jadval boshqaruvi
                  </span>
                </DialogTitle>
              </DialogHeader>
              {selectedGroup && (
                <div className="space-y-6">
                  {/* Current Students */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Guruh talablari ({selectedGroup.students.length}/
                        {selectedGroup.maxStudents})
                      </h4>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedGroup.students.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-600">
                              {student.email} • {student.phone}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPaymentStatusBadge(student.paymentStatus)}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleRemoveStudentFromGroup(student.id)
                              }
                            >
                              <UserMinus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {selectedGroup.students.length === 0 && (
                        <p className="text-gray-500 text-center py-4">
                          Guruhda hozircha talabalar yo'q
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Available Students */}
                  <div>
                    <h4 className="font-medium mb-4 flex items-center">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Mavjud talabalar
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {availableStudents
                        .filter(
                          (student) =>
                            !selectedGroup.students.find(
                              (s) => s.id === student.id,
                            ),
                        )
                        .map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-600">
                                {student.email} • {student.phone}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getPaymentStatusBadge(student.paymentStatus)}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleAddStudentToGroup(student.id)
                                }
                                disabled={
                                  selectedGroup.students.length >=
                                  selectedGroup.maxStudents
                                }
                              >
                                <UserPlus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Schedule Assignment */}
                  <div>
                    <h4 className="font-medium mb-4 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Jadval biriktirish
                    </h4>
                    {selectedGroup.schedule && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <p className="font-medium text-blue-900">
                          Hozirgi jadval: {selectedGroup.schedule.name}
                        </p>
                        <p className="text-sm text-blue-700">
                          {selectedGroup.schedule.days.join(", ")} •{" "}
                          {selectedGroup.schedule.startTime}-
                          {selectedGroup.schedule.endTime}
                        </p>
                      </div>
                    )}
                    <div className="space-y-2">
                      {availableSchedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{schedule.name}</p>
                            <p className="text-sm text-gray-600">
                              {schedule.days.join(", ")} • {schedule.startTime}-
                              {schedule.endTime}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAssignSchedule(schedule.id)}
                          >
                            Biriktirish
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
