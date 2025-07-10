import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  CheckCircle,
  Circle,
  Plus,
  X,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  TestTube,
  ChefHat,
  Bed,
  BookMarked,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PROJECTS = [
  {
    id: "education",
    name: "EduBase-Ta'lim boshqaruvi",
    description: "Ta'lim jarayonini boshqarish tizimi",
    icon: GraduationCap,
  },
  {
    id: "ielts",
    name: "EduBase-IELTS MOCK test",
    description: "IELTS test tayyorlash va baholash",
    icon: TestTube,
  },
  {
    id: "kitchen",
    name: "EduBase-Oshxona",
    description: "Oshxona va ovqatlanish boshqaruvi",
    icon: ChefHat,
  },
  {
    id: "dormitory",
    name: "EduBase-Yotoqxona",
    description: "Yotoqxona va turar joy boshqaruvi",
    icon: Bed,
  },
  {
    id: "library",
    name: "EduBase-Kutubxona",
    description: "Kutubxona resurslarini boshqarish",
    icon: BookMarked,
  },
];

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
}

interface CenterInfo {
  name: string;
  branchCount: number;
  mainBranch: string;
  branches: Array<{ name: string; location: string; description: string }>;
}

interface ProjectAdmin {
  projectId: string;
  adminLogin: string;
  adminPassword: string;
}

