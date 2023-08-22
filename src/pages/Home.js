import React from 'react';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import { Container, Section } from '../styles/CommonStyles';

const Home = () => {
  return (
    <div>
      <Header />
      <Container>
        <Section>
          <SearchInput />
        </Section>
      </Container>
    </div>
  );
};

export default Home;
