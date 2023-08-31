import React, { useState } from 'react';
import { fetchData, getOptions } from '../utils/fetchData';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { styled } from 'styled-components';
import { Container } from '../styles/CommonStyles';
import { ClipLoader } from 'react-spinners';
import SearchBar from '../components/SearchBar';

const SearchResultsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`;

const SearchLists = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const location = searchParams.get('location');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const pets = searchParams.get('pets');

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
          <div className='section'>
            <SearchBar
              location={location}
              checkIn={checkIn}
              checkOut={checkOut}
              adults={adults}
              children={children}
              pets={pets}
            />
          </div>
          <SearchResultsSection>
            {rooms.map((room) => (
              <SearchResults
                key={room.id}
                id={room.id}
                coverImg={room.images[0]}
                address={room.address}
                name={room.name}
                price={room.price}
                location={location}
                checkIn={checkIn}
                checkOut={checkOut}
                adults={adults}
                children={children}
                pets={pets}
              />
            ))}
          </SearchResultsSection>
        </Container>
      )}
    </div>
  );
};

export default SearchLists;
