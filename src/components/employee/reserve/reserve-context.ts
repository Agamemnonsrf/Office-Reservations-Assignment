import { createContext } from "react";
import { BuildingI, RoomI } from "../../../interfaces/db-intertface";

type RoomBuilding = {
    building: BuildingI;
    room: RoomI;
};
interface ReserveContextI {
    setWorkspaceNum: (num: number) => void;
    workspaceNum: number | undefined;
    hasSetWorkspaceNum: boolean;
    setRoomBuilding: (roomBuilding: RoomBuilding) => void;
    setSelectedWorkspaces: any;
    selectedDate: string;
}

export const ReserveContext = createContext<ReserveContextI>(
    {} as ReserveContextI
);
