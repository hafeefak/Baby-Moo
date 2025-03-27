import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminvalidationschema } from '../Schema/Validationschema';
import '../styles/login.css';

function AdminLogin() {
  const navigate = useNavigate();

 
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values) => {
    try {
      
      if (values.email === 'hafeefak@gmail.com' && values.password === 'Hafeefa@123') {
       
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('role', 'admin'); 
        toast.success(`Welcome, Admin!`);
        navigate('/adminhome');
      } else {
        
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Try again.');
    }
  };

  return (
    <div className="login max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-5 text-center">Admin Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={adminvalidationschema}
        onSubmit={onSubmit}
      >
        <Form>
  
          <div className="loginform mb-4">
            <Field type="email" id="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="loginform mb-4">
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

       
          <div className="loginbutn mb-4">
            <button type="submit" className="submit-button">
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default AdminLogin;
