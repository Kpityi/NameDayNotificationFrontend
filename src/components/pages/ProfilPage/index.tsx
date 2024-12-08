import { useEffect } from 'react';
import { faBell, faCalendarPlus, faIdCard, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../../contexts/UserContenxt';
import './index.scss';
import { useNavigate } from 'react-router';
import MenuCard from '../../MenuCard';

const ProfilPage = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  console.log('Profil: ', userData);

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData]);

  return (
    <div className="profil-page">
      <h2>Üdvözöllek {userData?.last_name}!</h2>
      <div className="profil-page__menu-container">
        <MenuCard label="Profil" icon={faIdCard} className="profil-page__menu-item" page="user" />
        <MenuCard label="Emlékeztetők" icon={faBell} className="profil-page__menu-item" page="notifications" />
        <MenuCard
          label="Emlékeztető hozzáadása"
          icon={faCalendarPlus}
          className="profil-page__menu-item"
          page="notifications/create"
        />
        <MenuCard label="Barátok" icon={faUsers} className="profil-page__menu-item" page="friends" />
        <MenuCard label="Barát hozzáadása" icon={faUserPlus} className="profil-page__menu-item" page="friends/create" />
      </div>
    </div>
  );
};

export default ProfilPage;
