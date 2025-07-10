import React, { useState, useEffect } from "react";
import { EducationSidebar } from "@/components/ui/education-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  Clock,
  Plus,
  Users,
  Search,
  Edit,
  Trash2,
  Eye,
  MapPin,
  GraduationCap,
  BookOpen,
  Settings,
  Copy,
  Filter,
  Download,
  CalendarDays,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

interface TimeSlot {
  startTime: string;
  endTime: string;
  duration: number; // in minutes
}

interface Schedule {
  id: string;
  name: string;
  description: string;
  days: string[];
  timeSlot: TimeSlot;
  startDate: string;
  endDate: string;
  totalWeeks: number;
  room: string;
  capacity: number;
  teacher: string;
  teacherId: string;
  subject: string;
  level: string;
  status: "active" | "upcoming" | "completed" | "cancelled";
  branch: string;
  createdDate: string;
  assignedGroups: string[];
  conflicts: string[];
  notes?: string;
  isRecurring: boolean;
  holidays: string[]; // dates to skip
  examDates: string[]; // special exam dates
  price: number;
  color: string; // for calendar display
}

const DAYS_OF_WEEK = [
  { value: "Dushanba", label: "Dushanba" },
  { value: "Seshanba", label: "Seshanba" },
  { value: "Chorshanba", label: "Chorshanba" },
  { value: "Payshanba", label: "Payshanba" },
  { value: "Juma", label: "Juma" },
  { value: "Shanba", label: "Shanba" },
  { value: "Yakshanba", label: "Yakshanba" },
];

const TIME_SLOTS = [
  { label: "08:00-10:00", start: "08:00", end: "10:00" },
  { label: "10:00-12:00", start: "10:00", end: "12:00" },
  { label: "12:00-14:00", start: "12:00", end: "14:00" },
  { label: "14:00-16:00", start: "14:00", end: "16:00" },
  { label: "16:00-18:00", start: "16:00", end: "18:00" },
  { label: "18:00-20:00", start: "18:00", end: "20:00" },
  { label: "20:00-22:00", start: "20:00", end: "22:00" },
];

const ROOMS = [
  "201-xona",
  "202-xona",
  "203-xona",
  "204-xona",
  "205-xona",
  "301-xona",
  "302-xona",
  "Konferens zal",
  "Kompyuter klasi",
];

