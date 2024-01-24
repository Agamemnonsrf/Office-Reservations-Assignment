import React, { useEffect, useState, useContext } from "react";
import {
    BuildingI,
    ReservationI,
    WorkspaceI,
} from "../interfaces/db-intertface";
import { deleteReservation, getData } from "../mocks/utils";
import UserContext from "../context/user/user-context";
import ConfirmModal from "../components/employee/reserve/confirm-modal";

const trashcan = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="14"
        viewBox="0 0 448 512"
        fill="red"
    >
        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
    </svg>
);

const MyReservations = () => {
    const [reservations, setReservations] = useState<ReservationI[] | null>(
        null
    );

    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) return;
        const reservations = getData("reservations", { user: user.id });
        setReservations(reservations as ReservationI[]);
    }, []);

    return (
        <div className=" w-full h-fit rounded-lg flex flex-col items-center justify-start p-10 bg-neutral-900">
            <h4 className="font-bold mb-4">My Reservations</h4>
            {reservations?.length ? (
                reservations
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((reservation) => (
                        <Reservation
                            key={reservation.id}
                            reservation={reservation}
                            setReservations={setReservations}
                        />
                    ))
            ) : (
                <h1>No reservations</h1>
            )}
        </div>
    );
};

const Reservation = ({
    reservation,
    setReservations,
}: {
    reservation: ReservationI;
    setReservations: Function;
}) => {
    const [showModal, setShowModal] = useState(false);

    const { user } = useContext(UserContext);

    const confirmDelete = (reservation: ReservationI) => {
        deleteReservation(reservation);
        setShowModal(false);
        if (!user) return;
        const reservations = getData("reservations", { user: user.id });
        setReservations(reservations as ReservationI[]);
    };

    return (
        <div key={reservation.id} className="w-1/2 m-5">
            <h3 className="text-3xl font-bold mb-4">
                {reservation.date.toDateString()}{" "}
                {reservation.date.getTime() < new Date().getTime() &&
                    "(Passed)"}
            </h3>
            <ConfirmModal
                isShow={showModal}
                setIsShow={setShowModal}
                handleConfirm={() => confirmDelete(reservation)}
                handleCancel={() => setShowModal(false)}
                title={`Would you like to delete this reservation?`}
            />
            <div className="p-5 bg-neutral-800 rounded-lg relative">
                <button
                    onClick={() => setShowModal(true)}
                    className="absolute right-1 bottom-1"
                >
                    {trashcan}
                </button>
                <h5>
                    {
                        (
                            getData("buildings", {
                                id: reservation.building,
                            }) as BuildingI[]
                        )[0].name
                    }{" "}
                    | Room {reservation.room}
                </h5>
                <div className="flex gap-2 overflow-auto">
                    {reservation.workspaces.map((workspace) => (
                        <div
                            key={workspace}
                            className={` bg-neutral-900 p-6 py-2 m-2 rounded-md flex flex-col justify-center w-fit focus:outline-none`}
                        >
                            <div className="flex justify-between items-baseline w-full">
                                <p>Workspace {workspace}</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-baseline bg-neutral-700 rounded-md px-1 self-end">
                                    <h6>
                                        {
                                            (
                                                getData("workspaces", {
                                                    id: workspace,
                                                }) as WorkspaceI[]
                                            )[0].desktops
                                        }
                                    </h6>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="13"
                                        width="14"
                                        viewBox="0 0 576 512"
                                        fill="white"
                                        className="ml-2"
                                    >
                                        <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V352H64V64H512z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyReservations;
