import { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Col } from 'antd';
import { AuthContext } from '../components/Auth';
import ContainerPage from '../components/ContainerPage';
import MovieCard from '../components/MovieCard';
import Loader from '../components/auth/Loader';

export default function FavoritesList() {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;

        const fetchFavorites = async () => {
            setLoading(true);
            try {
                // Создание запроса к коллекции избранных, фильтруя по userId
                const q = query(collection(db, 'favorites'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                const movieIds = querySnapshot.docs.map(doc => doc.data().movieId);

                // Получение дополнительных данных о фильмах
                const movies = await Promise.all(
                    movieIds.map(movieId =>
                        getDoc(doc(db, 'movies', movieId))  
                    )
                );

                // Устанавливаем данные фильмов
                setFavorites(movies.filter(doc => doc.exists()).map(doc => ({ id: doc.id, ...doc.data() })));


            } catch (error) {
                console.error('Ошибка при загрузке избранных:', error);
            }
            setLoading(false);
        };

        fetchFavorites();
    }, [user]);


    if (!user) {
        return <div>Пожалуйста, войдите в систему для просмотра избранных фильмов.</div>;
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <ContainerPage>
            <Col span={24}><h2>Избранные Фильмы</h2></Col>

            {favorites.length > 0 ? (
                favorites.map(
                    (movie) => <MovieCard key={movie.id} {...movie} />
                )

            ) : (
                <p>Избранные фильмы отсутствуют.</p>
            )}

        </ContainerPage>
    );
}