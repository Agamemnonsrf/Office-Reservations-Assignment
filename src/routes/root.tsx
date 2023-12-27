import "../App.css";
import { useEffect, useContext } from "react";
import UserContext from "../context/user/user-context";
import { UserI } from "../interfaces/db-intertface";
import { Outlet } from "react-router-dom";

import { useNavigate, Link } from "react-router-dom";

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
                >
                    {role}
                </span>
            );
        });

        return map;
    };

    return (
        <>
            <div className="items-center w-full border border-amber-400 bg-amber-800 text-amber-400 rounded-md p-2 flex justify-between">
                <h5>Office Reservations</h5>
                <div className="flex items-center justify-around px-5 w-1/2">
                    <p>
                        Logged in as:{" "}
                        <span className="text-white p-1 bg-neutral-800 rounded-md flex items-center justify-center gap-5">
                            {user?.name}
                            <div className="flex gap-2">
                                {user && rolesMap(user)}
                            </div>
                        </span>
                    </p>

                    <button onClick={logout}>Log Out</button>
                </div>
            </div>
            <div className="flex h-full">
                <div className="flex flex-col h-full p-5 bg-neutral-800 gap-10">
                    {user?.roles.includes("administrator") && (
                        <button>
                            <Link to="dashboard">
                                <h5>Dashboard</h5>
                            </Link>
                        </button>
                    )}
                    {user?.roles.includes("employee") && (
                        <>
                            <button>
                                <Link to="reserve" className="">
                                    <h5>Reserve</h5>
                                </Link>
                            </button>
                            <button className="-mt-9 ">
                                <Link to="my-reservations">
                                    <p className="whitespace-nowrap">
                                        My Reservations
                                    </p>
                                </Link>
                            </button>
                        </>
                    )}
                </div>
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Root;
