import React from "react";

interface ColumnProps {
    title: string;
}

const Column: React.FC<ColumnProps> = ({ title }) => {
    return <td>{title}</td>;
};

export default Column;
