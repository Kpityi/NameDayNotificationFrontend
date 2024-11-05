import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './index.scss';
import { PATHS } from '../../../common/constants/paths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faArrowRightFromBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { useUser } from '../../../contexts/UserContenxt';
import { useState } from 'react';

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { userData, clearUser } = useUser();
  console.log('navigate bar user: ', userData); //pityi

  const createClassname = ({ isActive }: { isActive: boolean }): string =>
    classNames('navigation__link', isActive && '-active');

  return (
    <div className="navigation">
      <div className="navigation__hamburger-menu" onClick={() => setShowMenu(!showMenu)}>
        <FontAwesomeIcon icon={showMenu ? faXmark : faBars} />
      </div>
      <ul className={classNames('navigation__links', showMenu && '-show')}>
        <div className="navigation__links-left">
          <li onClick={() => setShowMenu(false)}>
            <NavLink to={PATHS.root} className={createClassname}>
              kezdőlap
            </NavLink>
          </li>
          <li onClick={() => setShowMenu(false)}>
            <NavLink to={PATHS.postcards} className={createClassname}>
              képeslapok
            </NavLink>
          </li>
        </div>
        <div className="navigation__links-center"></div>

        <div className="navigation__links-right">
          {userData ? (
            <>
              <li onClick={() => setShowMenu(false)}>
                <NavLink to={PATHS.profil} className={createClassname}>
                  <FontAwesomeIcon className="navigation__icon" icon={faUser} />
                  profil
                </NavLink>
              </li>
              <li onClick={() => setShowMenu(false)}>
                <NavLink to={PATHS.login} className={createClassname} onClick={clearUser}>
                  <FontAwesomeIcon className="navigation__icon" icon={faArrowRightFromBracket} />
                  logout
                </NavLink>
              </li>
            </>
          ) : (
            <li onClick={() => setShowMenu(false)}>
              <NavLink to={PATHS.login} className={createClassname}>
                <FontAwesomeIcon className="navigation__icon" icon={faArrowRightToBracket} />
                login
              </NavLink>
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
