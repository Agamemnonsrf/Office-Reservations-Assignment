import { Disclosure, Transition } from "@headlessui/react";

const Filters = () => {
    return (
        <div className="w-full px-4 pt-4">
            <div className="mx-auto w-full max-w-md bg-neutral-800 rounded-md p-2">
                <Disclosure>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-sm font-medium  focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                        <span>
                            <h6>Filters</h6>
                        </span>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="16"
                                viewBox="0 0 512 512"
                                fill="white"
                            >
                                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                        </span>
                    </Disclosure.Button>
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm">
                            <form className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <label htmlFor="building-features">
                                        Building Features
                                    </label>
                                    <select
                                        name="building-features"
                                        id="building-features"
                                        className="rounded-md p-2"
                                    >
                                        {" "}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="room-features">
                                        Room Features
                                    </label>
                                    <select
                                        name="room-features"
                                        id="room-features"
                                        className="rounded-md p-2"
                                    >
                                        {" "}
                                    </select>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <label htmlFor="workspace-desktops">
                                            Workspace Desktops
                                        </label>
                                        <input
                                            type="number"
                                            id="workspace-desktops"
                                            className="rounded-md p-2 w-20"
                                            min="1"
                                        />
                                    </div>
                                    <button className="">
                                        <input
                                            type="submit"
                                            value="Apply"
                                            className="rounded-md w-full h-full cursor-pointer"
                                        />
                                    </button>
                                </div>
                            </form>
                        </Disclosure.Panel>
                    </Transition>
                </Disclosure>
            </div>
        </div>
    );
};

export default Filters;