export default function Activation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Personal Information
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
  });

  // Step 2: Center Information
  const [centerInfo, setCenterInfo] = useState<CenterInfo>({
    name: "",
    branchCount: 1,
    mainBranch: "",
    branches: [{ name: "", location: "", description: "" }],
  });

  // Step 3: Project Selection
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // Step 4: Admin Creation
  const [projectAdmins, setProjectAdmins] = useState<ProjectAdmin[]>([]);

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string,
  ) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleCenterInfoChange = (field: keyof CenterInfo, value: any) => {
    setCenterInfo((prev) => ({ ...prev, [field]: value }));
  };

  const addBranch = () => {
    setCenterInfo((prev) => ({
      ...prev,
      branches: [...prev.branches, { name: "", location: "", description: "" }],
    }));
  };

  const removeBranch = (index: number) => {
    setCenterInfo((prev) => ({
      ...prev,
      branches: prev.branches.filter((_, i) => i !== index),
    }));
  };

  const updateBranch = (index: number, field: string, value: string) => {
    setCenterInfo((prev) => ({
      ...prev,
      branches: prev.branches.map((branch, i) =>
        i === index ? { ...branch, [field]: value } : branch,
      ),
    }));
  };

  const toggleProject = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId],
    );
  };

  const updateProjectAdmin = (
    projectId: string,
    field: string,
    value: string,
  ) => {
    setProjectAdmins((prev) => {
      const existing = prev.find((admin) => admin.projectId === projectId);
      if (existing) {
        return prev.map((admin) =>
          admin.projectId === projectId ? { ...admin, [field]: value } : admin,
        );
      } else {
        return [
          ...prev,
          { projectId, adminLogin: "", adminPassword: "", [field]: value },
        ];
      }
    });
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return (
          personalInfo.fullName && personalInfo.email && personalInfo.phone
        );
      case 2:
        return (
          centerInfo.name &&
          centerInfo.mainBranch &&
          centerInfo.branches.every((branch) => branch.name && branch.location)
        );
      case 3:
        return selectedProjects.length > 0;
      case 4:
        return selectedProjects.every((projectId) => {
          const admin = projectAdmins.find((a) => a.projectId === projectId);
          return admin && admin.adminLogin && admin.adminPassword;
        });
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep === 3) {
        // Initialize admin forms for selected projects
        const newAdmins = selectedProjects.map((projectId) => {
          const existing = projectAdmins.find((a) => a.projectId === projectId);
          return (
            existing || {
              projectId,
              adminLogin: "",
              adminPassword: "",
            }
          );
        });
        setProjectAdmins(newAdmins);
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleFinish = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API calls with progress
      const steps = [
        "Ma'lumotlar saqlanmoqda...",
        "Filiallar yaratilmoqda...",
        "Loyihalar sozlanmoqda...",
        "Adminlar yaratilmoqda...",
        "Tizim tayyorlanmoqda...",
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // You can add progress indicators here
      }

      // Save activation status
      localStorage.setItem("director_activated", "true");
      localStorage.setItem(
        "director_data",
        JSON.stringify({
          personalInfo,
          centerInfo,
          selectedProjects,
          projectAdmins,
        }),
      );

      navigate("/dashboard");
    } catch (err) {
      setError("Aktivlashtirishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">To'liq ism</Label>
              <Input
                id="fullName"
                placeholder="To'liq ismingizni kiriting"
                value={personalInfo.fullName}
                onChange={(e) =>
                  handlePersonalInfoChange("fullName", e.target.value)
                }
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email manzil</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={personalInfo.email}
                onChange={(e) =>
                  handlePersonalInfoChange("email", e.target.value)
                }
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon raqam</Label>
              <Input
                id="phone"
                placeholder="+998 90 123 45 67"
                value={personalInfo.phone}
                onChange={(e) =>
                  handlePersonalInfoChange("phone", e.target.value)
                }
                className="h-11"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="centerName">Markaz nomi</Label>
              <Input
                id="centerName"
                placeholder="Ta'lim markazi nomi"
                value={centerInfo.name}
                onChange={(e) => handleCenterInfoChange("name", e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainBranch">Asosiy filial</Label>
              <Input
                id="mainBranch"
                placeholder="Asosiy filial nomi"
                value={centerInfo.mainBranch}
                onChange={(e) =>
                  handleCenterInfoChange("mainBranch", e.target.value)
                }
                className="h-11"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Qo'shimcha filiallar</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addBranch}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Filial qo'shish
                </Button>
              </div>
              {centerInfo.branches.map((branch, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Filial #{index + 1}</h4>
                      {centerInfo.branches.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBranch(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="Filial nomi"
                      value={branch.name}
                      onChange={(e) =>
                        updateBranch(index, "name", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Manzil"
                      value={branch.location}
                      onChange={(e) =>
                        updateBranch(index, "location", e.target.value)
                      }
                    />
                    <Textarea
                      placeholder="Filial haqida qisqacha ma'lumot"
                      value={branch.description}
                      onChange={(e) =>
                        updateBranch(index, "description", e.target.value)
                      }
                      className="min-h-20"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              {PROJECTS.map((project) => {
                const IconComponent = project.icon;
                const isSelected = selectedProjects.includes(project.id);
                return (
                  <Card
                    key={project.id}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? "border-edubase-blue bg-edubase-blue-light"
                        : "hover:border-gray-300"
                    }`}
                    onClick={() => toggleProject(project.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleProject(project.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-edubase-blue/10 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-edubase-blue" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {project.name}
                            </h3>
                            <p className="text-sm text-edubase-gray mt-1">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {selectedProjects.map((projectId) => {
              const project = PROJECTS.find((p) => p.id === projectId);
              const admin = projectAdmins.find(
                (a) => a.projectId === projectId,
              );
              if (!project) return null;

              return (
                <Card key={projectId}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>
                      Ushbu loyiha uchun admin yarating
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label>Admin login</Label>
                      <Input
                        placeholder="Admin login"
                        value={admin?.adminLogin || ""}
                        onChange={(e) =>
                          updateProjectAdmin(
                            projectId,
                            "adminLogin",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Admin parol</Label>
                      <Input
                        type="password"
                        placeholder="Admin parol"
                        value={admin?.adminPassword || ""}
                        onChange={(e) =>
                          updateProjectAdmin(
                            projectId,
                            "adminPassword",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Shaxsiy ma'lumotlar";
      case 2:
        return "Markaz ma'lumotlari";
      case 3:
        return "Loyihalarni tanlash";
      case 4:
        return "Adminlar yaratish";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "O'zingiz haqingizda ma'lumot bering";
      case 2:
        return "Markaz va filiallar haqida ma'lumot";
      case 3:
        return "Kerakli loyihalarni tanlang";
      case 4:
        return "Tanlangan loyihalar uchun adminlar yarating";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edubase-blue-light via-white to-edubase-blue-light p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-edubase-blue shadow-lg shadow-edubase-blue/25 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Director aktivlashtiruvi
          </h1>
          <p className="text-edubase-gray">
            Tizimdan to'liq foydalanish uchun ma'lumotlaringizni kiriting
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step <= currentStep
                    ? "bg-edubase-blue text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step}</span>
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-edubase-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border-0 shadow-xl shadow-black/5">
          <CardHeader>
            <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
            <CardDescription>{getStepDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {renderStep()}

            <div className="flex justify-between mt-6 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Orqaga
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!validateStep() || isLoading}
                  className="bg-edubase-blue hover:bg-edubase-blue-dark"
                >
                  Keyingisi
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={!validateStep() || isLoading}
                  className="bg-edubase-blue hover:bg-edubase-blue-dark"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saqlanmoqda...
                    </>
                  ) : (
                    "Yakunlash"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
