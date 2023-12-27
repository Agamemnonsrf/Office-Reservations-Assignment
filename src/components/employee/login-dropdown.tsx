import React, { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { UserI } from "../../interfaces/db-intertface";
import { getData } from "../../mocks/utils";

type Props = {
    user: UserI | null;
    setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
};

const LoginDropdown = ({ user, setUser }: Props) => {
    const [users, setUsers] = useState<UserI[]>([]);

    useEffect(() => {
        const mockUsers = getData("users");
        setUsers(mockUsers as UserI[]);
    }, []);

    const rolesMap = (user: UserI) => {
        const map = user.roles.map((role: string) => {
            return (
                <span
                    className={`${
                        role === "administrator"
                            ? "bg-sky-800"
                            : "bg-emerald-500"
                    } p-1 rounded-md text-white text-xs mr-1`}
                >
                    {role}
                </span>
            );
        });

        return map;
    };

    return (
        <Listbox value={user} onChange={setUser}>
            <div className="relative mt-1 w-fit">
                <Listbox.Button className="relative flex justify-between cursor-pointer items-center w-80 rounded-lg border-neutral-600 bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block text-black px-5">
                        {user
                            ? user.name
                            : users.length !== 0
                            ? "Select User"
                            : ""}
                    </span>
                    <span>
                        {user ? rolesMap(user) : users.length !== 0 ? "" : ""}
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {users.map((user, userIdx) => (
                            <Listbox.Option
                                key={userIdx}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                        active
                                            ? "bg-amber-100 text-amber-900"
                                            : "text-gray-900"
                                    }`
                                }
                                value={user}
                            >
                                {({ selected }) => (
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {user.name}
                                        </span>
                                        <span>{rolesMap(user)}</span>
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default LoginDropdown;
