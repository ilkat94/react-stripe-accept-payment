import { createContext } from 'react';
import { LoginData } from '../providers/AuthProvider';

interface AuthContextType {
  user: LoginData;
  login: (data: LoginData) => void;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  user: { name: '', access_token: '', token_type: '', expires_in: 0 },
  login: async () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContext);
