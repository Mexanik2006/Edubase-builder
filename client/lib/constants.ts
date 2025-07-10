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
  // Ta'lim - Education
  {
    username: "talim_aktiv",
    password: "1234",
    role: "admin",
    projectId: "education",
    projectName: "EduBase-Ta'lim boshqaruvi",
    isActive: true,
    displayName: "Sardor Karimov - Ta'lim (Aktiv)",
  },
  {
    username: "talim_yangi",
    password: "1234",
    role: "admin",
    projectId: "education",
    projectName: "EduBase-Ta'lim boshqaruvi",
    isActive: false,
    displayName: "Gulnora Saidova - Ta'lim (Yangi)",
  },
  // Oshxona - Kitchen
  {
    username: "oshxona_aktiv",
    password: "1234",
    role: "admin",
    projectId: "kitchen",
    projectName: "EduBase-Oshxona",
    isActive: true,
    displayName: "Bobur Toshmatov - Oshxona (Aktiv)",
  },
  {
    username: "oshxona_yangi",
    password: "1234",
    role: "admin",
    projectId: "kitchen",
    projectName: "EduBase-Oshxona",
    isActive: false,
    displayName: "Madina Yusupova - Oshxona (Yangi)",
  },
  // Yotoqxona - Dormitory
  {
    username: "yotoq_aktiv",
    password: "1234",
    role: "admin",
    projectId: "dormitory",
    projectName: "EduBase-Yotoqxona",
    isActive: true,
    displayName: "Javohir Rahimov - Yotoqxona (Aktiv)",
  },
  {
    username: "yotoq_yangi",
    password: "1234",
    role: "admin",
    projectId: "dormitory",
    projectName: "EduBase-Yotoqxona",
    isActive: false,
    displayName: "Nilufar Abdullayeva - Yotoqxona (Yangi)",
  },
  // IELTS
  {
    username: "ielts_aktiv",
    password: "1234",
    role: "admin",
    projectId: "ielts",
    projectName: "EduBase-IELTS MOCK test",
    isActive: true,
    displayName: "Davron Mirzayev - IELTS (Aktiv)",
  },
  {
    username: "ielts_yangi",
    password: "1234",
    role: "admin",
    projectId: "ielts",
    projectName: "EduBase-IELTS MOCK test",
    isActive: false,
    displayName: "Lola Nazarova - IELTS (Yangi)",
  },
  // Kutubxona - Library
  {
    username: "kutib_aktiv",
    password: "1234",
    role: "admin",
    projectId: "library",
    projectName: "EduBase-Kutubxona",
    isActive: true,
    displayName: "Farrux Qosimov - Kutubxona (Aktiv)",
  },
  {
    username: "kutib_yangi",
    password: "1234",
    role: "admin",
    projectId: "library",
    projectName: "EduBase-Kutubxona",
    isActive: false,
    displayName: "Shakhnoza Alimova - Kutubxona (Yangi)",
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
