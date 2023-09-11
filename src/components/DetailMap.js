import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import MarkerIcon from '../assets/marker.png';
import { styled } from 'styled-components';

const MapContainer = styled.div`
  height: 500px;

  .map-wrapper {
    border: none;
  }
`;

const DetailMap = ({ lati, long }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
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
    setCurrentLocation({ lat: lati, lng: long });
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error';
  if (!isLoaded) return 'Maps';
  console.log(long);
  return (
    <MapContainer>
      <div className='map-wrapper'>
        <GoogleMap
          mapContainerStyle={{
            height: '500px',
            width: '100%',
            border: 'none',
            borderRadius: '1rem',
          }}
          center={currentLocation}
          zoom={16}
          onLoad={onMapLoad}
          onClick={() => setActiveMarker(null)}>
          <Marker
            position={{ lat: lati, lng: long }}
            icon={{
              url: MarkerIcon,
              scaledSize: new window.google.maps.Size(30, 40),
            }}
          />
        </GoogleMap>
      </div>
    </MapContainer>
  );
};

export default DetailMap;
