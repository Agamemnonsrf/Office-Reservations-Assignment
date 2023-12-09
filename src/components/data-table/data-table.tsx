import React from "react";
import { TableDataI } from "../../interfaces/table-interface";

const DataTable: React.FC<TableDataI> = (props: TableDataI) => {
    return (
        <div className="-my-2 overflow-auto h-full  sm:-mx-6 lg:-mx-8 ">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
                    <table className="divide-y divide-gray-200 overflow-auto max-h-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {props.columns.map((column) => {
                                    return (
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {column.title}
                                        </th>
                                    );
                                })}
                                {props.inlineEditing && (
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    ></th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {props.rows.map((row) => {
                                return (
                                    <tr>
                                        {props.columns.map((column) => {
                                            return (
                                                <td className="px-6 py-4 whitespace-nowrap text-black">
                                                    {row[column.field]}
                                                </td>
                                            );
                                        })}
                                        {props.inlineEditing && (
                                            <td className="px-6 py-4 whitespace-nowrap flex gap-2">
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
