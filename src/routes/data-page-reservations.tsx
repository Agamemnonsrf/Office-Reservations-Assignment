import { useEffect, useState } from "react";
import DataTable from "../components/data-table/data-table";
import { TableColumnI } from "../interfaces/table-interface";
import { getData } from "../mocks/utils";




const DataPageReservations = () => {
    const [data, setData] = useState<any[]>([]);



    useEffect(() => {
        const mockData = getData('reservations');

        setData(mockData);
    }, []);

    // user: number;
    // workspaces: number[];
    // room: number;
    // building: number;
    // date: Date;

    const columns: TableColumnI[] = [
        {
            field: "id",
            title: "#",
            type: "number",
            editable: false,
        },
        {
            field: "user",
            title: "User",
            type: "number",
        },
        {
            field: "workspaces",
            title: "Workspaces",
            type: "text_array",
        },
        {
            field: "room",
            title: "Room",
            type: "number",
        },
        {
            field: "building",
            title: "Building",
            type: "number",
        },
        {
            field: "date",
            title: "Date",
            type: "text",
        },
    ];

    return (
        <div className="relative">
            {/* <button onClick={toggleDrawer} className="p-4">
                new workspace
            </button>
            <WorkspaceSidenav onClose={handleDrawerClose} ref={sidenavRef} /> */}

            {/* Main content */}
            <div className={`main-content `}>
                <DataTable
                    style={{ height: "auto" }}
                    columns={columns}
                    rows={data.map((row) => ({
                        ...row,
                        workspaces: row.workspaces.join(", "),
                        date: row.date.toDateString()
                    }))}
                    inlineEditing={false}
                    onSave={(edited_row: any) => {
                        console.log(edited_row);
                    }}
                    onDelete={(deleted_row: any) => {
                        console.log(deleted_row);
                    }}

                />
            </div>
        </div>
    );
};

export default DataPageReservations;
