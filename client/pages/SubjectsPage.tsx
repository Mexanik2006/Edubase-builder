import React, { useState, useEffect } from "react";
import { EducationSidebar } from "@/components/ui/education-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, Plus, Edit, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/lib/constants";

export default function SubjectsPage() {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any>(null);

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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Fanlar boshqaruvi
            </h1>
            <p className="text-gray-600">
              O'quv fanlarini yaratish va boshqarish
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookMarked className="w-5 h-5" />
                <span>Fanlar bo'limi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BookMarked className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Fanlar boshqaruvi ishlab chiqilmoqda
                </h3>
                <p className="text-gray-600 mb-4">
                  Bu yerda fanlarni yaratish, tahrirlash va boshqarish
                  imkoniyatlari bo'ladi
                </p>
                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Plus className="w-4 h-4" />
                    <span>Fan yaratish</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Edit className="w-4 h-4" />
                    <span>Fan tahrirlash</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Narx belgilash</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
