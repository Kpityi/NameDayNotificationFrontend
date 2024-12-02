import Button from '../Button';
import './index.scss';
import classNames from 'classnames';

interface ModalPageProps {
  message: string;
  visibility: boolean;
  onConfirm: () => void;
  isShowModalPage: (arg1: boolean) => void;
}

const ModalPage: React.FC<ModalPageProps> = ({ onConfirm, visibility, isShowModalPage, message }) => {
  return (
    <div className={classNames('modal-page', visibility && '-show')}>
      <div className="modal-page__container">
        <h2 className="modal-page__message">{message}</h2>
        <div className="modal-page__buttons">
          <Button label="Cancel" onClick={() => isShowModalPage(false)} className="modal-page__button" />

          <Button label="Delete" onClick={() => onConfirm()} className="modal-page__button" />
        </div>
      </div>
    </div>
  );
};

export default ModalPage;
