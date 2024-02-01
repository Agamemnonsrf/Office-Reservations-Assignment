import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReservationComponent from "../components/employee/reserve/reservation-component";

describe(ReservationComponent, () => {
    it("should render the reservation component", () => {
        const { getByText } = render(<ReservationComponent />);
        expect(getByText("Select a date")).toBeInTheDocument();
    });

    it("should show the building cards when a date is selected", () => {
        const { getByText, getByTestId } = render(
            <ReservationComponent
                testBuildings={[
                    { id: 1, name: "Building A", features: ["test feature"] },
                ]}
            />
        );
        const dateInput = getByTestId("date") as HTMLInputElement;
        fireEvent.change(dateInput, { target: { value: "2024-01-31" } });

        expect(getByText("Building A")).toBeInTheDocument();
    });
});
