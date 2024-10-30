import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '../../components/UI/Snackbar';
interface SnackbarOptions {
  message: string;
  severity: 'success' | 'error' | 'info';
  autoClose?: number;
}

interface SnackbarContextType {
  showSnackbar: (options: SnackbarOptions) => void;
  hideSnackbar: () => void;
  snackbar: SnackbarOptions | null;
  visibility: boolean;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarOptions | null>(null);
  const [visibility, setVisibility] = useState(false);

  const showSnackbar = (options: SnackbarOptions) => {
    setSnackbar(options);
    setVisibility(true);
    setTimeout(() => setVisibility(false), options.autoClose || 4000);
  };

  const hideSnackbar = () => setVisibility(false);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar, snackbar, visibility }}>
      {children}
      <Snackbar
        message={snackbar?.message}
        severity={snackbar?.severity}
        autoClose={snackbar?.autoClose}
        visibility={visibility && !!snackbar}
        reset={hideSnackbar}
      />
    </SnackbarContext.Provider>
  );
};
