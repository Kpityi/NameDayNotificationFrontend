import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import './index.scss';
import * as Yup from 'yup';
import Button from '../../UI/Button';
import { useSnackbar } from '../../../contexts/snackbarContenxt';
import axios from 'axios';
import { API_URL } from '../../../common/constants/environment';

//interfaces
interface InitialValues {
  text: string | null;
  year: number | null;
  month: number | null;
  day: number | null;
}

interface ValidationShema {
  text: string | null;
  year: number | null;
  month: number | null;
  day: number | null;
}

const AddCustomNotification = () => {
  const minDate = new Date(Number(new Date()) + 1000 * 60 * 60 * 72);

  const { showSnackbar } = useSnackbar();

  const initialValues: InitialValues = {
    text: '',
    year: minDate.getFullYear(),
    month: minDate.getMonth() + 1,
    day: minDate.getDate(),
  };

  const validationShema: Yup.ObjectSchema<ValidationShema> = Yup.object({
    text: Yup.string().trim().min(1).required('Mező kitöltése kötelező!'),
    year: Yup.number()
      .min(minDate.getFullYear(), `Az év nem lehet kevesebb ${minDate.getFullYear()}`)
      .required('Kérem adja meg ay évet!'),
    month: Yup.number()
      .min(1, `A hónap nem lehet kevesebb ${minDate.getMonth() + 1}`)
      .max(12, 'A hónap nem lehet több mint 12')
      .required('Kérem adja meg a hónapot!'),
    day: Yup.number()
      .min(1, `A nap nem lehet kevesebb ${minDate.getDate()}`)
      .max(31, 'A nap nem lehet több mint 31')
      .required('Kérem adja meg a napot!'),
  });

  const handleAddCustom = async (values: InitialValues, { setSubmitting, resetForm }: FormikHelpers<InitialValues>) => {
    console.log('Add Custom'); // pityi
    try {
      const response = await axios.post(`${API_URL}/notifications/add/custom`, values, { withCredentials: true });
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
    <div className="add-custom-notification">
      <div className="add-custom-notification__form-wrapper">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationShema}
          onSubmit={handleAddCustom}
        >
          {({ values, errors, dirty, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
            <div className="add-custom-notification__form-container">
              <Form className="add-custom-notification__form" onSubmit={handleSubmit}>
                <div className="add-custom-notification__date-group">
                  <div className="add-custom-notification__input-group">
                    <label htmlFor="year" className="add-custom-notification__label">
                      Év
                    </label>
                    <Field
                      className="add-custom-notification__input-number"
                      id="year"
                      name="year"
                      type="number"
                      value={values.year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="add-custom-notification__input-group">
                    <label htmlFor="month" className="add-custom-notification__label">
                      Hónap
                    </label>
                    <Field
                      className="add-custom-notification__input-number"
                      id="month"
                      name="month"
                      type="number"
                      value={values.month}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="add-custom-notification__input-group">
                    <label htmlFor="day" className="add-custom-notification__label">
                      Nap
                    </label>
                    <Field
                      className="add-custom-notification__input-number"
                      id="day"
                      name="day"
                      type="number"
                      value={values.day}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="add-custom-notification__error-message-container">
                  <ErrorMessage
                    name="year"
                    render={(msg) => <div className="add-custom-notification__error-message">{msg}</div>}
                  />

                  <ErrorMessage
                    name="month"
                    render={(msg) => <div className="add-custom-notification__error-message">{msg}</div>}
                  />

                  <ErrorMessage
                    name="day"
                    render={(msg) => <div className="add-custom-notification__error-message">{msg}</div>}
                  />
                </div>

                <div className="add-custom-notification__input-group">
                  <label htmlFor="text" className="add-custom-notification__label">
                    Esemény
                  </label>
                  <Field
                    className="add-custom-notification__input-name"
                    id="text"
                    name="text"
                    type="text"
                    value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="add-custom-notification__error-message-container">
                    <ErrorMessage
                      name="text"
                      render={(msg) => <div className="add-custom-notification__error-message">{msg}</div>}
                    />
                  </div>
                </div>

                {/* Button */}

                <div className="login-page__button-container">
                  <Button
                    label="Hozzáad"
                    type="submit"
                    className="add-custom-notification__button"
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

export default AddCustomNotification;
