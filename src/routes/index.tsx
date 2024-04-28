import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import RootLayout from '../layout/Root';
import Charge from '../pages/Charge';
import Transactions from '../pages/Transactions';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Charge />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);
