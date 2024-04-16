import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function Auth({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false);


    const [hadleLogin, setHadleLogin] = useState({ login: '', pass: '', errorMessage: '' });
    // FIX: dataPersone get from backend
    const dataPersone = { login: 'test', pass: 'test' };

    // FIX: namnig for handlers
    const inputLoginValue = (loginValue) => {
        setHadleLogin((prevState) => ({
            ...prevState,
            login: loginValue.target.value
        }));
    };
    const inputPassValue = (passValue) => {
        setHadleLogin((prevState) => ({
            ...prevState,
            pass: passValue.target.value
        }));
    };


    const login = () => {
        if (hadleLogin.login === dataPersone.login && hadleLogin.pass === dataPersone.pass) {
            setAuthenticated(true);
        }
        else {
            setHadleLogin((prevState) => ({
                ...prevState,
                errorMessage: "Неверный логин или пароль"
            })
            )
        }
    };

    const logout = () => {
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, inputLoginValue, inputPassValue }}>
            {children}
        </AuthContext.Provider>
    )
}
