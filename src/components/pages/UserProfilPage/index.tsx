import { useUser } from '../../../contexts/UserContenxt';
import './index.scss';

const UserProfilPage = () => {
  const { userData } = useUser();
  return (
    <div className="user-page">
      <h2 className="user-page__title">Profil</h2>
      <h4 className="user-page__user">
        <span>Vezeték név: </span>
        <span>{userData?.first_name}</span>
      </h4>
      <h4 className="user-page__user">
        <span>Kereszt név: </span>
        <span>{userData?.last_name}</span>
      </h4>
      <h4 className="user-page__user">
        <span>Email cím: </span>
        <span>{userData?.email}</span>
      </h4>
      <h4 className="user-page__user">
        <span>Felhasználó tipus: </span>
        <span>{userData?.role}</span>
      </h4>
      <h4 className="user-page__user">
        <span>Regisztráció: </span>
        <span>{userData?.registration_date?.split('T')[0].replaceAll('-', '.')}.</span>
      </h4>
    </div>
  );
};

export default UserProfilPage;
