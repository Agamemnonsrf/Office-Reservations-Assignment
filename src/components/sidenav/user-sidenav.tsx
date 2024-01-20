import React, { useState ,forwardRef, FC, useImperativeHandle } from 'react';
import { UserI } from '../../interfaces/db-intertface';
import {roles} from '../../interfaces/db-intertface';

// type SidenavProps = {
//     children: React.ReactNode;
//     drawerContent: React.ReactNode;
// };




type DrawerProps = {
    onClose: (args: any) => void;
    ref: any;
};

const UserSidenav: FC<DrawerProps> = forwardRef<any, DrawerProps>(
    ({ onClose }: DrawerProps, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [user, setUser] = useState<UserI>({
            id: 0,
            name: '',
            roles: [],
        });

        useImperativeHandle(ref, () => ({
            "openDrawer": openDrawer,
        }));

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setUser((prevUser) => ({
                ...prevUser,
                [name]: value,
            }));
        };

        const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value, checked } = event.target;
            setUser((prevUser) => {
                let updatedRoles = [...prevUser.roles];
                if (checked) {
                    updatedRoles.push(value as roles);
                } else {
                    updatedRoles = updatedRoles.filter((role) => role !== value);
                }
                return {
                    ...prevUser,
                    roles: updatedRoles,
                };
            });
        };

        const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            console.log(user);
            setIsOpen(false);
            onClose({action : 'submit', user: user});
        };

        const onCancelPress = () => {
            setIsOpen(false);
            onClose({action : 'cancel'});
        }

        const openDrawer = (args: any) => {
            //check args.isNew to determine if we are adding a new user or editing an existing one
            //if editing, populate the user state with the user data passed in args.user
            //if adding, set the user state to default values
            
            if(isOpen) return;

            if(args.isNew){
                setUser({
                    id: 0,
                    name: '',
                    roles: [],
                });
            }
            else{
                setUser(args.user);
            }

            setIsOpen(true);
        };

        return (
            <div
                ref={ref}
                className={`fixed  top-0 right-0 h-full w-1/3 z-50 bg-black shadow-md overflow-auto transition-transform transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
             
                <form onSubmit={handleSubmit} className="p-4 bg-yellow">
                    <div className=""> {/* Add the "bg-white" class */}
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            className="bg-gray-100 text-black" // Add the "bg-gray-100" class
                        />
                    </div>
                    <div className="bg-black"> {/* Add the "bg-white" class */}
                        <label>Roles:</label>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    value="administrator"
                                    checked={user.roles.includes('administrator')}
                                    onChange={handleRoleChange}
                                />
                                Admin
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    value="employee"
                                    checked={user.roles.includes('employee')}
                                    onChange={handleRoleChange}
                                />
                                User
                            </label>
                        </div>
                    </div>
                    <div className='flex p-5'><button onClick={onCancelPress} className="p-4">
                    Cancel
                    </button>   
                    <button type="submit">Submit</button></div>
                    
                </form>
            </div>
        );
    }
);

export default UserSidenav;
