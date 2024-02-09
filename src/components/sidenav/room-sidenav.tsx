import React, {
    useState,
    forwardRef,
    FC,
    useImperativeHandle,
    useContext,
    useEffect,
} from "react";
import { BuildingI, RoomI, UserI } from "../../interfaces/db-intertface";
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

const RoomSidenav: FC<DrawerProps> = forwardRef<any, DrawerProps>(
    ({ onClose }: DrawerProps, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [data, setData] = useState<any[]>([]);
        const [room, setRoom] = useState<RoomI>({
            id: 0,
            building: -1,
            features: [],
        });
        const [tempFeauture, setTempFeature] = useState("");

        const { user: loggedInUser } = useContext(UserContext);
        useImperativeHandle(ref, () => ({
            openDrawer: openDrawer,
        }));

        const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const { value } = event.target;

            setRoom((prevRoom) => ({
                ...prevRoom,
                building: parseInt(value),
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
                onClose({ action: "submit", room: room });
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
            onClose({ action: "delete", room: room });
        }

        const openDrawer = (args: any) => {
            //check args.isNew to determine if we are adding a new user or editing an existing one
            //if editing, populate the user state with the user data passed in args.user
            //if adding, set the user state to default values

            if (isOpen) return;

            if (args.isNew) {
                setRoom({
                    id: 0,
                    building: -1,
                    features: [],
                });
            } else {
                setRoom(args.room);
            }

            setIsOpen(true);
        };

        const handleAddChip = (event: any) => {
            event.preventDefault();
            setRoom((prevRoom) => ({
                ...prevRoom,
                features: [...prevRoom.features, tempFeauture],
            }))
            setTempFeature("");
        };

        const handleDeleteChip = (index: number) => {
            setRoom((prevRoom) => {
                let updatedFeatures = [...prevRoom.features];
                updatedFeatures.splice(index, 1);
                return {
                    ...prevRoom,
                    features: updatedFeatures,
                };
            });
        };

        const onChipInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setTempFeature(value);
        }

        return (
            <div
                ref={ref}
                className={`fixed top-0 right-0 h-full w-1/3 z-50 bg-neutral-950 shadow-md overflow-auto transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <form onSubmit={handleSubmit} className="p-4 bg-yellow">
                    <div className="flex">
                        <label htmlFor="building">Building:</label>
                        <select
                            id="building"
                            name="building"
                            value={room.building}
                            onChange={handleInputChange}
                            required
                            className="p-1 rounded-md mx-1 bg-neutral-700 text-white"
                        >
                            <option value={-1}>Select a building</option>
                            {data.map((building: BuildingI) => (


                                <option key={building.id} value={building.id} className="!text-white">
                                    <span className="!text-white">{building.id}</span>
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex">
                        <label htmlFor="features">Features:</label>
                        <input
                            type="text"
                            // id="features"
                            // name="features"
                            value={tempFeauture}
                            onChange={onChipInputChange}
                            className="p-1 rounded-md mx-1 bg-neutral-700 text-white"
                        />
                        <button onClick={handleAddChip} className="p-2 bg-blue-500 text-white rounded-md">
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap mt-2">
                        {room.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center bg-gray-200 rounded-md p-2 mr-2 mb-2">
                                <span className="text-black">{feature}</span>
                                <button onClick={() => handleDeleteChip(index)} className="ml-2 h-1 w-1 flex justify-center items-center">
                                    <span className="bg-red">&times;</span>
                                </button>
                            </div>
                        ))}
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

export default RoomSidenav;
