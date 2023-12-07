type roles = 'administrator' | 'employee';

interface UserI {
    id: number;
    name: string;
    roles: roles[];
}

interface WorkspaceI {
    id: number;
    name: string;
    desktops: number;
}

interface RoomI {
    id: number;
    name: string;
    workspaces: WorkspaceI[];
    features: string[];
}

interface BuildingI {
    id: number;
    name: string;
    rooms: RoomI[];
}


export type { UserI, WorkspaceI, RoomI, BuildingI };
