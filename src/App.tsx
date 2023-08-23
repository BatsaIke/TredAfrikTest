import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import Login from './components/auth/Login';
import ProtectedRoute from './components/pages/ProtectedRoute';
import Gratitude from './components/pages/Gratitude';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/'); // Navigate to the login page
  };

  useEffect(() => {
    // Check if the user is already logged in 
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      navigate('/gratitude')
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/gratitude" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={Gratitude} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
