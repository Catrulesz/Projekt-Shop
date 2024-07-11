import UserRegister from '../serwer_scripts/UserRegister';

export default function RegisterPage({changePage,registerActivate,message}){
    function ValidatePassword(password, password2){
        if (password != password2)
        {
            document.getElementById("MessageBox").innerHTML="Hasła się niezgadzają";
            return false;
        }
        else{
            if (password.length >= 7)
            {
                return true;
            }
            else
            {
                document.getElementById("MessageBox").innerHTML="Hasło jest za krótkie";
                return false;
            }
        }
    }

    function ValidateLogin(login){
        return login.length >= 3;
    }

    function ValidateUsername(username){
        return username.length >= 3;
    }

    async function ClickProcess(event){
      document.getElementById("MessageBox").innerHTML="rejestrowanie..."
      event.preventDefault();
      const username = document.getElementById("Username");
      const login = document.getElementById("Login");
      const password = document.getElementById("Password");
      const password2 = document.getElementById("Password2");
  
      if (ValidatePassword(password.value,password2.value) == true )
      {
          if(ValidateLogin(login.value) == true)
          {
                if (ValidateUsername(username.value) == true)
                {
                    const response = await UserRegister(username.value,login.value,password.value);
                    if (response != 'Użytkownik o podanym loginie już istnieje')
                        {
                            message();
                            registerActivate();
                            changePage(4);
                        }
                    else
                        {
                         document.getElementById("MessageBox").innerHTML=response;

                        }

                }
                else{
                    document.getElementById("MessageBox").innerHTML="Nazwa użytkownika powinna mieć minimum 3 znaki";
                }

          }
          else{
              document.getElementById("MessageBox").innerHTML="Login musi mieć minimum 3 znaki";
          }
        
      }
    }
    
    
    
    return(
        
    <html lang="pl">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zaloguj się</title>
        <link rel="stylesheet" type="text/css" href="Style/konto-style.css" />
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
            <button onClick={registerActivate} class="back-button">Cofnij</button>
            <form  method="get" onSubmit={ClickProcess}>
                <label class="zaloguj">Zarejestruj się</label>
                <input
                    type="text"
                    class="main-search-bar login"
                    id="Username"
                    placeholder="Nazwa"
                    required
                />
                <input
                    type="text"
                    class="main-search-bar login"
                    id="Login"
                    placeholder="Login"
                    required
                    />
                <input
                    type="password"
                    class="main-search-bar login"
                    id="Password"
                    placeholder="Hasło"
                    required
                />
                <input
                    type="password"
                    class="main-search-bar login"
                    id="Password2"
                    placeholder="Powtórz hasło"
                    required
                />
                <button class="login-button" type="submit">Załóż konto</button>
            </form>
            <h1 id="MessageBox"></h1>
            </div>
        </div>
        <div class="footer">Sklep.pl © 2024</div>
        </div>
    </body>
    </html>

    );
}