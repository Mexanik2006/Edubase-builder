import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, BookOpen, User, CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { USERS, authenticateUser, type User } from "@/lib/constants";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const user = authenticateUser(credentials.username, credentials.password);

      if (user) {
        if (user.role === "director") {
          // Check if director is already activated
          const isActivated =
            localStorage.getItem("director_activated") === "true";
          if (isActivated) {
            navigate("/dashboard");
          } else {
            navigate("/activation");
          }
        } else if (user.role === "admin") {
          // Store current admin info
          localStorage.setItem("current_admin", JSON.stringify(user));

          if (user.isActive) {
            // Check if admin is already activated
            const adminActivationKey = `admin_${user.username}_activated`;
            const isAdminActivated =
              localStorage.getItem(adminActivationKey) === "true";

            if (isAdminActivated) {
              navigate("/admin-dashboard");
            } else {
              navigate("/admin-activation");
            }
          } else {
            navigate("/admin-activation");
          }
        }
      } else {
        setError("Login yoki parol noto'g'ri");
      }
    } catch (err) {
      setError("Tizimda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const selectUser = (user: User) => {
    setCredentials({
      username: user.username,
      password: user.password,
    });
    setShowUserList(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edubase-blue-light via-white to-edubase-blue-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-edubase-blue shadow-lg shadow-edubase-blue/25 mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EduBase</h1>
          <p className="text-edubase-gray">
            Ta'lim tizimini boshqarish platformasi
          </p>
        </div>

        <Card className="border-0 shadow-xl shadow-black/5">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold">
              Tizimga kirish
            </CardTitle>
            <CardDescription>
              Foydalanuvchi sifatida tizimga kirishingiz kerak
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Demo Users Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Test foydalanuvchilari
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserList(!showUserList)}
                  >
                    {showUserList ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {showUserList && (
                  <div className="space-y-2 p-3 bg-gray-50 rounded-lg border max-h-64 overflow-y-auto">
                    {USERS.map((user) => (
                      <div
                        key={user.username}
                        className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => selectUser(user)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">
                              {user.displayName}
                            </span>
                            {user.isActive ? (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800 text-xs"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Aktiv
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Faol emas
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.username} / {user.password}
                          </div>
                          {user.projectName && (
                            <div className="text-xs text-edubase-gray">
                              {user.projectName}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Login</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Loginni kiriting"
                  value={credentials.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  disabled={isLoading}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Parolni kiriting"
                  value={credentials.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  disabled={isLoading}
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-edubase-blue hover:bg-edubase-blue-dark"
                disabled={
                  isLoading || !credentials.username || !credentials.password
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Tekshirilmoqda...
                  </>
                ) : (
                  "Kirish"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-center text-edubase-gray">
                Login va parolingiz EduBase tomonidan beriladi.
                <br />
                Test uchun yuqoridagi foydalanuvchilardan birini tanlang.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
