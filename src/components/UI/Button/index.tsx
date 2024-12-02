import classNames from 'classnames';
import './index.scss';

interface ButtonProps {
  label: string;
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  props?: any;
  onClick?: () => void;
}

const Button = ({ label, className, disabled, type, ...props }: ButtonProps) => {
  const mode = classNames(className, 'button', { '-disabled': disabled });

  return (
    <button type={type} className={mode} disabled={disabled} {...props}>
      {label}
    </button>
  );
};

export default Button;
