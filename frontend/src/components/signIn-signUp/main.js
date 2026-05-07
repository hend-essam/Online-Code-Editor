import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SignIn from "./signIn";
import SignUp from "./signUp";
import SignOut from "./signOut";
import ForgetPassword from "./forgetPassword";
import { AuthContext } from "../AuthProvider";

function SignIn_SignUp({openSignIn, setOpenSignIn}){

  const [changeSginIn, setChangeSginIn] = useState('sign-in');

  const { currentUser } = useContext(AuthContext);
  
  return(
    <>
    {openSignIn && (
      <section className="login">
      <button className="x-mark" onClick={() => setOpenSignIn(false)}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {currentUser ? 
      <SignOut 
      setOpenSignIn={setOpenSignIn}
      /> : 
      <>
      {changeSginIn === 'sign-in' ? 
        <SignIn 
        setChangeSginIn={setChangeSginIn}
        setOpenSignIn={setOpenSignIn}
        />
      :changeSginIn === 'sign-up' ?
        <SignUp 
        setChangeSginIn={setChangeSginIn}
        />
      : <ForgetPassword 
        setChangeSginIn={setChangeSginIn}
        />
      }
      </>
      }
      </section>
    )}
    </>
  )
}

export default SignIn_SignUp