import ContainerPage from './ContainerPage';
import MovieCard from './MovieCard';
import MoviePage from './MoviePage';
import { useState } from 'react';

export default function MovieList({ data, onAddToFavorites, onRemoveFromFavorites, favoriteMovies }) {
    // FIX: isMovieSelected, selectedMovie
    const [hadleMovie, setHadleMovie] = useState();

    const oneMovie = data.find(
        (mov) => mov.id === hadleMovie
    )
    return (
        <ContainerPage>
            {hadleMovie ? (
                <MoviePage dataMovie={oneMovie} onAddToFavorites={onAddToFavorites} onRemoveFromFavorites={onRemoveFromFavorites} favoriteMovies={favoriteMovies} />
            ) :
                (
                    data.map(
                        (movie) => <MovieCard key={movie.id} {...movie} onButtonClick={() => setHadleMovie(movie.id)} />
                    )
                )
            }
        </ContainerPage>
    )
}