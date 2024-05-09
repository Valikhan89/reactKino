import { AuthContext } from '../components/Auth';
import ContainerPage from '../components/ContainerPage';
import MovieCard from '../components/MovieCard';
import MoviePage from './MoviePage';
import { useContext, useState } from 'react';
import { MovieContext } from '../components/MovieContext';


export default function Favorites({ onAddToFavorites, onRemoveFromFavorites, favoriteMovies }) {
    const { isAuthenticated } = useContext(AuthContext);

    const { movies } = useContext(MovieContext);

    const [hadleMovie, setHadleMovie] = useState();

    const favoriteMoviesData = movies.filter((movie) => favoriteMovies.includes(movie.id));

    const oneMovie = movies.find(
        (mov) => mov.id === hadleMovie
    )
    return (
        <ContainerPage>
            {isAuthenticated ? (
                <>
                    {hadleMovie ? (
                        <MoviePage dataMovie={oneMovie} onAddToFavorites={onAddToFavorites} onRemoveFromFavorites={onRemoveFromFavorites} favoriteMovies={favoriteMovies} />
                    ) :
                        (
                            favoriteMoviesData.map(
                                (movie) => <MovieCard key={movie.id} {...movie} onButtonClick={() => setHadleMovie(movie.id)} />
                            )
                        )
                    }
                </>
            ) : (
                <div>Вы не вошли на сайт</div>
            )
            }
        </ContainerPage>
    )
}