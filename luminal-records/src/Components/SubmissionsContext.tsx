// Components/SubmissionsContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface DemoSubmission {
  id: string;
  artistName: string;
  realName: string;
  genre: string;
  subgenre: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  bio: string;
  influences: string;
  demoLink: string;
  socialInstagram: string;
  socialSpotify: string;
  socialYoutube: string;
  existingReleases: string;
  exclusiveInterest: string;
  heardAbout: string;
  message: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "interested" | "declined";
}

interface SubmissionsContextValue {
  submissions: DemoSubmission[];
  addSubmission: (
    data: Omit<DemoSubmission, "id" | "submittedAt" | "status">,
  ) => void;
  updateStatus: (id: string, status: DemoSubmission["status"]) => void;
}

const SubmissionsContext = createContext<SubmissionsContextValue | null>(null);

const STORAGE_KEY = "luminal_demo_submissions";

// Seed data shown in admin until real submissions arrive
const seedSubmissions: DemoSubmission[] = [
  {
    id: "seed-1",
    artistName: "Luna Vox",
    realName: "Luna Velez",
    genre: "R&B",
    subgenre: "Neo-Soul",
    email: "luna@email.com",
    phone: "",
    city: "Atlanta",
    country: "USA",
    bio: "Soulful vocalist blending classic R&B with modern production.",
    influences: "Erykah Badu, SZA",
    demoLink: "soundcloud.com/lunavox",
    socialInstagram: "@lunavox",
    socialSpotify: "",
    socialYoutube: "",
    existingReleases: "yes",
    exclusiveInterest: "open",
    heardAbout: "Instagram",
    message: "",
    submittedAt: "2024-06-10",
    status: "pending",
  },
  {
    id: "seed-2",
    artistName: "Dario X",
    realName: "Dario Montez",
    genre: "Hip Hop",
    subgenre: "Trap",
    email: "dario@email.com",
    phone: "",
    city: "New York",
    country: "USA",
    bio: "High-energy trap artist from the Bronx with three mixtapes out.",
    influences: "Future, Lil Uzi Vert",
    demoLink: "spotify.com/dariox",
    socialInstagram: "@dariox",
    socialSpotify: "spotify.com/dariox",
    socialYoutube: "",
    existingReleases: "yes",
    exclusiveInterest: "yes",
    heardAbout: "Referral",
    message: "",
    submittedAt: "2024-06-08",
    status: "interested",
  },
  {
    id: "seed-3",
    artistName: "Solar",
    realName: "",
    genre: "Electronic",
    subgenre: "Ambient House",
    email: "solar@email.com",
    phone: "",
    city: "London",
    country: "UK",
    bio: "Producer crafting immersive electronic soundscapes.",
    influences: "Four Tet, Bonobo",
    demoLink: "youtube.com/solar",
    socialInstagram: "",
    socialSpotify: "",
    socialYoutube: "youtube.com/solar",
    existingReleases: "no",
    exclusiveInterest: "no",
    heardAbout: "Press",
    message: "",
    submittedAt: "2024-06-05",
    status: "reviewed",
  },
];

export const SubmissionsProvider = ({ children }: { children: ReactNode }) => {
  const [submissions, setSubmissions] = useState<DemoSubmission[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as DemoSubmission[];
        if (parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return seedSubmissions;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch {
      // ignore quota errors silently
    }
  }, [submissions]);

  const addSubmission = (
    data: Omit<DemoSubmission, "id" | "submittedAt" | "status">,
  ) => {
    const entry: DemoSubmission = {
      ...data,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setSubmissions((prev) => [entry, ...prev]);
  };

  const updateStatus = (id: string, status: DemoSubmission["status"]) =>
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s)),
    );

  return (
    <SubmissionsContext.Provider
      value={{ submissions, addSubmission, updateStatus }}
    >
      {children}
    </SubmissionsContext.Provider>
  );
};

export const useSubmissions = () => {
  const ctx = useContext(SubmissionsContext);
  if (!ctx)
    throw new Error("useSubmissions must be used inside SubmissionsProvider");
  return ctx;
};
