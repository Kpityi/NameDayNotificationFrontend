import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import './index.scss';
import * as Yup from 'yup';
import Button from '../UI/Button';

//interfaces
interface InitialValues {
  occasion: string;
  month: number | null;
  day: number | null;
}

interface ValidationShema {
  occasion: string;
  month: number | null;
  day: number | null;
}

interface OccasionProps {
  occasion: string;
  month: number;
  day: number;
}

const AddOccasionNotification = () => {
  const [occasion, setOccasion] = useState<OccasionProps[]>([]);

  const initialValues: InitialValues = {
    occasion: '',
    month: 1,
    day: 1,
  };

  const validationShema: Yup.ObjectSchema<ValidationShema> = Yup.object({
    occasion: Yup.string().trim().required('Mező kitöltése kötelező!'),
    month: Yup.number().min(1).max(12).required('Kérem adja meg a hónapot!'),
    day: Yup.number().min(1).max(31).required('Kérem adja meg a napot!'),
  });

  const handleAddOccasion = () => {
    console.log('Add Occasion');
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
          {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
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
                    name="ocassion"
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
                    disabled={isSubmitting || Boolean(Object.keys(touched)) || Boolean(Object.keys(errors)?.length)}
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
