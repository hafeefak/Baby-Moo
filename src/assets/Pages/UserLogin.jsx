import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginvalidationschema } from '../Schema/Validationschema';
import api from "../../api/axiosConfig";
import { storeAuthData } from '../../Utils/Auth';
import { AuthContext } from '../Context/Authcontext';

function UserLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

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
      const role = userData.role || 'user';

      storeAuthData(token, userData, role);
      login(userData, role);

      toast.success(`Welcome, ${userData.name || 'user'}!`);
      setTimeout(() => navigate('/'), 500); // show toast before redirect
    } else {
      toast.error('Login failed!');  // your own fixed message
    }
  } catch (error) {
    console.error('Login error:', error);

    const status = error.response?.data?.statusCode;

    if (status === 403) {
      toast.error('Your account is blocked. Please contact admin.');
    } else if (status === 401) {
      toast.error('Invalid email or password.');
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-5 text-center">Log in</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={loginvalidationschema}
        onSubmit={onSubmit}
      >
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

          <div className="register-link mt-3 text-center">
            <p>
              Don't have an account? <br />
              <Link to="/register" className="sign-up-link">Register</Link>
            </p>
          </div>
        </Form>
      </Formik>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default UserLogin;
