// Function to get data
import {
    users as mock_users,
    buildings as mock_buildings,
    rooms as mock_rooms,
    workspaces as mock_workspaces,
    reservations as mock_reservations,
} from "./data";
import {
    BuildingI,
    RoomI,
    roles,
    UserI,
    WorkspaceI,
    ReservationI,
} from "../interfaces/db-intertface.js";

type action = "users" | "buildings" | "rooms" | "workspaces" | "reservations";
// type filter = {
//     id? : number,
//     name? : string,
//     roles? : roles[],
//     desktops? : number,
//     features? : string[],
//     date? : Date,
//     user? : number,
//     workspace? : number,
//     building? : number,
//     room? : number
// }
type filter =
    | { id: number }
    | { name: string }
    | { roles: roles[] }
    | { desktops: number }
    | { features: string[] }
    | { date: Date }
    | { user: number }
    | { workspace: number }
    | { building: number }
    | { room: number };

// type filter2 = filter | null;
type data = BuildingI | RoomI | WorkspaceI | UserI | ReservationI;

const filterData = (data: data[], filter: filter): data[] => {
    const filterProperty = Object.keys(filter)[0];
    if (data[0].hasOwnProperty(filterProperty)) {
        const dataFiltered = data.filter((item) => {
            if (filterProperty === "date") {
                return (
                    (
                        item[filterProperty as keyof data] as unknown as Date
                    ).getTime() ===
                    (
                        filter[
                            filterProperty as keyof filter
                        ] as unknown as Date
                    ).getTime()
                );
            }
            return (
                item[filterProperty as keyof data] ===
                filter[filterProperty as keyof filter]
            );
        });
        return dataFiltered.length ? dataFiltered : [];
    }
    return [];
};

const getData = (action: action, filter: filter | null = null): data[] => {
    switch (action) {
        case "users":
            return filter ? filterData(getUsers(), filter) : getUsers();
        case "buildings":
            return filter ? filterData(getBuildings(), filter) : getBuildings();
        case "rooms":
            return filter ? filterData(getRooms(), filter) : getRooms();
        case "workspaces":
            return filter
                ? filterData(getWorkspaces(), filter)
                : getWorkspaces();
        case "reservations":
            return filter
                ? filterData(getReservations(), filter)
                : getReservations();
        default:
            return [];
    }
};

function getUsers(): UserI[] {
    const users = localStorage.getItem("users");
    if (users === null) {
        return [];
    }
    return JSON.parse(users);
}

function updateUser(user: UserI) {
    let users = getUsers();
    const user_index = users.findIndex((temp_user) => temp_user.id === user.id);
    users[user_index] = user;
    localStorage.setItem("users", JSON.stringify(users));
}

function addUser(user: Partial<UserI>) {
    const users = getUsers();
    //add id field and check if is user is valid UserI
    const last_id = users[users.length - 1].id;
    const final_user = { ...user, id: last_id + 1 } as UserI;
    users.push(final_user);
    localStorage.setItem("users", JSON.stringify(users));
}

function deleteUser(user: UserI) {
    let users = getUsers();
    users = users.filter((temp_user) => temp_user.id !== user.id);
    localStorage.setItem("users", JSON.stringify(users));
}

function getBuildings(): BuildingI[] {
    const buildings = localStorage.getItem("buildings");
    if (buildings === null) {
        return [];
    }
    return JSON.parse(buildings);
}

function updateBuilding(building: BuildingI) {
    let buildings = getBuildings();
    const building_index = buildings.findIndex(
        (temp_building) => temp_building.id === building.id
    );
    buildings[building_index] = building;
    localStorage.setItem("buildings", JSON.stringify(buildings));
}

function addBuilding(building: Partial<BuildingI>) {
    const buildings = getBuildings();
    //add id field and check if is user is valid UserI
    const last_id = buildings[buildings.length - 1].id;
    const final_building = { ...building, id: last_id + 1 } as BuildingI;
    buildings.push(final_building);
    localStorage.setItem("buildings", JSON.stringify(buildings));
}

