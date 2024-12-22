import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_BASE_URL } from '../../common/constants/environment';
import './index.scss';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Button from '../UI/Button';
import { useState } from 'react';
import classNames from 'classnames';

interface Postcard {
  id: number;
  url: string;
  type: string;
}

interface PostCardProps {
  postcard: Postcard;
  handleSend: (url: string, name: string, email: string, message: string) => void;
}

interface initialValues {
  email: string;
  name: string;
  message: string;
}

const Postcard: React.FC<PostCardProps> = ({ postcard, handleSend }) => {
  const initialValues = { email: '', name: '', message: '' };
  const validationShema = Yup.object({
    email: Yup.string().trim().email('Kérem Valós email címet adjon meg!').required('Mező kitöltése kötelező'),
    name: Yup.string().trim().required('Kérem adja meg nevét!'),
  });
  const [showEmailBox, setShowEmailBox] = useState(false);

  const createClassname = classNames('postcard__form-container', showEmailBox && '-show');
  const handleSendEmail = async (values: initialValues, { resetForm, setSubmitting }: FormikHelpers<initialValues>) => {
    setShowEmailBox(false);
    handleSend(postcard.url, values.name, values.email, values.message);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="postcard__container">
      <div className="postcard__image-container">
        <img src={`${API_BASE_URL}/${postcard.url}`} alt={postcard.type + ' képeslap'} className="postcard__image" />
      </div>
      <div className="postcard__buttons">
        <span className="postcard__buttons-text">Küldés: </span>
        <FontAwesomeIcon
          icon={faEnvelope}
          className="postcard__icon -mail"
          onClick={() => {
            setShowEmailBox(!showEmailBox);
          }}
        />
        <Link to={`https://www.facebook.com/sharer/sharer.php?u=${API_BASE_URL}/${postcard.url}`} target="_blank">
          <FontAwesomeIcon icon={faFacebook} className="postcard__icon -facebook" />
        </Link>
        <Link to={`https://www.facebook.com/dialog/share?link=${API_BASE_URL}/${postcard.url}`} target="_blank">
          <FontAwesomeIcon icon={faFacebookMessenger} className="postcard__icon -messenger" />
        </Link>
      </div>
      <div className={createClassname}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationShema}
          onSubmit={handleSendEmail}
        >
          {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className="postcard__form-group">
                <label className="postcard__label" htmlFor="name">
                  Kitől
                </label>
                <Field
                  className="postcard__input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Név"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div className="postcard__error-message-container">
                  <ErrorMessage name="email" render={(msg) => <div className="postcard__error-message">{msg}</div>} />
                </div>
              </div>
              <div className="postcard__form-group">
                <label className="postcard__label" htmlFor="email">
                  Kinek
                </label>
                <Field
                  className="postcard__input"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div className="postcard__error-message-container">
                  <ErrorMessage name="email" render={(msg) => <div className="postcard__error-message">{msg}</div>} />
                </div>
              </div>
              <div className="postcard__form-group">
                <label className="postcard__label" htmlFor="message">
                  Üzenet
                </label>
                <Field
                  as="textarea"
                  className="postcard__input"
                  type="text"
                  name="message"
                  id="message"
                  placeholder="Üzenet"
                  value={values.message}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div className="postcard__error-message-container">
                  <ErrorMessage name="message" render={(msg) => <div className="postcard__error-message">{msg}</div>} />
                </div>
              </div>

              {/* Button */}
              <div className="postcard__button-container">
                <Button
                  label="küldés"
                  type="submit"
                  className="postcard__button"
                  disabled={
                    isSubmitting || !Boolean(Object.keys(touched)?.length) || Boolean(Object.keys(errors)?.length)
                  }
                />
                <Button
                  label="mégsem"
                  type="button"
                  className="postcard__button"
                  onClick={() => setShowEmailBox(false)}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Postcard;
