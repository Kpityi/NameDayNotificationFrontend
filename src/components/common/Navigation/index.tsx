import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './index.scss';
import { PATHS } from '../../../common/constants/paths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const createClassname = ({ isActive }: { isActive: boolean }): string =>
    classNames('navigation__link', isActive && '-active');

  return (
    <div className="navigation">
      <ul className="navigation__links">
        <div className="navigation__links-left">
          <li>
            <NavLink to={PATHS.root} className={createClassname}>
              kezdőlap
            </NavLink>
          </li>
          <li>
            <NavLink to={PATHS.postcards} className={createClassname}>
              képeslapok
            </NavLink>
          </li>
        </div>
        <div className="navigation__links-center"></div>
        <div className="navigation__links-right">
          <li>
            <NavLink to={PATHS.login} className={createClassname}>
              <FontAwesomeIcon className="navigation__icon" icon={faArrowRightToBracket} />
              login
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
