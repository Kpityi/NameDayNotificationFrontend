import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContenxt';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { userData } = useUser();

  // Ha a felhasználó nincs bejelentkezve, átirányítás a login oldalra
  return userData ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
