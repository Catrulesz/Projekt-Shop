import './produktFull.css';
export default function ProductFull({changePage,product,loadProductPage}){
   
    // Funkcja do dodawania produktu do koszyka
    function dodajDoKoszyka() {
    
        // Pobieramy ilość sztuk produktu
        var ilosc = parseInt(document.getElementById("ilosc").value);
        
        // Pobieramy dane z localStorage
        var koszyk = JSON.parse(localStorage.getItem("koszyk")) || [];
    
        // Dodajemy produkt do koszyka
        var produktWKoszyku = {
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: ilosc
        };
        koszyk.push(produktWKoszyku);
    
        // Zapisujemy koszyk z powrotem do localStorage
        localStorage.setItem("koszyk", JSON.stringify(koszyk));

        document.getElementById('buyMessage').innerHTML = 'Dodano do koszyka!';

    }

    const checkInput = ()=>{
        var input = document.getElementById('ilosc');
        var inputValue = parseFloat(input.value);
        var regex = new RegExp(/[.]/,'i');

        if (inputValue < 1 || Number.isFinite(inputValue) == false || regex.test(input.value) == true)
            {
                console.log("wrong");
                document.getElementById('ilosc').value = 1;
            }
        if (inputValue > 99)
            {
                document.getElementById('ilosc').value = 99;                
            }
    }

    return(      
        <html lang="pl">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Home - Sklep.pl</title>
            </head>
            <body>
                <div class="container">
                <div class="logo">Sklep.pl</div>
                <header class="header">
                    <nav>
                    <ul>
                        <li><button class="nav-button" onClick={()=>changePage(1)}>Home</button></li>
                        <li><button class="nav-button" onClick={()=>loadProductPage(-1)}>Produkty</button></li>
                        <li><button class="nav-button" onClick={()=>changePage(3)}>Koszyk</button></li>
                        <li><button class="nav-button" onClick={()=>changePage(4)}>Moje konto</button></li>
                    </ul>
                    </nav>
                </header>
                <div class="bodyfull">
                    <h2 class="tytul">
                       {product.name}
                    </h2>
                    <div class="content">
                    <img src={product.image} class="img" />
                    <div class="parametry">
                        <p>Procesor: <span class="bold">{product.processor}</span></p>
                        <p>RAM: <span class="bold">{product.ram}</span></p>
                        <p>Dysk SSD: <span class="bold">{product.disk}</span></p>
                        <p>Karta graficzna:<span class="bold">{product.graphics}</span></p>
                        <p>Ekran:<span class="bold">{product.screen}</span></p>
                        <p>System operacyjny: <span class="bold">{product.os}</span></p>
                    </div>
                    <div class="koszyk">
                        <span class="cena">{product.price} zł</span><br /><br />
                        <label class="label-Q" for="ilosc">Ilość sztuk:</label>
                        <input
                        id="ilosc"
                        type="number"
                        class="quantity-input"
                        max="99"
                        min="1"
                        defaultValue={1}
                        onChange={checkInput}
                        />
                        <button id="dodaj-do-koszyka" onClick={dodajDoKoszyka}>Dodaj do koszyka</button>
                        <button id="kup-teraz" onClick={()=>changePage(5)}>Kup teraz</button>
                        <h2 id='buyMessage'></h2>
                    </div>
                    </div>
                    <div class="opis-produktu">
                    <p class="opis">{product.description}</p>
                    </div>
                </div>
                <div class="footer">Sklep.pl © 2024</div>
                </div>
            </body>
        </html>
    );
}