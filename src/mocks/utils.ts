// Function to get data
import { users, buildings, rooms, workstations, reservations } from "./data.js";
//import interfaces
import {
    BuildingI,
    RoomI,
    roles,
    UserI,
    WorkstationI,
    ReservationI,
} from "../interfaces/db-intertface.js";

type action = "users" | "buildings" | "rooms" | "workstations" | "reservations";
type filter =
    | { id: number }
    | { name: string }
    | { roles: roles[] }
    | { desktops: number }
    | { features: string[] }
    | { date: Date }
    | { user: UserI }
    | { workstation: WorkstationI };

type filter2 = filter | null;
type data = BuildingI | RoomI | WorkstationI | UserI | ReservationI;
type error = { error: string };

const filterData = (data: data[], filter: filter): data[] | error => {
    const filterProperty = Object.keys(filter)[0];

    if (data[0].hasOwnProperty(filterProperty)) {
        const dataFiltered = data.filter(
            (item) =>
                item[filterProperty as keyof data] ===
                filter[filterProperty as keyof filter]
        );
        return dataFiltered.length ? dataFiltered : { error: "No data found" };
    }
    return { error: "Invalid filter" };
};

const getData = (action: action, filter: filter2 = null): data[] | error => {
    switch (action) {
        case "users":
            return filter ? filterData(users, filter) : users;
        case "buildings":
            return filter ? filterData(buildings, filter) : buildings;
        case "rooms":
            return filter ? filterData(rooms, filter) : rooms;
        case "workstations":
            return filter ? filterData(workstations, filter) : workstations;
        case "reservations":
            return filter ? filterData(reservations, filter) : reservations;
        default:
            return { error: "No such action" };
    }
};

// // Function to set data
// const setData = (action, data) => {
//   switch (action) {
//     case 'users':
//       // Logic to set user data
//       break;
//     case 'buildings':
//       // Logic to set building data
//       break;
//     case 'rooms':
//       // Logic to set room data
//       break;
//     case 'workspaces':
//       // Logic to set workspace data
//       break;
//     default:
//       // Invalid action
//       break;
//   }
// }

// // Function to delete data
// const deleteData = (action, data) => {
//   switch (action) {
//     case 'users':
//       // Logic to delete user data
//       break;
//     case 'buildings':
//       // Logic to delete building data
//       break;
//     case 'rooms':
//       // Logic to delete room data
//       break;
//     case 'workspaces':
//       // Logic to delete workspace data
//       break;
//     default:
//       // Invalid action
//       break;
//   }
// }

// // Function to add data
// const addData = (action, data) => {
//   switch (action) {
//     case 'users':
//       // Logic to add user data
//       break;
//     case 'buildings':
//       // Logic to add building data
//       break;
//     case 'rooms':
//       // Logic to add room data
//       break;
//     case 'workspaces':
//       // Logic to add workspace data
//       break;
//     default:
//       // Invalid action
//       break;
//   }
// }

export { getData };
