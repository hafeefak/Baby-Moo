import * as Yup from 'yup';

export const registervalidationschema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required('Password is required'),
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