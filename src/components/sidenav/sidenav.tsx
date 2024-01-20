import React, { useState , FC } from 'react';

// type SidenavProps = {
//     children: React.ReactNode;
//     drawerContent: React.ReactNode;
// };

type DrawerProps = {
    isOpen: boolean;
    onClose: (args:any) => void;
    children: React.ReactNode;
};



const Sidenav: FC<DrawerProps> = ({ isOpen, onClose, children }: DrawerProps) => {
    return (
        <div
            className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-md overflow-auto transition-transform transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <button onClick={onClose} className="p-4">
                Cancel
            </button>
            {children}
        </div>
    );
};
  
  export default Sidenav;

