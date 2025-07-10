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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

type StaffType = "mentor" | "accountant" | "reception" | "student";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: StaffType;
  status: "active" | "inactive" | "archived";
  joinDate: string;
  branch: string;
  salary?: number;
  subjects?: string[];
  groups?: string[];
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

  // Mock data for staff members
  const [staffMembers] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Javohir Karimov",
      email: "javohir@edubase.uz",
      phone: "+998 90 123 45 67",
      type: "mentor",
      status: "active",
      joinDate: "2023-09-15",
      branch: "Asosiy filial",
      salary: 5000000,
      subjects: ["Ingliz tili", "IELTS"],
      groups: ["Beginner-1", "IELTS-Advanced"],
    },
    {
      id: "2",
      name: "Malika Toshmatova",
      email: "malika@edubase.uz",
      phone: "+998 90 234 56 78",
      type: "mentor",
      status: "active",
      joinDate: "2023-08-20",
      branch: "Asosiy filial",
      salary: 4500000,
      subjects: ["Ingliz tili"],
      groups: ["Intermediate-2"],
    },
    {
      id: "3",
      name: "Dilshod Abdullayev",
      email: "dilshod@edubase.uz",
      phone: "+998 90 345 67 89",
      type: "accountant",
      status: "active",
      joinDate: "2023-07-10",
      branch: "Asosiy filial",
      salary: 3500000,
    },
    {
      id: "4",
      name: "Nilufar Saidova",
      email: "nilufar@edubase.uz",
      phone: "+998 90 456 78 90",
      type: "reception",
      status: "active",
      joinDate: "2023-10-01",
      branch: "Asosiy filial",
      salary: 2500000,
    },
    {
      id: "5",
      name: "Ahmad Rahmonov",
      email: "ahmad.student@gmail.com",
      phone: "+998 90 567 89 01",
      type: "student",
      status: "active",
      joinDate: "2023-11-15",
      branch: "Asosiy filial",
      groups: ["Beginner-1"],
    },
    {
      id: "6",
      name: "Aziza Yunusova",
      email: "aziza.student@gmail.com",
      phone: "+998 90 678 90 12",
      type: "student",
      status: "active",
      joinDate: "2023-11-10",
      branch: "Asosiy filial",
      groups: ["IELTS-Advanced"],
    },
    {
      id: "7",
      name: "Bobur Mirzayev",
      email: "bobur@edubase.uz",
      phone: "+998 90 789 01 23",
      type: "mentor",
      status: "inactive",
      joinDate: "2023-06-15",
      branch: "Asosiy filial",
      salary: 4000000,
      subjects: ["Ingliz tili"],
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
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Yangi xodim qo'shish</DialogTitle>
                        <DialogDescription>
                          Yangi xodim ma'lumotlarini kiriting
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>To'liq ism</Label>
                          <Input placeholder="To'liq ismni kiriting" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" placeholder="email@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label>Telefon</Label>
                          <Input placeholder="+998 90 123 45 67" />
                        </div>
                        <div className="space-y-2">
                          <Label>Lavozim</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Lavozimni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              {staffTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
