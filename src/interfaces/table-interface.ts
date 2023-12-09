interface TableDataI {
    columns: TableColumnI[];
    rows: any[];
    inlineEditing: boolean;
}

type ColumnType = "text" | "number" | "boolean";

interface TableColumnI {
    field: string;
    title: string;
    type: ColumnType;
}

export type { TableDataI, TableColumnI };