function deleteBuilding(building: BuildingI) {
    let buildings = getBuildings();
    buildings = buildings.filter(
        (temp_building) => temp_building.id !== building.id
    );
    localStorage.setItem("buildings", JSON.stringify(buildings));

    const rooms = getRooms();
    const rooms_filtered = rooms.filter(
        (room) => room.building !== building.id
    );
    localStorage.setItem("rooms", JSON.stringify(rooms_filtered));

    const workspaces = getWorkspaces();
    const workspaces_filtered = workspaces.filter(
        (workspace) => workspace.building !== building.id
    );
    localStorage.setItem("workspaces", JSON.stringify(workspaces_filtered));
}

function getRooms(): RoomI[] {
    const rooms = localStorage.getItem("rooms");
    if (rooms === null) {
        return [];
    }
    return JSON.parse(rooms);
}

function updateRoom(room: RoomI) {
    let rooms = getRooms();
    const room_index = rooms.findIndex((temp_room) => temp_room.id === room.id);
    rooms[room_index] = room;
    localStorage.setItem("rooms", JSON.stringify(rooms));
}

function addRoom(room: Partial<RoomI>) {
    const rooms = getRooms();

    const buildings = getBuildings();
    const building = buildings.find(
        (building) => building.id === room.building
    );
    if (building === undefined) {
        throw new Error("Building does not exist");
    }

    //add id field and check if is user is valid UserI
    const last_id = rooms[rooms.length - 1].id;
    const final_room = { ...room, id: last_id + 1 } as RoomI;
    rooms.push(final_room);
    localStorage.setItem("rooms", JSON.stringify(rooms));
}

function deleteRoom(room: RoomI) {
    let rooms = getRooms();
    rooms = rooms.filter((temp_room) => temp_room.id !== room.id);
    localStorage.setItem("rooms", JSON.stringify(rooms));

    const workspaces = getWorkspaces();
    const workspaces_filtered = workspaces.filter(
        (workspace) => workspace.room !== room.id
    );
    localStorage.setItem("workspaces", JSON.stringify(workspaces_filtered));
}

function getWorkspaces(): WorkspaceI[] {
    const workspaces = localStorage.getItem("workspaces");

    if (workspaces === null) {
        return [];
    }

    return JSON.parse(workspaces);
}

function updateWorkspace(workspace: WorkspaceI) {
    let workspaces = getWorkspaces();

    const rooms = getRooms();
    const room = rooms.find((room) => room.id === workspace.room);
    if (room === undefined) {
        throw new Error("Room does not exist");
    }

    const workspace_index = workspaces.findIndex(
        (temp_workspace) => temp_workspace.id === workspace.id
    );
    workspaces[workspace_index] = workspace;
    localStorage.setItem("workspaces", JSON.stringify(workspaces));
}

function addWorkspace(workspace: Partial<WorkspaceI>) {
    const workspaces = getWorkspaces();

    const rooms = getRooms();
    const room = rooms.find((room) => room.id === workspace.room);
    if (room === undefined) {
        throw new Error("Room does not exist");
    }

    //add id field and check if is user is valid UserI
    const last_id = workspaces[workspaces.length - 1].id;
    const final_workspace = { ...workspace, id: last_id + 1 } as WorkspaceI;
    workspaces.push(final_workspace);
    localStorage.setItem("workspaces", JSON.stringify(workspaces));
}

function deleteWorkspace(workspace: WorkspaceI) {
    let workspaces = getWorkspaces();
    workspaces = workspaces.filter(
        (temp_workspace) => temp_workspace.id !== workspace.id
    );
    localStorage.setItem("workspaces", JSON.stringify(workspaces));
}

