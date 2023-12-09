// Mock data for users
const users = [
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
