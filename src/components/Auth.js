import { createContext, useState } from "react";
import { dataUsers } from '../DataUsers';

export const AuthContext = createContext();

export default function Auth({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false);


    const [loginData, setLoginData] = useState({ username: '', password: '', errorMessage: '' });


    const dataPersone = { username: 'test', password: 'test' };




    const onLoginClick = (values) => {
        if (values.username === dataPersone.username && values.password === dataPersone.password) {
            setAuthenticated(true);
            setLoginData((prevState) => ({ 
                ...prevState, 
                errorMessage: '' }));
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


    return (
        <AuthContext.Provider value={{ isAuthenticated, onLoginClick, logout, loginData }}>
            {children}
        </AuthContext.Provider>
    )
}
