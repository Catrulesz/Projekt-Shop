import React, {useState,useEffect} from 'react';
import UserCheck from '../serwer_scripts/UserCheck';

export default function LoginForm (){
  const [logged, setLogged] = useState("gosc");

  const index =document.cookie.indexOf("=");
  console.log(document.cookie.slice(index+1));
  if(document.cookie.slice(index+1)!='' && logged === "gosc"){
    setLogged(document.cookie.slice(index+1));
  }

  async function ClickProcess(event){
    document.getElementById("loginErrorMsg").innerHTML="logowanie...";
    event.preventDefault();
    const login = document.getElementById("Login");
    const password = document.getElementById("Password");

    const username = await UserCheck(login.value,password.value);

    if(username != null)
    {
      setLogged(username);
      document.getElementById("LoggedUser").innerHTML=username;
      document.getElementById("loginErrorMsg").innerHTML="zalogowano";
    }
    else{
      document.getElementById("loginErrorMsg").innerHTML="podany login lub hasło jest niepoprawny";
    }
  }
  useEffect(() => {
    console.log('Witaj', logged);
    document.getElementById("LoggedUser").innerHTML="witaj "+logged;
  }, [logged])

  return(
    <div className='Login Box'>
      <fieldset>
        <form method="get" onSubmit={ClickProcess}>

          <legend>Login</legend>
          <label for="Login">login</label>
          <input  type="text"
                  class="main-search-bar login"
                  id="Login"
                  placeholder="Login"
                  required
                  />
          <label for="Password">password</label>
          <input  type="password"
                  id="Password"
                  placeholder="Hasło"
                  required
                  />
          <button class="login-button" type="submit">
            Zaloguj</button>
        </form>
        <p id="loginErrorMsg"></p>
      </fieldset>
    </div>
  );
}