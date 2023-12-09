import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdministratorDashboard: React.FC = () => {
    return (
        <div className=" w-full h-full">
            <div className="flex items-center bg-neutral-800 justify-around">
                <div className="w-1/5 items-center flex  px-5">
                    <Link to="/pick-role">
                        <button>Back</button>
                    </Link>
                </div>
                <h1 className="text-6xl font-bold py-2 w-4/5 text-center ">
                    Administrator Dashboard
                </h1>
            </div>
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
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdministratorDashboard;
