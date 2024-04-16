import { AuthContext } from './Auth';
import ContainerPage from './ContainerPage';
import MovieCard from './MovieCard';
import MoviePage from './MoviePage';
import { useContext, useState } from 'react';

//FIX: remove data
export default function Favorites({ data, onAddToFavorites, onRemoveFromFavorites, favoriteMovies }) {
    const { isAuthenticated } = useContext(AuthContext);

    const [hadleMovie, setHadleMovie] = useState();

    const favoriteMoviesData = data.filter((movie) => favoriteMovies.includes(movie.id));

    const oneMovie = data.find(
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