import './main.css';
import './loginPage.css';
import React, {useState,useEffect} from 'react';
import UserCheck from '../serwer_scripts/UserCheck';
import RegisterPage from './registerPage';

export default function LoginPage({changePage}){
    const [logged, setLogged] = useState("gosc");
    const [register, setRegister] = useState(false);
    const [registerMessage, setRegisterMessage] = useState("");

    const index =document.cookie.indexOf("=");
    console.log(document.cookie.slice(index+1));
    if(document.cookie.slice(index+1)!='' && logged === "gosc"){
      setLogged(document.cookie.slice(index+1));
    }
  
    const registerCompleted = ()=>{
        setRegisterMessage("Zajerestrowano pomyślnie");
    }

    async function ClickProcess(event){
      setRegisterMessage('');
      document.getElementById("loginErrorMsg").innerHTML="logowanie...";
      event.preventDefault();
      const login = document.getElementById("login");
      const password = document.getElementById("password");
  
      const username = await UserCheck(login.value,password.value);
  
      if(username != null)
      {
        setLogged(username);
        changePage(1);
      }
      else{
        document.getElementById("loginErrorMsg").innerHTML="podany login lub hasło jest niepoprawny";
      }
    }

    const registerActivate = () =>{
        setRegister(!register);
    }

    if (register == false)
        {
            return(
                <html lang="pl">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Zaloguj się</title>
                </head>
                <body>
                    <div class="container">
                    <div class="logo">Sklep.pl</div>
                    <header class="header">
                        <nav>
                        <ul>
                            <li><button class="nav-button" onClick={()=>changePage(1)}>Home</button></li>
                            <li><button class="nav-button" onClick={()=>changePage(2)}>Produkty</button></li>
                            <li><button class="nav-button" onClick={()=>changePage(3)}>Koszyk</button></li>
                            <li><button class="nav-button" onClick={()=>changePage(4)}>Moje konto</button></li>
                        </ul>
                        </nav>
                    </header>
                    <div class="body">
                        <div class="konto">
                            <form method="get" onSubmit={ClickProcess}>
                                <label class="zaloguj">Zaloguj się</label>
                                <input
                                    type="text"
                                    id="login"
                                    class="main-search-bar login"
                                    placeholder="Login"
                                    required
                                />
                                <input
                                    type="password"
                                    id="password"
                                    class="main-search-bar login"
                                    placeholder="Hasło"
                                    required
                                />
                                <button class="login-button" type="submit">Zaloguj</button><br />
                                <button
                                    class="register-button"
                                    onClick={registerActivate}
                                >
                                    Załóż konto
                                </button>
                            </form>
                            <h1 id='loginErrorMsg'></h1>
                            <h1 id='message'>{registerMessage}</h1>
                        </div>
                    </div>
                    <div class="footer">Sklep.pl © 2024</div>
                    </div>
                </body>
                </html>
                );
        }
        else{
            return(
                <RegisterPage  changePage={changePage} registerActivate={registerActivate} message={registerCompleted}/>
            )
        }
}