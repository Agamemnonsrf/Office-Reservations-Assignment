import React from "react";

import { UserI } from "../../interfaces/db-intertface";

interface UserContextValue {
    isLoggedIn: boolean;
    user: UserI | null;
    login: (id: number) => void;
    logout: () => void;
}

const UserContext = React.createContext<UserContextValue>(
    {} as UserContextValue
);

export default UserContext;
