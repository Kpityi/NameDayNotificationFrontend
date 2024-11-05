import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../common/constants/environment';

const NameDay = () => {
  const [names, setNames] = useState<string[]>([]);
  const date = new Date();
  let year: number = date.getFullYear();
  let month: number = date.getMonth();
  let day: number = date.getDate();
  let today: number = date.getDay();

  const nameOfMonth: string[] = useMemo(
    () => [
      'január',
      'február',
      'március',
      'április',
      'május',
      'június',
      'július',
      'augusztus',
      'szeptember',
      'október',
      'november',
      'december',
    ],
    []
  );

  const nameOfDay: string[] = useMemo(
    () => ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'],
    []
  );

  useEffect(() => {
    const fetchNamedays = async (month: number, day: number) => {
      try {
        const response = await axios.post(`${API_URL}/getnames`, {
          month,
          day,
        });

        setNames(response.data);
      } catch (error) {}
    };
    fetchNamedays(month + 1, day);
  }, [month, day]);

  return (
    <div className="nameday">
      <h4>
        <FontAwesomeIcon className="nameday__icon" icon={faCalendarDays} />
        <span className="nameday__text">
          Ma {year}. {nameOfMonth[month]} {day}. {nameOfDay[today]} &nbsp;
          {names.length > 0 && names.join(', ')} névnap van
        </span>
      </h4>
    </div>
  );
};
export default NameDay;
