import './App.css';
import './components/Style.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase"
import Auth from './components/Auth';
import Header from './components/Header';
import Loader from './components/auth/Loader';
import MovieList from './pages/MovieList';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';


function App() {

  //Показ прелоадера
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Auth>
        <Routes>
          <Route path="/" element={<Header />} >
            <Route path="/" element={<MovieList />} />
            <Route path="/movieList" element={<MovieList />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/movieList/:movieId' element={<MoviePage />} />
          </Route>

        </Routes>
      </Auth>
    </BrowserRouter>

  );
}

export default App;
