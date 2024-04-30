import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../../providers/AuthProvider';
import Header from '../../components/Header';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
}
