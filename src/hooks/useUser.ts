import { useState } from "react";
import { UserI } from "../interfaces/db-intertface";
import { getData } from "../mocks/utils";

const useUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserI | null>(null);

    const login = (id: number) => {
        const user = getData("users", { id: id });
        setIsLoggedIn(true);
        setUser(user[0] as UserI);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return {
        isLoggedIn,
        user,
        login,
        logout,
    };
};

export default useUser;
