import { useEffect, useRef, useState } from "react";
import DataTable from "../components/data-table/data-table";
import { TableColumnI } from "../interfaces/table-interface";
import { addRoom, deleteRoom, getData, updateRoom } from "../mocks/utils";
import RoomSidenav from "../components/sidenav/room-sidenav";




const DataPageRooms = () => {
    const [data, setData] = useState<any[]>([]);

    const sidenavRef = useRef<any>(null);

    const toggleDrawer = () => {
        //setIsDrawerOpen(!isDrawerOpen);
        (sidenavRef.current as any)?.openDrawer({
            isNew: true,
            room: undefined,
        });
    };

    const handleDrawerClose = (args: any) => {
        
        if (args.action === "submit") {
            if (args.room.id == 0) {
                addRoom(args.room);
                const mockData = getData('rooms');
                setData(mockData);
            } else {
                updateRoom(args.room);
                const mockData = getData('rooms');
                setData(mockData);
            }
        } else if(args.action == "delete"){
            
            deleteRoom(args.room);
            const mockData = getData('rooms');
            setData(mockData);
        }
    };

    useEffect(() => {
        const mockData = getData('rooms');

        setData(mockData);
    }, []);

    const columns: TableColumnI[] = [
        {
            field: "id",
            title: "#",
            type: "number",
            editable: false,
        },
        {
            field: "building",
            title: "Building ID",
            type: "number",
        },
        {
            field: "features",
            title: "FEATURES",
            type: "text_array",
        },
    ];

    return (
        <div className="relative">
            <button onClick={toggleDrawer} className="p-4">
                new room
            </button>
            <RoomSidenav onClose={handleDrawerClose} ref={sidenavRef} />

            {/* Main content */}
            <div className={`main-content `}>
                <DataTable
                    style={{ height: "auto" }}
                    columns={columns}
                    rows={data}
                    inlineEditing={false}
                    onSave={(edited_row: any) => {
                        console.log(edited_row);
                    }}
                    onDelete={(deleted_row: any) => {
                        console.log(deleted_row);
                    }}
                    onRowClick={(row: any) => {
                        (sidenavRef.current as any)?.openDrawer({
                            isNew: false,
                            room: row,
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default DataPageRooms;
