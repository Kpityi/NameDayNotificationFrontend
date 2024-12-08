import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import './index.scss';
import * as Yup from 'yup';
import Button from '../../UI/Button';
import { useSnackbar } from '../../../contexts/snackbarContenxt';
import axios from 'axios';
import { API_URL } from '../../../common/constants/environment';

//interfaces
interface InitialValues {
  occasion: string | null;
  month: number | null;
  day: number | null;
}

interface ValidationShema {
  occasion: string | null;
  month: number | null;
  day: number | null;
}

const AddOccasionNotification = () => {
  const { showSnackbar } = useSnackbar();

  const initialValues: InitialValues = {
    occasion: '',
    month: 1,
    day: 1,
  };

  const validationShema: Yup.ObjectSchema<ValidationShema> = Yup.object({
    occasion: Yup.string().trim().min(1).required('Mező kitöltése kötelező!'),
    month: Yup.number().min(1).max(12).required('Kérem adja meg a hónapot!'),
    day: Yup.number().min(1).max(31).required('Kérem adja meg a napot!'),
  });

  const handleAddOccasion = async (
    values: InitialValues,
    { setSubmitting, resetForm }: FormikHelpers<InitialValues>
  ) => {
    console.log('Add Occasion'); // pityi
    try {
      const response = await axios.post(`${API_URL}/notifications/add/occasion`, values, { withCredentials: true });
      if (response.status >= 200 && response.status < 300) {
        showSnackbar({ message: response.data.message, severity: 'success' });
      }
    } catch (error) {
      console.error('error: ', error);
      if (axios.isAxiosError(error)) {
        showSnackbar({
          message: error.response?.data.message,
          severity: 'error',
        });
      }
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="add-occasion-notification">
      <div className="add-occasion-notification__form-wrapper">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationShema}
          onSubmit={handleAddOccasion}
        >
          {({ values, errors, dirty, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
            <div className="add-occasion-notification__form-container">
              <Form className="add-occasion-notification__form" onSubmit={handleSubmit}>
                <div className="add-occasion-notification__date-group">
                  <div className="add-occasion-notification__input-group">
                    <label htmlFor="month" className="add-occasion-notification__label">
                      Hónap
                    </label>
                    <Field
                      className="add-occasion-notification__input-number"
                      id="month"
                      name="month"
                      type="number"
                      value={values.month}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="add-occasion-notification__input-group">
                    <label htmlFor="day" className="add-occasion-notification__label">
                      Nap
                    </label>
                    <Field
                      className="add-occasion-notification__input-number"
                      id="day"
                      name="day"
                      type="number"
                      value={values.day}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="add-occasion-notification__error-message-container">
                  <ErrorMessage
                    name="month"
                    render={(msg) => <div className="add-occasion-notification__error-message">{msg}</div>}
                  />

                  <ErrorMessage
                    name="day"
                    render={(msg) => <div className="add-occasion-notification__error-message">{msg}</div>}
                  />
                </div>

                <div className="add-occasion-notification__input-group">
                  <label htmlFor="occasion" className="add-occasion-notification__label">
                    Alkalom
                  </label>
                  <Field
                    className="add-occasion-notification__input-name"
                    id="occasion"
                    name="occasion"
                    type="text"
                    value={values.occasion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="add-occasion-notification__error-message-container">
                    <ErrorMessage
                      name="occasion"
                      render={(msg) => <div className="add-occasion-notification__error-message">{msg}</div>}
                    />
                  </div>
                </div>

                {/* Button */}

                <div className="login-page__button-container">
                  <Button
                    label="Hozzáad"
                    type="submit"
                    className="add-occasion-notification__button"
                    disabled={isSubmitting || !dirty || Boolean(Object.keys(errors)?.length)}
                  />
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddOccasionNotification;
