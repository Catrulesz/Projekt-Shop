import './home.css';

export default function Home({ changePage }) {
  return (
    <html lang="pl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home - Sklep.pl</title>
      </head>
      <body className="cialo-home">
        <div className="container">
          <div className="logo">Sklep.pl</div>
          <header className="header">
            <nav>
              <ul>
                <li>
                  <button className="nav-button" onClick={() => changePage(1)}>
                    Home
                  </button>
                </li>
                <li>
                  <button className="nav-button" onClick={() => changePage(2)}>
                    Produkty
                  </button>
                </li>
                <li>
                  <button className="nav-button" onClick={() => changePage(3)}>
                    Koszyk
                  </button>
                </li>
                <li>
                  <button className="nav-button" onClick={() => changePage(4)}>
                    Moje konto
                  </button>
                </li>
              </ul>
            </nav>
          </header>
          <div className="main-content">
            <section className="o-nas">
              <h1>Poznaj Sklep.pl - Twoje Centrum Technologicznej Pasji</h1>
              <p>
                Witaj w Sklep.pl, miejscu, gdzie pasja do technologii spotyka się z niezrównaną
                obsługą klienta i szerokim asortymentem produktów najwyższej jakości. Jesteśmy
                zespołem entuzjastów technologii, którzy nieustannie dążą do zapewnienia naszym
                klientom najlepszych doświadczeń zakupowych.
              </p>
              <p>
                Od momentu naszego powstania, naszą misją było stworzenie miejsca, gdzie każdy - od
                pasjonatów komputerów po osoby poszukujące narzędzi do pracy zdalnej - znajdzie
                produkty idealnie dopasowane do swoich potrzeb. Nasz zespół stale poszukuje
                najnowszych i najbardziej innowacyjnych produktów, abyśmy mogli dostarczyć Ci
                technologiczne rozwiązania, które przekraczają Twoje oczekiwania.
              </p>
            </section>

            <section className="porady-techniczne">
              <h1>Porady Techniczne</h1>
              <p>
                W dzisiejszym dynamicznym świecie, wybór odpowiedniego laptopa oraz jego właściwe
                użytkowanie może znacząco wpłynąć na komfort i wydajność Twojej codziennej pracy. W
                sekcji "Porady Techniczne" Sklep.pl dzieli się z Tobą praktyczną wiedzą i
                wskazówkami, które pomogą Ci w pełni wykorzystać potencjał swojego urządzenia.
              </p>
              <ul>
                <li>
                  <span className="gruby">Wybór odpowiedniego laptopa:</span> Pierwszym krokiem do
                  udanej przygody z nowym laptopem jest dobranie modelu odpowiedniego do Twoich
                  potrzeb.
                </li>
                <li>
                  <span className="gruby">Konserwacja i pielęgnacja:</span> Aby Twój laptop służył
                  Ci przez wiele lat, konieczne jest odpowiednie dbanie o jego stan techniczny i
                  czystość.
                </li>
                <li>
                  <span className="gruby">Optymalizacja wydajności:</span> Istnieją proste triki,
                  które mogą zwiększyć wydajność Twojego laptopa.
                </li>
                <li>
                  <span className="gruby">Bezpieczeństwo i ochrona danych:</span> Dowiedz się, jak
                  chronić swoje dane osobowe i poufne informacje przed nieautoryzowanym dostępem.
                </li>
                <li>
                  <span className="gruby">Rozwiązywanie problemów:</span> Nasz zespół ekspertów
                  udziela praktycznych wskazówek dotyczących najczęstszych problemów technicznych.
                </li>
              </ul>
            </section>

            <section className="oferty-specjalne">
              <h1>Odkryj Nasze Wyjątkowe Oferty Specjalne!</h1>
              <p>
                W Sklep.pl nieustannie dbamy o naszych klientów i chcemy nagrodzić Was za zaufanie,
                jakim nas obdarzacie. Dlatego też prezentujemy nasze wyjątkowe oferty specjalne,
                które pozwalają oszczędzić jeszcze więcej na zakupach technologicznych.
              </p>
              <p>
                Niezależnie od tego, czy szukasz nowego laptopa, smartfona, akcesoriów komputerowych
                czy urządzeń elektronicznych, nasze oferty specjalne zapewniają niepowtarzalne
                okazje na zakupy. Wybierając Sklep.pl, nie tylko otrzymujesz dostęp do najnowszych i
                najbardziej innowacyjnych produktów, ale także korzystasz z atrakcyjnych promocji i
                zniżek.
              </p>
            </section>

            <section className="nowosci">
              <h1>Nowości</h1>
              <p>
                Czy jesteś gotowy na najnowsze innowacje technologiczne? Przygotuj się na wyjątkowe
                doświadczenie z naszymi najnowszymi produktami! Sklep.pl z dumą prezentuje
                najświeższe i najbardziej zaawansowane laptopy dostępne na rynku.
              </p>
              <p>
                Niezależnie od tego, czy szukasz urządzenia do pracy, nauki, czy rozrywki, mamy
                wszystko, czego potrzebujesz, abyś mógł osiągnąć więcej w każdej dziedzinie życia.
                Nasze nowe laptopy łączą w sobie niezrównaną wydajność, elegancki design oraz
                innowacyjne funkcje, które sprawią, że Twój dzień stanie się jeszcze bardziej
                produktywny i satysfakcjonujący.
              </p>
              <ul>
                <li>
                  <span className="gruby">Niesamowita Wydajność:</span> Dzięki najnowszym procesorom
                  i kartom graficznym, nasze laptopy zapewniają błyskawiczną reakcję i płynne
                  działanie nawet w najbardziej wymagających zadaniach.
                </li>
                <li>
                  <span className="gruby">Elegancki Design:</span> Oferujemy szeroki wybór
                  stylowych i lekkich laptopów, które nie tylko imponują wyglądem, ale także są
                  łatwe do przenoszenia, dzięki czemu możesz pracować, gdziekolwiek chcesz.
                </li>
                <li>
                  <span className="gruby">Zaawansowane Funkcje:</span> Od ekranów dotykowych po
                  zaawansowane systemy chłodzenia, nasze laptopy są wyposażone w najnowsze
                  technologie, które sprawią, że korzystanie z nich będzie czystą przyjemnością.
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className="footer">Sklep.pl © 2024</div>
      </body>
    </html>
  );
}
