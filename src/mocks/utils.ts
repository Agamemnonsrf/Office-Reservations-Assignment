
// Function to get data
import {users, buildings} from './data.js';
//import interfaces
import {UserI, BuildingI, RoomI, WorkspaceI} from './interfaces';


type action = 'users' | 'buildings' | 'rooms' | 'workspaces';
type filter = {building: number, room?: number};

const getData = (action: action, filter: filter) => {
  switch (action) {
    case 'users':
        return users;
    case 'buildings':
      return buildings;
      break;
    case 'rooms':
      return buildings.filter((building: BuildingI) => building.id === filter.building)[0].rooms;
    case 'workspaces':
      return buildings.filter((building: BuildingI) => building.id === filter.building)[0].rooms.filter((room: RoomI) => room.id === filter.room)[0].workspaces;
    default:
      throw new Error('Invalid action');
      break;
  }
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