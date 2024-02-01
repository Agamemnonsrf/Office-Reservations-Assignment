import {
    BuildingI,
    RoomI,
    UserI,
    WorkspaceI,
} from "../interfaces/db-intertface";

const DB_NAME = "MyDatabase";
const DB_VERSION = 1;

const USER_STORE_NAME = "users";
const WORKSPACE_STORE_NAME = "workspaces";
const ROOM_STORE_NAME = "rooms";
const BUILDING_STORE_NAME = "buildings";

class IndexedDbService {
    db: IDBDatabase | null = null;

    async openDb() {
        return new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                this.db.createObjectStore(USER_STORE_NAME, { keyPath: "id" });
                this.db.createObjectStore(WORKSPACE_STORE_NAME, {
                    keyPath: "id",
                });
                this.db.createObjectStore(ROOM_STORE_NAME, { keyPath: "id" });
                this.db.createObjectStore(BUILDING_STORE_NAME, {
                    keyPath: "id",
                });
            };
        });
    }

    async add(storeName: string, item: UserI | WorkspaceI | RoomI | BuildingI) {
        const db = await this.openDb();
        return new Promise<void>((resolve, reject) => {
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.add(item);

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
            request.onerror = () => reject(request.error);
        });
    }

    async get(storeName: string, id: number) {
        const db = await this.openDb();
        return new Promise<UserI | WorkspaceI | RoomI | BuildingI>(
            (resolve, reject) => {
                const transaction = db.transaction(storeName);
                const store = transaction.objectStore(storeName);
                const request = store.get(id);

                transaction.oncomplete = () => resolve(request.result);
                transaction.onerror = () => reject(transaction.error);
                request.onerror = () => reject(request.error);
            }
        );
    }

    addUser(user: UserI) {
        return this.add(USER_STORE_NAME, user);
    }

    getUser(id: number) {
        return this.get(USER_STORE_NAME, id);
    }

    // Workspace functions
    addWorkspace(workspace: WorkspaceI) {
        return this.add(WORKSPACE_STORE_NAME, workspace);
    }

    getWorkspace(id: number) {
        return this.get(WORKSPACE_STORE_NAME, id);
    }

    // Room functions
    addRoom(room: RoomI) {
        return this.add(ROOM_STORE_NAME, room);
    }

    getRoom(id: number) {
        return this.get(ROOM_STORE_NAME, id);
    }

    // Building functions
    addBuilding(building: BuildingI) {
        return this.add(BUILDING_STORE_NAME, building);
    }

    getBuilding(id: number) {
        return this.get(BUILDING_STORE_NAME, id);
    }
}

export const dbService = new IndexedDbService();
