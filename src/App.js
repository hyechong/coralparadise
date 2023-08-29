import Details from './pages/Details';
import Home from './pages/Home';
import SearchLists from './pages/SearchLists';
import { Route, Routes } from 'react-router-dom';
import WishLists from './pages/WishLists';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/Globalstyles';

const theme = {
  pc: '1280px',
  tablet: '768px',
  mobile: '480px',

  colors: {
    fonts: '#333',
    point: '#ff6666',
  },

  el: {
    sectionPadding: '3rem 0',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <GlobalStyles />
        <Routes>
          <Route path='/' element={<Home />}>
            Home
          </Route>
          <Route path='/search-lists' element={<SearchLists />}>
            SearchLists
          </Route>
          <Route path='/details/:id' element={<Details />}>
            Details
          </Route>
          <Route path='/wish-lists' element={<WishLists />}>
            WishLists
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
