// Mock data for users
import {
    UserI,
    WorkstationI,
    RoomI,
    BuildingI,
    ReservationI,
} from "../interfaces/db-intertface";

const users: UserI[] = [
    { id: 1, name: "John Doe", roles: ["administrator", "employee"] },
    { id: 2, name: "Jane Smith", roles: ["employee"] },
    { id: 3, name: "Mike Johnson", roles: ["employee"] },
    { id: 4, name: "Sara Parker", roles: ["employee"] },
    { id: 5, name: "Robert Brown", roles: ["employee"] },
    { id: 6, name: "Mary Williams", roles: ["employee"] },
    { id: 7, name: "David Miller", roles: ["employee"] },
    { id: 8, name: "Richard Davis", roles: ["employee"] },
    { id: 9, name: "Joseph Garcia", roles: ["employee"] },
    { id: 10, name: "Thomas Rodriguez", roles: ["employee"] },
    { id: 11, name: "Charles Wilson", roles: ["employee"] },
    { id: 12, name: "Daniel Moore", roles: ["employee"] },
    { id: 13, name: "Matthew Taylor", roles: ["employee"] },
    { id: 14, name: "Anthony Anderson", roles: ["employee"] },
    { id: 15, name: "Donald Thomas", roles: ["employee"] },
    { id: 16, name: "Mark Jackson", roles: ["employee"] },
    { id: 17, name: "Paul White", roles: ["employee"] },
    { id: 18, name: "Steven Harris", roles: ["employee"] },
    { id: 19, name: "Andrew Martin", roles: ["employee"] },
    { id: 20, name: "Kenneth Thompson", roles: ["employee"] },
    { id: 21, name: "Joshua Garcia", roles: ["employee"] },
    { id: 22, name: "Kevin Martinez", roles: ["employee"] },
    { id: 23, name: "Brian Robinson", roles: ["employee"] },
    { id: 24, name: "Edward Clark", roles: ["employee"] },
    { id: 25, name: "Ronald Rodriguez", roles: ["employee"] },
    { id: 26, name: "Anthony Lewis", roles: ["employee"] },
    { id: 27, name: "Kevin Lee", roles: ["employee"] },
    { id: 28, name: "Jason Walker", roles: ["employee"] },
    { id: 29, name: "Matthew Hall", roles: ["employee"] },
];

// Mock data for workstations
const workstations: WorkstationI[] = [
    { id: 1, name: "Workspace 1", desktops: 5 },
    { id: 2, name: "Workspace 2", desktops: 2 },
    { id: 3, name: "Workspace 3", desktops: 9 },
    { id: 4, name: "Workspace 4", desktops: 7 },
    { id: 5, name: "Workspace 5", desktops: 1 },
    { id: 6, name: "Workspace 6", desktops: 2 },
    { id: 7, name: "Workspace 7", desktops: 5 },
    { id: 8, name: "Workspace 8", desktops: 10 },
    { id: 9, name: "Workspace 9", desktops: 3 },
    { id: 10, name: "Workspace 10", desktops: 5 },
    { id: 11, name: "Workspace 11", desktops: 7 },
    { id: 12, name: "Workspace 12", desktops: 2 },
    { id: 13, name: "Workspace 13", desktops: 3 },
    { id: 14, name: "Workspace 14", desktops: 5 },
    { id: 15, name: "Workspace 15", desktops: 7 },
    { id: 16, name: "Workspace 16", desktops: 2 },
    { id: 17, name: "Workspace 17", desktops: 3 },
    { id: 18, name: "Workspace 18", desktops: 5 },
    { id: 19, name: "Workspace 19", desktops: 7 },
    { id: 20, name: "Workspace 20", desktops: 2 },
    { id: 21, name: "Workspace 21", desktops: 3 },
    { id: 22, name: "Workspace 22", desktops: 5 },
    { id: 23, name: "Workspace 23", desktops: 7 },
    { id: 24, name: "Workspace 24", desktops: 2 },
    { id: 25, name: "Workspace 25", desktops: 3 },
    { id: 26, name: "Workspace 26", desktops: 5 },
    { id: 27, name: "Workspace 27", desktops: 7 },
    { id: 28, name: "Workspace 28", desktops: 2 },
    { id: 29, name: "Workspace 29", desktops: 3 },
    { id: 30, name: "Workspace 30", desktops: 5 },
    { id: 31, name: "Workspace 31", desktops: 7 },
    { id: 32, name: "Workspace 32", desktops: 2 },
    { id: 33, name: "Workspace 33", desktops: 3 },
    { id: 34, name: "Workspace 34", desktops: 5 },
    { id: 35, name: "Workspace 35", desktops: 7 },
];

