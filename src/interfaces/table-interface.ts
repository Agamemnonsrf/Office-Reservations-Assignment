interface TableDataI {
    style? : React.CSSProperties;
    columns: TableColumnI[];
    rows: any[];
    inlineEditing: boolean;
    onSave? : Function;
    onDelete? : Function;
    onRowClick? : Function;
}

type ColumnType = "text" | "number" | "radio" | "text_array";

interface TableColumnI {
    field: string;
    title: string;
    type: ColumnType;
    editable?: boolean;
    defaultValue?: any;
    validators?:any;
}

export type { TableDataI, TableColumnI };
