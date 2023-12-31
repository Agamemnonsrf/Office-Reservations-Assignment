import { useState, useEffect } from "react";
import BuildingCard from "./building-card";
import Filters from "./filters";
import {
    BuildingI,
    RoomI,
    WorkspaceI,
} from "../../../interfaces/db-intertface";
import { getData } from "../../../mocks/utils";
import { ReserveContext } from "./reserve-context";
import ConfirmModal from "./confirm-modal";

type RoomBuilding = {
    building: BuildingI;
    room: RoomI;
};

const ReservationComponent = () => {
    const [buildings, setBuildings] = useState<BuildingI[]>([]);
    const [workspaceNum, setWorkspaceNum] = useState<number>(0);
    const [hasSetWorkspaceNum, setHasSetWorkspaceNum] = useState(false);
    const [selectedWorkspaces, setSelectedWorkspaces] = useState<WorkspaceI[]>(
        []
    );
    const [roomBuilding, setRoomBuilding] = useState<RoomBuilding | undefined>(
        undefined
    );
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    type Filters = {
        building: string[];
        room: string[];
        workspaces: number;
    };
    const [filters, setFilters] = useState<Filters>({
        building: [],
        room: [],
        workspaces: 0,
    });

    const filteredBuildings = buildings
        .filter((building) =>
            filters.building.length ? filters.building.every(filter => building.features.includes(filter)) : true
        )

    useEffect(() => {
        const mockBuildings = getData("buildings");
        setBuildings(mockBuildings as BuildingI[]);
    }, []);

    return (
        <ReserveContext.Provider
            value={{
                workspaceNum,
                setWorkspaceNum,
                hasSetWorkspaceNum,
                setRoomBuilding,
                setSelectedWorkspaces,
                selectedDate,
                filters,
                setFilters,
            }}
        >
            <div className="w-full h-full flex flex-col justify-start items-center">
                <div className="w-full bg-neutral-900 rounded-lg p-5 relative">
                    <h2>Make a Reservation</h2>
                    <Filters />
                    <div className="">
                        <div className="flex justify-around m-5">
                            <div className="flex flex-col">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    className="rounded-md p-2"
                                    value={selectedDate}
                                    onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="amount">
                                    Number of Workspaces
                                    {hasSetWorkspaceNum && " (Max)"}
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    className="rounded-md p-2 w-20"
                                    min="1"
                                    value={workspaceNum}
                                    onChange={(e) => {
                                        setWorkspaceNum(Number(e.target.value));
                                        setHasSetWorkspaceNum(true);
                                    }}
                                />
                            </div>
                        </div>
                        {selectedWorkspaces.length !== 0 && roomBuilding && (
                            <div className="w-full px-4 pt-4">
                                <div className="mx-auto p-4 w-full max-w-md rounded-2xl bg-neutral-800 relative">
                                    <h5>Your Selected Workspaces: </h5>
                                    <ul
                                        className="
                                    flex flex-wrap gap-2
                                "
                                    >
                                        {selectedWorkspaces.map((workspace) => {
                                            return (
                                                <li
                                                    className=" rounded-md p-2 bg-neutral-900
                                            "
                                                    key={workspace.id}
                                                >
                                                    {`${workspace.room}-${workspace.id}`}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <p>
                                        From <b>Room {roomBuilding.room.id}</b>{" "}
                                        in <b>{roomBuilding.building.name}</b>{" "}
                                        on <b>{selectedDate}</b>
                                    </p>
                                    <button
                                        onClick={() =>
                                            setSelectedWorkspaces([])
                                        }
                                        className="text-xs bg-neutral-900 p-1 rounded-md text-red-600 absolute right-2 top-2"
                                    >
                                        Clear &times;
                                    </button>
                                    <button className="mt-3" onClick={() => {
                                        setShowConfirmModal(true);
                                    }}>Make Reservation</button>
                                    <ConfirmModal isShow={showConfirmModal} setIsShow={setShowConfirmModal} />
                                </div>
                            </div>
                        )}
                        <div className="m-2 w-full flex flex-wrap">
                            {filteredBuildings.length === 0 ? (<h3 className="text-center">0 Workspaces Available</h3>) : filteredBuildings.map((building) => {
                                return (
                                    <BuildingCard
                                        key={building.id}
                                        name={building.name}
                                        rooms={
                                            getData("rooms", {
                                                building: building.id,
                                            }) as RoomI[]
                                        }
                                        building={building}
                                        workspaceNum={workspaceNum}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </ReserveContext.Provider>
    );
};

export default ReservationComponent;
