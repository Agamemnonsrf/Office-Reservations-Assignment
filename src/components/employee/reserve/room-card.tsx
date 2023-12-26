import { useState } from "react";
import { BuildingI, RoomI } from "../../../interfaces/db-intertface";
import WorkspaceModal from "./workspace-modal";

interface RoomCardPropsI {
    room: RoomI;
    building: BuildingI;
}

const RoomCard = ({ room, building }: RoomCardPropsI) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-neutral-900 pl-6 py-2 m-2 rounded-md flex flex-col justify-center w-fit "
            >
                <div className="flex justify-between items-baseline w-full">
                    <p>{room.name}</p>
                </div>
                <div className="flex gap-2">
                    {room.features.map((feature) => {
                        return (
                            <p
                                className={`p-1 rounded-md bg-white text-black text-xs whitespace-nowrap`}
                            >
                                <b>{feature}</b>
                            </p>
                        );
                    })}
                    <div className="flex items-baseline bg-neutral-700 rounded-md px-1 self-end">
                        <h6>{room.workstations.length}</h6>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="13"
                            width="14"
                            viewBox="0 0 576 512"
                            fill="white"
                            className="ml-2"
                        >
                            <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V352H64V64H512z" />
                        </svg>
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
