import './index.scss';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from '../../UI/Button';

//interfaces
interface initialValues {
  email: string;
  password: string;
}
interface validationShema {
  email: string | undefined;
  password: string | undefined;
}

//React
const LoginPage = () => {
  //Values
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: initialValues = {
    email: '',
    password: '',
  };
  const validationShema: Yup.ObjectSchema<validationShema> = Yup.object({
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

  //functions
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (values: initialValues) => {
    console.log('login succes', values);
  };

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
