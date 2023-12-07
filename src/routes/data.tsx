import { useEffect, useState } from "react";
import { getData } from "../mocks/utils";

interface DataProps {
    dataEnum: number;
}

const whichData = ["offices", "workers", "reservations"];

const Data = (props: DataProps) => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {});

    return (
        <div>
            <h1>{whichData[props.dataEnum]}</h1>
        </div>
    );
};

export default Data;
