import { useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

interface snackbar {
  message: string;
  severity: 'success' | 'error' | 'info';
  autoClose?: number;
  visibility: boolean;
  reset: () => void;
  other?: Record<string, any>;
}

const Snackbar: React.FC<snackbar> = ({ message, severity, autoClose = 3000, visibility, reset, ...other }) => {
  const icons = {
    success: faCircleCheck,
    error: faCircleXmark,
    info: faCircleInfo,
  };
  const icon = icons[severity];

  useEffect(() => {
    if (visibility) {
      const timer = setTimeout(() => {
        reset();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [visibility, reset, autoClose]);

  return (
    <div className={classNames('snackbar', `-${severity}`, visibility && '-show')}>
      <div className="snackbar__container">
        <div className={classNames('snackbar__icon-box', `-${severity}`)}>
          <h2 className="snackbar__icon">
            <FontAwesomeIcon icon={icon} />
          </h2>
        </div>
        <div className="snackbar__textbox">
          <h2 className="snackbar__text">{message}</h2>
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
