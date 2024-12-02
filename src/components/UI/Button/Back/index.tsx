import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import classNames from 'classnames';

interface ButtonProps {
  className: string;
  page: string;
}

const BackButton = ({ className, page }: ButtonProps) => {
  const navigate = useNavigate();
  const createClassName = classNames(className, 'back-icon');
  return <FontAwesomeIcon className={createClassName} icon={faLeftLong} onClick={() => navigate(`/${page}`)} />;
};
export default BackButton;
