function ForgetPassword({setChangeSginIn}){
  return(
    <div className="login-box">
      <h2>Forget Password</h2>
      <p></p>
      <form>
        <fieldset>
          <legend>Email</legend>
          <input type="type" />
        </fieldset>

        <section>
          <div>Send Code</div>
          <div onClick={() => setChangeSginIn('sign-in')}>Cancel</div>
        </section>

      </form>
    </div> 
  )
}

export default ForgetPassword;