// Mock data for rooms
const rooms: RoomI[] = [
    {
        id: 1,
        name: "Room 1",
        workstations: [
            workstations[0],
            workstations[1],
            workstations[2],
            workstations[3],
            workstations[4],
            workstations[5],
            workstations[6],
            workstations[7],
            workstations[8],
            workstations[9],
            workstations[10],
        ],
        features: ["whiteboard", "projector"],
    },
    {
        id: 2,
        name: "Room 2",
        workstations: [workstations[2], workstations[3]],
        features: ["printer", "A/C", "whiteboard"],
    },
    {
        id: 3,
        name: "Room 3",
        workstations: [workstations[4]],
        features: ["projector"],
    },
    {
        id: 4,
        name: "Room 4",
        workstations: [workstations[5], workstations[6]],
        features: ["A/C", "printer"],
    },
    {
        id: 5,
        name: "Room 5",
        workstations: [workstations[7]],
        features: ["coffee machine"],
    },
];

// Mock data for buildings
const buildings: BuildingI[] = [
    {
        id: 1,
        name: "Building A",
        rooms: [rooms[0], rooms[1], rooms[2]],
        features: ["parking lot", "restaurant"],
    },
    {
        id: 2,
        name: "Building B",
        rooms: [rooms[3], rooms[4]],
        features: ["bike stand", "underground garage", "cinema"],
    },
];

const reservations: ReservationI[] = [
    {
        id: 1,
        user: users[0],
        workstation: workstations[0],
        date: new Date(),
    },
    {
        id: 2,
        user: users[0],
        workstation: workstations[1],
        date: new Date(),
    },
    {
        id: 3,
        user: users[0],
        workstation: workstations[2],
        date: new Date(),
    },
    {
        id: 4,
        user: users[0],
        workstation: workstations[3],
        date: new Date(),
    },
    {
        id: 5,
        user: users[0],
        workstation: workstations[4],
        date: new Date(),
    },
    {
        id: 6,
        user: users[0],
        workstation: workstations[5],
        date: new Date(),
    },
    {
        id: 7,
        user: users[0],
        workstation: workstations[6],
        date: new Date(),
    },
    {
        id: 8,
        user: users[0],
        workstation: workstations[7],
        date: new Date(),
    },
    {
        id: 9,
        user: users[0],
        workstation: workstations[8],
        date: new Date(),
    },
    {
        id: 10,
        user: users[0],
        workstation: workstations[9],
        date: new Date(),
    },
    {
        id: 11,
        user: users[0],
        workstation: workstations[10],
        date: new Date(),
    },
    {
        id: 12,
        user: users[0],
        workstation: workstations[11],
        date: new Date(),
    },
    {
        id: 13,
        user: users[0],
        workstation: workstations[12],
        date: new Date(),
    },
    {
        id: 14,
        user: users[0],
        workstation: workstations[13],
        date: new Date(),
    },
    {
        id: 15,
        user: users[0],
        workstation: workstations[14],
        date: new Date(),
    },
    {
        id: 16,
        user: users[0],
        workstation: workstations[15],
        date: new Date(),
    },
];

export { users, buildings, rooms, workstations, reservations };
