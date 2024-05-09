import './App.css';
import './components/Style.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, context } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase"
import Auth from './components/Auth';
import MovieProvider from './components/MovieContext';
import Header from './components/Header';
import Loader from './components/auth/Loader';
import MovieList from './pages/MovieList';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import { data } from './Data';




function App() {

  /*
  //подключаемся к серверу
  const [baza, setBaza] = useState([]);
  // FIX: use error
  const [err, setErr] = useState(false);
  // FIX: use loading^ example use Spinner form antd
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setLoading(true)
      try {
        const get = await fetch('https://mocki.io/v1/8f088bd2-c2dc-46ed-ae20-d19eedc6492b ');
        const getProd = await get.json();

        setBaza(getProd);
        setLoading(false)

      } catch {
        setErr(true);
        setLoading(false);
      }
    }
    getProducts();
  }, []);
*/
  // FIX: MovieList as initial value for useState
  const [selectedPage, setSelectedPage] = useState(null);

  const [favoriteMovies, setFavoriteMovies] = useState([]); // Состояние для хранения избранных фильмов

  const handleAddToFavorites = (movieId) => {
    // Логика добавления фильма в избранное
    setFavoriteMovies((prevFavorites) => [...prevFavorites, movieId]);
  };

  const handleRemoveFromFavorites = (movieId) => {
    // Логика удаления фильма из избранного
    setFavoriteMovies((prevFavorites) => prevFavorites.filter((id) => id !== movieId));
  };



  //Показ прелоадера
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }



  return (
    <BrowserRouter>
      <Auth>
        <MovieProvider>
          <Routes>
            <Route path="/" element={<Header />} >
              <Route path="/" element={<MovieList onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
                favoriteMovies={favoriteMovies} />} />
              <Route path="/movieList" element={<MovieList onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
                favoriteMovies={favoriteMovies} />} />
              <Route path='/favorites' element={<Favorites onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
                favoriteMovies={favoriteMovies} />} />
              <Route path='/movieList/:movieId' element={<MoviePage onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
                favoriteMovies={favoriteMovies} />} />
            </Route>

          </Routes>
        </MovieProvider>
      </Auth>
    </BrowserRouter>



  );
}

export default App;
