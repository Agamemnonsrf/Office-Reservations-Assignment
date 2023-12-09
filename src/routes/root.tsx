import "../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "../mocks/utils";
import { UserI } from "../mocks/interfaces";
import { Outlet, useOutletContext } from "react-router-dom";

type ContextType = { user: UserI | null };

const Root = () => {
    const [user, setUser] = useState<UserI | null>(null);
    const [users, setUsers] = useState<UserI[]>([]);
    const [openedDropdown, setOpenedDropdown] = useState(false);

    useEffect(() => {
        const mockUsers = getData("users");
        setUsers(mockUsers as UserI[]);
    }, []);

    return (
        <>
            <div className="items-center w-full border border-amber-400 bg-amber-800 text-amber-400 rounded-md p-2 flex justify-between">
                <h5>Office Reservations</h5>
                {user ? (
                    <div className="flex items-center justify-around px-5 w-1/2">
                        <p>Logged in as: {user.name}</p>
                        <button onClick={() => setUser(null)}>Log Out</button>
                    </div>
                ) : (
                    <div className="flex items-center justify-around relative">
                        <button
                            onClick={() => setOpenedDropdown((prev) => !prev)}
                            className="mr-20"
                        >
                            Log In
                        </button>

                        {openedDropdown ? (
                            <ul className="menu">
                                {users.map((user) => {
                                    return (
                                        <li key={user.id} className="menu-item">
                                            <Link to="pick-role">
                                                <button
                                                    onClick={() => {
                                                        setUser(user);
                                                        setOpenedDropdown(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    {user.name}
                                                </button>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : null}
                    </div>
                )}
            </div>
            {user ? (
                <Outlet context={{ user } satisfies ContextType} />
            ) : (
                <h1>Welcome, please Log In</h1>
            )}
        </>
    );
};

export function useUser() {
    return useOutletContext<ContextType>();
}

export default Root;
