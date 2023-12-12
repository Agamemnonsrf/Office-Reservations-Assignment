import { Disclosure, Transition } from "@headlessui/react";
import { RoomI, WorkspaceI } from "../../../interfaces/db-intertface";
import RoomCard from "./room-card";

interface BuildingCardPropsI {
    name: string;
    workspaces: WorkspaceI[][];
    rooms: RoomI[];
}

const BuildingCard = (props: BuildingCardPropsI) => {
    console.log(props.workspaces);
    const getWorkspacesLength = () =>
        String(props.workspaces.reduce((prev, curr) => prev + curr.length, 0));

    return (
        <div className="w-full px-4 pt-4">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-blue-600 p-2">
                <Disclosure>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium  focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                        <span>
                            <h3>{props.name}</h3> {getWorkspacesLength()}{" "}
                            workspaces in {props.rooms.length} rooms
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
                            <div className="flex gap-2 overflow-auto">
                                {props.rooms.map((room) => {
                                    return <RoomCard room={room} />;
                                })}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </Disclosure>
            </div>
        </div>
    );
};

export default BuildingCard;
