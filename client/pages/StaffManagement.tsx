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
  GraduationCap,
  Calculator,
  Phone,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Archive,
  Download,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

type StaffType = "mentor" | "accountant" | "reception" | "student";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  type: StaffType;
  status: "active" | "inactive" | "archived";
  joinDate: string;
  branch: string;
  salary?: number;
  subjects?: string[];
  groups?: string[];
  notes?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  education?: string;
  experience?: number;
}

const staffTypes = [
  {
    value: "mentor",
    label: "Mentor (O'qituvchi)",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-700",
  },
  {
    value: "accountant",
    label: "Accountant (Hisobchi)",
    icon: Calculator,
    color: "bg-green-100 text-green-700",
  },
  {
    value: "reception",
    label: "Reception (Qabulxona)",
    icon: Phone,
    color: "bg-purple-100 text-purple-700",
  },
  {
    value: "student",
    label: "Student (Talaba)",
    icon: Users,
    color: "bg-orange-100 text-orange-700",
  },
];

export default function StaffManagement() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<StaffType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    type: "student" as StaffType,
    salary: "",
    education: "",
    experience: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    notes: "",
  });

  // Mock data for staff members
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Javohir Karimov",
      email: "javohir@edubase.uz",
      phone: "+998 90 123 45 67",
      address: "Toshkent shahar, Yunusobod tumani, Amir Temur ko'chasi 15-uy",
      birthDate: "1985-03-15",
      type: "mentor",
      status: "active",
      joinDate: "2023-09-15",
      branch: "Asosiy filial",
      salary: 5000000,
      subjects: ["Ingliz tili", "IELTS"],
      groups: ["Beginner-1", "IELTS-Advanced"],
      education: "TDPU, Ingliz tili va adabiyoti",
      experience: 8,
      emergencyContact: {
        name: "Karimova Malika",
        phone: "+998 90 987 65 43",
        relationship: "Rafiqasi",
      },
      notes: "Tajribali o'qituvchi, IELTS sertifikatiga ega",
    },
    {
      id: "2",
      name: "Malika Toshmatova",
      email: "malika@edubase.uz",
      phone: "+998 90 234 56 78",
      address: "Toshkent shahar, Chilonzor tumani, Bunyodkor ko'chasi 22-uy",
      birthDate: "1990-07-22",
      type: "mentor",
      status: "active",
      joinDate: "2023-08-20",
      branch: "Asosiy filial",
      salary: 4500000,
      subjects: ["Ingliz tili"],
      groups: ["Intermediate-2"],
      education: "UzSWLU, Tarjimonlik",
      experience: 5,
      emergencyContact: {
        name: "Toshmatov Bobur",
        phone: "+998 90 111 22 33",
        relationship: "Eri",
      },
      notes: "Yosh va energik o'qituvchi",
    },
    {
      id: "3",
      name: "Dilshod Abdullayev",
      email: "dilshod@edubase.uz",
      phone: "+998 90 345 67 89",
      address:
        "Toshkent shahar, Mirzo Ulug'bek tumani, Universitet ko'chasi 8-uy",
      birthDate: "1988-12-10",
      type: "accountant",
      status: "active",
      joinDate: "2023-07-10",
      branch: "Asosiy filial",
      salary: 3500000,
      education: "TDIU, Moliya va kredit",
      experience: 6,
      emergencyContact: {
        name: "Abdullayeva Nargiza",
        phone: "+998 90 444 55 66",
        relationship: "Onasi",
      },
      notes: "Moliyaviy hisobotlarda tajribali",
    },
    {
      id: "4",
      name: "Nilufar Saidova",
      email: "nilufar@edubase.uz",
      phone: "+998 90 456 78 90",
      address:
        "Toshkent shahar, Yakkasaroy tumani, Shota Rustaveli ko'chasi 12-uy",
      birthDate: "1995-02-18",
      type: "reception",
      status: "active",
      joinDate: "2023-10-01",
      branch: "Asosiy filial",
      salary: 2500000,
      education: "TDTU, Turizm va mehmonxona xizmati",
      experience: 2,
      emergencyContact: {
        name: "Saidov Aziz",
        phone: "+998 90 777 88 99",
        relationship: "Otasi",
      },
      notes: "Mijozlar bilan yaxshi muloqot qiladi",
    },
    {
      id: "5",
      name: "Ahmad Rahmonov",
      email: "ahmad.student@gmail.com",
      phone: "+998 90 567 89 01",
      address: "Toshkent shahar, Bektemir tumani, Navbahor ko'chasi 5-uy",
      birthDate: "2000-09-25",
      type: "student",
      status: "active",
      joinDate: "2023-11-15",
      branch: "Asosiy filial",
      groups: ["Beginner-1"],
      education: "Maktab bitiruvchisi",
      emergencyContact: {
        name: "Rahmonova Fotima",
        phone: "+998 90 123 98 76",
        relationship: "Onasi",
      },
      notes: "Faol va toza talaba",
    },
    {
      id: "6",
      name: "Aziza Yunusova",
      email: "aziza.student@gmail.com",
      phone: "+998 90 678 90 12",
      address: "Toshkent shahar, Shayxontohur tumani, Bobur ko'chasi 18-uy",
      birthDate: "1998-11-30",
      type: "student",
      status: "active",
      joinDate: "2023-11-10",
      branch: "Asosiy filial",
      groups: ["IELTS-Advanced"],
      education: "NUUz, Iqtisodiyot",
      emergencyContact: {
        name: "Yunusov Karim",
        phone: "+998 90 654 32 10",
        relationship: "Otasi",
      },
      notes: "IELTS olish uchun kelgan",
    },
    {
      id: "7",
      name: "Bobur Mirzayev",
      email: "bobur@edubase.uz",
      phone: "+998 90 789 01 23",
      address: "Toshkent shahar, Sergeli tumani, Yangi Sergeli 25-uy",
      birthDate: "1987-05-08",
      type: "mentor",
      status: "inactive",
      joinDate: "2023-06-15",
      branch: "Asosiy filial",
      salary: 4000000,
      subjects: ["Ingliz tili"],
      education: "TATU, Dasturiy injiniring",
      experience: 4,
      emergencyContact: {
        name: "Mirzayeva Shahnoza",
        phone: "+998 90 321 54 87",
        relationship: "Rafiqasi",
      },
      notes: "Vaqtincha band, keyinroq qaytadi",
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

  // Filter staff members based on selected branch
  const branchFilteredStaff = staffMembers.filter(
    (member) => member.branch === adminData.selectedBranch,
  );

  // Apply filters
  const filteredStaff = branchFilteredStaff.filter((member) => {
    const matchesType = selectedType === "all" || member.type === selectedType;
    const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || member.status === selectedStatus;

    return matchesType && matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: branchFilteredStaff.length,
    active: branchFilteredStaff.filter((m) => m.status === "active").length,
    inactive: branchFilteredStaff.filter((m) => m.status === "inactive").length,
    archived: branchFilteredStaff.filter((m) => m.status === "archived").length,
    byType: {
      mentor: branchFilteredStaff.filter((m) => m.type === "mentor").length,
      accountant: branchFilteredStaff.filter((m) => m.type === "accountant")
        .length,
      reception: branchFilteredStaff.filter((m) => m.type === "reception")
        .length,
      student: branchFilteredStaff.filter((m) => m.type === "student").length,
    },
  };

  const handleAddStaff = () => {
    const staff: StaffMember = {
      id: Date.now().toString(),
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      address: newStaff.address,
      birthDate: newStaff.birthDate,
      type: newStaff.type,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      branch: adminData.selectedBranch,
      salary: newStaff.salary ? parseInt(newStaff.salary) : undefined,
      education: newStaff.education,
      experience: newStaff.experience ? parseInt(newStaff.experience) : 0,
      emergencyContact: {
        name: newStaff.emergencyContactName,
        phone: newStaff.emergencyContactPhone,
        relationship: newStaff.emergencyContactRelationship,
      },
      notes: newStaff.notes,
      subjects: [],
      groups: [],
    };

    setStaffMembers([...staffMembers, staff]);
    setNewStaff({
      name: "",
      email: "",
      phone: "",
      address: "",
      birthDate: "",
      type: "student",
      salary: "",
      education: "",
      experience: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
      notes: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditStaff = () => {
    if (!selectedStaff) return;

    const updatedStaff = staffMembers.map((staff) =>
      staff.id === selectedStaff.id ? selectedStaff : staff,
    );
    setStaffMembers(updatedStaff);
    setIsEditDialogOpen(false);
    setSelectedStaff(null);
  };

  const handleDeleteStaff = (staffId: string) => {
    const updatedStaff = staffMembers.filter((staff) => staff.id !== staffId);
    setStaffMembers(updatedStaff);
  };

  const handleViewStaff = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setIsViewDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700">
            <UserCheck className="w-3 h-3 mr-1" />
            Faol
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <UserX className="w-3 h-3 mr-1" />
            Faol emas
          </Badge>
        );
      case "archived":
        return (
          <Badge className="bg-gray-100 text-gray-700">
            <Archive className="w-3 h-3 mr-1" />
            Arxivlangan
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = (type: StaffType) => {
    const staffType = staffTypes.find((t) => t.value === type);
    if (!staffType) return null;

    const Icon = staffType.icon;
    return (
      <Badge className={staffType.color}>
        <Icon className="w-3 h-3 mr-1" />
        {staffType.label.split(" ")[0]}
      </Badge>
    );
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
              Xodimlar boshqaruvi
            </h1>
            <p className="text-gray-600">
              {adminData.selectedBranch} filiali xodimlari
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
                      Jami xodimlar
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
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Hozir ishda
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
                  <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <UserX className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Ishdan bo'shagan
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.inactive}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Archive className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Bo'sh ish o'rinlari
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.max(0, 25 - stats.active)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staff Type Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("all")}
              >
                Barchasi ({stats.total})
              </Button>
              {staffTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.value as StaffType)}
                >
                  {type.label.split(" ")[0]} (
                  {stats.byType[type.value as keyof typeof stats.byType]})
                </Button>
              ))}
            </div>
          </div>

          {/* Filters and Actions */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Xodim qidirish..."
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
                      <SelectItem value="inactive">Faol emas</SelectItem>
                      <SelectItem value="archived">Arxivlangan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
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
                        <UserPlus className="w-4 h-4 mr-2" />
                        Xodim qo'shish
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Yangi xodim qo'shish</DialogTitle>
                        <DialogDescription>
                          Yangi xodim ma'lumotlarini kiriting
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>To'liq ism</Label>
                            <Input
                              placeholder="To'liq ismni kiriting"
                              value={newStaff.name}
                              onChange={(e) =>
                                setNewStaff({
                                  ...newStaff,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                              type="email"
                              placeholder="email@example.com"
                              value={newStaff.email}
                              onChange={(e) =>
                                setNewStaff({
                                  ...newStaff,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Telefon</Label>
                            <Input
                              placeholder="+998 90 123 45 67"
                              value={newStaff.phone}
                              onChange={(e) =>
                                setNewStaff({
                                  ...newStaff,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Tug'ilgan sana</Label>
                            <Input
                              type="date"
                              value={newStaff.birthDate}
                              onChange={(e) =>
                                setNewStaff({
                                  ...newStaff,
                                  birthDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Manzil</Label>
                          <Textarea
                            placeholder="To'liq yashash manzili"
                            value={newStaff.address}
                            onChange={(e) =>
                              setNewStaff({
                                ...newStaff,
                                address: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Lavozim</Label>
                            <Select
                              value={newStaff.type}
                              onValueChange={(value) =>
                                setNewStaff({
                                  ...newStaff,
                                  type: value as StaffType,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Lavozimni tanlang" />
                              </SelectTrigger>
                              <SelectContent>
                                {staffTypes.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          {(newStaff.type === "mentor" ||
                            newStaff.type === "accountant" ||
                            newStaff.type === "reception") && (
                            <div className="space-y-2">
                              <Label>Maosh (so'm)</Label>
                              <Input
                                type="number"
                                placeholder="2500000"
                                value={newStaff.salary}
                                onChange={(e) =>
                                  setNewStaff({
                                    ...newStaff,
                                    salary: e.target.value,
                                  })
                                }
                              />
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Ta'lim</Label>
                            <Input
                              placeholder="Ta'lim muassasasi"
                              value={newStaff.education}
                              onChange={(e) =>
                                setNewStaff({
                                  ...newStaff,
                                  education: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Tajriba (yil)</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={newStaff.experience}
                              onChange={(e) =>
                                setNewStaff({
                                  ...newStaff,
                                  experience: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Favqulodda aloqa</Label>
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              placeholder="Ism"
                              value={newStaff.emergencyContactName}
                              onChange={(e) =>
                                setNewStaff({
                                  ...newStaff,
                                  emergencyContactName: e.target.value,
                                })
                              }
                            />
                            <Input
                              placeholder="Telefon"
                              value={newStaff.emergencyContactPhone}
                              onChange={(e) =>
                                setNewStaff({
                                  ...newStaff,
                                  emergencyContactPhone: e.target.value,
                                })
                              }
                            />
                            <Input
                              placeholder="Qarindoshlik"
                              value={newStaff.emergencyContactRelationship}
                              onChange={(e) =>
                                setNewStaff({
                                  ...newStaff,
                                  emergencyContactRelationship: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Qo'shimcha eslatmalar</Label>
                          <Textarea
                            placeholder="Qo'shimcha ma'lumotlar"
                            value={newStaff.notes}
                            onChange={(e) =>
                              setNewStaff({
                                ...newStaff,
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
                          <Button onClick={handleAddStaff} className="flex-1">
                            Qo'shish
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Xodim</TableHead>
                    <TableHead>Lavozim</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>Qo'shilgan sana</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead className="text-right">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {member.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(member.type)}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        {new Date(member.joinDate).toLocaleDateString("uz-UZ")}
                      </TableCell>
                      <TableCell className="text-sm">{member.phone}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewStaff(member)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedStaff(member);
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
                                  Xodimni o'chirish
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bu amalni bekor qilib bo'lmaydi. Xodim
                                  ma'lumotlari butunlay o'chiriladi.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Bekor qilish
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteStaff(member.id)}
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

          {/* View Staff Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{selectedStaff?.name}</span>
                </DialogTitle>
              </DialogHeader>
              {selectedStaff && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Shaxsiy ma'lumotlar
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>To'liq ism:</span>
                          <span className="font-medium">
                            {selectedStaff.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email:</span>
                          <span className="font-medium">
                            {selectedStaff.email}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Telefon:</span>
                          <span className="font-medium">
                            {selectedStaff.phone}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tug'ilgan sana:</span>
                          <span className="font-medium">
                            {new Date(
                              selectedStaff.birthDate,
                            ).toLocaleDateString("uz-UZ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Ishchi ma'lumotlar
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Lavozim:</span>
                          {getTypeBadge(selectedStaff.type)}
                        </div>
                        <div className="flex justify-between">
                          <span>Holat:</span>
                          {getStatusBadge(selectedStaff.status)}
                        </div>
                        <div className="flex justify-between">
                          <span>Ishga qabul:</span>
                          <span className="font-medium">
                            {new Date(
                              selectedStaff.joinDate,
                            ).toLocaleDateString("uz-UZ")}
                          </span>
                        </div>
                        {selectedStaff.salary && (
                          <div className="flex justify-between">
                            <span>Maosh:</span>
                            <span className="font-medium text-green-600">
                              {selectedStaff.salary.toLocaleString()} so'm
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Manzil
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedStaff.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Ta'lim va tajriba
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Ta'lim:</span>
                          <span className="font-medium">
                            {selectedStaff.education || "Ma'lumot yo'q"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tajriba:</span>
                          <span className="font-medium">
                            {selectedStaff.experience || 0} yil
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Favqulodda aloqa
                      </h4>
                      {selectedStaff.emergencyContact && (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Ism:</span>
                            <span className="font-medium">
                              {selectedStaff.emergencyContact.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Telefon:</span>
                            <span className="font-medium">
                              {selectedStaff.emergencyContact.phone}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Qarindoshlik:</span>
                            <span className="font-medium">
                              {selectedStaff.emergencyContact.relationship}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedStaff.subjects &&
                    selectedStaff.subjects.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3">O'qitadigan fanlar</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStaff.subjects.map((subject, index) => (
                            <Badge
                              key={index}
                              className="bg-blue-100 text-blue-700"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                  {selectedStaff.groups && selectedStaff.groups.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Guruhlar</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStaff.groups.map((group, index) => (
                          <Badge
                            key={index}
                            className="bg-purple-100 text-purple-700"
                          >
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedStaff.notes && (
                    <div>
                      <h4 className="font-medium mb-3">
                        Qo'shimcha eslatmalar
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedStaff.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Staff Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Xodim ma'lumotlarini tahrirlash</DialogTitle>
              </DialogHeader>
              {selectedStaff && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>To'liq ism</Label>
                      <Input
                        value={selectedStaff.name}
                        onChange={(e) =>
                          setSelectedStaff({
                            ...selectedStaff,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={selectedStaff.email}
                        onChange={(e) =>
                          setSelectedStaff({
                            ...selectedStaff,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Telefon</Label>
                      <Input
                        value={selectedStaff.phone}
                        onChange={(e) =>
                          setSelectedStaff({
                            ...selectedStaff,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Holat</Label>
                      <Select
                        value={selectedStaff.status}
                        onValueChange={(value) =>
                          setSelectedStaff({
                            ...selectedStaff,
                            status: value as "active" | "inactive" | "archived",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Faol</SelectItem>
                          <SelectItem value="inactive">Faol emas</SelectItem>
                          <SelectItem value="archived">Arxivlangan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Manzil</Label>
                    <Textarea
                      value={selectedStaff.address}
                      onChange={(e) =>
                        setSelectedStaff({
                          ...selectedStaff,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  {selectedStaff.salary && (
                    <div className="space-y-2">
                      <Label>Maosh (so'm)</Label>
                      <Input
                        type="number"
                        value={selectedStaff.salary}
                        onChange={(e) =>
                          setSelectedStaff({
                            ...selectedStaff,
                            salary: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Qo'shimcha eslatmalar</Label>
                    <Textarea
                      value={selectedStaff.notes || ""}
                      onChange={(e) =>
                        setSelectedStaff({
                          ...selectedStaff,
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
                    <Button onClick={handleEditStaff} className="flex-1">
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
