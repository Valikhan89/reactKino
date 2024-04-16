import { AuthContext } from '../components/Auth';
import { MovieContext } from '../components/MovieContext';
import { useContext } from 'react';
import { useParams } from "react-router-dom";
import { Col, Row } from 'antd';

export default function MoviePage({ onAddToFavorites, onRemoveFromFavorites, favoriteMovies }) {
    const { isAuthenticated } = useContext(AuthContext);
    const { movies } = useContext(MovieContext);
    const { movieId } = useParams();

    const dataMovie = movies.find((mov) => mov.id==movieId);

    return (
        <>
            <Col span={24} md={6} lg={4} xl={4}>
                <img src={dataMovie.image} width='100%' />
            </Col>
            <Col span={24} md={12} lg={20} xl={20}>
                <h2>{dataMovie.title}</h2>
                <p>{dataMovie.description}</p>
                <Row>
                    <Col span={24} md={6}>
                        {dataMovie.genre}
                        {dataMovie.country}
                    </Col>
                    <Col span={24} md={6}>
                        {dataMovie.IMDb}
                        {dataMovie.release}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {isAuthenticated ? (
                            <>
                                {favoriteMovies.includes(dataMovie.id) ? (
                                    <button onClick={() => onRemoveFromFavorites(dataMovie.id)}>Удалить из избранного</button>
                                ) : (
                                    <button onClick={() => onAddToFavorites(dataMovie.id)}>Добавить в избранное</button>
                                )
                                }
                            </>
                        ) : (
                            <div><strong>Авторизуйтесь для добавления в избранное</strong></div>
                        )
                        }
                    </Col>

                </Row>

            </Col>

            <Col span={24}>
                <iframe src={dataMovie.video} width='100%' height='600'></iframe>
            </Col>
        </>
    )
}
