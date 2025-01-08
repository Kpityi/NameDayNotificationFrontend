import { faComputer } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button';
const Page404 = () => {
  return (
    <div className="page-404">
      <div className="page-404__icon">
        <FontAwesomeIcon icon={faComputer} />
      </div>
      <h2 className="page-404__text">Sorry, Page not found!</h2>
      <Link to="home">
        <Button label="Vissza a főoldalra" />
      </Link>
    </div>
  );
};
export default Page404;
