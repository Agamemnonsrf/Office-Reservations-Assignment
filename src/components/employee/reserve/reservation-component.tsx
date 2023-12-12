import { useState, useEffect } from "react";
import BuildingCard from "./building-card";
import Filters from "./filters";
import { BuildingI } from "../../../interfaces/db-intertface";
import { getData } from "../../../mocks/utils";
import { ReserveContext } from "./reserve-context";

const ReservationComponent = () => {
    const [buildings, setBuildings] = useState<BuildingI[]>([]);
    const [workspaceNum, setWorkspaceNum] = useState<undefined | number>(
        undefined
    );
    const [hasSetWorkspaceNum, setHasSetWorkspaceNum] = useState(false);

    useEffect(() => {
        const mockBuildings = getData("buildings");
        setBuildings(mockBuildings as BuildingI[]);
    }, []);

    return (
        <ReserveContext.Provider
            value={{ workspaceNum, setWorkspaceNum, hasSetWorkspaceNum }}
        >
            <h2>Make a Reservation</h2>
            <div className="w-1/2 bg-neutral-900 rounded-md p-5 relative">
                <Filters />
                <div>
                    <div className="flex justify-around m-5">
                        <div className="flex flex-col">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                id="date"
                                className="rounded-md p-2"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="amount"># of Workspaces</label>
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
                    <div className="m-2">
                        {buildings.map((building) => {
                            return (
                                <BuildingCard
                                    key={building.id}
                                    name={building.name}
                                    workspaces={building.rooms.map(
                                        (room) => room.workspaces
                                    )}
                                    rooms={building.rooms}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </ReserveContext.Provider>
    );
};

export default ReservationComponent;
