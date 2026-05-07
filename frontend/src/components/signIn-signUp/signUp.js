import { useState } from 'react';
import { signUp } from '../../libs/auth';

function SignUp({setChangeSginIn}){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const handleSubmit = async (e) => {
    e.preventDefault();
    const params = { firstName, lastName, email, password };
    const res = await signUp(params);
    if (res && res.data) {
      console.log(res.data);
    }
    window.location.reload(false);
  };
  
  return(
    <div className="login-box">
      <h2>Sign Up</h2>
      <form>
        <fieldset>
          <legend>First Name</legend>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </fieldset>

        <fieldset>
          <legend>Last Name</legend>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </fieldset>

        <fieldset>
          <legend>Email</legend>
          <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </fieldset>
      
        <fieldset>
          <legend>Password</legend>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </fieldset>
        <a href="#" onClick={handleSubmit}>
          Submit
        </a>
        <div onClick={()=> setChangeSginIn('sign-in')}>Already have an account?</div>
      </form>
    </div>
  )
}

export default SignUp;