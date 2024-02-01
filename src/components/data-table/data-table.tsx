import React, { useState } from "react";
import { TableDataI } from "../../interfaces/table-interface";
import { useForm } from "react-hook-form";

const DataTable: React.FC<TableDataI> = (props: TableDataI) => {
    const [edited_row_index, setEditedRowIndex] = useState(-1);
    const [add_new_open, setAddNewOpen] = useState(false);

    const {
        register,

        formState: { errors },
    } = useForm();

    errors;

    const removePx = (value: string): number => {
        return Number(value.replace("px", ""));
    };

    const handleSave = (edited_row: any) => {
        props.onSave && props.onSave(edited_row);
    };

    const onRowClick = (row: any) => {
        return () => {
            props.onRowClick && props.onRowClick(row);
        };
    };

    return (
        <div className="p-2 w-full  h-52">
            <div
                className="w-full align-middle block shadow overflow-y-auto border-b border-gray-200 rounded-lg bg-white"
                style={props.style ?? { height: 500 }}
            >
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
                                    >
                                        <div className="flex justify-center items-center text-white">
                                            <button
                                                onClick={() => {
                                                    setAddNewOpen(true);
                                                    setEditedRowIndex(-1);
                                                }}
                                                className="flex items-center justify-center text-white"
                                            >
                                                Add New
                                            </button>
                                        </div>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200"
                            style={{
                                maxHeight: "calc(100vh - 200px)",
                                overflowY: "auto",
                            }}
                        >
                            {add_new_open && (
                                <tr className="hover:bg-neutral-200">
                                    {props.columns.map((column) => {
                                        if (column.editable === false) {
                                            return (
                                                <td className="px-6 py-4 whitespace-nowrap text-black grow">
                                                    {column.defaultValue}
                                                </td>
                                            );
                                        }
                                        return (
                                            <td className="px-6 py-4 whitespace-nowrap text-black grow">
                                                <input
                                                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                                    type={column.type}
                                                    defaultValue={
                                                        column.defaultValue
                                                    }
                                                    {...register(
                                                        column.field,
                                                        column.validators ?? {
                                                            required: false,
                                                        }
                                                    )}
                                                />
                                            </td>
                                        );
                                    })}
                                    {props.inlineEditing && (
                                        <td className="px-6 py-4 whitespace-nowrap  gap-2 w-2">
                                            <button
                                                onClick={() => {
                                                    handleSave(
                                                        edited_row_index
                                                    );
                                                }}
                                            >
                                                Add
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setAddNewOpen(false);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            )}

                            {props.rows.length === 0 && (
                                <tr className="">
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-black grow text-center text-lg"
                                        colSpan={
                                            props.columns.length +
                                            (props.inlineEditing ? 1 : 0)
                                        }
                                        style={{
                                            height: `calc(${
                                                props.style
                                                    ? removePx(
                                                          (
                                                              props.style
                                                                  .height ?? 0
                                                          ).toString()
                                                      )
                                                    : 500
                                            }px - ${
                                                57 + (add_new_open ? 78 : 0)
                                            }px)`,
                                        }}
                                    >
                                        No data to display
                                    </td>
                                </tr>
                            )}

                            {props.rows.length > 0 &&
                                props.rows.map(
                                    (row: any, row_index: number) => {
                                        if (edited_row_index === row_index) {
                                            return (
                                                <tr className="hover:bg-neutral-200">
                                                    {props.columns.map(
                                                        (column) => {
                                                            if (
                                                                column.editable ===
                                                                false
                                                            ) {
                                                                if (
                                                                    column.type ===
                                                                    "text_array"
                                                                ) {
                                                                    row[
                                                                        column
                                                                            .field
                                                                    ];

                                                                    return (
                                                                        <td className="px-6 py-4 whitespace-nowrap text-black grow">
                                                                            {row[
                                                                                column
                                                                                    .field
                                                                            ].join(
                                                                                ", "
                                                                            )}
                                                                        </td>
                                                                    );
                                                                }
                                                                return (
                                                                    <td className="px-6 py-4 whitespace-nowrap text-black grow">
                                                                        {
                                                                            row[
                                                                                column
                                                                                    .field
                                                                            ]
                                                                        }
                                                                    </td>
                                                                );
                                                            }
                                                            return (
                                                                <td className="px-6 py-4 whitespace-nowrap text-black grow">
                                                                    <input
                                                                        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                                                        type={
                                                                            column.type
                                                                        }
                                                                        defaultValue={
                                                                            row[
                                                                                column
                                                                                    .field
                                                                            ]
                                                                        }
                                                                        {...register(
                                                                            column.field,
                                                                            column.validators ?? {
                                                                                required:
                                                                                    false,
                                                                            }
                                                                        )}
                                                                    />
                                                                </td>
                                                            );
                                                        }
                                                    )}
                                                    {props.inlineEditing && (
                                                        <td className="px-6 py-4 whitespace-nowrap  gap-2 w-2">
                                                            <button
                                                                onClick={() => {
                                                                    handleSave(
                                                                        row
                                                                    );
                                                                }}
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEditedRowIndex(
                                                                        -1
                                                                    );
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        } else {
                                            return (
                                                <tr
                                                    onClick={onRowClick(row)}
                                                    className="hover:bg-neutral-200 cursor-pointer"
                                                >
                                                    {props.columns.map(
                                                        (column) => {
                                                            return (
                                                                <td className="px-6 py-4 whitespace-nowrap text-black grow">
                                                                    {
                                                                        row[
                                                                            column
                                                                                .field
                                                                        ]
                                                                    }
                                                                </td>
                                                            );
                                                        }
                                                    )}
                                                    {props.inlineEditing && (
                                                        <td className="px-6 py-4 whitespace-nowrap flex gap-2 grow w-24">
                                                            <button
                                                                onClick={() => {
                                                                    setEditedRowIndex(
                                                                        row_index
                                                                    );
                                                                    setAddNewOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="text-red-600">
                                                                Delete
                                                            </button>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        }
                                    }
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
