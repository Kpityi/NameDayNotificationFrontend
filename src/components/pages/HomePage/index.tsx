import { Link } from 'react-router-dom';
import './index.scss';
import Button from '../../UI/Button';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Üdvözöllek a Nameday Notification oldalon</h1>
      <div className="home-page__heroe-section">
        <div className="home-page__heroe-section__text">
          Mindig emlékezz a fontos pillanatokra! Ne hagyd, hogy az idő elszaladjon melletted – küldj személyre szabott
          képeslapot ismerőseidnek, szeretteidnek, azoknak akik fontosak számodra, és mutasd meg, hogy igazán törődsz
          velük! Egy apró gesztus, ami örök emlék lesz.
        </div>

        <div className="home-page__heroe-section__call-to-action">
          Próbáld ki most, és varázsold különlegessé a fontos napokat!
          <div className="home-page__buttons">
            <Link to="/postcards">
              <Button className="home-page" label="Képeslap küldése" />
            </Link>
            <Link to="/signup">
              <Button label="Regisztráció" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