export default function SchedulePage() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [newSchedule, setNewSchedule] = useState({
    name: "",
    description: "",
    days: [] as string[],
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    room: "",
    capacity: "15",
    teacher: "",
    subject: "",
    level: "",
    notes: "",
    price: "",
    color: "#3b82f6",
    holidays: "",
    examDates: "",
  });

  // Available teachers and subjects
  const [availableTeachers] = useState([
    { id: "1", name: "Javohir Karimov", subjects: ["Ingliz tili", "IELTS"] },
    { id: "2", name: "Malika Toshmatova", subjects: ["Ingliz tili"] },
    {
      id: "3",
      name: "Bobur Mirzayev",
      subjects: ["Ingliz tili", "Nemis tili"],
    },
    { id: "4", name: "Dilnoza Yusupova", subjects: ["Fransuz tili"] },
    { id: "5", name: "Aziz Qosimov", subjects: ["Business English", "IELTS"] },
  ]);

  const [availableSubjects] = useState([
    "Ingliz tili",
    "IELTS",
    "Nemis tili",
    "Fransuz tili",
    "Business English",
    "TOEFL",
    "Speaking Club",
  ]);

  // Mock data for schedules
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      name: "Ertalabki Beginner guruhi",
      description: "Ingliz tili boshlang'ich daraja, ertalabki vaqt",
      days: ["Dushanba", "Chorshanba", "Juma"],
      timeSlot: {
        startTime: "09:00",
        endTime: "11:00",
        duration: 120,
      },
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      totalWeeks: 12,
      room: "201-xona",
      capacity: 15,
      teacher: "Javohir Karimov",
      teacherId: "1",
      subject: "Ingliz tili",
      level: "Beginner",
      status: "active",
      branch: "Asosiy filial",
      createdDate: "2024-01-01",
      assignedGroups: ["Beginner-1"],
      conflicts: [],
      notes: "Asosiy beginner guruh uchun mo'ljallangan",
      isRecurring: true,
      holidays: ["2024-03-08", "2024-03-21", "2024-05-01"],
      examDates: ["2024-02-15", "2024-04-10"],
      price: 800000,
      color: "#3b82f6",
    },
    {
      id: "2",
      name: "Kechki Intermediate",
      description: "Ingliz tili o'rta daraja, kechki vaqt",
      days: ["Seshanba", "Payshanba", "Shanba"],
      timeSlot: {
        startTime: "18:00",
        endTime: "20:00",
        duration: 120,
      },
      startDate: "2024-01-16",
      endDate: "2024-04-16",
      totalWeeks: 12,
      room: "203-xona",
      capacity: 12,
      teacher: "Malika Toshmatova",
      teacherId: "2",
      subject: "Ingliz tili",
      level: "Intermediate",
      status: "active",
      branch: "Asosiy filial",
      createdDate: "2024-01-01",
      assignedGroups: ["Intermediate-2"],
      conflicts: [],
      notes: "Ishlaydigan talabalar uchun kechki vaqt",
      isRecurring: true,
      holidays: ["2024-03-08", "2024-03-21", "2024-05-01"],
      examDates: ["2024-02-20", "2024-04-15"],
      price: 900000,
      color: "#10b981",
    },
    {
      id: "3",
      name: "IELTS Intensive",
      description: "IELTS tayyorgarlik kursi, intensiv format",
      days: ["Shanba", "Yakshanba"],
      timeSlot: {
        startTime: "10:00",
        endTime: "14:00",
        duration: 240,
      },
      startDate: "2024-01-20",
      endDate: "2024-03-20",
      totalWeeks: 8,
      room: "205-xona",
      capacity: 10,
      teacher: "Javohir Karimov",
      teacherId: "1",
      subject: "IELTS",
      level: "Advanced",
      status: "active",
      branch: "Asosiy filial",
      createdDate: "2024-01-01",
      assignedGroups: ["IELTS-Advanced"],
      conflicts: [],
      notes: "Intensiv IELTS tayyorgarlik, dam olish kunlari",
      isRecurring: true,
      holidays: [],
      examDates: ["2024-02-25", "2024-03-15"],
      price: 1200000,
      color: "#f59e0b",
    },
    {
      id: "4",
      name: "Business English",
      description: "Biznes ingliz tili kursi",
      days: ["Dushanba", "Payshanba"],
      timeSlot: {
        startTime: "19:00",
        endTime: "21:00",
        duration: 120,
      },
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      totalWeeks: 8,
      room: "301-xona",
      capacity: 8,
      teacher: "Aziz Qosimov",
      teacherId: "5",
      subject: "Business English",
      level: "Advanced",
      status: "upcoming",
      branch: "Asosiy filial",
      createdDate: "2024-01-15",
      assignedGroups: [],
      conflicts: [],
      notes: "Professional businessmenlar uchun",
      isRecurring: true,
      holidays: ["2024-03-08"],
      examDates: ["2024-03-20"],
      price: 1000000,
      color: "#8b5cf6",
    },
    {
      id: "5",
      name: "Nemis tili boshlang'ich",
      description: "Nemis tili boshlang'ich daraja",
      days: ["Chorshanba", "Juma"],
      timeSlot: {
        startTime: "16:00",
        endTime: "18:00",
        duration: 120,
      },
      startDate: "2024-01-10",
      endDate: "2024-12-10",
      totalWeeks: 48,
      room: "202-xona",
      capacity: 12,
      teacher: "Bobur Mirzayev",
      teacherId: "3",
      subject: "Nemis tili",
      level: "Beginner",
      status: "active",
      branch: "Asosiy filial",
      createdDate: "2024-01-01",
      assignedGroups: ["German-A1"],
      conflicts: [],
      notes: "Uzoq muddatli nemis tili kursi",
      isRecurring: true,
      holidays: ["2024-03-08", "2024-05-01", "2024-10-03"],
      examDates: ["2024-04-01", "2024-07-01", "2024-10-01"],
      price: 850000,
      color: "#ef4444",
    },
    {
      id: "6",
      name: "Speaking Club",
      description: "Ingliz tilida gaplashish klubi",
      days: ["Juma"],
      timeSlot: {
        startTime: "17:00",
        endTime: "19:00",
        duration: 120,
      },
      startDate: "2024-01-05",
      endDate: "2024-12-05",
      totalWeeks: 52,
      room: "Konferens zal",
      capacity: 20,
      teacher: "Malika Toshmatova",
      teacherId: "2",
      subject: "Speaking Club",
      level: "Intermediate",
      status: "active",
      branch: "Asosiy filial",
      createdDate: "2024-01-01",
      assignedGroups: ["Speaking-Club-1"],
      conflicts: [],
      notes: "Haftada bir marta gaplashish amaliyoti",
      isRecurring: true,
      holidays: ["2024-03-08", "2024-05-01"],
      examDates: [],
      price: 300000,
      color: "#06b6d4",
    },
  ]);

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

  // Filter schedules based on selected branch
  const branchFilteredSchedules = schedules.filter(
    (schedule) => schedule.branch === adminData.selectedBranch,
  );

  // Apply filters
  const filteredSchedules = branchFilteredSchedules.filter((schedule) => {
    const matchesSearch =
      searchQuery === "" ||
      schedule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || schedule.status === selectedStatus;
    const matchesDay =
      selectedDay === "all" || schedule.days.includes(selectedDay);

    return matchesSearch && matchesStatus && matchesDay;
  });

  // Calculate statistics
  const stats = {
    total: branchFilteredSchedules.length,
    active: branchFilteredSchedules.filter((s) => s.status === "active").length,
    upcoming: branchFilteredSchedules.filter((s) => s.status === "upcoming")
      .length,
    completed: branchFilteredSchedules.filter((s) => s.status === "completed")
      .length,
    totalCapacity: branchFilteredSchedules.reduce(
      (sum, schedule) => sum + schedule.capacity,
      0,
    ),
    usedCapacity: branchFilteredSchedules.reduce(
      (sum, schedule) => sum + schedule.assignedGroups.length,
      0,
    ),
  };

  const handleAddSchedule = () => {
    const schedule: Schedule = {
      id: Date.now().toString(),
      name: newSchedule.name,
      description: newSchedule.description,
      days: newSchedule.days,
      timeSlot: {
        startTime: newSchedule.startTime,
        endTime: newSchedule.endTime,
        duration:
          (parseInt(newSchedule.endTime.split(":")[0]) -
            parseInt(newSchedule.startTime.split(":")[0])) *
          60,
      },
      startDate: newSchedule.startDate,
      endDate: newSchedule.endDate,
      totalWeeks: Math.ceil(
        (new Date(newSchedule.endDate).getTime() -
          new Date(newSchedule.startDate).getTime()) /
          (7 * 24 * 60 * 60 * 1000),
      ),
      room: newSchedule.room,
      capacity: parseInt(newSchedule.capacity),
      teacher:
        availableTeachers.find((t) => t.id === newSchedule.teacher)?.name || "",
      teacherId: newSchedule.teacher,
      subject: newSchedule.subject,
      level: newSchedule.level,
      status: "upcoming",
      branch: adminData.selectedBranch,
      createdDate: new Date().toISOString().split("T")[0],
      assignedGroups: [],
      conflicts: [],
      notes: newSchedule.notes,
      isRecurring: true,
      holidays: newSchedule.holidays
        ? newSchedule.holidays.split(",").map((d) => d.trim())
        : [],
      examDates: newSchedule.examDates
        ? newSchedule.examDates.split(",").map((d) => d.trim())
        : [],
      price: parseInt(newSchedule.price),
      color: newSchedule.color,
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      name: "",
      description: "",
      days: [],
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      room: "",
      capacity: "15",
      teacher: "",
      subject: "",
      level: "",
      notes: "",
      price: "",
      color: "#3b82f6",
      holidays: "",
      examDates: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditSchedule = () => {
    if (!selectedSchedule) return;

    const updatedSchedules = schedules.map((schedule) =>
      schedule.id === selectedSchedule.id ? selectedSchedule : schedule,
    );
    setSchedules(updatedSchedules);
    setIsEditDialogOpen(false);
    setSelectedSchedule(null);
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    const updatedSchedules = schedules.filter(
      (schedule) => schedule.id !== scheduleId,
    );
    setSchedules(updatedSchedules);
  };

  const handleViewSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsViewDialogOpen(true);
  };

  const handleDayToggle = (day: string) => {
    if (newSchedule.days.includes(day)) {
      setNewSchedule({
        ...newSchedule,
        days: newSchedule.days.filter((d) => d !== day),
      });
    } else {
      setNewSchedule({
        ...newSchedule,
        days: [...newSchedule.days, day],
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
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
            <CheckCircle className="w-3 h-3 mr-1" />
            Yakunlangan
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Bekor qilingan
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

  const generateWeeklyCalendar = () => {
    const calendar: { [key: string]: Schedule[] } = {};
    DAYS_OF_WEEK.forEach((day) => {
      calendar[day.value] = filteredSchedules.filter((schedule) =>
        schedule.days.includes(day.value),
      );
    });
    return calendar;
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Jadval boshqaruvi
            </h1>
            <p className="text-gray-600">
              {adminData.selectedBranch} filiali dars jadvallari
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami jadvallar
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
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Faol jadvallar
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
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami sig'im
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalCapacity}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Timer className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Foydalanish
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(
                        (stats.usedCapacity / stats.totalCapacity) * 100,
                      ) || 0}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* View Mode Toggle and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Jadval qidirish..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>

                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Holat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Barcha holatlar</SelectItem>
                      <SelectItem value="active">Faol</SelectItem>
                      <SelectItem value="upcoming">Kelayotgan</SelectItem>
                      <SelectItem value="completed">Yakunlangan</SelectItem>
                      <SelectItem value="cancelled">Bekor qilingan</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Kun" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Barcha kunlar</SelectItem>
                      {DAYS_OF_WEEK.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                      className="rounded-r-none"
                    >
                      Jadval
                    </Button>
                    <Button
                      variant={viewMode === "calendar" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("calendar")}
                      className="rounded-l-none"
                    >
                      Taqvim
                    </Button>
                  </div>

                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>

                  <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Jadval yaratish
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Yangi jadval yaratish</DialogTitle>
                        <DialogDescription>
                          Yangi dars jadvali ma'lumotlarini kiriting
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Jadval nomi</Label>
                            <Input
                              placeholder="Masalan: Ertalabki Beginner"
                              value={newSchedule.name}
                              onChange={(e) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Fan</Label>
                            <Select
                              value={newSchedule.subject}
                              onValueChange={(value) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  subject: value,
                                })
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

                        <div className="space-y-2">
                          <Label>Ta'rif</Label>
                          <Textarea
                            placeholder="Jadval haqida qisqacha ma'lumot"
                            value={newSchedule.description}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>O'qituvchi</Label>
                            <Select
                              value={newSchedule.teacher}
                              onValueChange={(value) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  teacher: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="O'qituvchini tanlang" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableTeachers.map((teacher) => (
                                  <SelectItem
                                    key={teacher.id}
                                    value={teacher.id}
                                  >
                                    {teacher.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Daraja</Label>
                            <Select
                              value={newSchedule.level}
                              onValueChange={(value) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  level: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Darajani tanlang" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Beginner">
                                  Beginner
                                </SelectItem>
                                <SelectItem value="Elementary">
                                  Elementary
                                </SelectItem>
                                <SelectItem value="Intermediate">
                                  Intermediate
                                </SelectItem>
                                <SelectItem value="Advanced">
                                  Advanced
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            Dars kunlari
                          </Label>
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            {DAYS_OF_WEEK.map((day) => (
                              <div
                                key={day.value}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={day.value}
                                  checked={newSchedule.days.includes(day.value)}
                                  onCheckedChange={() =>
                                    handleDayToggle(day.value)
                                  }
                                />
                                <Label htmlFor={day.value} className="text-sm">
                                  {day.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Boshlanish vaqti</Label>
                            <Select
                              value={newSchedule.startTime}
                              onValueChange={(value) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  startTime: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Vaqtni tanlang" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_SLOTS.map((slot) => (
                                  <SelectItem
                                    key={slot.start}
                                    value={slot.start}
                                  >
                                    {slot.start}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Tugash vaqti</Label>
                            <Select
                              value={newSchedule.endTime}
                              onValueChange={(value) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  endTime: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Vaqtni tanlang" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_SLOTS.map((slot) => (
                                  <SelectItem key={slot.end} value={slot.end}>
                                    {slot.end}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Xona</Label>
                            <Select
                              value={newSchedule.room}
                              onValueChange={(value) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  room: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Xonani tanlang" />
                              </SelectTrigger>
                              <SelectContent>
                                {ROOMS.map((room) => (
                                  <SelectItem key={room} value={room}>
                                    {room}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Sig'im</Label>
                            <Input
                              type="number"
                              placeholder="15"
                              value={newSchedule.capacity}
                              onChange={(e) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  capacity: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Narx (so'm)</Label>
                            <Input
                              type="number"
                              placeholder="800000"
                              value={newSchedule.price}
                              onChange={(e) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  price: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Boshlanish sanasi</Label>
                            <Input
                              type="date"
                              value={newSchedule.startDate}
                              onChange={(e) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  startDate: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Tugash sanasi</Label>
                            <Input
                              type="date"
                              value={newSchedule.endDate}
                              onChange={(e) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  endDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Bayram kunlari (vergul bilan)</Label>
                            <Input
                              placeholder="2024-03-08, 2024-05-01"
                              value={newSchedule.holidays}
                              onChange={(e) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  holidays: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Imtihon kunlari (vergul bilan)</Label>
                            <Input
                              placeholder="2024-02-15, 2024-04-10"
                              value={newSchedule.examDates}
                              onChange={(e) =>
                                setNewSchedule({
                                  ...newSchedule,
                                  examDates: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Qo'shimcha eslatmalar</Label>
                          <Textarea
                            placeholder="Jadval haqida qo'shimcha ma'lumotlar"
                            value={newSchedule.notes}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                notes: e.target.value,
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
                          <Button
                            onClick={handleAddSchedule}
                            className="flex-1"
                          >
                            Yaratish
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content based on view mode */}
          {viewMode === "table" ? (
            /* Table View */
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jadval</TableHead>
                      <TableHead>O'qituvchi</TableHead>
                      <TableHead>Kunlar</TableHead>
                      <TableHead>Vaqt</TableHead>
                      <TableHead>Xona</TableHead>
                      <TableHead>Holat</TableHead>
                      <TableHead className="text-right">Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSchedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {schedule.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {schedule.subject} • {schedule.level}
                            </p>
                            <Badge className={getLevelColor(schedule.level)}>
                              {schedule.level}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {schedule.teacher}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {schedule.days.slice(0, 2).map((day, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {day.substring(0, 3)}
                              </Badge>
                            ))}
                            {schedule.days.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{schedule.days.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="font-medium">
                              {schedule.timeSlot.startTime} -{" "}
                              {schedule.timeSlot.endTime}
                            </p>
                            <p className="text-gray-500">
                              {schedule.timeSlot.duration} min
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-sm">{schedule.room}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewSchedule(schedule)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedSchedule(schedule);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Jadvalni o'chirish
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Bu amalni bekor qilib bo'lmaydi. Jadval
                                    butunlay o'chiriladi.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Bekor qilish
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteSchedule(schedule.id)
                                    }
                                  >
                                    O'chirish
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            /* Calendar View */
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarDays className="w-5 h-5" />
                  <span>Haftalik jadval ko'rinishi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {DAYS_OF_WEEK.map((day) => {
                    const daySchedules =
                      generateWeeklyCalendar()[day.value] || [];
                    return (
                      <div key={day.value} className="space-y-2">
                        <h3 className="font-medium text-center text-gray-900 py-2 bg-gray-100 rounded">
                          {day.label}
                        </h3>
                        <div className="space-y-2 min-h-96">
                          {daySchedules.map((schedule) => (
                            <div
                              key={schedule.id}
                              className="p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow"
                              style={{
                                backgroundColor: schedule.color + "20",
                                borderColor: schedule.color,
                              }}
                              onClick={() => handleViewSchedule(schedule)}
                            >
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {schedule.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {schedule.timeSlot.startTime} -{" "}
                                  {schedule.timeSlot.endTime}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {schedule.teacher}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {schedule.room}
                                </p>
                                {getStatusBadge(schedule.status)}
                              </div>
                            </div>
                          ))}
                          {daySchedules.length === 0 && (
                            <p className="text-center text-gray-400 text-sm py-4">
                              Darslar yo'q
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* View Schedule Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{selectedSchedule?.name}</span>
                </DialogTitle>
              </DialogHeader>
              {selectedSchedule && (
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
                            {selectedSchedule.subject}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>O'qituvchi:</span>
                          <span className="font-medium">
                            {selectedSchedule.teacher}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Daraja:</span>
                          <Badge
                            className={getLevelColor(selectedSchedule.level)}
                          >
                            {selectedSchedule.level}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Holat:</span>
                          {getStatusBadge(selectedSchedule.status)}
                        </div>
                        <div className="flex justify-between">
                          <span>Xona:</span>
                          <span className="font-medium">
                            {selectedSchedule.room}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Vaqt ma'lumotlari
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Vaqt:</span>
                          <span className="font-medium">
                            {selectedSchedule.timeSlot.startTime} -{" "}
                            {selectedSchedule.timeSlot.endTime}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Davomiyligi:</span>
                          <span className="font-medium">
                            {selectedSchedule.timeSlot.duration} daqiqa
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Boshlanish:</span>
                          <span className="font-medium">
                            {new Date(
                              selectedSchedule.startDate,
                            ).toLocaleDateString("uz-UZ")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tugash:</span>
                          <span className="font-medium">
                            {new Date(
                              selectedSchedule.endDate,
                            ).toLocaleDateString("uz-UZ")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Jami haftalar:</span>
                          <span className="font-medium">
                            {selectedSchedule.totalWeeks}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedSchedule.description && (
                    <div>
                      <h4 className="font-medium mb-2">Ta'rif</h4>
                      <p className="text-sm text-gray-600">
                        {selectedSchedule.description}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-3">Dars kunlari</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSchedule.days.map((day, index) => (
                        <Badge
                          key={index}
                          className="bg-blue-100 text-blue-700"
                        >
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedSchedule.holidays.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Bayram kunlari</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSchedule.holidays.map((holiday, index) => (
                          <Badge
                            key={index}
                            className="bg-red-100 text-red-700"
                          >
                            {new Date(holiday).toLocaleDateString("uz-UZ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSchedule.examDates.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Imtihon kunlari</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSchedule.examDates.map((examDate, index) => (
                          <Badge
                            key={index}
                            className="bg-yellow-100 text-yellow-700"
                          >
                            {new Date(examDate).toLocaleDateString("uz-UZ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSchedule.assignedGroups.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">
                        Biriktirilgan guruhlar
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSchedule.assignedGroups.map((group, index) => (
                          <Badge
                            key={index}
                            className="bg-green-100 text-green-700"
                          >
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSchedule.notes && (
                    <div>
                      <h4 className="font-medium mb-2">
                        Qo'shimcha eslatmalar
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedSchedule.notes}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Sig'im:</span>
                        <span className="font-medium">
                          {selectedSchedule.capacity} kishi
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Narx:</span>
                        <span className="font-medium text-green-600">
                          {selectedSchedule.price.toLocaleString()} so'm
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Yaratilgan:</span>
                        <span className="font-medium">
                          {new Date(
                            selectedSchedule.createdDate,
                          ).toLocaleDateString("uz-UZ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Takrorlanuvchi:</span>
                        <span className="font-medium">
                          {selectedSchedule.isRecurring ? "Ha" : "Yo'q"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Schedule Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Jadvalni tahrirlash</DialogTitle>
              </DialogHeader>
              {selectedSchedule && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Jadval nomi</Label>
                      <Input
                        value={selectedSchedule.name}
                        onChange={(e) =>
                          setSelectedSchedule({
                            ...selectedSchedule,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Holat</Label>
                      <Select
                        value={selectedSchedule.status}
                        onValueChange={(value) =>
                          setSelectedSchedule({
                            ...selectedSchedule,
                            status: value as
                              | "active"
                              | "upcoming"
                              | "completed"
                              | "cancelled",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Kelayotgan</SelectItem>
                          <SelectItem value="active">Faol</SelectItem>
                          <SelectItem value="completed">Yakunlangan</SelectItem>
                          <SelectItem value="cancelled">
                            Bekor qilingan
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ta'rif</Label>
                    <Textarea
                      value={selectedSchedule.description || ""}
                      onChange={(e) =>
                        setSelectedSchedule({
                          ...selectedSchedule,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Xona</Label>
                      <Select
                        value={selectedSchedule.room}
                        onValueChange={(value) =>
                          setSelectedSchedule({
                            ...selectedSchedule,
                            room: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROOMS.map((room) => (
                            <SelectItem key={room} value={room}>
                              {room}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Sig'im</Label>
                      <Input
                        type="number"
                        value={selectedSchedule.capacity}
                        onChange={(e) =>
                          setSelectedSchedule({
                            ...selectedSchedule,
                            capacity: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Narx (so'm)</Label>
                    <Input
                      type="number"
                      value={selectedSchedule.price}
                      onChange={(e) =>
                        setSelectedSchedule({
                          ...selectedSchedule,
                          price: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Qo'shimcha eslatmalar</Label>
                    <Textarea
                      value={selectedSchedule.notes || ""}
                      onChange={(e) =>
                        setSelectedSchedule({
                          ...selectedSchedule,
                          notes: e.target.value,
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
                    <Button onClick={handleEditSchedule} className="flex-1">
                      Saqlash
                    </Button>
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
