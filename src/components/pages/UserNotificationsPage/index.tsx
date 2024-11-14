import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { API_URL } from '../../../common/constants/environment';
import { nameOfMonth } from '../../../common/constants/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const UserNotificationsPage = () => {
  const [nameDays, setNameDays] = useState<any[]>([]);
  const [occasions, setOccasions] = useState();
  const [customs, setCustoms] = useState();

  useEffect(() => {
    const fetchNotificatons = async () => {
      try {
        const response = await axios.get(`${API_URL}/getnotifications`, { withCredentials: true });
        console.log(response.data);
        setNameDays(response.data.nameDays);
        setOccasions(response.data.occasions);
        setCustoms(response.data.custom);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotificatons();
  }, []);
  return (
    <div className="notifications-page">
      <h2 className="notifications-page__title">Notifications</h2>
      <hr className="notifications-page__hr" />
      <div className="notifications-page__nameday-notifications">
        <h4 className="notifications-page__title">Name day notifications</h4>
        <table className="notifications-page__table">
          <tr className="notifications-page__table-row">
            <th className="notifications-page__table-cell"></th>
            <th className="notifications-page__table-cell"> dátum</th>
            <th className="notifications-page__table-cell">name</th>
            <th className="notifications-page__table-cell">szerkesztés</th>
          </tr>
          {nameDays?.map((nameDay, index) => {
            return (
              <tr className="notifications-page__table-row" key={nameDay.id}>
                <td className="notifications-page__table-cell">{index}</td>
                <td className="notifications-page__table-cell">
                  {nameOfMonth[nameDay.month - 1]} {nameDay.day}.
                </td>
                <td className="notifications-page__table-cell">{nameDay.name}</td>
                <td className="notifications-page__table-cell">
                  <span className="notifications-page__icons">
                    <FontAwesomeIcon className="notifications-page__icon" icon={faPenToSquare} />
                    <FontAwesomeIcon className="notifications-page__icon" icon={faTrashCan} />
                  </span>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="notifications-page__occasion-notifications"></div>
      <div className="notifications-page__custom-notifications"></div>
    </div>
  );
};
export default UserNotificationsPage;
