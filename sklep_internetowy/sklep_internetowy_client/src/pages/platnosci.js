import React, { useState, useEffect } from 'react';

import './main.css';
import './platnosci.css'; // Zaktualizowana ścieżka do pliku CSS specyficznego dla tego komponentu

export default function Platnosci({ changePage }) {
    const [metodaPlatnosci, setMetodaPlatnosci] = useState(null);
    const [numerKarty, setNumerKarty] = useState('');
    const [dataWaznosci, setDataWaznosci] = useState('');
    const [cvv, setCvv] = useState('');
    const [sposobDostawy, setSposobDostawy] = useState('');
    const [calkowitaKwota, setCalkowitaKwota] = useState(0); // Stan dla całkowitej kwoty do zapłaty
    const [blikCode, setBlikCode] = useState(''); // Stan przechowujący kod BLIK
    const [showBlikInput, setShowBlikInput] = useState(false); // Stan do kontrolowania widoczności pola BLIK

    useEffect(() => {
        // Oblicz i ustaw całkowitą kwotę do zapłaty na podstawie zawartości koszyka
        obliczCalkowitaKwote();
    }, []);

    const obliczCalkowitaKwote = () => {
        // Pobieramy dane z localStorage
        var koszyk = JSON.parse(localStorage.getItem("koszyk")) || [];

        // Obliczamy całkowitą kwotę na podstawie zawartości koszyka
        let total = koszyk.reduce((acc, produkt) => {
            return acc + (produkt.price * produkt.quantity);
        }, 0);

        // Ustawiamy całkowitą kwotę w stanie komponentu
        setCalkowitaKwota(total);
    };

    const handleMetodaPlatnosciChange = (event) => {
        const selectedMethod = event.target.value;

        if (selectedMethod === 'blik') {
            setShowBlikInput(true); // Pokaż pole do wpisania kodu BLIK
        } else {
            setShowBlikInput(false); // Ukryj pole do wpisania kodu BLIK
        }

        setMetodaPlatnosci(selectedMethod);
    };

    const guzik = () => {
            if((metodaPlatnosci === 'blik' || metodaPlatnosci === 'karta' || metodaPlatnosci === 'przelew')
            && (sposobDostawy === 'kurier' || sposobDostawy === 'odbior')){
                alert('Zapłacono, dziękujemy za zakupy!')
                changePage(1);
            }
            else{
                alert('Niepoprawnie wybrano, spróbuj jeszcze raz!')
            }
        
    };
    

    const handlePlatnoscSubmit = (event) => {
        event.preventDefault();
        // Tutaj możesz umieścić logikę obsługi płatności
        console.log('Wybrana metoda płatności:', metodaPlatnosci);
        console.log('Numer karty:', numerKarty);
        console.log('Data ważności:', dataWaznosci);
        console.log('CVV:', cvv);
        console.log('Sposób dostawy:', sposobDostawy);
        console.log('Kod BLIK:', blikCode);
        // Przekierowanie użytkownika lub inne działania związane z płatnością
    };

    

    return (
        <>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sklep.pl</title>
            </head>
            <body className='platnosci-body' id='platnosci-body'>
                <div className='platnosci-calosc'>
                <div className="container" id="platnosci-container">
                    <div className="logo" id="sklep-logo">Sklep.pl</div>
                    <header className="header">
                        <nav>
                            <ul className="nav-list">
                                <li><button className="nav-button" onClick={() => changePage(1)}>Home</button></li>
                                <li><button className="nav-button" onClick={() => changePage(2)}>Produkty</button></li>
                                <li><button className="nav-button" onClick={() => changePage(3)}>Koszyk</button></li>
                                <li><button className="nav-button" onClick={() => changePage(4)}>Moje konto</button></li>
                            </ul>
                        </nav>
                    </header>
                    <div className="body-platnosci">
                        <div className="platnosci-container" id="platnosc-main">
                            <h1 className="platnosci-header">Płatność</h1>
                            <p className="platnosci-description">Prosimy wybrać metodę płatności oraz sposób dostawy:</p>
                            <form className="platnosci-form" onSubmit={handlePlatnoscSubmit}>
                                <div className="platnosci-form-group">
                                    <input
                                        type="radio"
                                        id="karta"
                                        value="karta"
                                        checked={metodaPlatnosci === 'karta'}
                                        onChange={handleMetodaPlatnosciChange}
                                    />
                                    <label htmlFor="karta">Karta płatnicza</label>
                                    {metodaPlatnosci === 'karta' && (
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Numer karty"
                                                value={numerKarty}
                                                onChange={(e) => setNumerKarty(e.target.value)}
                                                className="platnosci-input"
                                                id="numer-karty-input"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Data ważności (MM/YY)"
                                                value={dataWaznosci}
                                                onChange={(e) => setDataWaznosci(e.target.value)}
                                                className="platnosci-input"
                                                id="data-waznosci-input"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                value={cvv}
                                                onChange={(e) => setCvv(e.target.value)}
                                                className="platnosci-input"
                                                id="cvv-input"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="platnosci-form-group">
                                    <input
                                        type="radio"
                                        id="przelew"
                                        value="przelew"
                                        checked={metodaPlatnosci === 'przelew'}
                                        onChange={handleMetodaPlatnosciChange}
                                    />
                                    <label htmlFor="przelew">Zapłata przy odbiorze</label>
                                </div>
                                <div className="platnosci-form-group">
                                    <input
                                        type="radio"
                                        id="blik"
                                        value="blik"
                                        checked={metodaPlatnosci === 'blik'}
                                        onChange={handleMetodaPlatnosciChange}
                                    />
                                    <label htmlFor="blik">Blik</label>
                                    {showBlikInput &&
                                    (<div className='platnosci-blik-input'>
                                        <input
    type="text"
    placeholder="Wpisz kod BLIK"
    value={blikCode}
    onChange={(e) => setBlikCode(e.target.value)}
    className="platnosci-input"
/>

                                        </div>)}
                                </div>
                                <div className="platnosci-form-group">
                                    <select
                                        value={sposobDostawy}
                                        onChange={(e) => setSposobDostawy(e.target.value)}
                                        className="platnosci-select"
                                        id="sposob-dostawy-select"
                                    >
                                        <option value="" disabled hidden>
                                            Wybierz sposób dostawy
                                        </option>
                                        <option value="kurier">Kurier</option>
                                        <option value="odbior">Odbiór osobisty</option>
                                    </select>
                                </div>
                                
                                <button type="submit" className="platnosci-button" id="platnosc-submit"  onClick={guzik}>Zapłać</button>
                            </form>
                        </div>
                    </div>
                    <div className="footer">Sklep.pl © 2024</div>
                </div>
                </div>
            </body>
        </>
    );
}
