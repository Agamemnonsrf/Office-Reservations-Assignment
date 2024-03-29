import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import AdministratorDashboard from "./routes/administrator";
import LoginScreen from "./routes/login";
import ReservationComponent from "./components/employee/reserve/reservation-component";
import UserProvider from "./context/user/user-provider";
import MyReservations from "./routes/my-reservations";
import DataPageUsers from "./routes/data-page-users";
import DataPageBuildings from "./routes/data-page-buildings";
import DataPageRooms from "./routes/data-page-rooms";
import DataPageWorkspaces from "./routes/data-page-workspaces";
import DataPageReservations from "./routes/data-page-reservations";

const RootElement = () => {
    return (
        <React.StrictMode>
            <UserProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Root />}>
                            <Route
                                path="dashboard"
                                element={<AdministratorDashboard />}
                            >
                                <Route
                                    path="users"
                                    element={<DataPageUsers show={"users"} />}
                                />
                                <Route
                                    path="reservations"
                                    element={<DataPageReservations />}
                                />
                                <Route
                                    path="buildings"
                                    element={<DataPageBuildings/>}
                                />
                                 <Route
                                    path="rooms"
                                    element={<DataPageRooms />}
                                />
                                
                                <Route
                                    path="workspaces"
                                    element={<DataPageWorkspaces />} 
                                 />
                            </Route>
                            <Route
                                path="reserve"
                                element={<ReservationComponent />}
                            />
                            <Route
                                path="my-reservations"
                                element={<MyReservations />}
                            />
                        </Route>
                        <Route path="/login" element={<LoginScreen />} />
                    </Routes>
                </Router>
            </UserProvider>
        </React.StrictMode>
    );
};

window.addEventListener("DOMContentLoaded", function () {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <RootElement />
    );
});

export default RootElement;
