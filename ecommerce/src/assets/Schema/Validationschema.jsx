import * as Yup from "yup";

export const registervalidationschema=()=>Yup.object({
    name:Yup.string()
    .matches(/^[a-zA-Z]+$/,"name only contain letters and spaces")
    .required("name is required"),
    username:Yup.string()
    .required('username is required'),
    email:Yup.string()
    .email('invalid email format')
    .required('email is required'),
    password:Yup.string()
    .matches(/[A-Z]/,'Password must contain atleast one uppercase letter')
    .matches(/[a-z]/,'Password must contain atleast one lowercase letter')
    .matches(/[0-9]/,'Password must contain atleast one number')
    .min(8,'Password must contain atleast 8 characters')
    .required('password is required'),
    confirmpassword:Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required('please confirm your password')

});


export const loginvalidationschema=()=>
    Yup.object({
        email: Yup.string().required('Email is required'),
        password: Yup.string()
        .min(8,"Password must be atleast 8 characters")
        .required('Password is required')
      });


export const ordervalidationschema=()=>{
     return   Yup.object({
            name:Yup.string().required("name is required"),
            address:Yup.string().required("addres is required"),
            
        
        })
    }

    export const adminvalidationschema=()=>{
       return  Yup.object({
            email: Yup.string().required('Email is required'),
            password: Yup.string()
            .min(8,"Password must be atleast 8 characters")
            .required('Password is required')
          });
        }    

  export const productvalidationschema=()=>Yup.object({
    name:Yup.string().required("name is required"),
    price:Yup.string().required("price is required"),
    quantity:Yup.string().required("quantity is required"),
    category:Yup.string().required("category is required"),
    url:Yup.string().required("image is required")
  })