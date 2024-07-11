//import './App.css';
import React, {useState,useEffect} from 'react';
import Home from './pages/home';
import LoginPage from './pages/loginPage';
import Koszyk from './pages/koszyk.js';
import Produkty from './pages/produkty.js';
import Zalogowany from './pages/zalogowany.js';
import Platnosci from './pages/platnosci.js';


function App() {
  const [page, setpage] = useState(1);
  const [items, setItems] = useState({});
  const [refresh,setRefresh] = useState(false);


  // Funkcja sprawdzająca pozycję paska nawigacyjnego i dostosowująca jego wygląd
  function checkNavPosition() {
    var nav = document.querySelector(".header");
    var navHeight = nav.offsetHeight;
    var scrollPosition = window.scrollY;

    if (scrollPosition > navHeight + 50) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  }

  // Nasłuchiwanie na zdarzenie przewijania strony i wywołanie funkcji sprawdzającej pozycję paska nawigacyjnego
  window.addEventListener("scroll", checkNavPosition);





  //Express.js Test with cors
  const makeApiCall = async () => {
    try{                 
      await fetch("http://localhost:9000/testAPI", {mode: 'cors'})
      .then(res=> res.json())
      .then(items => setItems(items));
    }
    catch(e)
    {
      console.log(e);
    }
  }

  const reload = ()=>{
    setRefresh(!refresh);
  }

  const changePage=(page)=>{setpage(page)};

  useEffect(() => {
    makeApiCall();
    console.log(page);
  },[]);

  if (page == 0)
    {
      
      return (
        <div className="App">
      <title>Komputer.pl</title>
        <h1>strona testowa</h1>
    </div>
  );
  }
  if (page == 1)
    {
      return(
        <Home changePage={changePage}/>
      )
    }
  if (page == 2)
    {
      return(
        <Produkty changePage={changePage}/>
      );
    }
  if (page == 3)
    {
      return(
        <Koszyk changePage={changePage}/>
      );
    }
  if (page == 4 && document.cookie=='')
    {
      return(
        <LoginPage  changePage={changePage}/>
      );
    }
  if (page == 4 && document.cookie!='')
  {
    return(
      <Zalogowany changePage={changePage} reload={reload}/>
    );
  }

  if (page == 5)
    {
      return(
        <Platnosci changePage={changePage}/>
      )
    }
}



export default App;
