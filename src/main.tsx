import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import AdministratorDashboard from "./routes/administrator";
import LoginScreen from "./routes/login";
import ReservationComponent from "./components/employee/reserve/reservation-component";
import UserProvider from "./context/user/user-provider";
import DataPage from "./routes/data-page";

const routerReworked = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "dashboard",
                element: <AdministratorDashboard />,
                children: [
                    {
                        path: "Users",
                        element: <DataPage show={"users"} />,
                    },
                    {
                        path: "Reservations",
                        element: <DataPage show={"reservations"} />,
                    },
                    {
                        path: "Buildings",
                        element: <DataPage show={"buildings"} />,
                    },
                    {
                        path: "Rooms",
                        element: <DataPage show={"rooms"} />,
                    },
                    {
                        path: "Workstations",
                        element: <DataPage show={"workstations"} />,
                    },
                ],
            },
            {
                path: "reserve",
                element: <ReservationComponent />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginScreen />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserProvider>
            <RouterProvider router={routerReworked} />
        </UserProvider>
    </React.StrictMode>
);
