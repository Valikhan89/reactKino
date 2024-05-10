import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"

import { createContext, useState, useEffect } from "react";



export const AuthContext = createContext();

export default function Auth({ children }) {


    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuthenticated] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setAuthenticated(true);
            } else {
                setUser(null);
                setAuthenticated(false);
            }
        });
        return () => {
            unsubscribe();
        }
    }, []);



    return (
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}
