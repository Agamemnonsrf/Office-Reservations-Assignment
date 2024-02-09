import React, {
    useState,
    forwardRef,
    FC,
    useImperativeHandle,
    useContext,
} from "react";
import { BuildingI, UserI } from "../../interfaces/db-intertface";
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

const BuildingSidenav: FC<DrawerProps> = forwardRef<any, DrawerProps>(
    ({ onClose }: DrawerProps, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [building, setBuilding] = useState<BuildingI>({
            id: 0,
            name: "",
            features: [],
        });
        const [tempFeauture, setTempFeature] = useState("");

        const { user: loggedInUser } = useContext(UserContext);
        useImperativeHandle(ref, () => ({
            openDrawer: openDrawer,
        }));

        const handleInputChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            const { name, value } = event.target;
            setBuilding((prevBuilding) => ({
                ...prevBuilding,
                [name]: value,
            }));
        };

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
                onClose({ action: "submit", building: building });
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

        const openDrawer = (args: any) => {
            //check args.isNew to determine if we are adding a new user or editing an existing one
            //if editing, populate the user state with the user data passed in args.user
            //if adding, set the user state to default values

            if (isOpen) return;

            if (args.isNew) {
                setBuilding({
                    id: 0,
                    name: "",
                    features: [],
                });
            } else {
                setBuilding(args.building);
            }

            setIsOpen(true);
        };

        const handleAddChip = (event: any) => {
            event.preventDefault();
            console.log(event.target);
            setTempFeature("");
        };

        const handleDeleteChip = (index: number) => {
            setBuilding((prevBuilding) => {
                let updatedFeatures = [...prevBuilding.features];
                updatedFeatures.splice(index, 1);
                return {
                    ...prevBuilding,
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
                    <div className="">
                        {" "}
                        {/* Add the "bg-white" class */}
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={building.name}
                            onChange={handleInputChange}
                            className="p-1 rounded-md mx-1 bg-neutral-700 text-white" // Add the "bg-gray-100" class
                        />
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
                        {building.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center bg-gray-200 rounded-md p-2 mr-2 mb-2">
                                <span>{feature}</span>
                                <button onClick={() => handleDeleteChip(index)} className="ml-2">
                                    <span className="h-4 w-4 bg-red">X</span>
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

            </div>
        );
    }
);

export default BuildingSidenav;
