import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdministratorDashboard: React.FC = () => {
    return (
        <div className="flex h-full">
            <div className="flex flex-col h-full p-5 bg-neutral-800 gap-10 border-l border-l-neutral-700">
                <button>
                    <Link to="users">
                        <h5>Users</h5>
                    </Link>
                </button>
                <button>
                    <Link to="reservations">
                        <h5>Reservations</h5>
                    </Link>
                </button>
                <button>
                    <Link to="buildings">
                        <h5>Buildings</h5>
                    </Link>
                </button>
                <button>
                    <Link to="rooms">
                        <h5>Rooms</h5>
                    </Link>
                </button>
                <button>
                    <Link to="workspaces">
                        <h5>Workspaces</h5>
                    </Link>
                </button>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default AdministratorDashboard;
