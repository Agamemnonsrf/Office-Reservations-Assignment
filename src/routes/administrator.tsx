import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getData } from "../mocks/utils";
import { UserI } from "../interfaces/db-intertface";
import UserContext from "../context/user/user-context";

const AdministratorDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useContext(UserContext);
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn]);

    const navigateWithAlert = (route: string) => {

        const updatedUser = getData("users", {
            id: (user as UserI).id,
        })[0] as UserI;
        if (updatedUser.roles.includes("administrator")) {
            navigate(route);
        } else {
            alert("You are not an administrator, reload the page");
        }
    }

    const handleGoToPage = (screen: string) => {
        navigateWithAlert(`/dashboard/${screen.toLowerCase()}`);
    };


    return (
        <div className="flex h-full">
            <div className="flex flex-col h-full p-5 bg-neutral-800 gap-10 border-l border-l-neutral-700">
                <button onClick={() => handleGoToPage("Users")}>

                    <h5>Users</h5>
                </button>
                <button onClick={() => handleGoToPage("Reservations")}>

                    <h5>Reservations</h5>
                </button>
                <button onClick={() => handleGoToPage("Buildings")}>

                    <h5>Buildings</h5>
                </button>
                <button onClick={() => handleGoToPage("Rooms")}>

                    <h5>Rooms</h5>
                </button>
                <button onClick={() => handleGoToPage("Workspaces")}>

                    <h5>Workspaces</h5>
                </button>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default AdministratorDashboard;
