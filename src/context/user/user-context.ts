import { createContext } from "react";
import { UserI } from "../../interfaces/db-intertface";

interface UserContextValue {
    isLoggedIn: boolean;
    user: UserI | null;
    login: (id: number) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextValue>({
    isLoggedIn: false,
    user: null,
    login: () => {
        throw new Error("login function not implemented");
    },
    logout: () => {
        throw new Error("logout function not implemented");
    },
});

export default UserContext;
