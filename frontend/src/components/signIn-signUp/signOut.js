import { signOut } from '../../libs/auth';

function SignOut({setOpenSignIn}) {

  const handleSignOut =  async (e) => {
    e.preventDefault();
    signOut()
    window.location.reload(false);
  };

  return(
    <>
    <section className='sign-out'>
      <h1>Are You Sure, You Want To Sign Out ?</h1>
      <div>
        <button onClick={() => setOpenSignIn(false)}>Cancel</button>
        <button onClick={handleSignOut}>sign out</button>
      </div>
    </section>
    </>
  )

}

export default SignOut