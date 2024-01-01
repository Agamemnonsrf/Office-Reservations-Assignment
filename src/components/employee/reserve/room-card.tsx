import { useState, useContext } from "react";
import {
    BuildingI,
    ReservationI,
    RoomI,
    WorkspaceI,
} from "../../../interfaces/db-intertface";
import WorkspaceModal from "./workspace-modal";
import { getData } from "../../../mocks/utils";
import { ReserveContext } from "./reserve-context";

interface RoomCardPropsI {
    room: RoomI;
    building: BuildingI;
}

const RoomCard = ({ room, building }: RoomCardPropsI) => {
    const [isOpen, setIsOpen] = useState(false);
    const { selectedDate } = useContext(ReserveContext);

    const getFilteredWorkspaces = () => {
        return (
            getData("workspaces", {
                room: room.id,
            }) as WorkspaceI[]
        ).filter((workspace) =>
            !(
                getData("reservations", {
                    date: new Date(selectedDate),
                }) as ReservationI[]
            ).some((reservation) =>
                reservation.workspaces.includes(workspace.id)
            )
        );
    }

    if (getFilteredWorkspaces().length !== 0) return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-neutral-900 pl-6 py-2 m-2 rounded-md flex flex-col justify-center w-fit "
            >
                <div className="flex justify-between items-baseline w-full">
                    <p>Room {room.id}</p>
                </div>
                <div className="flex gap-2">
                    {room.features.map((feature) => {
                        return (
                            <p
                                key={feature + " " + room.id}
                                className={`p-1 rounded-md bg-white text-black text-xs whitespace-nowrap`}
                            >
                                <b>{feature}</b>
                            </p>
                        );
                    })}
                    <div className="flex items-baseline bg-neutral-700 rounded-md px-1 self-end">
                        <h6>
                            {selectedDate === "YYYY-MM-DD"
                                ? (
                                    getData("workspaces", {
                                        room: room.id,
                                    }) as WorkspaceI[]
                                ).length
                                : getFilteredWorkspaces().length}
                        </h6>
                        Workspaces
                    </div>
                </div>
            </button>
            <WorkspaceModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                room={room}
                building={building}
            />
        </>
    );
};

export default RoomCard;
