import { useEffect, useRef, useState } from "react";
import DataTable from "../components/data-table/data-table";
import { TableColumnI } from "../interfaces/table-interface";
import { addWorkspace, deleteWorkspace, getData, updateWorkspace } from "../mocks/utils";
import WorkspaceSidenav from "../components/sidenav/workspace-sidenav";
import { ReservationI } from "../interfaces/db-intertface";




const DataPageWorkspaces = () => {
    const [data, setData] = useState<any[]>([]);

    const sidenavRef = useRef<any>(null);

    const toggleDrawer = () => {
        //setIsDrawerOpen(!isDrawerOpen);
        (sidenavRef.current as any)?.openDrawer({
            isNew: true,
            workspace: undefined,
        });
    };

    const handleDrawerClose = (args: any) => {

        if (args.action === "submit") {
            if (args.workspace.id == 0) {
                addWorkspace(args.workspace);
                const mockData = getData('workspaces');
                setData(mockData);

            }

            else {
                updateWorkspace(args.workspace);
                const mockData = getData('workspaces');
                setData(mockData);
            }
        }
        else if (args.action == "delete") {
            if ((getData("reservations") as ReservationI[]).some((reservation) => reservation.workspaces.includes(args.workspace.id))) {
                alert("You can't delete a workspace that has reservations");
                return;
            }
            deleteWorkspace(args.workspace);
            const mockData = getData('workspaces');
            setData(mockData);
        }
    };

    useEffect(() => {
        const mockData = getData('workspaces');

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
            field: "desktops",
            title: "Desktops",
            type: "number",
        },
        {
            field: "room",
            title: "Room ID",
            type: "number",
        },
    ];

    return (
        <div className="relative">
            <button onClick={toggleDrawer} className="p-4">
                new workspace
            </button>
            <WorkspaceSidenav onClose={handleDrawerClose} ref={sidenavRef} />

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
                            workspace: row,
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default DataPageWorkspaces;
