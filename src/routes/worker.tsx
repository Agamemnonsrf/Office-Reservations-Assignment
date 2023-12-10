import React from "react";
import LoginDropdown from "../components/employee/login-dropdown";

const WorkerWelcomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome, Worker!</h1>
            <LoginDropdown />
        </div>
    );
};

export default WorkerWelcomePage;
