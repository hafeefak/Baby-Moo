import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginvalidationschema } from '../Schema/Validationschema';


function UserLogin() {
  const navigate = useNavigate();


  const initialValues = {
    email: '',
    password: '',
  };


  const onSubmit = async (values) => {
    try {

      const response = await axios.get('http://localhost:5001/users');
      const user = response.data.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
         localStorage.setItem('id', user.id)
        localStorage.setItem('name', user.name)
        toast.success(`Welcome, ${user.name}!`);
        navigate('/');
      } else {
        toast.error('Become a part of our family');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg scrollbar-y-hidden">
      <h1 className="text-3xl font-bold mb-5 text-center">Log in</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={loginvalidationschema}
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
            <button type="submit" className="submit-button ">
              Login
            </button>
          </div>

          <div className="register-link mt-3">
            <p>
              Don't have an account?
              <br />
              <Link to="/register" className="sign-up-link">
                Register
              </Link>
            </p>
          </div>
        </Form>
      </Formik>



    </div>
  );
}

export default UserLogin;
