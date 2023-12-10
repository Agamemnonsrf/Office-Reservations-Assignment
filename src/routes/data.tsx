import { useEffect, useState } from "react";
import { getData } from "../mocks/utils";
import DataTable from "../components/data-table/data-table";
import { TableColumnI } from "../interfaces/table-interface";

const Data = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const mockData = getData("users");
        setData(mockData);
    }, []);

    const columns: TableColumnI[] = [
        {
            field: "id",
            title: "#",
            type: "number",
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
                rows={data.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        roles: item.roles.join(", "),
                    };
                })}
                inlineEditing={true}
                onSave={(edited_row:any) => {
                    console.log(edited_row);
                }}
            />

        </div>
    );
};

export default Data;
