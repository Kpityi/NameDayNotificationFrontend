import { useNavigate } from 'react-router';
import { useUser } from '../../../contexts/UserContenxt';
import './index.scss';
import { useState } from 'react';
import AddNameNotification from '../AddNameNotification';
import AddOccasionNotification from '../AddOccasionNotification';
import AddCustomNotification from '../AddCustomNotification';
import BackButton from '../../UI/Button/Back';

const AddNotificationPage = () => {
  const userData = useUser();
  const navigate = useNavigate();
  const [notificationType, setNotificationType] = useState('?');

  if (!userData) {
    navigate('/login');
  }

  return (
    <div className="add-notification-page">
      <h2 className="add-notification-page__title">Emlékeztető Létrehozása</h2>

      <div className="add-notification-page__select-container">
        <label htmlFor="notificationType" className="add-notification-page__label">
          Válassza ki mit szeretne hozzáadni:
        </label>

        <select
          name="NotificationType"
          id="notificationType"
          value={notificationType}
          onChange={(e) => setNotificationType(e.target.value)}
        >
          <option value="?">Válasszon</option>
          <option value="name">Névnap</option>
          <option value="occasion">Alkalom</option>
          <option value="custom">Egyedi</option>
        </select>
        <hr className="add-notification-page__hr" />
        <div className="add-notification-page-container">
          {(notificationType === '?' && (
            <div className="add-notification-page__help">
              Az oldalon három féle emlékeztető létrehozására van lehetőség:
              <ol className="add-notification-page__list">
                <li className="add-notification-page__list-item">
                  Névnapi emlékeztető:
                  <p className="add-notification-page__list-item-text">
                    Itt lehetősége van egy adott névnap beállítására. Válassza ki a legördülő listából a névnap
                    menüpontot, majd a kereső segítségével keresse ki a névnaphoz tartozó dátumot. Amennyiben nem
                    találja meg az adott névnapot, kérjük jelezze felénk, vagy állítson be egyedi alkalom emlékeztetőt.
                  </p>
                </li>
                <li className="add-notification-page__list-item">
                  Alkalmi emlékeztető:
                  <p className="add-notification-page__list-item-text">
                    Itt lehetősége van egy adott esemény beállítására pl.: születésnap, házassági évforduló. Válassza ki
                    a legördülő listából a Alkalom menüpontot, majd töltse ki az adott mezőket.
                  </p>
                </li>
                <li className="add-notification-page__list-item">
                  Egyedi emlékeztető:
                  <p className="add-notification-page__list-item-text">
                    Itt lehetősége van egy konkrét esemény beállítására pl.: esjüvő, ballagás. Válassza ki a legördülő
                    listából az egyedi menüpontot, majd töltse ki az adott mezőket.
                  </p>
                </li>
              </ol>
            </div>
          )) ||
            (notificationType === 'name' && <AddNameNotification />) ||
            (notificationType === 'occasion' && <AddOccasionNotification />) ||
            (notificationType === 'custom' && <AddCustomNotification />)}
        </div>
      </div>
      <hr className="add-notification-page__hr" />
      <BackButton className="add-notification-page-button" page="profil" />
    </div>
  );
};

export default AddNotificationPage;