function getReservations(): ReservationI[] {
    const reservations = localStorage.getItem("reservations");
    if (reservations === null) {
        return [];
    }
    const parsed_reservations = JSON.parse(reservations);
    return parsed_reservations.map((reservation: ReservationI) => {
        return { ...reservation, date: new Date(reservation.date) };
    });
}

function updateReservation(reservation: ReservationI) {
    let reservations = getReservations();

    const users = getUsers();
    const user = users.find((user) => user.id === reservation.user);
    if (user === undefined) {
        throw new Error("User does not exist");
    }

    const workspaces = getWorkspaces();
    const workspace = workspaces.find(
        (workspace) => workspace.id === reservation.workspaces[0]
    );
    if (workspace === undefined) {
        throw new Error("Workspace does not exist");
    }

    //check if there is a reservation for the same workspace and date
    const same_workspace_reservation = reservations.find(
        (temp_reservation) =>
            temp_reservation.workspaces[0] === reservation.workspaces[0] &&
            temp_reservation.date.getTime() === reservation.date.getTime()
    );
    if (same_workspace_reservation !== undefined) {
        throw new Error(
            "There is already a reservation for this workspace and date"
        );
    }

    const reservation_index = reservations.findIndex(
        (temp_reservation) => temp_reservation.id === reservation.id
    );
    reservations[reservation_index] = reservation;
    localStorage.setItem("reservations", JSON.stringify(reservations));
}

function addReservation(reservation: Partial<ReservationI>) {
    let reservations = getReservations();

    const users = getUsers();
    const user = users.find((user) => user.id === reservation.user);
    if (user === undefined) {
        throw new Error("User does not exist");
    }

    // Check if there is a reservation for the same workspace and date
    const reservationsWithSameDate = reservations.filter(
        (tempReservation) =>
            tempReservation.date.getTime() === reservation.date?.getTime()
    );

    const reservedWorkspaces = reservationsWithSameDate.flatMap(
        (tempReservation) => tempReservation.workspaces
    );

    const workspaces = getWorkspaces();

    // Check if any workspace is already reserved or does not exist
    const isAnyWorkspaceInvalid = reservation.workspaces?.some(
        (workspace: number) => {
            const isReserved = reservedWorkspaces.includes(workspace);
            const doesNotExist = !workspaces.some(
                (tempWorkspace) => tempWorkspace.id === workspace
            );
            return isReserved || doesNotExist;
        }
    );

    if (isAnyWorkspaceInvalid) {
        alert(
            "There is already a reservation for this workspace and date, or the workspace does not exist. Please refresh the page."
        );
        return;
    }

    if (
        !reservation.user ||
        getData("users", { id: reservation.user }).length === 0
    ) {
        alert("User has been modified or does not exist, refresh the page");
        return;
    }
    reservation.id =
        reservations.sort((a, b) => a.id - b.id)[reservations.length - 1].id +
        1;
    reservations.push(reservation as ReservationI);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    alert("Reservation added!");
}

function deleteReservation(reservation: ReservationI) {
    let reservations = getReservations();
    reservations = reservations.filter(
        (temp_reservation) => temp_reservation.id !== reservation.id
    );
    localStorage.setItem("reservations", JSON.stringify(reservations));
}

function loadAllMockData() {
    localStorage.setItem("users", JSON.stringify(mock_users));
    localStorage.setItem("buildings", JSON.stringify(mock_buildings));
    localStorage.setItem("rooms", JSON.stringify(mock_rooms));
    localStorage.setItem("workspaces", JSON.stringify(mock_workspaces));
    localStorage.setItem("reservations", JSON.stringify(mock_reservations));
}

export {
    getData,
    updateUser,
    addUser,
    deleteUser,
    updateBuilding,
    addBuilding,
    deleteBuilding,
    updateRoom,
    addRoom,
    deleteRoom,
    updateWorkspace,
    addWorkspace,
    deleteWorkspace,
    updateReservation,
    addReservation,
    deleteReservation,
    loadAllMockData,
};
