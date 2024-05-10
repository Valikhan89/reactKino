import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../../firebase"

export default function AuthDetails() {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        }
    }, []);
    function userSignOut() {
        signOut(auth)
            .then(() => console.log("success"))
            .catch((e) => console.log(e));
    }
    return (
        <>
            {authUser && (
                <div>{`Ваш логин: ${authUser.email}`} <button onClick={userSignOut}>Выйти</button></div>
            ) }
        </>
    )
}
