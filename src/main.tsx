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
import MyReservations from "./routes/my-reservations";

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
                        path: "users",
                        element: <DataPage show={"users"} />,
                    },
                    {
                        path: "reservations",
                        element: <DataPage show={"reservations"} />,
                    },
                    {
                        path: "buildings",
                        element: <DataPage show={"buildings"} />,
                    },
                    {
                        path: "rooms",
                        element: <DataPage show={"rooms"} />,
                    },
                    {
                        path: "workspaces",
                        element: <DataPage show={"workspaces"} />,
                    },
                ],
            },
            {
                path: "reserve",
                element: <ReservationComponent />,
            },
            {
                path: "my-reservations",
                element: <MyReservations />,
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
