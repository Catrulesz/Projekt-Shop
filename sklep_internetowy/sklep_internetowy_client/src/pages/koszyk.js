import './main.css';
import './koszyk.css';
import { useEffect } from 'react';
export default function Koszyk({changePage={changePage}}){
  // Funkcja do wyświetlania produktów w koszyku
  function wyswietlKoszyk() {
    // Pobieramy dane z localStorage
    var koszyk = JSON.parse(localStorage.getItem("koszyk")) || [];
  
    // Wybieramy kontener na produkty w koszyku
    var koszykContent = document.querySelector(".koszyk-content");
    koszykContent.innerHTML = "";
  
    // Inicjujemy zmienną przechowującą łączną kwotę koszyka
    var calkowitaKwota = 0;
  
    // Iterujemy przez produkty w koszyku i dodajemy je do interfejsu użytkownika
    koszyk.forEach(function (produkt, index) {
      var elementKoszyka = document.createElement("div");
      elementKoszyka.classList.add("element");
  
      var img = document.createElement("img");
      img.src = produkt.image;
      elementKoszyka.appendChild(img);
  
      var szczegoly = document.createElement("div");
      szczegoly.classList.add("element-szczegoly");
  
      var nazwa = document.createElement("h3");
      nazwa.textContent = produkt.name;
      szczegoly.appendChild(nazwa);
  
      var cenaIlosc = document.createElement("div");
      cenaIlosc.classList.add("cena-ilosc");
  
      var cena = document.createElement("h4");
      cena.textContent = produkt.price + " zł";
      cenaIlosc.appendChild(cena);
  
      var iloscInput = document.createElement("input");
      iloscInput.type = "number";
      iloscInput.value = produkt.quantity;
      iloscInput.classList.add("quantity-input");
      iloscInput.addEventListener("change", function(e){
          var inputValue = parseFloat(iloscInput.value);
          var regex = new RegExp(/[.]/,'i');

          if (inputValue < 1 || Number.isFinite(inputValue) == false || regex.test(iloscInput.value) == true)
              {
                  iloscInput.value = koszyk[index].quantity;
              }
          if (inputValue > 99)
              {
                iloscInput.value = 99;                
              }

          koszyk[index].quantity=iloscInput.value;
          console.log(koszyk[index].quantity+" sfsaf ",iloscInput.value);
          localStorage.setItem("koszyk", JSON.stringify(koszyk));
          wyswietlKoszyk()
      });

      cenaIlosc.appendChild(iloscInput);
  
      szczegoly.appendChild(cenaIlosc);
      elementKoszyka.appendChild(szczegoly);
  
      // Dodajemy przycisk "Usuń" dla każdego produktu
      var usunButton = document.createElement("button");
      usunButton.textContent = "Usuń";
      usunButton.classList.add("usun-button");
      usunButton.addEventListener("click", function() {
        // Usuwamy produkt z koszyka po kliknięciu przycisku "Usuń"
        koszyk.splice(index, 1);
        // Zapisujemy zaktualizowany koszyk do localStorage
        localStorage.setItem("koszyk", JSON.stringify(koszyk));
        // Ponownie wyświetlamy koszyk
        wyswietlKoszyk();
      });
      elementKoszyka.appendChild(usunButton);
  
      // Dodajemy produkt do kontenera
      koszykContent.appendChild(elementKoszyka);
  
      // Dodajemy cenę produktu do łącznej kwoty koszyka
      calkowitaKwota += produkt.price * produkt.quantity;
    });
  
    // Wyświetlamy łączną kwotę koszyka w sekcji podsumowania
    var kwotaElement = document.getElementById("calkowita-kwota");
    kwotaElement.textContent = calkowitaKwota.toFixed(2) + " zł";
  }

  // Funkcja do przekierowania użytkownika do nowej strony i wyczyszczenia koszyka
  const przejdzDoZaplaty =()=> {
    const index =document.cookie.indexOf("=")
    if (document.cookie.slice(index+1)!='')
      {
        // Wyczyść koszyk z localStorage
        localStorage.removeItem("koszyk");
        
        // Przekieruj użytkownika do nowej strony z formularzem płatności
        changePage(5);
      }
      else{
        changePage(4);
      }

  }

  useEffect(() => {
    // Update the document title using the browser API
    wyswietlKoszyk();
  },[]);
    return(
        
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Koszyk - Sklep.pl</title>
    <link rel="stylesheet" href="Style/main-style.css" />
    <link rel="stylesheet" href="Style/koszyk-style.css" />
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
        <div class="koszyk-content">
        </div>
        <div class="koszyk-podsumowanie">
          <h3>Całkowita kwota do zapłaty:</h3>
          <h1 id="calkowita-kwota">0zł</h1>
          <button onClick={przejdzDoZaplaty}>Przejdz do zapłaty</button>
        </div>
      </div>
      <div class="footer">Sklep.pl © 2024</div>
    </div>

    <script src="koszyk.js"></script>
  </body>
</html>
        
    );
}