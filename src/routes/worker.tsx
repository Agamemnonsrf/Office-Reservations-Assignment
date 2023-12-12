import React from "react";
import LoginDropdown from "../components/employee/login-dropdown";
import ReservationComponent from "../components/employee/reserve/reservation-component";

const WorkerWelcomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome, Worker!</h1>
            {/* <LoginDropdown /> */}
            <ReservationComponent />
        </div>
    );
};

export default WorkerWelcomePage;
