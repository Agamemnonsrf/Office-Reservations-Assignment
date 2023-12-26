import React from "react";
import UserContext from "./user-context";
import useUser from "../../hooks/useUser";

type UserProviderProps = {
    children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
    const { login, logout, user, isLoggedIn } = useUser();

    return (
        <UserContext.Provider value={{ login, logout, user, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
