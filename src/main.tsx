import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import AdministratorDashboard from "./routes/administrator";
import LoginScreen from "./routes/login";
import ReservationComponent from "./components/employee/reserve/reservation-component";
import UserProvider from "./context/user/user-provider";
import DataPage from "./routes/data-page";
import MyReservations from "./routes/my-reservations";

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
                                    element={<DataPage show={"users"} />}
                                />
                                <Route
                                    path="reservations"
                                    element={<DataPage show={"reservations"} />}
                                />
                                <Route
                                    path="buildings"
                                    element={<DataPage show={"buildings"} />}
                                />
                                <Route
                                    path="rooms"
                                    element={<DataPage show={"rooms"} />}
                                />
                                <Route
                                    path="workspaces"
                                    element={<DataPage show={"workspaces"} />}
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
