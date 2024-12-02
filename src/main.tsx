import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SnackbarProvider } from './contexts/snackbarContenxt/index.tsx';
import { ModalPageProvider } from './contexts/modalContext/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider>
      <ModalPageProvider>
        <App />
      </ModalPageProvider>
    </SnackbarProvider>
  </StrictMode>
);
