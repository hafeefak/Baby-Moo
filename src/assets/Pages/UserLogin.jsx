import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginvalidationschema } from '../Schema/Validationschema';
import api from "../../api/axiosConfig";

function UserLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = { email: '', password: '' };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        Email: values.email,
        Password: values.password,
      };
      const { data } = await api.post('/Auth/login', payload);

      if (data && data.statusCode === 200) {
        const userData = data.data;
        const token = userData.token;
        const role = userData.role || 'User';

        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_role', role);

        toast.success(`Welcome, ${userData.name}!`);
        navigate('/');
        
      } else {
        toast.error(data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.message || 'An error occurred';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-5 text-center">Log in</h1>
      <Formik initialValues={initialValues} validationSchema={loginvalidationschema} onSubmit={onSubmit}>
        <Form>
          <div className="loginform mb-4">
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="loginform mb-4">
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div className="loginbutn mb-4">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className="register-link mt-3">
            <p>
              Don't have an account? <br />
              <Link to="/register" className="sign-up-link">Register</Link>
            </p>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default UserLogin;
