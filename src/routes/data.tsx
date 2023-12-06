interface DataProps {
    dataEnum: number;
}

const Data = (props: DataProps) => {
    switch (props.dataEnum) {
        case 0:
            return <div>Offices</div>;
        case 1:
            return <div>Workers</div>;
        case 2:
            return <div>Reservations</div>;
        default:
            return <div>Offices</div>;
    }
};

export default Data;
