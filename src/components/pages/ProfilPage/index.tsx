import { useUser } from '../../../contexts/UserContenxt';
import './index.scss';

const ProfilPage = () => {
  const { userData } = useUser();
  console.log('Profil: ', userData);

  return (
    <div className="profil-page">
      <h2>profil page</h2>
    </div>
  );
};

export default ProfilPage;
