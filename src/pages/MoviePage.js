import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import { Col, Row, Button } from 'antd';
import { doc, onSnapshot,  setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../components/Auth';
import Loader from '../components/auth/Loader';


// Добавление в избранное
async function addToFavorites(userId, movieId) {
    try {
        const favoriteId = `${userId}_${movieId}`; // Создание уникального ID для избранного        
        await setDoc(doc(db, 'favorites', favoriteId), {
            userId,
            movieId,
            createdAt: new Date()
        });
        console.log('Добавлено в избранное!');
    } catch (error) {
        console.error('Ошибка: ', error);
    }
}

// Удаление из избранного
async function onRemoveFromFavorites(userId, movieId) {
    try {
        const favoriteId = `${userId}_${movieId}`;
        await deleteDoc(doc(db, 'favorites', favoriteId));
        console.log('Удален из избранного!');
    } catch (error) {
        console.error('Ошибка:', error);
    }
};


export default function MoviePage() {
    const { isAuthenticated, user } = useContext(AuthContext);

    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);

    const [isFavorite, setIsFavorite] = useState(false);

    // Запрос на вывод фильма
    useEffect(() => {
        if (!movieId) return; // Дополнительная проверка на валидность movieId
        const docRef = doc(db, 'movies', movieId);

        const unsubscribe = onSnapshot(docRef, (documentSnapshot) => {
            if (documentSnapshot.exists()) {
                setMovie({ id: documentSnapshot.id, ...documentSnapshot.data() });
            } else {
                console.log("Фильм не найден!");
                setMovie(null);  //  если фильм не найден
            }
        });

        return () => unsubscribe();
    }, [movieId]);

    //Проверка добавлен ли в избранное
    useEffect(() => {
        if (user && movieId) {
            const favoriteId = `${user.uid}_${movieId}`;
            const unsub = onSnapshot(doc(db, 'favorites', favoriteId), (doc) => {
                setIsFavorite(doc.exists());
            });
            return () => unsub();
        }
    }, [user, movieId]);


    //Добавить в избранное
    const handleAddToFavorites = () => {
        if (user) {
            addToFavorites(user.uid, movie.id);
        }
    };
    //Удалить из избранного
    const handleRemoveFromFavorites = () => {
        onRemoveFromFavorites(user.uid, movie.id);
    };



    // проверка, чтобы компонент не пытался обратиться к данным до загрузки 
    if (!movie) {
        return <Loader />
    }



    return (
        <>

            <Col span={24}>
                <iframe src={movie.video} width='100%' height='600' title="Movie Player"></iframe>
            </Col>
            <Col span={24} md={6} lg={4} xl={4}>
                <img src={movie.image} alt={movie.title} width='100%' />
            </Col>
            <Col span={24} md={12} lg={20} xl={20}>
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <Row>
                    <Col span={24} md={6}>
                        <p><strong>Жанр:</strong> {movie.genre}</p>
                        <p><strong>Страна:</strong> {movie.country}</p>
                    </Col>
                    <Col span={24} md={6}>
                        <p> <strong>Рейтинг IMDb:</strong> {movie.IMDb}</p>
                        <p> <strong>Год:</strong> {movie.release}</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {isAuthenticated ? (
                            <>
                                {isFavorite ? (
                                    <Button type='primary' danger onClick={handleRemoveFromFavorites}>Удалить из избранного</Button>
                                ) : (
                                    <Button type='primary' onClick={handleAddToFavorites}>Добавить в избранное</Button>
                                )}
                            </>
                        ) : (
                            <div><strong>Авторизуйтесь для добавления в избранное</strong></div>
                        )
                        }
                    </Col>

                </Row>

            </Col>
        </>
    )
}
