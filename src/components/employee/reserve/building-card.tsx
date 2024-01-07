import { Disclosure, Transition } from "@headlessui/react";
import { BuildingI, RoomI } from "../../../interfaces/db-intertface";
import RoomCard from "./room-card";
import { getData } from "../../../mocks/utils";

interface BuildingCardPropsI {
    name: string;
    rooms: RoomI[];
    building: BuildingI;
    workspaceNum: number;
}

const BuildingCard = (props: BuildingCardPropsI) => {
    const getWorkspacesLength = () => {
        let workspaces = 0;
        let rooms = 0;
        props.rooms.forEach((room) => {
            if (
                getData("workspaces", { room: room.id }).length >=
                props.workspaceNum
            ) {
                workspaces += getData("workspaces", { room: room.id }).length;
                rooms++;
            }
        });
        return { workspaces, rooms };
    };

    if (getWorkspacesLength().workspaces !== 0) return (
        <div className="w-1/2 px-4 pt-4">
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
                                <p
                                    className="p-1 bg-white rounded-md text-black m-1"
                                    key={feature}
                                >
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
                                            getData("workspaces", {
                                                room: room.id,
                                            }).length >= props.workspaceNum
                                        )
                                            return (
                                                <RoomCard
                                                    key={room.id}
                                                    room={room}
                                                    building={props.building}
                                                />
                                            );
                                    } else
                                        return (
                                            <RoomCard
                                                key={room.id}
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
