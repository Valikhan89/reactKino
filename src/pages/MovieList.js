import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; 


export default function MoviesList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'movies'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const moviesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMovies(moviesData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            {movies.map(
                (movie) => <MovieCard key={movie.id} {...movie} />
            )
            }
        </>
    );
}
