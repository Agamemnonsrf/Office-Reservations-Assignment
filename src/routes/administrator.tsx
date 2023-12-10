import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdministratorDashboard: React.FC = () => {
    return (
        <div className="flex h-full">
            <div className="flex flex-col h-full p-5 bg-neutral-800 gap-10">
                <Link to="offices">
                    <h5>Offices</h5>
                </Link>
                <Link to="workers">
                    <h5>Workers</h5>
                </Link>
                <Link to="reservations">
                    <h5>Reservations</h5>
                </Link>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default AdministratorDashboard;
