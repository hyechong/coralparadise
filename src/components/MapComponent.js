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

const MapContainer = styled.div`
  margin-top: 3rem;
  height: 500px;

  .map-wrapper {
    padding: 3rem 0;
    border: none;
  }
  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 180%;
    letter-spacing: 0.1rem;
    text-align: center;
  }
`;

const MapComponent = () => {
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
    console.log(currentLocation);

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

  return (
    <div>
      <MapContainer>
        <h3>📍 내 주변 숙소 찾기</h3>
        <SliderComponent mode='best' data={locationsFromJson} />
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
