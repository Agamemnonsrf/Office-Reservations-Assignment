import { useEffect, useRef, useState } from "react";
import { getData, addUser, updateUser } from "../mocks/utils";
import DataTable from "../components/data-table/data-table";
import { TableColumnI } from "../interfaces/table-interface";
import Sidenav from "../components/sidenav/sidenav";
import UserSidenav from "../components/sidenav/user-sidenav";

type showType = "users" | "reservations" | "buildings" | "rooms" | "workspaces";

type Props = {
    show: showType;
};

const DataPage = ({ show }: Props) => {
    const [data, setData] = useState<any[]>([]);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const sidenavRef = useRef<any>(null);

    const toggleDrawer = () => {
        //setIsDrawerOpen(!isDrawerOpen);
        (sidenavRef.current as any)?.openDrawer({
            isNew: true,
            user: undefined,
        });
    };

    const handleDrawerClose = (args: any) => {
        console.log(args);
        if (args.action === "submit") {
            if (args.user.id == 0) {
                addUser(args.user);
                const mockData = getData(show);
                setData(mockData);
            } else {
                updateUser(args.user);
                const mockData = getData(show);
                setData(mockData);
            }
        }
    };

    useEffect(() => {
        const mockData = getData(show);
        console.log(mockData);
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
            field: "roles",
            title: "ROLES",
            type: "text_array",
        },
    ];

    return (
        <div className="relative">
            <button onClick={toggleDrawer} className="p-4">
                new user
            </button>
            <UserSidenav onClose={handleDrawerClose} ref={sidenavRef} />

            {/* Main content */}
            <div className={`main-content ${isDrawerOpen ? "blur-sm" : ""}`}>
                <DataTable
                    style={{ height: "500px" }}
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
                            user: row,
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default DataPage;
