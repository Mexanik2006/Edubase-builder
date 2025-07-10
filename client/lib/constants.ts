export interface User {
  username: string;
  password: string;
  role: "director" | "admin";
  projectId?: string;
  projectName?: string;
  isActive: boolean;
  displayName: string;
}

export const USERS: User[] = [
  {
    username: "directormainf",
    password: "director1234",
    role: "director",
    isActive: true,
    displayName: "Director (Asosiy)",
  },
  {
    username: "talim",
    password: "1234",
    role: "admin",
    projectId: "education",
    projectName: "EduBase-Ta'lim boshqaruvi",
    isActive: true,
    displayName: "Ta'lim Admin (Aktiv)",
  },
  {
    username: "oshxona",
    password: "1234",
    role: "admin",
    projectId: "kitchen",
    projectName: "EduBase-Oshxona",
    isActive: false,
    displayName: "Oshxona Admin (Faol emas)",
  },
  {
    username: "yotoqxona",
    password: "1234",
    role: "admin",
    projectId: "dormitory",
    projectName: "EduBase-Yotoqxona",
    isActive: true,
    displayName: "Yotoqxona Admin (Aktiv)",
  },
  {
    username: "ielts",
    password: "1234",
    role: "admin",
    projectId: "ielts",
    projectName: "EduBase-IELTS MOCK test",
    isActive: false,
    displayName: "IELTS Admin (Faol emas)",
  },
  {
    username: "kutibxona",
    password: "1234",
    role: "admin",
    projectId: "library",
    projectName: "EduBase-Kutubxona",
    isActive: true,
    displayName: "Kutubxona Admin (Aktiv)",
  },
];

export const getUser = (username: string): User | undefined => {
  return USERS.find((user) => user.username === username);
};

export const authenticateUser = (
  username: string,
  password: string,
): User | null => {
  const user = USERS.find(
    (u) => u.username === username && u.password === password,
  );
  return user || null;
};
