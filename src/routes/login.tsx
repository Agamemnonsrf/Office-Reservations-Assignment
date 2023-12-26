import LoginDropdown from "../components/employee/login-dropdown.tsx";
import React, { useState, useContext } from "react";
import { UserI } from "../interfaces/db-intertface";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user/user-context.ts";

const LoginScreen: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<UserI | null>(null);
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleLogin = () => {
        if (!selectedUser) return;
        login(selectedUser.id);
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-800">
            <h1 className="text-3xl font-bold mb-4">
                Welcome, please login first
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-5">
                <LoginDropdown user={selectedUser} setUser={setSelectedUser} />
                <button disabled={!selectedUser} onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;
