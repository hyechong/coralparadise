import React, { useState } from 'react';
import { fetchData, getOptions } from '../utils/fetchData';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { styled } from 'styled-components';
import { Container } from '../styles/CommonStyles';

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

  const getSearchData = async () => {
    const getData = await fetchData(
      `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkIn}&checkout=${checkOut}&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW`,
      getOptions
    );
    setRooms(getData.results);
    setLoading(false);
  };
  useEffect(() => {
    getSearchData();
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Container>
          <SearchResultsSection className='section'>
            {rooms.map((room) => (
              <SearchResults
                key={room.id}
                id={room.id}
                coverImg={room.images[0]}
                address={room.address}
                name={room.name}
                price={room.price}
              />
            ))}
          </SearchResultsSection>
        </Container>
      )}
    </div>
  );
};

export default SearchLists;
