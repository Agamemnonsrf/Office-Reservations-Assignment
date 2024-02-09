import { useEffect, useRef, useState } from "react";
import DataTable from "../components/data-table/data-table";
import { TableColumnI } from "../interfaces/table-interface";
import { addBuilding, deleteBuilding, getData, updateBuilding } from "../mocks/utils";
import BuildingSidenav from "../components/sidenav/building-sidenav";
import { ReservationI } from "../interfaces/db-intertface";




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
            if (args.building.id == 0) {
                addBuilding(args.building);
                const mockData = getData('buildings');
                setData(mockData);
            } else {
                updateBuilding(args.building);
                const mockData = getData('buildings');
                setData(mockData);
            }
        }
        else if (args.action == "delete") {
            if ((getData("reservations") as ReservationI[]).some(reservation => reservation.building === args.building.id)) {
                alert("You can't delete a building that has reservations");
                return;
            }
            deleteBuilding(args.building);
            const mockData = getData('buildings');
            setData(mockData);
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
                new building
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
