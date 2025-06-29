/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loader from '../Loader/Loader';
import { useHotels } from '../../context/HotelsProvider';
import { useEffect } from 'react';

function SingelHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;
  return (
    <div className='room'>
      <div className='roomDetail'>
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingelHotel;
