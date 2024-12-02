import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { API_URL } from '../../../common/constants/environment';
import { nameOfMonth } from '../../../common/constants/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useModalPage } from '../../../contexts/modalContext';
import { useSnackbar } from '../../../contexts/snackbarContenxt';
import BackButton from '../../UI/Button/Back';

//interface
interface NameDaysProps {
  id: number;
  month: number;
  day: number;
  name: string;
}
interface OccasionsProps {
  id: number;
  month: number;
  day: number;
  occasion: string;
}
interface CustomProps {
  id: number;
  date: string;
  text: string;
}

const UserNotificationsPage = () => {
  const [nameDays, setNameDays] = useState<NameDaysProps[]>([]);
  const [occasions, setOccasions] = useState<OccasionsProps[]>([]);
  const [customs, setCustoms] = useState<CustomProps[]>([]);
  const { showSnackbar } = useSnackbar();

  const { showModalPage } = useModalPage();

  const fetchNotificatons = async () => {
    try {
      const response = await axios.get(`${API_URL}/notifications`, { withCredentials: true });
      console.log(response.data);
      setNameDays(response.data.nameDays);
      setOccasions(response.data.occasions);
      setCustoms(response.data.custom);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotificatons();
  }, []);

  /* const handleEdit = () => {}; */

  const handleDelet = (id: number, name: string, date: string, table: string) => {
    showModalPage(`Biztosan Törölni szeretnéd az értesítést: ${name} ${date} ?`, async () => {
      try {
        const response = await axios.delete(`${API_URL}/notifications/${table}/${id}`);
        console.log(response);

        if (response.status === 200) {
          showSnackbar({
            message: response.data.message,
            severity: 'success',
          });
          fetchNotificatons();
        } else {
          showSnackbar({
            message: 'Törlés sikertelen!',
            severity: 'error',
          });
        }
      } catch (error) {
        showSnackbar({
          message: 'Törlés sikertelen!',
          severity: 'error',
        });
        console.error(error);
      }
    });
  };

  return (
    <div className="notifications-page">
      <h2 className="notifications-page__title">Értesítések</h2>
      <hr className="notifications-page__hr" />

      {/* name day */}
      <div className="notifications-page__nameday-notifications">
        <h4 className="notifications-page__title">Névnapi értesítések</h4>
        <table className="notifications-page__table">
          <thead>
            <tr className="notifications-page__table-row">
              <th className="notifications-page__table-cell">#</th>
              <th className="notifications-page__table-cell"> dátum</th>
              <th className="notifications-page__table-cell">name</th>
              <th className="notifications-page__table-cell">szerkesztés</th>
            </tr>
          </thead>
          <tbody>
            {nameDays.length > 0
              ? nameDays.map((nameDay, index) => {
                  return (
                    <tr className="notifications-page__table-row" key={nameDay.id}>
                      <td className="notifications-page__table-cell">{index}</td>
                      <td className="notifications-page__table-cell">
                        {nameOfMonth[nameDay.month - 1]} {nameDay.day}.
                      </td>
                      <td className="notifications-page__table-cell">{nameDay.name}</td>
                      <td className="notifications-page__table-cell">
                        <span className="notifications-page__icons">
                          {/* <FontAwesomeIcon
                            className="notifications-page__icon"
                            icon={faPenToSquare}
                            onClick={handleEdit}
                          /> */}
                          <FontAwesomeIcon
                            className="notifications-page__icon"
                            icon={faTrashCan}
                            onClick={() => {
                              const date = `${nameOfMonth[nameDay.month - 1]} ${nameDay.day}`;
                              handleDelet(nameDay.id, nameDay.name, date, 'namedays');
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <hr className="notifications-page__hr" />

      {/* Occasion */}
      <div className="notifications-page__occasion-notifications">
        <h4 className="notifications-page__title">Esemény értesítések</h4>
        <table className="notifications-page__table">
          <thead>
            <tr className="notifications-page__table-row">
              <th className="notifications-page__table-cell">#</th>
              <th className="notifications-page__table-cell"> dátum</th>
              <th className="notifications-page__table-cell">esemény</th>
              <th className="notifications-page__table-cell">szerkesztés</th>
            </tr>
          </thead>
          <tbody>
            {occasions.length > 0
              ? occasions.map((occasion, index) => {
                  return (
                    <tr className="notifications-page__table-row" key={occasion.id}>
                      <td className="notifications-page__table-cell">{index}</td>
                      <td className="notifications-page__table-cell">
                        {nameOfMonth[occasion.month - 1]} {occasion.day}.
                      </td>
                      <td className="notifications-page__table-cell">{occasion.occasion}</td>
                      <td className="notifications-page__table-cell">
                        <span className="notifications-page__icons">
                          {/* <FontAwesomeIcon
                            className="notifications-page__icon"
                            icon={faPenToSquare}
                            onClick={handleEdit}
                          /> */}
                          <FontAwesomeIcon
                            className="notifications-page__icon"
                            icon={faTrashCan}
                            onClick={() => {
                              const date = `${nameOfMonth[occasion.month - 1]} ${occasion.day}`;
                              handleDelet(occasion.id, occasion.occasion, date, 'occasions');
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <hr className="notifications-page__hr" />

      {/* custom */}
      <div className="notifications-page__custom-notifications">
        <h4 className="notifications-page__title">Egyedi értesítések</h4>
        <table className="notifications-page__table">
          <thead>
            <tr className="notifications-page__table-row">
              <th className="notifications-page__table-cell">#</th>
              <th className="notifications-page__table-cell"> dátum</th>
              <th className="notifications-page__table-cell">alkalom</th>
              <th className="notifications-page__table-cell">szerkesztés</th>
            </tr>
          </thead>
          <tbody>
            {customs.length > 0
              ? customs.map((custom, index) => {
                  return (
                    <tr className="notifications-page__table-row" key={custom.id}>
                      <td className="notifications-page__table-cell">{index}</td>
                      <td className="notifications-page__table-cell">
                        {custom.date.split('T')[0].replaceAll('-', '.')}.
                      </td>
                      <td className="notifications-page__table-cell">{custom.text}</td>
                      <td className="notifications-page__table-cell">
                        <span className="notifications-page__icons">
                          {/* <FontAwesomeIcon
                            className="notifications-page__icon"
                            icon={faPenToSquare}
                            onClick={handleEdit}
                          /> */}
                          <FontAwesomeIcon
                            className="notifications-page__icon"
                            icon={faTrashCan}
                            onClick={() => {
                              handleDelet(
                                custom.id,
                                custom.text,
                                custom.date.split('T')[0].replaceAll('-', '.'),
                                'customs'
                              );
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <hr className="notifications-page__hr" />
      <BackButton className="notification-page" page="profil" />
    </div>
  );
};
export default UserNotificationsPage;
