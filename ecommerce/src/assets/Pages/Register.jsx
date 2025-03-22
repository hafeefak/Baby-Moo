import {Formik,Form,ErrorMessage,Field} from "formik"

import '../styles/register.css';
import React from "react";
import axios from "axios";
import {  toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { registervalidationschema } from "../Schema/Validationschema";


function Register() {
    const navigate=useNavigate()
    const initialValues={
        name:'',
        username:'',
        email:'',
        password:'',
        confirmpassword:'',
        cart:[],
        order:[]
     };
     const onSubmit=async(values,{resetForm})=>{
        try{
            console.log("form data",values)
            const existingUsername= await axios.get('http://localhost:5001/users',{
                params:{username :values.username}
            });
            if(existingUsername.data.length>0){
                    toast.error("username already exists")
                    return;
            }
            const existingemail= await axios.get('http://localhost:5001/users',{
                params:{email :values.email}
            });
            if(existingemail.data.length>0){
                    toast.error("email already exists")
                    return
            }

            const{confirmpassword,...userData}=values;
           
            const response=await axios.post('http://localhost:5001/users',userData)
            console.log("registraion succes",userData)
            toast.success("registration succesfull")
            resetForm()
            console.log("Navigating to /userlogin");
        navigate("/userlogin");

            
        }
        catch(error){
            console.log("registration failed",error)
            toast.error("registraion failed")
        }

     }
   
  return (
    <div className="signup scrollbar-y-hidden">
     <h1 >Sign up</h1> 
     <Formik  
     initialValues={initialValues}
     validationSchema={registervalidationschema}
     onSubmit={onSubmit}
     >
        <Form>
        <div className="signupform ">
                        <Field type='text' placeholder='Name' id='name' name="name"/>
                        <ErrorMessage name="name" component='div' className="error" />
                    </div>
                    <div className="signupform  ">
                        <Field type='text' placeholder='Username' id='username' name="username"/>
                        <ErrorMessage name="username" component='div' className="error" />
                    </div>
                    <div className="signupform ">
                        <Field type='email' placeholder='Email' id='email'name="email" />
                        <ErrorMessage name="email" component='div' className="error" />
                    </div>
                    <div className="signupform">
                        <Field type='password' placeholder='Password' id='password' name="password"/>
                        <ErrorMessage name="password" component='div' className="error" />
                    </div>
                    <div className="signupform ">
                        <Field type='password' placeholder='Confirm Password' id='confirmpassword' name="confirmpassword"/>
                        <ErrorMessage name="confirmpassword" component='div' className="error" />
                    </div>
                    <div className="signupbutn">
                        <button type="submit" className="submit-button" >
                        Sign up
                        </button>
                    </div>
        </Form>

     </Formik>
     <ToastContainer />
    </div>
  )
}

export default Register
