import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdministratorDashboard: React.FC = () => {
    return (
        <div className="flex h-full">
            <div className="flex flex-col h-full p-5 bg-neutral-800 gap-10">
                <Link to="Users">
                    <h5>Users</h5>
                </Link>
                <Link to="Reservations">
                    <h5>Reservations</h5>
                </Link>
                <Link to="Buildings">
                    <h5>Buildings</h5>
                </Link>
                <Link to="Rooms">
                    <h5>Rooms</h5>
                </Link>
                <Link to="Workstations">
                    <h5>Workstations</h5>
                </Link>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default AdministratorDashboard;
