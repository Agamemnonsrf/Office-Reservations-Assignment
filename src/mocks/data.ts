import {
    UserI,
    BuildingI,
    RoomI,
    WorkspaceI,
    ReservationI,
} from "../interfaces/db-intertface.js";

// Generate plenty of mock data
const users: UserI[] = [
    { id: 1, name: "John Doe", roles: ["employee", "administrator"] },
    { id: 2, name: "Jane Doe", roles: ["administrator"] },
    { id: 3, name: "Bob Smith", roles: ["employee"] },
    { id: 4, name: "Alice Johnson", roles: ["administrator"] },
    { id: 5, name: "Eve White", roles: ["employee"] },
    // Add more users as needed
];

const buildings: BuildingI[] = [
    {
        id: 1,
        name: "Building A",
        features: ["WiFi", "Conference Room", "Security System"],
    },
    { id: 2, name: "Building B", features: ["Cafeteria", "Gym"] },
    { id: 3, name: "Building C", features: ["Lounge Area", "Security System"] },
    { id: 4, name: "Building D", features: ["WiFi", "Cafeteria"] },
];

const rooms: RoomI[] = [
    { id: 1, building: 1, features: ["Projector", "Whiteboard"] },
    { id: 2, building: 1, features: ["Windows", "AC"] },
    { id: 3, building: 1, features: ["Smart Board", "Coffee Machine"] },
    { id: 4, building: 2, features: ["Large Windows", "Comfortable Seating"] },
    { id: 5, building: 2, features: ["Windows", "AC"] },
    { id: 6, building: 2, features: ["Projector", "Whiteboard"] },
    { id: 7, building: 3, features: ["Smart Board", "AC", "Coffee Machine"] },
    { id: 8, building: 3, features: ["Comfortable Seating", "AC"] },
    { id: 9, building: 3, features: ["Smart Board", "Large Windows"] },
    { id: 10, building: 4, features: ["Large Windows", "Comfortable Seating"] },
    { id: 11, building: 4, features: ["Windows", "Projector"] },
    { id: 12, building: 4, features: ["Projector", "Smart Board"] },
];

const workspaces: WorkspaceI[] = [
    { id: 1, desktops: 2, room: 1, building: 1 },
    { id: 2, desktops: 3, room: 1, building: 1 },
    { id: 3, desktops: 1, room: 1, building: 1 },
    { id: 4, desktops: 2, room: 2, building: 1 },
    { id: 5, desktops: 1, room: 2, building: 1 },
    { id: 6, desktops: 2, room: 2, building: 1 },
    { id: 7, desktops: 1, room: 3, building: 1 },
    { id: 8, desktops: 1, room: 3, building: 1 },
    { id: 9, desktops: 2, room: 3, building: 1 },
    { id: 10, desktops: 1, room: 4, building: 2 },
    { id: 11, desktops: 1, room: 4, building: 2 },
    { id: 12, desktops: 3, room: 4, building: 2 },
    { id: 13, desktops: 1, room: 5, building: 2 },
    { id: 14, desktops: 2, room: 5, building: 2 },
    { id: 15, desktops: 1, room: 5, building: 2 },
    { id: 16, desktops: 1, room: 6, building: 2 },
    { id: 17, desktops: 2, room: 6, building: 2 },
    { id: 18, desktops: 1, room: 6, building: 2 },
    { id: 19, desktops: 3, room: 7, building: 3 },
    { id: 20, desktops: 2, room: 7, building: 3 },
    { id: 21, desktops: 1, room: 7, building: 3 },
    { id: 22, desktops: 1, room: 8, building: 3 },
    { id: 23, desktops: 2, room: 8, building: 3 },
    { id: 24, desktops: 1, room: 8, building: 3 },
    { id: 25, desktops: 1, room: 9, building: 3 },
    { id: 26, desktops: 3, room: 9, building: 3 },
    { id: 27, desktops: 1, room: 9, building: 3 },
    { id: 28, desktops: 1, room: 10, building: 4 },
    { id: 29, desktops: 2, room: 10, building: 4 },
    { id: 30, desktops: 2, room: 10, building: 4 },
    { id: 31, desktops: 1, room: 11, building: 4 },
    { id: 32, desktops: 1, room: 11, building: 4 },
    { id: 33, desktops: 1, room: 11, building: 4 },
    { id: 34, desktops: 2, room: 12, building: 4 },
    { id: 35, desktops: 3, room: 12, building: 4 },
    { id: 36, desktops: 1, room: 12, building: 4 },
];

const reservations: ReservationI[] = [
    {
        id: 1,
        user: 1,
        workspaces: [1],
        room: 1,
        building: 1,
        date: new Date("2024-01-02"),
    },
    {
        id: 2,
        user: 1,
        workspaces: [1, 5],
        room: 1,
        building: 1,
        date: new Date("2024-01-03"),
    },
    {
        id: 3,
        user: 1,
        workspaces: [3],
        room: 3,
        building: 2,
        date: new Date("2024-01-05"),
    },
    {
        id: 4,
        user: 4,
        workspaces: [4],
        room: 4,
        building: 3,
        date: new Date("2024-01-04"),
    },
    {
        id: 5,
        user: 4,
        workspaces: [5, 6],
        room: 1,
        building: 1,
        date: new Date("2024-01-02"),
    },
];

export { users, buildings, rooms, workspaces, reservations };
