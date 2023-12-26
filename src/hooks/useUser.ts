import { useState } from "react";
import { UserI } from "../interfaces/db-intertface";
import { getData } from "../mocks/utils";

const useUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserI | null>(null);

    const login = (id: number) => {
        // Perform login logic here
        // Example: Make an API call to authenticate the user
        // If successful, set isLoggedIn to true and set the user data
        console.log("login", id);
        const user = getData("users", { id: id });
        if ("error" in user) {
            console.log(user);
            return;
        }
        console.log(user);
        setIsLoggedIn(true);
        setUser(user[0] as UserI);
    };

    const logout = () => {
        // Perform logout logic here
        // Example: Clear user data and set isLoggedIn to false
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
