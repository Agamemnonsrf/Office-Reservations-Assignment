import { createContext } from "react";
import {
    BuildingI,
    RoomI,
    WorkspaceI,
} from "../../../interfaces/db-intertface";

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
    // Include other properties as needed
}

export const ReserveContext = createContext<ReserveContextI>(
    {} as ReserveContextI
);
