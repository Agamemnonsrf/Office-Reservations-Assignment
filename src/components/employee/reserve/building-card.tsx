import { Disclosure, Transition } from "@headlessui/react";
import {
    BuildingI,
    ReservationI,
    RoomI,
    WorkspaceI,
} from "../../../interfaces/db-intertface";
import RoomCard from "./room-card";
import { getData } from "../../../mocks/utils";
import { useContext } from "react";
import { ReserveContext } from "./reserve-context";

interface BuildingCardPropsI {
    name: string;
    rooms: RoomI[];
    building: BuildingI;
    workspaceNum: number;
    testBuildings: BuildingI[];
}

const BuildingCard = (props: BuildingCardPropsI) => {
    const { filters, selectedDate } = useContext(ReserveContext);

    const mockWorspacesForTest = (room: RoomI) => {
        if (props.testBuildings.length) {
            return [{ id: 1, desktops: 1, room: 1, building: 1 }];
        }
        return getData("workspaces", { room: room.id }) as WorkspaceI[];
    };

    const getWorkspacesLength = () => {
        let workspaces = 0;
        let rooms = 0;
        getFilteredRooms().forEach((room) => {
            const roomWorkspaces = mockWorspacesForTest(room);
            if (roomWorkspaces.length >= props.workspaceNum) {
                const filteredWorkspaces = props.testBuildings.length
                    ? roomWorkspaces
                    : roomWorkspaces
                          .filter(
                              (workspace) =>
                                  !(
                                      getData("reservations", {
                                          date: new Date(selectedDate),
                                      }) as ReservationI[]
                                  ).some((reservation) =>
                                      reservation.workspaces.includes(
                                          workspace.id
                                      )
                                  )
                          )
                          .filter(
                              (workspace) =>
                                  workspace.desktops >= filters.workspaces
                          );

                if (filteredWorkspaces.length) {
                    workspaces += filteredWorkspaces.length;
                    rooms++;
                }
            }
        });
        return { workspaces, rooms };
    };

    const getFilteredRooms = () => {
        return props.rooms
            .filter((room) =>
                props.workspaceNum
                    ? mockWorspacesForTest(room).length >= props.workspaceNum
                    : true
            )
            .filter((room) =>
                filters.room.length
                    ? filters.room.every((filter) =>
                          room.features.includes(filter)
                      )
                    : true
            )
            .filter((room) =>
                mockWorspacesForTest(room).some(
                    (workspace) => workspace.desktops >= filters.workspaces
                )
            );
    };

    if (getWorkspacesLength().workspaces !== 0)
        return (
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
                                    {getFilteredRooms().map((room) => {
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
