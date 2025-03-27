import { Navigate } from "react-router-dom";
export default function Adminprotect({children}){


        const isadmin=localStorage.getItem("isAdmin")==="true";
        return  isadmin? children :<Navigate to ="/adminlogin" replace/>
}   
