import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  component: React.ComponentType; // Use React.ComponentType here
}

const ProtectedRouted: React.FC<ProtectedRouteProps> = ({ isLoggedIn, component: Component }) => {
  if (isLoggedIn) {
    return <Component />;
  } else {
    return <Navigate to='/' />;
  }
};

export default ProtectedRouted;
