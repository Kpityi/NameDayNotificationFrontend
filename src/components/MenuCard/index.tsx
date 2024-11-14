import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

interface MenuCardProps {
  label: string;
  icon: IconProp;
  className: string;
  page: string;
}

const MenuCard = ({ label, icon, className, page }: MenuCardProps) => {
  const navigate = useNavigate();
  return (
    <div className={classNames('menu-card', className)} onClick={() => navigate(`/${page}`)}>
      <h3 className={classNames('menu-card__title', className)}>{label}</h3>
      <FontAwesomeIcon className={classNames('menu-card__icon', className)} icon={icon} />
    </div>
  );
};

export default MenuCard;
