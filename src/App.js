import Details from './pages/Details';
import Home from './pages/Home';
import SearchLists from './pages/SearchLists';
import './reset.css';
import { Route, Routes } from 'react-router-dom';
import WishLists from './pages/WishLists';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />}>
          Home
        </Route>
        <Route path='/search-lists' element={<SearchLists />}>
          SearchLists
        </Route>
        <Route path='/details' element={<Details />}>
          Details
        </Route>
        <Route path='/wish-lists' element={<WishLists />}>
          WishLists
        </Route>
      </Routes>
    </div>
  );
}

export default App;
