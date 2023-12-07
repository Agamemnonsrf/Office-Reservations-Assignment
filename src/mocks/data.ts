// Mock data for users
const users = [
    { id: 1, name: "John Doe", roles: ["administrator", "employee"] },
    { id: 2, name: "Jane Smith", roles: ["employee"] },
    { id: 3, name: "Mike Johnson", roles: ["employee"] },
];

// Mock data for workspaces
const workspaces = [
    { id: 1, name: "Workspace 1", desktops: 5 },
    { id: 2, name: "Workspace 2", desktops: 2 },
    { id: 3, name: "Workspace 3", desktops: 9 },
    { id: 4, name: "Workspace 4", desktops: 7 },
    { id: 5, name: "Workspace 5", desktops: 1 },
    { id: 6, name: "Workspace 6", desktops: 2 },
    { id: 7, name: "Workspace 7", desktops: 5 },
    { id: 8, name: "Workspace 8", desktops: 10 },
];

// Mock data for rooms
const rooms = [
    {
        id: 1,
        name: "Room 1",
        workspaces: [workspaces[0], workspaces[1]],
        features: ["whiteboard", "projector"],
    },
    {
        id: 2,
        name: "Room 2",
        workspaces: [workspaces[2], workspaces[3]],
        features: ["printer", "A/C", "whiteboard"],
    },
    {
        id: 3,
        name: "Room 3",
        workspaces: [workspaces[4]],
        features: ["projector"],
    },
    {
        id: 4,
        name: "Room 4",
        workspaces: [workspaces[5], workspaces[6]],
        features: ["A/C", "printer"],
    },
    {
        id: 5,
        name: "Room 5",
        workspaces: [workspaces[7]],
        features: ["coffee machine"],
    },
];

// Mock data for buildings
const buildings = [
    { id: 1, name: "Building A", rooms: [rooms[0], rooms[1], rooms[2]] },
    { id: 2, name: "Building B", rooms: [rooms[3], rooms[4]] },
];

export { users, buildings };
