import './index.scss';
import * as Yup from 'yup';

//interfaces
interface InitialValues {
  name: string;
  year: number;
  month: number | null;
  day: number | null;
}

interface ValidationShema {
  name: string;
  year: number | null;
  month: number | null;
  day: number | null;
}

const AddCustomNotification = () => {
  const initialValues: InitialValues = {
    name: '',
    year: null,
    month: null,
    day: null,
  };
  const validationShema: Yup.ObjectSchema<ValidationShema> = Yup.object({
    name: Yup.string().trim().required('Mező kitöltése kötelező!'),
    year: Yup.number().required('Kérem adja meg az évet!'),
    month: Yup.number().required('Kérem adja meg a hónapot!'),
    day: Yup.number().required('Kérem adja meg a napot!'),
  });

  return (
    <div className="add-custom-notification">
      <h2 className="add-custom-notification__title">Emlékeztető Létrehozása</h2>
    </div>
  );
};

export default AddCustomNotification;
