import React from "react";


function Login(params) {

  function onSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const discordid = e.target.discordId.value;
    params.onLogin({email: email, discordId: discordid});
  }
  return <>
    <form onSubmit={onSubmit}>
      <input type="email" name="email" />
      <input type="text" name="discordId" />
      <button type="submit">login</button>
    </form>
  </>
}

export default Login;