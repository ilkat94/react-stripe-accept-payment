import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';
import { AuthContext } from '../context';

interface Props {
  children: React.ReactNode;
}

export interface LoginData {
  name: string;
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = useCallback(
    (data: LoginData) => {
      setUser(data);

      navigate('/');
    },
    [setUser, navigate]
  );

  const logout = useCallback(async () => {
    setUser(null);
    navigate('/login', { replace: true });
  }, [setUser, navigate]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
