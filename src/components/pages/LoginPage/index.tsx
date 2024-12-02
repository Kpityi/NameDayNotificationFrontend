import './index.scss';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Button from '../../UI/Button';
import axios from 'axios';
import { API_URL } from '../../../common/constants/environment';
import { useSnackbar } from '../../../contexts/snackbarContenxt';
import { useUser } from '../../../contexts/UserContenxt';

//interfaces
interface InitialValues {
  email: string;
  password: string;
}
interface ValidationShema {
  email: string | undefined;
  password: string | undefined;
}

//React
const LoginPage = () => {
  //Values
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackbar } = useSnackbar();
  const { userData } = useUser();

  const initialValues: InitialValues = {
    email: '',
    password: '',
  };
  const validationShema: Yup.ObjectSchema<ValidationShema> = Yup.object({
    email: Yup.string()
      .lowercase()
      .trim()
      .required('Kérem adja meg email címét!')
      .email('Kérem valós email címet adjon meg!'),
    password: Yup.string()
      .required('Adja meg jelszavát!')
      .min(8, 'A jelszónak minimum 8 karakter hosszúnak kell lenie')
      .max(20, 'A jelszó maximum 20 karakter hosszó lehet')
      .matches(
        /^.*(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'A jelszónak tartalmaznia kell egy legalább 1 kisbetűt, 1 nagybetűt és egy számot!'
      ),
  });

  //Helpers
  const navigate = useNavigate();
  const { setUser } = useUser();

  //functions
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (values: InitialValues, { setSubmitting, resetForm }: FormikHelpers<InitialValues>) => {
    console.log(values);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, values, { withCredentials: true });
      console.log(response); //pityi
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        showSnackbar({
          message: 'sikeres belejelentkezés',
          severity: 'success',
          autoClose: 3000,
        });
        setUser(response.data);
        navigate('/profil');
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        showSnackbar({
          message: error.response?.data.message,
          severity: 'error',
          autoClose: 3000,
        });
      }
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  useEffect(() => {
    if (userData) {
      navigate('/profil');
    }
  }, [userData]);

  //Page
  return (
    <div className="login-page">
      <div className="login-page__container">
        {/* Title */}
        <div className="login-page__title">Bejelentkezés</div>
        <div className="login-page__login-form">
          {/* formik form */}
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationShema}
            onSubmit={handleLogin}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
              <div className="login-page__form-container">
                <Form className="login-page_form" onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="login-page__form-group">
                    <label htmlFor="email" className="login-page__form-label">
                      E-mail:
                    </label>
                    <Field
                      className="login-page__form-element"
                      id="emali"
                      name="email"
                      type="text"
                      value={values.email}
                      placeholder="example@gmail.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="login-page__error-message-container">
                      <ErrorMessage
                        name="email"
                        render={(msg) => <div className="login-page__error-message">{msg}</div>}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="login-page__form-group">
                    <label htmlFor="password" className="login-page__form-label">
                      Jelszó:
                    </label>
                    <Field
                      className="login-page__form-element"
                      id="password"
                      name="password"
                      title="A jelszónak minimum 8 maximum 20 karakter hosszúnak kell lennie és tartalmaznia kell legalább egy kisbetűt, egy nagybetűt és egy számot"
                      type={!showPassword ? 'password' : 'text'}
                      value={values.password}
                      placeholder="Jelszó"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {/* Password eye icon */}
                    <FontAwesomeIcon
                      onClick={handleShowPassword}
                      icon={!showPassword ? faEye : faEyeSlash}
                      className="login-page__icon"
                    />
                    <div className="login-page__error-message-container">
                      <ErrorMessage
                        name="password"
                        render={(msg) => <div className="login-page__error-message">{msg}</div>}
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <div className="login-page__button-container">
                    <Button
                      label="Belépés"
                      type="submit"
                      className="login-page__button"
                      disabled={
                        isSubmitting || !Boolean(Object.keys(touched)?.length) || Boolean(Object.keys(errors)?.length)
                      }
                    />
                  </div>
                </Form>

                {/* Navigate to sign up page */}
                <div className="login-page__signup-container">
                  <p
                    onClick={() => {
                      navigate('/signup');
                    }}
                  >
                    Nincs még fiókja? regisztráljon egyet most <FontAwesomeIcon icon={faAnglesRight} />
                  </p>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
