import { useState } from 'react';
import { signUp } from '../../libs/auth';

function SignUp({setChangeSginIn}){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !lastName.trim()) return setError('First and last name are required.');
    if (!email.includes('@')) return setError('Email must be valid.');
    if (password.length < 4 || password.length > 20) return setError('Password must be between 4 and 20 characters.');

    const res = await signUp({ firstName, lastName, email, password });
    if (res?.error) {
      setError(res.error);
      return;
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
        {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>}
        <a href="#" onClick={handleSubmit}>
          Submit
        </a>
        <div onClick={()=> setChangeSginIn('sign-in')}>Already have an account?</div>
      </form>
    </div>
  )
}

export default SignUp;