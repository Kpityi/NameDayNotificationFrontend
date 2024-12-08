import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import './index.scss';
import * as Yup from 'yup';
import { useState } from 'react';
import Button from '../../UI/Button';
import axios from 'axios';
import { API_URL } from '../../../common/constants/environment';
import { useSnackbar } from '../../../contexts/snackbarContenxt';

//interfaces
interface InitialValues {
  name: string;
}

interface ValidationShema {
  name: string;
}

interface nameDaysProps {
  id: number | null;
  day: number | null;
  month: number | null;
  name: string | null;
}

const AddNameNotification = () => {
  const [nameDays, setNameDays] = useState<nameDaysProps[]>([]);
  const { showSnackbar } = useSnackbar();

  const initialValues: InitialValues = {
    name: '',
  };

  const validationShema: Yup.ObjectSchema<ValidationShema> = Yup.object({
    name: Yup.string().required('Mező kitöltése kötelező!'),
  });

  const handleSearch = async (values: InitialValues, { setSubmitting, resetForm }: FormikHelpers<InitialValues>) => {
    console.log('handle submit name: ', values);

    try {
      const response = await axios.post(`${API_URL}/names/name`, values, { withCredentials: true });
      console.log(response.data); //pityi
      setNameDays(response.data);
    } catch (error) {
      console.error('error: ', error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const handleAddNameNotification = async (nameDay: nameDaysProps) => {
    console.log('nameday: ', nameDay); //pityi
    try {
      const response = await axios.post(
        `${API_URL}/notifications/add/nameday/${nameDay.id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        showSnackbar({
          message: response.data.message,
          severity: 'success',
        });
      }
      console.log(response.data); //pityi
    } catch (error) {
      console.error('error: ', error);
      if (axios.isAxiosError(error)) {
        showSnackbar({
          message: error.response?.data.message,
          severity: 'error',
          autoClose: 3000,
        });
      }
    } finally {
    }
  };

  return (
    <div className="add-name-notification">
      <div className="add-name-notification__form-wrapper">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationShema}
          onSubmit={handleSearch}
        >
          {({ values, errors, dirty, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
            <div className="add-name-notification__form-container">
              <Form className="add-name-notification__form" onSubmit={handleSubmit}>
                {/*  Name */}
                <div className="add-name-notification__input-group">
                  <label htmlFor="name" className="add-name-notification__label">
                    Név
                  </label>
                  <Field
                    className="add-name-notification__input-name"
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="add-name-notification__error-message-container">
                    <ErrorMessage
                      name="name"
                      render={(msg) => <div className="add-name-notification__error-message">{msg}</div>}
                    />
                  </div>
                </div>

                {/* Button */}
                <div className="login-page__button-container">
                  <Button
                    label="keresés"
                    type="submit"
                    className="add-name-notification__button"
                    disabled={isSubmitting || !!Object.keys(errors)?.length || !dirty}
                  />
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
      <hr className="add-name-notification__hr" />
      <div className="add-name-notification__title">Válassza ki meyik névnaphoz szeretne emlékeztetőt beállítani</div>
      <table className="add-name-notification__names-container">
        <thead>
          <tr className="add-name-notification__nameday-header">
            <th className="add-name-notification__date">dátum</th>
            <th className="add-name-notification__name">Név</th>
          </tr>
        </thead>
        <tbody>
          {nameDays
            ? nameDays.map((nameDay) => {
                if (!nameDay?.month || !nameDay?.day) {
                  return null;
                }
                return (
                  <tr
                    className="add-name-notification__nameday"
                    key={nameDay.id}
                    onClick={() => handleAddNameNotification(nameDay)}
                  >
                    <td className="add-name-notification__date">
                      {nameDay?.month < 10 ? `0${nameDay.month}` : nameDay.month}.
                      {nameDay?.day < 10 ? `0${nameDay.day}` : nameDay.day}.
                    </td>
                    <td className="add-name-notification__name">{nameDay.name}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <div className="add-name-notification__help">
        Amennyiben a fenti listában nem található az ön által keresett névnap, kérem jelezze felénk, vagy készítsen egy
        "alkalom" emlékeztetőt.
      </div>
    </div>
  );
};

export default AddNameNotification;
