interface TableDataI {
    style? : React.CSSProperties;
    columns: TableColumnI[];
    rows: any[];
    inlineEditing: boolean;
    onSave? : Function;
    onDelete? : Function;
}

type ColumnType = "text" | "number" | "radio";

interface TableColumnI {
    field: string;
    title: string;
    type: ColumnType;
    editable?: boolean;
    defaultValue?: any;
    validators?:any;
}

export type { TableDataI, TableColumnI };
