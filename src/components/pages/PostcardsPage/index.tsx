import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { API_URL } from '../../../common/constants/environment';
import Postcard from '../../Postcard';
import { useSnackbar } from '../../../contexts/snackbarContenxt';

interface PostcardsProps {
  id: number;
  url: string;
  type: string;
}

const PostcardsPage = () => {
  const [postcards, setPostcard] = useState<PostcardsProps[]>();
  const { showSnackbar } = useSnackbar();

  const postcardsTypes = {
    birthday: 'Születésnapi',
    christmas: 'Karácsonyi',
    eastern: 'Húsvéti',
    graduation: 'Ballagási',
    halloween: 'Halloweeni',
    nameday: 'Névnapi',
    weddingAnniversary: 'Házassági évforduló',
    newYears: 'Új évi',
  };

  useEffect(() => {
    const fetchPostcards = async () => {
      try {
        const response = await axios.get(`${API_URL}/postcards`);
        console.log(response.data); //pityi

        setPostcard(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostcards();
  }, []);

  const handleSend = async (url: string, name: string, email: string, message: string) => {
    try {
      const response = await axios.post(`${API_URL}/postcards`, { url, email, message, name });
      console.log(response); //pityi
      if (response.status >= 200 && response.status < 300) {
        showSnackbar({
          message: 'Képeslap sikeresen elküldve!',
          severity: 'success',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      showSnackbar({
        message: 'képeslap küldése sikertelen, kérjük próbálja újra később!',
        severity: 'error',
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="postcards-page">
      <h2 className="postcards-page__title">Képeslapok</h2>
      <div className="postcards-page__postcards-container">
        {Object.keys(postcardsTypes).map((key: string, i: number) => {
          return (
            <div className="postcards-page__section" key={i}>
              <div className="postcards-page__type">{postcardsTypes[key as keyof typeof postcardsTypes]}</div>
              <hr className="postcards-page__hr" />
              <div className="postcards-page__wrapper">
                {postcards
                  ?.filter((postcard) => postcard.type === key)
                  .map((postcard) => {
                    return <Postcard key={postcard.id} postcard={postcard} handleSend={handleSend} />;
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostcardsPage;
