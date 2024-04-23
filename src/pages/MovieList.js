import ContainerPage from '../components/ContainerPage';
import MovieCard from '../components/MovieCard';
import { useState, useContext } from 'react';
import { MovieContext } from '../components/MovieContext';

export default function MovieList({  onAddToFavorites, onRemoveFromFavorites, favoriteMovies }) {

    const { movies } = useContext(MovieContext);

    // FIX: isMovieSelected, selectedMovie
 /*   const [hadleMovie, setHadleMovie] = useState();

    const oneMovie = movies.find(
        (mov) => mov.id === hadleMovie
    )*/
    
    return (
        <ContainerPage>
            { movies.map(
                (movie) => <MovieCard key={movie.id} {...movie}/>
            )                
            }
        </ContainerPage>
    )
}