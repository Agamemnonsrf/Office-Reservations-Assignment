import "../App.css";
import { Link } from "react-router-dom";

const Root = () => {
    return (
        <div className="w-full h-full">
            <h1 className="border border-amber-400 bg-amber-800 text-amber-400 rounded-md my-10 p-10">
                Office Reservations
            </h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <Link to="/dashboard">
                    <button className="px-10 py-5">Administrator</button>
                </Link>
                <Link to="/reserve">
                    <button className="px-10 py-5">Worker</button>
                </Link>
            </div>
        </div>
    );
};

export default Root;
