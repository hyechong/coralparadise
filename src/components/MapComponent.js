import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import MarkerIcon from '../assets/marker.png';
import { Container } from '../styles/CommonStyles';
import { styled } from 'styled-components';
import { fetchData, getOptions } from '../utils/fetchData';
import { Link } from 'react-router-dom';
import { getFormattedTodayDate, getFormattedTomorrowDate } from '../utils/util';
import SliderComponent from './SliderComponent';
import Slider from 'react-slick';
import { BestSlider } from '../styles/Slider.styled';

const MapContainer = styled.div`
  margin-top: 3rem;
  height: 500px;

  .map-wrapper {
    padding: 3rem 0;
    border: none;
  }
  h3 {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 180%;
    letter-spacing: 0.25rem;
    text-align: center;
  }
`;

const MapComponent = () => {
  let settings = {};
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationsFromJson, setLocationsFromJson] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  });
  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  useEffect(() => {
    // Get the user's current location using geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        const ne_lat = latitude + 0.03;
        const ne_lng = longitude + 0.03;
        const sw_lat = latitude - 0.03;
        const sw_lng = longitude - 0.03;
        getMyLocaData(ne_lat, ne_lng, sw_lat, sw_lng);
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );

    const getMyLocaData = async (nelat, nelng, swlat, swlng) => {
      const getData = await fetchData(
        `https://airbnb13.p.rapidapi.com/search-location?ne_lat=${nelat}&ne_lng=${nelng}&sw_lat=${swlat}&sw_lng=${swlng}&checkin=${getFormattedTodayDate(
          new Date()
        )}&checkout=${getFormattedTomorrowDate(
          new Date()
        )}&adults=1&children=0&infants=0&pets=0&page=1`,
        getOptions
      );

      setLocationsFromJson(getData.results);
    };
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error';
  if (!isLoaded) return 'Maps';

  settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const sortedBestList = locationsFromJson.sort((a, b) => b.rating - a.rating);

  return (
    <div>
      <MapContainer>
        <h3>📍 내 주변 숙소 찾기</h3>
        <BestSlider>
          <Slider {...settings} className='slider-wrapper'>
            {sortedBestList.map((item, idx) => (
              <div className='slide-item' key={idx}>
                <img src={item.images[0]} alt='' />

                <div className='slider-text'>
                  <span className='label'>{idx + 1}위</span>
                  <Link
                    to={`/details?ne_lat=${currentLocation.lat + 0.03}&ne_lng=${
                      currentLocation.lng + 0.03
                    }&sw_lat=${currentLocation.lat - 0.03}&sw_lng=${
                      currentLocation.lng - 0.03
                    }&id=${item.id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </BestSlider>
        <Container className='map-wrapper'>
          <GoogleMap
            mapContainerStyle={{
              height: '500px',
              width: '100%',
              padding: '5px',
              border: 'none',
              borderRadius: '1rem',
            }}
            center={currentLocation}
            zoom={14}
            onLoad={onMapLoad}
            onClick={() => setActiveMarker(null)}>
            {currentLocation && (
              <Marker
                position={{
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                }}
                icon={{
                  url: MarkerIcon,
                  scaledSize: new window.google.maps.Size(30, 40),
                }}
              />
            )}

            {locationsFromJson.map((location, index) => (
              <Marker
                key={index}
                icon={{
                  url: MarkerIcon,
                  scaledSize: new window.google.maps.Size(30, 40),
                }}
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => handleActiveMarker(location)}>
                {activeMarker === location ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>{location.name}</div>
                  </InfoWindow>
                ) : null}
              </Marker>
            ))}
          </GoogleMap>
        </Container>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
