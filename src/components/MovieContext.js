import { createContext, useState } from 'react';
import { data } from '../Data';

export const MovieContext = createContext();

export default function MovieProvider({ children }) {
    const [movies, setMovies] = useState(data);

    return (
        <MovieContext.Provider value={{ movies }}>
            {children}
        </MovieContext.Provider>
    );
};
