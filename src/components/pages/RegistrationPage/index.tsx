import './index.scss';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faEye, faEyeSlash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from '../../UI/Button';
import axios from 'axios';
import { API_URL } from '../../../common/constants/environment';
import { useSnackbar } from '../../../contexts/snackbarContenxt';

//interfaces
interface initialValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface validationShema {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

//React
const SignUpPage = () => {
  //Values
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const validationShema: Yup.ObjectSchema<validationShema> = Yup.object({
    firstName: Yup.string().trim().required('Kérem adja meg vezetéknevét!'),
    lastName: Yup.string().trim().required('Kérem adja meg keresztnevét!'),
    email: Yup.string()
      .lowercase()
      .trim()
      .required('Kérem adja meg email címét!')
      .email('Kérem valós email címet adjon meg!'),
    password: Yup.string()
      .trim()
      .required('Adja meg jelszavát!')
      .min(8, 'A jelszónak minimum 8 karakter hosszúnak kell lenie!')
      .max(20, 'A jelszó maximum 20 karakter hosszó lehet!')
      .matches(
        /^.*(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'A jelszónak tartalmaznia kell egy legalább 1 kisbetűt, 1 nagybetűt és egy számot!'
      ),
    confirmPassword: Yup.string()
      .trim()
      .required('Erősítse meg jelszavát!')
      .oneOf([Yup.ref('password'), ''], 'A jelszavak nem egyeznek!'),
  });

  //Helpers
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  //Functions
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (values: initialValues) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, values);
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.message); //pityi
        showSnackbar({
          message: response.data.message,
          severity: 'success',
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showSnackbar({
          message: error.response?.data.message,
          severity: 'error',
          autoClose: 3000,
        });
      }
    }
  };

  //Page
  return (
    <div className="sign-up-page">
      <div className="sign-up-page__container">
        <div className="sign-up-page__title">Regisztráció</div>
        <div className="sign-up-page__login-form">
          {/* formik form */}
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationShema}
            onSubmit={handleSignUp}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
              <div className="sign-up-page__form-container">
                {/* form */}
                <Form className="sign-up-page_form" onSubmit={handleSubmit}>
                  {/* First name */}
                  <div className="sign-up-page__form-group">
                    <div className="sign-up-Page__firstname-container">
                      <label htmlFor="firstName" className="sign-up-page__form-label">
                        Vezetéknév:
                      </label>
                      <Field
                        className="sign-up-page__form-element"
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        placeholder="Vezetéknév"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div className="sign-up-page__error-message-container">
                        <ErrorMessage
                          name="firstName"
                          render={(msg) => <div className="sign-up-page__error-message">{msg}</div>}
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="sign-up-Page__lastname-container">
                      <label htmlFor="lastName" className="sign-up-page__form-label">
                        Keresztnév:
                      </label>
                      <Field
                        className="sign-up-page__form-element"
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        placeholder="Keresztnév"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div className="sign-up-page__error-message-container">
                        <ErrorMessage
                          name="lastName"
                          render={(msg) => <div className="sign-up-page__error-message">{msg}</div>}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="sign-up-page__form-group">
                    <label htmlFor="email" className="sign-up-page__form-label">
                      E-mail:
                    </label>
                    <Field
                      className="sign-up-page__form-element"
                      id="emali"
                      name="email"
                      type="text"
                      value={values.email}
                      placeholder="example@gmail.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="sign-up-page__error-message-container">
                      <ErrorMessage
                        name="email"
                        render={(msg) => <div className="sign-up-page__error-message">{msg}</div>}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="sign-up-page__form-group">
                    <label
                      htmlFor="password"
                      className="sign-up-page__form-label"
                      title="A jelszónak minimum 8 maximum 20 karakter hosszúnak kell lennie és tartalmaznia kell legalább egy kisbetűt, egy nagybetűt és egy számot"
                    >
                      Jelszó:
                      <FontAwesomeIcon icon={faCircleInfo} className="sign-up-page__info-icon" />
                    </label>
                    <Field
                      className="sign-up-page__form-element"
                      id="password"
                      name="password"
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
                      className="sign-up-page__password-icon"
                    />
                    <div className="sign-up-page__error-message-container">
                      <ErrorMessage
                        name="password"
                        render={(msg) => <div className="sign-up-page__error-message">{msg}</div>}
                      />
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div className="sign-up-page__form-group">
                    <label
                      htmlFor="confirmPassword"
                      className="sign-up-page__form-label"
                      title="A jelszónak minimum 8 maximum 20 karakter hosszúnak kell lennie és tartalmaznia kell legalább egy kisbetűt, egy nagybetűt és egy számot"
                    >
                      Jelszó ismét:
                      <FontAwesomeIcon icon={faCircleInfo} className="sign-up-page__info-icon" />
                    </label>
                    <Field
                      className="sign-up-page__form-element"
                      id="confirmPassword"
                      name="confirmPassword"
                      title="A jelszónak minimum 8 maximum 20 karakter hosszúnak kell lennie és tartalmaznia kell legalább egy kisbetűt, egy nagybetűt és egy számot"
                      type={!showPassword ? 'password' : 'text'}
                      value={values.confirmPassword}
                      placeholder="Jelszó megerősítése"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {/* Password eye icon */}
                    <FontAwesomeIcon
                      onClick={handleShowPassword}
                      icon={!showPassword ? faEye : faEyeSlash}
                      className="sign-up-page__password-icon"
                    />
                    <div className="sign-up-page__error-message-container">
                      <ErrorMessage
                        name="confirmPassword"
                        render={(msg) => <div className="sign-up-page__error-message">{msg}</div>}
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <div className="sign-up-page__button-container">
                    <Button
                      label="Regisztráció"
                      type="submit"
                      className="sign-up-page__button"
                      disabled={
                        isSubmitting || !Boolean(Object.keys(touched)?.length) || Boolean(Object.keys(errors)?.length)
                      }
                    />
                  </div>
                </Form>

                {/* Navigate to log in page */}
                <div className="sign-up-page__signup-container">
                  <p
                    onClick={() => {
                      navigate('/login');
                    }}
                  >
                    Van már fiókja? lépjen be ITT! <FontAwesomeIcon icon={faAnglesRight} />
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

export default SignUpPage;
