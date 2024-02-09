import React, {
    useState,
    forwardRef,
    FC,
    useImperativeHandle,
    useContext,
    useEffect,
} from "react";
import { RoomI, UserI, WorkspaceI } from "../../interfaces/db-intertface";
import { getData } from "../../mocks/utils";
import UserContext from "../../context/user/user-context";

// type SidenavProps = {
//     children: React.ReactNode;
//     drawerContent: React.ReactNode;
// };

type DrawerProps = {
    onClose: (args: any) => void;
    ref: any;
};

const WorkspaceSidenav: FC<DrawerProps> = forwardRef<any, DrawerProps>(
    ({ onClose }: DrawerProps, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [data, setData] = useState<any[]>([]);
        const [workspace, setWorkspace] = useState<WorkspaceI>({
            id: 0,
            room: -1,
            desktops: 0,
            building: -1
        });

        const { user: loggedInUser } = useContext(UserContext);
        useImperativeHandle(ref, () => ({
            openDrawer: openDrawer,
        }));

        const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const { value } = event.target;

            setWorkspace((prevWorkspace) => ({
                ...prevWorkspace,
                room: parseInt(value),
            }));
        };

        useEffect(() => {
            const mockData = getData('rooms');

            setData(mockData);
        }, []);

        // const handleRoleChange = (
        //     event: React.ChangeEvent<HTMLInputElement>
        // ) => {
        //     const { value, checked } = event.target;
        //     setUser((prevUser) => {
        //         let updatedRoles = [...prevUser.roles];
        //         if (checked) {
        //             updatedRoles.push(value as roles);
        //         } else {
        //             updatedRoles = updatedRoles.filter(
        //                 (role) => role !== value
        //             );
        //         }
        //         return {
        //             ...prevUser,
        //             roles: updatedRoles,
        //         };
        //     });
        // };

        const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            setIsOpen(false);
            if (!loggedInUser) return;
            if (
                (
                    getData("users", { id: loggedInUser.id }) as UserI[]
                )[0].roles.includes("administrator")
            ) {
                // if (user.id !== loggedInUser.id) {
                onClose({ action: "submit", workspace: workspace });
                // } else {
                //     alert("You cannot modify your own user");
                // }
            } else {
                alert("You are not an administrator, reload the page");
            }
        };

        const onCancelPress = () => {
            setIsOpen(false);
            onClose({ action: "cancel" });
        };

        const onDeletePress = () => {
            setIsOpen(false);
            onClose({ action: "delete", workspace: workspace });
        }

        const openDrawer = (args: any) => {
            //check args.isNew to determine if we are adding a new user or editing an existing one
            //if editing, populate the user state with the user data passed in args.user
            //if adding, set the user state to default values

            if (isOpen) return;

            if (args.isNew) {
                setWorkspace({
                    id: 0,
                    building: -1,
                    room: -1,
                    desktops: 0,
                });
            } else {
                setWorkspace(args.workspace);
            }

            setIsOpen(true);
        };

        return (
            <div
                ref={ref}
                className={`fixed top-0 right-0 h-full w-1/3 z-50 bg-neutral-950 shadow-md overflow-auto transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <form onSubmit={handleSubmit} className="p-4 bg-yellow">
                    <div className="flex">
                        <label htmlFor="room">Room:</label>
                        <select
                            id="room"
                            name="room"
                            value={workspace.room}
                            onChange={handleInputChange}
                            required
                            className="p-1 rounded-md mx-1 bg-neutral-700 text-white"
                        >
                            <option value={-1}>Select a room</option>
                            {data.map((room: RoomI) => (


                                <option key={room.id} value={room.id} className="!text-white">
                                    <span className="!text-white">{room.id}</span>
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="flex">
                        <label htmlFor="desktops">Desktops:</label>
                        <input
                            type="number"
                            id="desktops"
                            name="desktops"
                            value={workspace.desktops}
                            onChange={(event) => setWorkspace((prevWorkspace) => ({
                                ...prevWorkspace,
                                desktops: parseInt(event.target.value),
                            }))}
                            required
                            className="p-1 rounded-md mx-1 bg-neutral-700 text-white"
                        />
                    </div>


                    <div className="flex">

                        <button type="submit">Submit</button>
                    </div>
                </form>
                <div className="flex p-5">

                    <button onClick={onCancelPress} className="p-4">
                        Cancel
                    </button>
                </div>
                <div className="flex p-5">

                    <button onClick={onDeletePress} className="p-4 text-red-500">
                        Delete
                    </button>
                </div>

            </div>
        );
    }
);

export default WorkspaceSidenav;
