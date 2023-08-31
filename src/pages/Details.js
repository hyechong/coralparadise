import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { Container } from '../styles/CommonStyles';
import { fetchData, getOptions } from '../utils/fetchData';
import { ClipLoader } from 'react-spinners';
import DetailImages from '../components/DetailImages';

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const location = searchParams.get('location');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const pets = searchParams.get('pets');
  const roomId = searchParams.get('id');

  const getSearchData = async () => {
    const getData = await fetchData(
      `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}&infants=0&pets=${pets}&page=1&currency=KRW`,
      getOptions
    );
    setRooms(getData.results);
    setLoading(false);
  };
  useEffect(() => {
    getSearchData();
  }, [location, checkIn, checkOut, adults, children, pets]);

  return (
    <div>
      <Header />
      {loading ? (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <ClipLoader
            color='#ff6666'
            height={15}
            width={5}
            radius={2}
            margin={2}
          />
        </div>
      ) : (
        <Container>
          {rooms
            .filter((room) => room.id === roomId)
            .map((room) => (
              <div className='section'>
                <DetailImages roomImages={room.images} />
              </div>
            ))}
        </Container>
      )}
    </div>
  );
};

export default Details;
