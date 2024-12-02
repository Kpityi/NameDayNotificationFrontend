import React, { createContext, useContext, useState, ReactNode } from 'react';
import ModalPage from '../../components/UI/Modal';

interface ModalContextProps {
  showModalPage: (message: string, onConfirm: () => void) => void;
  hideModalPage: () => void;
}

const ModalPageContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalPageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const showModalPage = (message: string, onConfirm: () => void) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setVisibility(true);
  };
  const hideModalPage = () => {
    setVisibility(false);
  };

  return (
    <ModalPageContext.Provider value={{ showModalPage, hideModalPage }}>
      {children}
      <ModalPage
        message={message}
        visibility={visibility}
        isShowModalPage={setVisibility}
        onConfirm={() => {
          onConfirm();
          hideModalPage();
        }}
      />
    </ModalPageContext.Provider>
  );
};

export const useModalPage = () => {
  const context = useContext(ModalPageContext);
  if (!context) {
    throw new Error('useModalPage must be used within a ModalPageProvider');
  }
  return context;
};
