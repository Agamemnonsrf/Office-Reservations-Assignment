import LoginDropdown from "../components/employee/login-dropdown.tsx";
import React, { useState, useContext, useEffect } from "react";
import { UserI } from "../interfaces/db-intertface";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user/user-context.ts";
import { getData, loadAllMockData } from "../mocks/utils.ts";

const LoginScreen: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<UserI | null>(null);
    const [users, setUsers] = useState<UserI[]>([]);
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleLogin = () => {
        if (!selectedUser) return;
        if (!isUserValid()) {
            alert("User has been modified, reload the page");
            return;
        }
        login(selectedUser.id);
        navigate("/");
    };

    const isUserValid = () => {
        const mockUsers = getData("users") as UserI[];
        const user = mockUsers.find((user) => user.id === selectedUser?.id);
        if (!user || !selectedUser) return false;
        //check if user is exactly the same as selectedUser
        if (user.name !== selectedUser.name) return false;

        //check if roles are the same
        if (user.roles.length !== selectedUser.roles.length) return false;
        if (
            !user.roles.every(
                (role, index) => role === selectedUser.roles[index]
            )
        )
            return false;
        return true;
    };

    const resetDb = () => {
        localStorage.clear();
        loadAllMockData();
        localStorage.setItem("is_intialized", "true");
        const mockUsers = getData("users");
        setUsers(mockUsers as UserI[]);
    };

    useEffect(() => {
        //check local storage for user
        const is_intialized = localStorage.getItem("is_intialized");
        if (!is_intialized) {
            loadAllMockData();
            localStorage.setItem("is_intialized", "true");
        }
        const mockUsers = getData("users");
        setUsers(mockUsers as UserI[]);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-950">
            <h1 className="text-3xl font-bold mb-4">
                Welcome, please login first
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-5">
                <LoginDropdown
                    user={selectedUser}
                    setUser={setSelectedUser}
                    users={users}
                />
                <button disabled={!selectedUser} onClick={handleLogin}>
                    Login
                </button>
                <button onClick={resetDb} className="absolute end-0 top-0 m-5">
                    Reset DB
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;
