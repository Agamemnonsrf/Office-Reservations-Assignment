import { useEffect, useRef, useState } from "react";
import DataTable from "../components/data-table/data-table";
import { TableColumnI } from "../interfaces/table-interface";
import { addUser, getData, updateUser } from "../mocks/utils";
import BuildingSidenav from "../components/sidenav/building-sidenav";




const DataPageBuildings = () => {
    const [data, setData] = useState<any[]>([]);

    const sidenavRef = useRef<any>(null);

    const toggleDrawer = () => {
        //setIsDrawerOpen(!isDrawerOpen);
        (sidenavRef.current as any)?.openDrawer({
            isNew: true,
            building: undefined,
        });
    };

    const handleDrawerClose = (args: any) => {
        
        if (args.action === "submit") {
            if (args.user.id == 0) {
                addUser(args.user);
                const mockData = getData('buildings');
                setData(mockData);
            } else {
                updateUser(args.user);
                const mockData = getData('buildings');
                setData(mockData);
            }
        }
    };

    useEffect(() => {
        const mockData = getData('buildings');

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
            field: "name",
            title: "NAME",
            type: "text",
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
                new user
            </button>
            <BuildingSidenav onClose={handleDrawerClose} ref={sidenavRef} />

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
                            building: row,
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default DataPageBuildings;
