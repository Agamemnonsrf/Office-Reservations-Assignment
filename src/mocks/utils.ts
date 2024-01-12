// Function to get data
import { users, buildings, rooms, workspaces, reservations } from "./data.js";
//import interfaces
import {v4 as uuidv4} from "uuid";
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
        const dataFiltered = data.filter(
            (item) => {
                if (filterProperty === "date") {
                    return (item[filterProperty as keyof data] as unknown as Date).getTime() ===
                        (filter[filterProperty as keyof filter] as unknown as Date).getTime();
                }
                return item[filterProperty as keyof data] ===
                    filter[filterProperty as keyof filter];
            }
        );
        return dataFiltered.length ? dataFiltered : [];
    }
    return [];
};

const getData = (action: action, filter: filter | null = null): data[] => {
    switch (action) {
        case "users":
            return filter ? filterData(users, filter) : users;
        case "buildings":
            return filter ? filterData(buildings, filter) : buildings;
        case "rooms":
            return filter ? filterData(rooms, filter) : rooms;
        case "workspaces":
            return filter ? filterData(workspaces, filter) : workspaces;
        case "reservations":
            return filter ? filterData(reservations, filter) : reservations;
        default:
            return [];
    }

};

function getUsers(): UserI[] {
    const users =  localStorage.getItem("users")
    if(users === null) {
        return []
    }
    return JSON.parse(users);
}

function updateUser(user:UserI) {
    
    let users = getUsers()
    const user_index = users.findIndex((temp_user) => temp_user.id === user.id)
    users[user_index] = user
    localStorage.setItem("users", JSON.stringify(users)) 
}

// function addUser(user:Partial<UserI>) {
//     const users = getUsers()
//     //add id field and check if is user is valid UserI
//     const final_user = {...user, id: uuidv4()} as UserI
//     users.push(final_user)
//     localStorage.setItem("users", JSON.stringify(users))
// }

function deleteUser(user:UserI) {
    let users = getUsers()
    users = users.filter((temp_user) => temp_user.id !== user.id)
    localStorage.setItem("users", JSON.stringify(users)) 
}

function getBuildings(): BuildingI[] {
    const buildings =  localStorage.getItem("buildings")
    if(buildings === null) {
        return []
    }
    return JSON.parse(buildings);
}

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
