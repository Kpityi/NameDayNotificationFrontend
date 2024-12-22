import './index.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <p>
          &copy; <img src="/logo_pixelbloom.png" alt="logo" className="footer__logo" />
          2024 Minden jog fentartva!
        </p>
      </div>
    </div>
  );
};

export default Footer;
