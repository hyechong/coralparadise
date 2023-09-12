import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { Container } from '../styles/CommonStyles';
import { fetchData, getOptions } from '../utils/fetchData';
import { ClipLoader } from 'react-spinners';
import DetailImages from '../components/DetailImages';
import { styled } from 'styled-components';
import DetailMap from '../components/DetailMap';
import { getFormattedTodayDate, getFormattedTomorrowDate } from '../utils/util';

const Title = styled.div`
  font-size: 20px;
`;

const TitleWrapper = styled.div``;

const HostWrapper = styled.div``;

const HostImages = styled.img``;

const InfoWrapper = styled.div``;

const RoomInfoWrapper = styled.div``;

const RoomInfoBoxWrapper = styled.div``;

const RoomInfo = styled.div``;

const MapWrapper = styled.div``;

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
  const ne_lat = searchParams.get('ne_lat');
  const ne_lng = searchParams.get('ne_lng');
  const sw_lat = searchParams.get('sw_lat');
  const sw_lng = searchParams.get('sw_lng');
  console.log(ne_lat);

  // let fetchUrl;

  // if (location === 'near') {
  //   fetchUrl = `https://airbnb13.p.rapidapi.com/search-location?ne_lat=${ne_lat}&ne_lng=${ne_lng}&sw_lat=${sw_lat}&sw_lng=${sw_lng}&checkin=${getFormattedTodayDate(
  //     new Date()
  //   )}&checkout=${getFormattedTomorrowDate(
  //     new Date()
  //   )}&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW`;
  // } else {
  //   fetchUrl = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}&infants=0&pets=${pets}&page=1&currency=KRW`;
  // }

  // const getSearchData = async () => {
  //   const getData = await fetchData(fetchUrl, getOptions);
  //   setRooms(getData.results);
  //   setLoading(false);
  // };
  useEffect(() => {
    const getSearchData = async () => {
      let fetchUrl;

      if (ne_lat) {
        fetchUrl = `https://airbnb13.p.rapidapi.com/search-location?ne_lat=${ne_lat}&ne_lng=${ne_lng}&sw_lat=${sw_lat}&sw_lng=${sw_lng}&checkin=${getFormattedTodayDate(
          new Date()
        )}&checkout=${getFormattedTomorrowDate(
          new Date()
        )}&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW`;
      } else if (location) {
        fetchUrl = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}&infants=0&pets=${pets}&page=1&currency=KRW`;
      }
      console.log(fetchUrl);

      try {
        const getData = await fetchData(fetchUrl, getOptions);
        setRooms(getData.results);
        setLoading(false);
        console.log(getData);
      } catch (error) {
        // Handle error here, e.g., display an error message
        console.error('Error fetching data:', error);
      }
    };

    getSearchData();
  }, [
    location,
    checkIn,
    checkOut,
    adults,
    children,
    pets,
    ne_lat,
    ne_lng,
    sw_lat,
    sw_lng,
  ]);
  console.log(rooms);

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
              <div>
                <div className='section'>
                  <DetailImages roomImages={room.images} />
                  <TitleWrapper>
                    <Title>
                      <h4>{room.name}</h4>
                      <b>{room.city}</b> <em>★{room.rating}</em>
                    </Title>
                    <HostWrapper>
                      <HostImages src={room.hostThumbnail}></HostImages>
                    </HostWrapper>
                  </TitleWrapper>
                  <InfoWrapper>
                    <h4>숙소 정보</h4>
                    <p>{room.type}</p>
                  </InfoWrapper>
                  <RoomInfoWrapper>
                    <h4>숙소 시설</h4>
                    <RoomInfoBoxWrapper>
                      <RoomInfo>욕실 {room.bathrooms}개</RoomInfo>
                      <RoomInfo>
                        침실 {room.bedrooms}개 침대 {room.beds}개
                      </RoomInfo>
                    </RoomInfoBoxWrapper>
                  </RoomInfoWrapper>
                  <MapWrapper>
                    <h4>호스팅 지역</h4>
                    {room && room.lat && room.lng && (
                      <DetailMap lati={room.lat} long={room.lng} />
                    )}
                  </MapWrapper>
                </div>
              </div>
            ))}
        </Container>
      )}
    </div>
  );
};

export default Details;
