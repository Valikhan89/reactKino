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

    const onLoginClick = 0;
    const logout = 0;
    const loginData = 0;


    /*
    
        const [isAuthenticated, setAuthenticated] = useState(false);
        const [loginData, setLoginData] = useState({ username: '', password: '', errorMessage: '' });
        const dataPersone = { username: 'test', password: 'test' };
    
    
    
    
        const onLoginClick = (values) => {
            if (values.username === dataPersone.username && values.password === dataPersone.password) {
                setAuthenticated(true);
                setLoginData((prevState) => ({
                    ...prevState,
                    errorMessage: ''
                }));
            }
            else {
                setLoginData((prevState) => ({
                    ...prevState,
                    errorMessage: "Неверный логин или пароль"
                })
                )
            }
        };
    
    
    
        const logout = () => {
            setAuthenticated(false);
            setLoginData({ username: '', pass: '', errorMessage: '' });
        };
    */



    return (
        <AuthContext.Provider value={{ isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}
