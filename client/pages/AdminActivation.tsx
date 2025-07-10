import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
}

interface Branch {
  name: string;
  location: string;
  description: string;
}

export default function AdminActivation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);

  // Step 1: Personal Information
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
  });

  // Step 2: Branch Selection
  const [selectedBranch, setSelectedBranch] = useState("");

  useEffect(() => {
    // Check if user is logged in as admin
    const adminData = localStorage.getItem("current_admin");
    if (!adminData) {
      navigate("/login");
      return;
    }

    const admin = JSON.parse(adminData) as User;
    setCurrentAdmin(admin);

    // Get director's branches from localStorage
    const directorData = localStorage.getItem("director_data");
    if (directorData) {
      const data = JSON.parse(directorData);
      setBranches(data.centerInfo.branches || []);
    } else {
      // If no director data, create mock branches for demo
      setBranches([
        {
          name: "Asosiy filial",
          location: "Toshkent, Yunusobod tumani",
          description: "Markazning asosiy filiali",
        },
        {
          name: "Samarqand filiali",
          location: "Samarqand shahar, Registon ko'chasi",
          description: "Samarqanddagi filial",
        },
        {
          name: "Farg'ona filiali",
          location: "Farg'ona shahar, Mustaqillik ko'chasi",
          description: "Farg'ona viloyatidagi filial",
        },
      ]);
    }
  }, [navigate]);

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string,
  ) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return (
          personalInfo.fullName && personalInfo.email && personalInfo.phone
        );
      case 2:
        return selectedBranch !== "";
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
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
        "Admin ma'lumotlari saqlanmoqda...",
        "Filial tayinlanmoqda...",
        "Tizim sozlanmoqda...",
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Save activation status
      if (currentAdmin) {
        const adminActivationKey = `admin_${currentAdmin.username}_activated`;
        localStorage.setItem(adminActivationKey, "true");
        localStorage.setItem(
          `admin_${currentAdmin.username}_data`,
          JSON.stringify({
            personalInfo,
            selectedBranch,
            activationDate: new Date().toISOString(),
          }),
        );
      }

      navigate("/admin-dashboard");
    } catch (err) {
      setError("Aktivlashtirishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-edubase-blue-light via-white to-edubase-blue-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-edubase-blue border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-edubase-gray">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

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
              <Label>Filial tanlash</Label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Filial tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch, index) => (
                    <SelectItem key={index} value={branch.name}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{branch.name}</span>
                        <span className="text-sm text-gray-500">
                          {branch.location}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedBranch && (
              <div className="p-4 bg-edubase-blue-light rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Tanlangan filial
                </h4>
                {branches
                  .filter((branch) => branch.name === selectedBranch)
                  .map((branch, index) => (
                    <div key={index} className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Nomi:</span> {branch.name}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Manzil:</span>{" "}
                        {branch.location}
                      </p>
                      {branch.description && (
                        <p className="text-sm">
                          <span className="font-medium">Ma'lumot:</span>{" "}
                          {branch.description}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            )}
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
        return "Filial tanlash";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "O'zingiz haqingizda ma'lumot bering";
      case 2:
        return "Ishlash uchun filial tanlang";
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
            Admin aktivlashtiruvi
          </h1>
          <p className="text-edubase-gray">
            {currentAdmin.projectName} uchun ma'lumotlaringizni kiriting
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2].map((step) => (
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
              style={{ width: `${(currentStep / 2) * 100}%` }}
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

              {currentStep < 2 ? (
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
