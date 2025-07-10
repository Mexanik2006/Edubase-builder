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
import {
  BookMarked,
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Users,
  Clock,
  Search,
  TrendingUp,
  History,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

interface Subject {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in months
  levels: string[];
  status: "active" | "inactive" | "archived";
  createdDate: string;
  totalStudents: number;
  activeGroups: number;
  teachers: string[];
  branch: string;
}

export default function SubjectsPage() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [newSubject, setNewSubject] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    levels: "",
  });

  // Mock data for subjects
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: "1",
      name: "Ingliz tili",
      description: "Umumiy ingliz tili kursi barcha darajalar uchun",
      price: 800000,
      duration: 3,
      levels: ["Beginner", "Elementary", "Intermediate", "Advanced"],
      status: "active",
      createdDate: "2023-09-01",
      totalStudents: 156,
      activeGroups: 8,
      teachers: ["Javohir Karimov", "Malika Toshmatova"],
      branch: "Asosiy filial",
    },
    {
      id: "2",
      name: "IELTS",
      description: "IELTS imtihoniga tayyorgarlik kursi",
      price: 1200000,
      duration: 2,
      levels: ["Pre-IELTS", "IELTS Preparation", "IELTS Advanced"],
      status: "active",
      createdDate: "2023-08-15",
      totalStudents: 45,
      activeGroups: 3,
      teachers: ["Javohir Karimov"],
      branch: "Asosiy filial",
    },
    {
      id: "3",
      name: "Nemis tili",
      description: "Nemis tili asoslari va rivojlantirish",
      price: 900000,
      duration: 4,
      levels: ["A1", "A2", "B1", "B2"],
      status: "active",
      createdDate: "2023-10-01",
      totalStudents: 28,
      activeGroups: 2,
      teachers: ["Bobur Mirzayev"],
      branch: "Asosiy filial",
    },
    {
      id: "4",
      name: "Fransuz tili",
      description: "Fransuz tili boshlang'ich va o'rta daraja",
      price: 850000,
      duration: 4,
      levels: ["A1", "A2", "B1"],
      status: "inactive",
      createdDate: "2023-07-20",
      totalStudents: 16,
      activeGroups: 1,
      teachers: [],
      branch: "Asosiy filial",
    },
    {
      id: "5",
      name: "Business English",
      description: "Biznes ingliz tili professional darajada",
      price: 1000000,
      duration: 2,
      levels: ["Intermediate", "Advanced"],
      status: "active",
      createdDate: "2023-11-01",
      totalStudents: 12,
      activeGroups: 1,
      teachers: ["Malika Toshmatova"],
      branch: "Asosiy filial",
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

  // Filter subjects based on selected branch
  const branchFilteredSubjects = subjects.filter(
    (subject) => subject.branch === adminData.selectedBranch,
  );

  // Apply filters
  const filteredSubjects = branchFilteredSubjects.filter((subject) => {
    const matchesSearch =
      searchQuery === "" ||
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || subject.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: branchFilteredSubjects.length,
    active: branchFilteredSubjects.filter((s) => s.status === "active").length,
    inactive: branchFilteredSubjects.filter((s) => s.status === "inactive")
      .length,
    totalStudents: branchFilteredSubjects.reduce(
      (sum, subject) => sum + subject.totalStudents,
      0,
    ),
    totalRevenue: branchFilteredSubjects.reduce(
      (sum, subject) => sum + subject.price * subject.totalStudents,
      0,
    ),
  };

  const handleAddSubject = () => {
    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject.name,
      description: newSubject.description,
      price: parseInt(newSubject.price),
      duration: parseInt(newSubject.duration),
      levels: newSubject.levels.split(",").map((l) => l.trim()),
      status: "active",
      createdDate: new Date().toISOString().split("T")[0],
      totalStudents: 0,
      activeGroups: 0,
      teachers: [],
      branch: adminData.selectedBranch,
    };

    setSubjects([...subjects, subject]);
    setNewSubject({
      name: "",
      description: "",
      price: "",
      duration: "",
      levels: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditSubject = () => {
    if (!selectedSubject) return;

    const updatedSubjects = subjects.map((subject) =>
      subject.id === selectedSubject.id ? selectedSubject : subject,
    );
    setSubjects(updatedSubjects);
    setIsEditDialogOpen(false);
    setSelectedSubject(null);
  };

  const handleDeleteSubject = (subjectId: string) => {
    const updatedSubjects = subjects.filter(
      (subject) => subject.id !== subjectId,
    );
    setSubjects(updatedSubjects);
  };

  const handleViewSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsViewDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700">
            <Users className="w-3 h-3 mr-1" />
            Faol
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Faol emas
          </Badge>
        );
      case "archived":
        return (
          <Badge className="bg-gray-100 text-gray-700">
            <History className="w-3 h-3 mr-1" />
            Arxivlangan
          </Badge>
        );
      default:
        return null;
    }
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
              Fanlar boshqaruvi
            </h1>
            <p className="text-gray-600">
              {adminData.selectedBranch} filiali fanlari
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BookMarked className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami fanlar
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
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Faol fanlar
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
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Jami daromad
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(stats.totalRevenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Fan qidirish..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant={selectedStatus === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus("all")}
                    >
                      Barchasi
                    </Button>
                    <Button
                      variant={
                        selectedStatus === "active" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedStatus("active")}
                    >
                      Faol
                    </Button>
                    <Button
                      variant={
                        selectedStatus === "inactive" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedStatus("inactive")}
                    >
                      Faol emas
                    </Button>
                  </div>
                </div>

                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Fan qo'shish
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Yangi fan qo'shish</DialogTitle>
                      <DialogDescription>
                        Yangi fan ma'lumotlarini kiriting
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Fan nomi</Label>
                        <Input
                          placeholder="Masalan: Ingliz tili"
                          value={newSubject.name}
                          onChange={(e) =>
                            setNewSubject({
                              ...newSubject,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Ta'rif</Label>
                        <Textarea
                          placeholder="Fan haqida qisqacha ma'lumot"
                          value={newSubject.description}
                          onChange={(e) =>
                            setNewSubject({
                              ...newSubject,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Narx (so'm)</Label>
                          <Input
                            type="number"
                            placeholder="800000"
                            value={newSubject.price}
                            onChange={(e) =>
                              setNewSubject({
                                ...newSubject,
                                price: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Davomiyligi (oy)</Label>
                          <Input
                            type="number"
                            placeholder="3"
                            value={newSubject.duration}
                            onChange={(e) =>
                              setNewSubject({
                                ...newSubject,
                                duration: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Darajalar (vergul bilan ajrating)</Label>
                        <Input
                          placeholder="Beginner, Elementary, Intermediate, Advanced"
                          value={newSubject.levels}
                          onChange={(e) =>
                            setNewSubject({
                              ...newSubject,
                              levels: e.target.value,
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
                        <Button onClick={handleAddSubject} className="flex-1">
                          Qo'shish
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Subjects Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fan</TableHead>
                    <TableHead>Narx</TableHead>
                    <TableHead>Davomiyligi</TableHead>
                    <TableHead>Talabalar</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead className="text-right">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">
                            {subject.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {subject.description.substring(0, 50)}...
                          </p>
                          <div className="flex space-x-1 mt-1">
                            {subject.levels.slice(0, 2).map((level, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {level}
                              </Badge>
                            ))}
                            {subject.levels.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{subject.levels.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {subject.price.toLocaleString()} so'm
                        </span>
                      </TableCell>
                      <TableCell>{subject.duration} oy</TableCell>
                      <TableCell>
                        <div>
                          <span className="font-medium">
                            {subject.totalStudents}
                          </span>
                          <p className="text-xs text-gray-500">
                            {subject.activeGroups} guruh
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(subject.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewSubject(subject)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedSubject(subject);
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
                                  Fanni o'chirish
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bu amalni bekor qilib bo'lmaydi. Fan butunlay
                                  o'chiriladi.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Bekor qilish
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteSubject(subject.id)
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

          {/* View Subject Dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <BookMarked className="w-5 h-5" />
                  <span>{selectedSubject?.name}</span>
                </DialogTitle>
              </DialogHeader>
              {selectedSubject && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Ta'rif</h4>
                    <p className="text-gray-600">
                      {selectedSubject.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Asosiy ma'lumotlar</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Narx:</span>
                          <span className="font-medium">
                            {selectedSubject.price.toLocaleString()} so'm
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Davomiyligi:</span>
                          <span className="font-medium">
                            {selectedSubject.duration} oy
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Holat:</span>
                          {getStatusBadge(selectedSubject.status)}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Statistika</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Jami talabalar:</span>
                          <span className="font-medium">
                            {selectedSubject.totalStudents}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Faol guruhlar:</span>
                          <span className="font-medium">
                            {selectedSubject.activeGroups}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Daromad:</span>
                          <span className="font-medium text-green-600">
                            {(
                              (selectedSubject.price *
                                selectedSubject.totalStudents) /
                              1000000
                            ).toFixed(1)}
                            M so'm
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Darajalar</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubject.levels.map((level, index) => (
                        <Badge key={index} variant="outline">
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">O'qituvchilar</h4>
                    {selectedSubject.teachers.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedSubject.teachers.map((teacher, index) => (
                          <Badge
                            key={index}
                            className="bg-blue-100 text-blue-700"
                          >
                            {teacher}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Hozircha o'qituvchi tayinlanmagan
                      </p>
                    )}
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Subject Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Fanni tahrirlash</DialogTitle>
              </DialogHeader>
              {selectedSubject && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Fan nomi</Label>
                    <Input
                      value={selectedSubject.name}
                      onChange={(e) =>
                        setSelectedSubject({
                          ...selectedSubject,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ta'rif</Label>
                    <Textarea
                      value={selectedSubject.description}
                      onChange={(e) =>
                        setSelectedSubject({
                          ...selectedSubject,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Narx (so'm)</Label>
                      <Input
                        type="number"
                        value={selectedSubject.price}
                        onChange={(e) =>
                          setSelectedSubject({
                            ...selectedSubject,
                            price: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Davomiyligi (oy)</Label>
                      <Input
                        type="number"
                        value={selectedSubject.duration}
                        onChange={(e) =>
                          setSelectedSubject({
                            ...selectedSubject,
                            duration: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditDialogOpen(false)}
                      className="flex-1"
                    >
                      Bekor qilish
                    </Button>
                    <Button onClick={handleEditSubject} className="flex-1">
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
