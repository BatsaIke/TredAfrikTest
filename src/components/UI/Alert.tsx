import React, { useState, useEffect } from 'react';
import '../../App.css'; 

const Alert = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  // Define the class name based on the alert type
  const getAlertClassName = () => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      default:
        return '';
    }
  };

  useEffect(() => {
    // Set a timer to hide the alert after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  // Return null if the alert is not visible
  if (!visible) {
    return null;
  }

  return (
    <div className={`alert ${getAlertClassName()}`}>
      {message}
    </div>
  );
};

export default Alert;
