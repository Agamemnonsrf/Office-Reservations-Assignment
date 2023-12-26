type roles = "administrator" | "employee";

interface UserI {
    id: number;
    name: string;
    roles: roles[];
}

interface WorkstationI {
    id: number;
    name: string;
    desktops: number;
}

interface RoomI {
    id: number;
    name: string;
    workstations: WorkstationI[];
    features: string[];
}

interface BuildingI {
    id: number;
    name: string;
    rooms: RoomI[];
    features: string[];
}

interface ReservationI {
    id: number;
    user: UserI;
    workstation: WorkstationI;
    date: Date;
}

export type { UserI, WorkstationI, RoomI, BuildingI, ReservationI, roles };
