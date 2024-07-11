import UserRegister from '../serwer_scripts/UserRegister';

export default function RegisterForm (){
  
    function ValidatePassword(password, password2){
        if (password != password2)
        {
            document.getElementById("MessageBox").innerHTML="hasla sie niezgadzaja";
            return false;
        }
        else{
            if (password.length >= 7)
            {
                return true;
            }
            else
            {
                document.getElementById("MessageBox").innerHTML="haslo jest za krotkie";
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
                    document.getElementById("MessageBox").innerHTML=response;
                }
                else{
                    document.getElementById("MessageBox").innerHTML="nazwa uzytkowanika powinnien miec minimum 3 znaki";
                }

          }
          else{
              document.getElementById("MessageBox").innerHTML="login musi miec minimum 3 znaki";
          }
        
      }
    }
  
  
    return(
      <div className='Login Box'>
        <fieldset>
          <form method="get" onSubmit={ClickProcess}>
  
            <legend>Register</legend>
            <label for="Username">username</label>
            <input  type="text"
                    id="Username"
                    required
                    />
            <label for="Login">login</label>
            <input  type="text"
                    id="Login"
                    required
                    />
            <label for="Password">password</label>
            <input  type="password"
                    id="Password"
                    required
                    />
            <label for="Password2">repeat password</label>
            <input  type="password"
                    id="Password2"
                    required
                    />
            <button type="submit">Zaloguj</button>
          </form>
          <p id="MessageBox"></p>
        </fieldset>
      </div>
    );
  }