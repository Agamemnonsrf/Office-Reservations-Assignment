import "../App.css";

const Root = () => {
    return (
        <>
            <h1 className="outline-emerald-700 outline rounded-md my-10 p-5">
                Office Reservations
            </h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <button>Administrator</button>
                <button>Worker</button>
            </div>
        </>
    );
};

export default Root;
