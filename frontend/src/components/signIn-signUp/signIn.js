import { useState } from "react";
import { signIn } from "../../libs/auth";

function SignIn({ setChangeSginIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = { email, password };
    const res = await signIn(params);
    if (res && res.data) {
      console.log(res.data);
    }
    window.location.reload(false);
  };

  return (
    <div className="login-box">
      <h2>Sign In</h2>
      <form>
        <fieldset>
          <legend>Email</legend>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Password</legend>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <a href="#" onClick={handleSubmit}>
          Submit
        </a>
        <section>
          <div onClick={() => setChangeSginIn("sign-up")}>Create Account</div>
          {/* <div onClick={()=> setChangeSginIn('forget-pass')}>Forget Password</div> */}
        </section>
      </form>
    </div>
  );
}

export default SignIn;
