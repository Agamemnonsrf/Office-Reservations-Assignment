import { UserI } from "../interfaces/db-intertface";

class UserService {
    user: UserI | null = null;

    constructor() {
        const user = localStorage.getItem("loged-in-user");
        if (user) {
            this.user = JSON.parse(user);
        }
    }
}

export const userService = new UserService();