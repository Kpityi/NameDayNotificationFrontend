import './index.scss';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../common/constants/environment';
import { useSnackbar } from '../../../contexts/snackbarContenxt';

const ConfirmationPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  //Helpers
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/confirmation/${token}`);

        if (response.status >= 200 && response.status < 300) {
          showSnackbar({
            message: response.data.message,
            severity: 'success',
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate('/login');
          }, 3500);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showSnackbar({
            message: error.response?.data.error,
            severity: 'error',
            autoClose: 3000,
          });
        }
        setTimeout(() => {
          navigate('/signup');
        }, 3500);
      }
    };

    confirmEmail();
  }, [token]);

  //Page
  return (
    <div className="confirmation-page">
      <h1 className="confirmation-page__title">Email Cím megerősítése</h1>
      <p className="confirmation-page__text">Kérem várjon még emailcímét megerősítjük</p>
    </div>
  );
};

export default ConfirmationPage;
