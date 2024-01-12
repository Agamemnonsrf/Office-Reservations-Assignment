import { useEffect, useState } from "react";
import { getData } from "../mocks/utils";
import DataTable from "../components/data-table/data-table";
import { TableColumnI } from "../interfaces/table-interface";
import Sidenav from "../components/sidenav/sidenav";

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

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    //setIsDrawerOpen(!isDrawerOpen);


  };

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
        // <div className="h-52 flex flex-col items-center w-full justify-center">
        //     <DataTable
        //         style={{ height: "500px" }}
        //         columns={columns}
        //         rows={data}
        //         inlineEditing={false}
        //         onSave={(edited_row: any) => {
        //             console.log(edited_row);
        //         }}
        //         onDelete={(deleted_row: any) => {
        //             console.log(deleted_row);
        //         }}
        //     />
           
        // </div>
        <div className="relative">
        <button onClick={toggleDrawer} className="p-4">
          Open Drawer
        </button>
        <Sidenav isOpen={isDrawerOpen} onClose={toggleDrawer}>
          {/* Content inside the drawer */}
          <p className="p-4">This is the content inside the drawer.</p>
        </Sidenav>
  
        {/* Main content */}
        <div className={`main-content ${isDrawerOpen ? 'blur-sm' : ''}`}>
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
            />
        </div>
      </div>
    
    );
};

export default DataPage;
