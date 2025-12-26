export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email:  string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface Tool {
  name: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ScanRequest {
  url: string;
  tools: string[];
}