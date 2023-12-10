import React from "react";
import { TableDataI } from "../../interfaces/table-interface";

const DataTable: React.FC<TableDataI> = (props: TableDataI) => {

    
    const removePx = (value: string) : number => {
        return Number(value.replace('px', ''));
    };

    const handleSave = (edited_row: any) => {
        props.onSave(edited_row);
    }

    return (
        <div className="p-2 w-full  h-52">
            <div className="align-middle block w-full shadow overflow-auto custom-scrollbar border-b border-gray-200 rounded-lg" style={props.style ?? {height:500}}>
                <div>
                    <table className="divide-y divide-gray-200 w-full table-auto">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                {props.columns.map((column) => {
                                    return (
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0"
                                        >
                                            {column.title}
                                        </th>
                                    );
                                })}
                                {props.inlineEditing && (
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0"
                                    ></th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            
                            {props.rows.length === 0 && 
                                     (
                                        <tr className="">
                                            

                                            <td className="px-6 py-4 whitespace-nowrap text-black grow text-center text-lg" colSpan={props.columns.length + (props.inlineEditing ? 1 : 0)} style={{ height: `calc(${props.style? removePx((props.style.height??0).toString()) : 500}px - ${41}px)` }}>
                                                No data to display
                                            </td>
                                        </tr>
                                    )
                                
                            }
                            
                            {props.rows.length > 0 && props.rows.map((row) => {
                                return (
                                    <tr>
                                        {props.columns.map((column) => {
                                            return (
                                                <td className="px-6 py-4 whitespace-nowrap text-black grow">
                                                    {row[column.field]}
                                                </td>
                                            );
                                        })}
                                        {props.inlineEditing && (
                                            <td className="px-6 py-4 whitespace-nowrap flex gap-2 grow w-24">
                                                <button>Edit</button>
                                                <button className="text-red-600">
                                                    Delete
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
