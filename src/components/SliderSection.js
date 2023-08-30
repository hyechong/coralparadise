import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderComponent from './SliderComponent';
import { Container } from '../styles/CommonStyles';

const SliderSection = () => {
  return (
    <div>
      <Container>
        <SliderComponent mode='custom' />
        <SliderComponent mode='best' />
      </Container>
    </div>
  );
};

export default SliderSection;
