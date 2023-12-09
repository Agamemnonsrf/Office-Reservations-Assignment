import { Link } from "react-router-dom";
import { useUser } from "./root";

const PickRole = () => {
    const { user } = useUser();

    return (
        <>
            <div className="flex justify-around w-1/2 mx-auto border border-gray-400 rounded-md p-10">
                {user?.roles.includes("administrator") && (
                    <Link to="/dashboard">
                        <button className="px-10 py-5">Administrator</button>
                    </Link>
                )}
                <Link to="/reserve">
                    <button className="px-10 py-5">Worker</button>
                </Link>
            </div>
        </>
    );
};

export default PickRole;
