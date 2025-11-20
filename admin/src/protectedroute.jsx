import React from 'react'
import {Navigate} from "react-router-dom"
const Protectedroute = ({children}) => {
    let token  = localStorage.getItem("providerToken");
    if(!token){
  return <Navigate to="/login" replace/>
    }
    return children
}

export default Protectedroute;
