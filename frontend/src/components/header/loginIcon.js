import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../AuthProvider";
import { useContext } from "react";

function LoginIcon({ setOpenSignIn }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="login-icon" onClick={() => setOpenSignIn(true)}>
      {currentUser ? (
        <FontAwesomeIcon icon={faRightFromBracket} />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}
    </div>
  );
}

export default LoginIcon;
