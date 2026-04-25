// Components/MessagesContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Reply {
  id: string;
  body: string;
  sentAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  inquiry: string;
  subject: string;
  message: string;
  receivedAt: string;
  read: boolean;
  replies: Reply[];
}

interface MessagesContextValue {
  messages: ContactMessage[];
  addMessage: (
    data: Omit<ContactMessage, "id" | "receivedAt" | "read">,
  ) => void;
  markRead: (id: string) => void;
  addReply: (messageId: string, body: string) => void;
}

const MessagesContext = createContext<MessagesContextValue | null>(null);

const STORAGE_KEY = "luminal_contact_messages";

const seedMessages: ContactMessage[] = [
  {
    id: "seed-1",
    name: "Sony Music Rep",
    email: "rep@sony.com",
    inquiry: "business",
    subject: "Q3 Campaign Partnership",
    message:
      "Hi, we'd like to discuss a partnership for the upcoming Q3 campaign. Our team is very interested in working with your roster.",
    receivedAt: "2024-06-10",
    read: false,
    replies: [],
  },
  {
    id: "seed-2",
    name: "Film Sync Agency",
    email: "sync@agency.com",
    inquiry: "sync",
    subject: "Netflix Show Sync Opportunity",
    message:
      "We're looking for hip hop tracks to license for an upcoming Netflix original. Budget is competitive.",
    receivedAt: "2024-06-08",
    read: true,
    replies: [],
  },
  {
    id: "seed-3",
    name: "Music Blog Editor",
    email: "editor@blog.com",
    inquiry: "press",
    subject: "Interview Request — Nujee",
    message:
      "We'd love to feature Nujee in our next issue. We reach 200k monthly readers in the R&B space.",
    receivedAt: "2024-06-07",
    read: false,
    replies: [],
  },
];

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ContactMessage[];
        if (parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return seedMessages;
  });
  const addReply = (messageId: string, body: string) => {
    const reply: Reply = {
      id: `reply-${Date.now()}`,
      body,
      sentAt: new Date().toISOString().split("T")[0],
    };
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, replies: [...m.replies, reply] } : m,
      ),
    );
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota errors
    }
  }, [messages]);

  const addMessage = (
    data: Omit<ContactMessage, "id" | "receivedAt" | "read">,
  ) => {
    const entry: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      receivedAt: new Date().toISOString().split("T")[0],
      read: false,
      replies: [],
    };
    setMessages((prev) => [entry, ...prev]);
  };

  const markRead = (id: string) =>
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );

  return (
    <MessagesContext.Provider
      value={{ messages, addMessage, markRead, addReply }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error("useMessages must be used inside MessagesProvider");
  return ctx;
};
