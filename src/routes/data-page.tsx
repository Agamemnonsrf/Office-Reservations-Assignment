import { useEffect, useState } from "react";
import { getData } from "../mocks/utils";
import DataTable from "../components/data-table/data-table";
import { TableColumnI } from "../interfaces/table-interface";

type showType =
    | "users"
    | "reservations"
    | "buildings"
    | "rooms"
    | "workspaces";

type Props = {
    show: showType;
};

const DataPage = ({ show }: Props) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const mockData = getData(show);
        if ("error" in mockData) {
            console.log(mockData.error);
            return;
        }
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
            type: "text",
        },
    ];

    return (
        <div className="h-52 flex flex-col items-center w-full justify-center">
            <DataTable
                style={{ height: "500px" }}
                columns={columns}
                rows={data}
                inlineEditing={true}
                onSave={(edited_row: any) => {
                    console.log(edited_row);
                }}
                onDelete={(deleted_row: any) => {
                    console.log(deleted_row);
                }}
            />
        </div>
    );
};

export default DataPage;
