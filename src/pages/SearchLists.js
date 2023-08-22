import React from 'react';
import { fetchData, getOptions } from '../utils/fetchData';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchItems from '../components/SearchItems';

const SearchLists = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get('location');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  useEffect(() => {
    const getSearchData = async () => {
      const getData = await fetchData(
        `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkIn}&checkout=${checkOut}&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`,
        getOptions
      );
      console.log(getData);
      return getData;
    };

    getSearchData();
  }, []);

  return (
    <div>
      <Header />
      <SearchItems />
    </div>
  );
};

export default SearchLists;
