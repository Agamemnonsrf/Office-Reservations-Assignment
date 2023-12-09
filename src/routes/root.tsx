import "../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "../mocks/utils";
import { UserI } from "../interfaces/db-intertface";

const Root = () => {
    const [user, setUser] = useState<UserI | null>(null);
    const [users, setUsers] = useState<UserI[]>([]);
    const [openedDropdown, setOpenedDropdown] = useState(false);

    useEffect(() => {
        const mockUsers = getData("users");
        setUsers(mockUsers as UserI[]);
    }, []);

    return (
        <div className="w-full h-full">
            {user ? (
                <>
                    <h1 className="border border-amber-400 bg-amber-800 text-amber-400 rounded-md mb-4 p-10">
                        Welcome {user.name}
                    </h1>
                    <div className="flex justify-around w-1/2 mx-auto border border-gray-400 rounded-md p-10">
                        {user.roles.includes("administrator") && (
                            <Link to="/dashboard">
                                <button className="px-10 py-5">
                                    Administrator
                                </button>
                            </Link>
                        )}
                        <Link to="/reserve">
                            <button className="px-10 py-5">Worker</button>
                        </Link>
                        <button
                            className="px-10 py-5"
                            onClick={() => setUser(null)}
                        >
                            Log Out
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="border border-amber-400 bg-amber-800 text-amber-400 rounded-md mb-4 p-10">
                        Office Reservations
                    </h1>
                    <div className="flex justify-around w-1/2 mx-auto relative">
                        <button
                            className="px-10 py-5"
                            onClick={() => setOpenedDropdown((prev) => !prev)}
                        >
                            Log In
                        </button>

                        {openedDropdown ? (
                            <ul className="menu">
                                {users.map((user) => {
                                    return (
                                        <li key={user.id} className="menu-item">
                                            <button
                                                onClick={() => setUser(user)}
                                            >
                                                {user.name}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
};

export default Root;
