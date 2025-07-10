import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { registervalidationschema } from "../Schema/Validationschema";
import api from "../../api/axiosConfig";

import '../styles/register.css';

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    role: 'User'   // default backend role
  };

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log("Submitting form data:", values);

      const payload = {
        UserName: values.username,
        Email: values.email,
        Password: values.password,
        Role: values.role
      };

      const response = await api.post('/Auth/register', payload);

      if (response?.data?.statusCode === 200) {
        toast.success("Registration successful!");
        resetForm();
        navigate("/userlogin");
      } else {
        toast.error(response?.data?.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup scrollbar-y-hidden">
      <h1>Sign up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={registervalidationschema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="signupform">
              <Field
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                required
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="signupform">
              <Field
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                required
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="signupform">
              <Field
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                required
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="signupbutn">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default Register;
