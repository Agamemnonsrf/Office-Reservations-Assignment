import {v4 as uuidv4} from "uuid";

type roles = "administrator" | "employee";

interface UserI {
    id: number;
    name: string;
    roles: roles[];
}

interface WorkspaceI {
    id: number;
    desktops: number;
    room: number;
    building: number;
}

interface RoomI {
    id: number;
    building: number;
    features: string[];
}

interface BuildingI {
    id: number;
    name: string;
    features: string[];
}

interface ReservationI {
    id: number;
    user: number;
    workspaces: number[];
    room: number;
    building: number;
    date: Date;
}

export type { UserI, WorkspaceI, RoomI, BuildingI, ReservationI, roles };
