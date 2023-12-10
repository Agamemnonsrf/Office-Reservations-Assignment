interface TableDataI {
    style? : React.CSSProperties;
    columns: TableColumnI[];
    rows: any[];
    inlineEditing: boolean;
    onSave : Function;
}

type ColumnType = "text" | "number" | "boolean";

interface TableColumnI {
    field: string;
    title: string;
    type: ColumnType;
}

export type { TableDataI, TableColumnI };
