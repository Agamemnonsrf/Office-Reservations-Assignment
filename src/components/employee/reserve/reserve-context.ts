import { createContext } from "react";
import { BuildingI, RoomI } from "../../../interfaces/db-intertface";

type RoomBuilding = {
    building: BuildingI;
    room: RoomI;
};

type Filters = {
    building: string[];
    room: string[];
    workspaces: number;
};
interface ReserveContextI {
    setWorkspaceNum: (num: number) => void;
    workspaceNum: number | undefined;
    hasSetWorkspaceNum: boolean;
    setRoomBuilding: (roomBuilding: RoomBuilding) => void;
    setSelectedWorkspaces: any;
    selectedDate: string;
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

export const ReserveContext = createContext<ReserveContextI>(
    {} as ReserveContextI
);
