import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const updateUser = (data) => {
        setCurrUser(data);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currUser));
    }, [currUser]);


    return (
        <AuthContext.Provider value={{ currUser, setCurrUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}