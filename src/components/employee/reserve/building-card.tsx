import { Disclosure, Transition } from "@headlessui/react";
import {
    BuildingI,
    RoomI,
    WorkspaceI,
} from "../../../interfaces/db-intertface";
import RoomCard from "./room-card";

interface BuildingCardPropsI {
    name: string;
    rooms: RoomI[];
    building: BuildingI;
    workspaceNum: number;
}

const BuildingCard = (props: BuildingCardPropsI) => {
    const getWorkspacesLength = () => {
        //return an object that looks like this: {workspaces: 0, rooms: 0}, the workspaces is the accumulated number of workspaces in all rooms, but I also want to do this calculation only for the rooms that have more workspaces than workspaceNum
        let workspaces = 0;
        let rooms = 0;
        props.rooms.forEach((room) => {
            if (room.workspaces.length >= props.workspaceNum) {
                workspaces += room.workspaces.length;
                rooms++;
            }
        });
        return { workspaces, rooms };
    };

    return (
        <div className="w-full px-4 pt-4">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-blue-600 p-2">
                <Disclosure>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium  focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                        <span>
                            <h3>{props.name}</h3>{" "}
                            {getWorkspacesLength().workspaces} workspaces in{" "}
                            {getWorkspacesLength().rooms} rooms
                        </span>
                        <span>
                            {props.building.features.map((feature) => (
                                <p className="p-1 bg-white rounded-md text-black m-1">
                                    {feature}
                                </p>
                            ))}
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
                                    if (props.workspaceNum) {
                                        if (
                                            room.workspaces.length >=
                                            props.workspaceNum
                                        )
                                            return (
                                                <RoomCard
                                                    room={room}
                                                    building={props.building}
                                                />
                                            );
                                    } else
                                        return (
                                            <RoomCard
                                                room={room}
                                                building={props.building}
                                            />
                                        );
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
