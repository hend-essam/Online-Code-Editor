import React, { createContext, useEffect, useState } from 'react';
import { checkAuth } from "../libs/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () =>{
  const user = await checkAuth()
    setCurrentUser(user);

    }

  useEffect( ()=>{

  fetchUser()
  },[])
  

  const authContextValue = {
    currentUser,
  };


  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
