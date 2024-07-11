import './main.css';

export default function Zalogowany({changePage,reload}){

    const index =document.cookie.indexOf("=");
    const loggedUser=document.cookie.slice(index+1);

    const wyloguj = () =>{
        console.log("wylogowywanie sie")
        var d = new Date();
        d.setTime(d.getTime()-1);
        document.cookie = "sesion cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        console.log(document.cookie);
        reload();
    }

    return(
        
        <html lang="pl">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Twoje konto</title>
            <link rel="stylesheet" type="text/css" href="Style/main-style.css" />
            <link rel="stylesheet" type="text/css" href="Style/konto-style.css" />
        </head>
        <body>
            <div class="container">
            <div class="logo">Sklep.pl</div>
            <header class="header">
                <nav>
                <ul>
                    <li><button class="nav-button" onClick={()=>changePage(1)}>Home</button></li>
                    <li><button class="nav-button" onClick={()=>changePage(1)}>Produkty</button></li>
                    <li><button class="nav-button" onClick={()=>changePage(1)}>Koszyk</button></li>
                    <li><button class="nav-button" onClick={()=>changePage(1)}>Moje konto</button></li>
                </ul>
                </nav>
            </header>
            <div class="body">
                <div class="konto">
                <label class="zaloguj">Jesteś już zalogowany</label>
                <label class="zaloguj">jako {loggedUser}</label>

                <button class="login-button" onClick={wyloguj}>Wyloguj się</button>
                </div>
            </div>
            <div class="footer">Sklep.pl © 2024</div>
            </div>
        </body>
        </html>
    );
}