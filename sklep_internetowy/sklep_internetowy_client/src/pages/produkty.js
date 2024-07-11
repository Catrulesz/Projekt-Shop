import ProductFull from './produktFull';
import { useState } from 'react';
import { useEffect } from 'react';
import './produkt.css';
import './main.css';

import Product from './produkt';
import LoadProducts from '../serwer_scripts/LoadProducts';

export default function Produkty({changePage}){
  const [currentPage,setCurrentPage] = useState(0);
  const [oneProduct, setOneProduct] = useState(false);
  const [objectFocus, setObjectFocus] = useState(-1);
  const [products, setProducts]= useState([
    {
      name:'',
      image: 'http://localhost:9000/static/images/laptop.jpg',
      price: 6599,
      processor: "placeholder",
      ram: "placeholder",
      disk: "placeholder",
      graphics: "placeholder",
      screen: 'placeholder',
      os: "placeholder",
      description: 'placeholder'
    },
    {
      name:'',
    },
    {
      name:'',
    },
    {
      name:'',
    },
    {
      name:'',
    },
    {
      name:'',
    },    {
      name:'',
    },    {
      name:'',
    },    {
      name:'',
    },    {
      name:'',
    },    {
      name:'',
    },    {
      name:'',
    },
  ]);
  
  
  
  //ładowanie strony produktów
  var productsPerPage = 12;
  var startIndex


  const pageLoad = async ()=>{
    
    startIndex= currentPage  * productsPerPage;
    var call = await LoadProducts.LoadProducts(startIndex);
    if (call.message != 'brak produktów')
      {
        for ( var i=call.length; i<12; i++)
          {
            call.push({name:''});
          }
        setProducts(call);
      }
      else{
        setProducts([{name:''},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',}]);
        document.getElementById("message").innerHTML=call.message;
      }
    }
    
    
    // Wywołanie funkcji do wyświetlenia produktów na pierwszej stronie
    // Funkcja obsługująca kliknięcie w przycisk "Następna strona"
   const nextPage =() => {
          document.getElementById('message').innerHTML='';
          setCurrentPage(currentPage + 1);
    

          
        }
      
    // Funkcja obsługująca kliknięcie w przycisk "Poprzednia strona"
    const prevPage =async () =>{
      if(currentPage > 0)
        {
          document.getElementById('message').innerHTML='';
          setCurrentPage(currentPage - 1);  
 
          
 
        }
      }
      // ładowanie strony produktu
    const loadProductPage = (id) =>{
      setObjectFocus(id);
      console.log(oneProduct, "|||||||",id);
      setOneProduct(!oneProduct);
    }
    
    
    const search = async ( resetSearch)=>{
    
      if (resetSearch == true)
        {

          document.getElementById("search").value='';

        }

      document.getElementById("message").innerHTML='';
      startIndex= currentPage  * productsPerPage;
      var searchQuery = document.getElementById("search").value;
      var pricefilter = document.getElementById("price").value;
      var markfilter = document.getElementById('category').value;
      var diagonalfilter = document.getElementById('przekatna').value;
      var frequencyfilter = document.getElementById('czestotliwosc').value;
      var ramfilter = document.getElementById('ram').value;


      if (pricefilter.search('-')!= -1)
        {
          pricefilter = pricefilter.split('-');
        }

      var call =await LoadProducts.SearchProducts(startIndex,searchQuery,pricefilter,markfilter,diagonalfilter,frequencyfilter,ramfilter);

      if (call.message != 'brak produktów')
        {
          for ( var i=call.length; i<12; i++)
            {
              call.push({name:''});
            }

          setProducts(call);
          console.log("here",call);
        }
        else{
          setProducts([{name:''},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',}]);
          document.getElementById("message").innerHTML=call.message;
        }
    }

    const onlySearch =()=>{ if(currentPage!=0){setCurrentPage(0);}
  else{
    search();
  }}

    const resetFilters = async ()=>{
        setCurrentPage(0);
        startIndex= currentPage  * productsPerPage;

        document.getElementById("search").value='';
        document.getElementById("message").innerHTML='';
        document.getElementById("price").value = 'brak';
        document.getElementById('category').value = 'brak';
        document.getElementById('przekatna').value = 'brak';
        document.getElementById('czestotliwosc').value = 'brak';
        document.getElementById('ram').value = 'brak';

        var call =await LoadProducts.LoadProducts(startIndex);

        if (call.message != 'brak produktów')
          {
            for ( var i=call.length; i<12; i++)
              {
                call.push({name:''});
              }
  
            setProducts(call);
            console.log("here",call);
          }
          else{
            setProducts([{name:''},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',},{name:'',}]);
            document.getElementById("message").innerHTML=call.message;
          }
    }

    useEffect(() => {
      if (document.getElementById("search").value!='')
      {
  
        
        search();
      }
      else{
        pageLoad();

      }
    },[currentPage]);
    
    
    if(oneProduct == false)
      {
        return(
      
          <html lang="pl">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Sklep.pl</title>
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
                  <div class="filter">
                    <h2>Filtry</h2>
                    <div class="filter-section">
                      <label for="price">Cena:</label>
                      <select id="price">
                        <option value="brak">Dowolna cena</option>
                        <option value="0-1000">Poniżej 1000 zł</option>
                        <option value="1000-3000">1000-3000 zł</option>
                        <option value="3000-5000">3000-5000 zł</option>
                        <option value="5000-50000">Powyżej 5000 zł</option>
                      </select>
                    </div>
                    <div class="filter-section">
                      <br />
                      <label for="category">Marka:</label>
                      <select id="category">
                        <option value="brak">Brak</option>
                        <option value="asus">Asus</option>
                        <option value="acer">Acer</option>
                        <option value="lenovo">Lenovo</option>
                        <option value="hp">HP</option>
                        <option value="dell">DELL</option>
                        <option value="apple">MSI</option>
                      </select>
                    </div>
                    <div class="filter-section">
                      <br />
                      <label for="przekatna">Przekątna:</label>
                      <select id="przekatna">
                        <option value="brak">Brak</option>
                        <option value="18">18 cali</option>
                        <option value="17">17 cali</option>
                        <option value="16">16 cali</option>
                        <option value="15">15 cali</option>
                        <option value="14">14 cali</option>
                        <option value="13">13 cali</option>
                      </select>
                    </div>
                    <div class="filter-section">
                      <br />
                      <label for="czestotliwosc">Częstotliwość odświeżania ekranu:</label>
                      <select id="czestotliwosc">
                        <option value="brak">Brak</option>
                        <option value="240hz">240Hz</option>
                        <option value="165hz">165Hz</option>
                        <option value="144hz">144Hz</option>
                        <option value="120hz">120Hz</option>
                        <option value="90hz">90Hz</option>
                        <option value="60hz">60Hz</option>
                      </select>
                    </div>
                    <div class="filter-section">
                      <br />
                      <label for="ram">RAM:</label>
                      <select id="ram">
                        <option value="brak">Brak</option>
                        <option value="16gb">16GB</option>
                        <option value="12gb">12GB</option>
                        <option value="8gb">8GB</option>
                        <option value="6gb">6GB</option>
                        <option value="4gb">4GB</option>
                      </select>
                    </div>
                    <div></div>
                    <button onClick={()=>search(true)} class="button-filter">Zastosuj filtry</button>
                    <button onClick={()=>resetFilters()} class="button-filter">Zresetuj filtry</button>
                  </div>
                  <div class="search-product-container">
                    <div class="search">
                      <input id="search" class="main-search-bar" placeholder="Szukaj po nazwie..." />
                      <button onClick={()=>onlySearch()}>
                        Szukaj
                      </button>
                    </div>
                    <div class="product">
                        <h1 id="message"></h1>
                        <Product id={0} product={products} loadProductPage={loadProductPage}/>
                        <Product id={1} product={products} loadProductPage={loadProductPage}/>
                        <Product id={2} product={products} loadProductPage={loadProductPage}/>
                        <Product id={3} product={products} loadProductPage={loadProductPage}/>
                        <Product id={4} product={products} loadProductPage={loadProductPage}/>
                        <Product id={5} product={products} loadProductPage={loadProductPage}/>
                        <Product id={6} product={products} loadProductPage={loadProductPage}/>
                        <Product id={7} product={products} loadProductPage={loadProductPage}/>
                        <Product id={8} product={products} loadProductPage={loadProductPage}/>
                        <Product id={9} product={products} loadProductPage={loadProductPage}/>
                        <Product id={10} product={products} loadProductPage={loadProductPage}/>
                        <Product id={11} product={products} loadProductPage={loadProductPage}/>

                    </div>
                  </div>
                </div>
                <div id='why'>
                  <button class="prevButton" onClick={()=>prevPage()}>Poprzednia strona</button>
                  <button class="nextButton" onClick={()=>nextPage()}>Następna strona</button>
                </div>
                <div class="footer">Sklep.pl © 2024</div>
              </div>
  
            </body>
          </html>
          
          
        );
    }
    else{
      return(
          <ProductFull changePage={changePage} product={products[objectFocus]} loadProductPage={loadProductPage}/>
      );
    }
  }