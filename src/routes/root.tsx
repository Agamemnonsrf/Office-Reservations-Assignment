import { useEffect, useContext } from "react";
import UserContext from "../context/user/user-context";
import { UserI } from "../interfaces/db-intertface";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { getData } from "../mocks/utils";

const Root = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn, logout } = useContext(UserContext);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <div className="bg-neutral-800 w-full h-full"></div>;
    }

    const rolesMap = (user: UserI) => {
        const map = user.roles.map((role: string) => {
            return (
                <span
                    className={`${
                        role === "administrator"
                            ? "bg-sky-800"
                            : "bg-emerald-500"
                    } p-1 rounded-md text-white text-xs`}
                    key={role}
                >
                    {role}
                </span>
            );
        });

        return map;
    };

    const handleGoToPage = (screen: string) => {
        const updatedUser = getData("users", {
            id: (user as UserI).id,
        })[0] as UserI;

        switch (screen) {
            case "dashboard":
                if (updatedUser.roles.includes("administrator")) {
                    navigate("/dashboard/users");
                } else {
                    alert("You are not an administrator, reload the page");
                }
                break;
            case "reserve":
                if (updatedUser.roles.includes("employee")) {
                    navigate("/reserve");
                } else {
                    alert("You are not an employee, reload the page");
                }
                break;
            case "my-reservations":
                if (updatedUser.roles.includes("employee")) {
                    navigate("/my-reservations");
                } else {
                    alert("You are not an employee, reload the page");
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className="h-full">
            <div className="items-center w-full  bg-blue-600  rounded-md p-2 flex justify-between">
                <h5>Office Reservations</h5>
                <div className="flex items-center justify-around px-5 w-1/2">
                    <p>
                        <span className="text-white p-1 bg-neutral-800 rounded-md flex items-center justify-center">
                            <span className="text-center w-full ml-1 mr-2">
                                {user?.name}
                            </span>
                            <span className="flex gap-1">
                                {user && rolesMap(user)}
                            </span>
                        </span>
                    </p>

                    <button onClick={logout}>Log Out</button>
                </div>
            </div>
            <div className="flex h-full">
                <div className="flex flex-col h-fit p-5  gap-10">
                    {user?.roles.includes("administrator") && (
                        <button onClick={() => handleGoToPage("dashboard")}>
                            <h5>Dashboard</h5>
                        </button>
                    )}
                    {user?.roles.includes("employee") && (
                        <>
                            <button onClick={() => handleGoToPage("reserve")}>
                                <h5>Reserve</h5>
                            </button>
                            <button
                                onClick={() =>
                                    handleGoToPage("my-reservations")
                                }
                                className="-mt-9 "
                            >
                                <p className="whitespace-nowrap">
                                    My Reservations
                                </p>
                            </button>
                        </>
                    )}
                </div>
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Root;
