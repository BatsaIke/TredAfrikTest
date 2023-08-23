import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; 
import Alert from '../UI/Alert';
import { loginUser } from '../api/api';

type logiProps={
    username: string;
    password: string;
}


const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<logiProps>({
    username: '',
    password: '',
  });
  const [alert, setAlert] = useState<{message: string, type:string}|null>(null); // State for displaying alerts

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {  
    const response = await loginUser(formData); // Use the loginfuntion function
          const token = response.access_token; // Token received from the backend
       localStorage.setItem('accessToken', token);
      // Set the success alert
      setAlert({ message: 'Login successful!', type: 'success' });
      // Redirect to the quiz page after 2 seconds
      setTimeout(() => {
        navigate('/gratitude');
      }, 2000);
    } catch (error) {
      console.error(error);
      setAlert({ message: 'Invalid username or password', type: 'error' });
      // Reset the visible state to true after 3 seconds
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          {/* Render the alert if it exists */}
          {alert && <Alert message={alert.message} type={alert.type} />}

          <span className="button__text">Log In Now</span>
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="login__input"
                placeholder="username"
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="login__input"
                placeholder="Password"
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <button className="button login__submit">
              <Link to="/signup">
                <span className="button__text">or Sign up here</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </Link>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
