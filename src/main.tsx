import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import AdministratorDashboard from "./routes/administrator";
import WorkerWelcomePage from "./routes/worker";
import Data from "./routes/data";
import PickRole from "./routes/pick-role";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "dashboard",
                element: <AdministratorDashboard />,
                children: [
                    {
                        path: "offices",
                        element: <Data dataEnum={0} />,
                    },
                    {
                        path: "workers",
                        element: <Data dataEnum={1} />,
                    },
                    {
                        path: "reservations",
                        element: <Data dataEnum={2} />,
                    },
                ],
            },
            {
                path: "reserve",
                element: <WorkerWelcomePage />,
            },
            {
                path: "pick-role",
                element: <PickRole />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
