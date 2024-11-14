import Navigation from '../Navigation';
import './index.scss';

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header__logo-container">
          <img src="/logo.png" alt="logo" className="header__logo" />
        </div>
        <div className="header__title-container">
          <h1 className="header__title">Name day Notification</h1>
        </div>
      </div>
      <Navigation />
    </>
  );
};

export default Header;
