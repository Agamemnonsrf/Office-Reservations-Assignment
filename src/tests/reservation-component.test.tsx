import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReservationComponent from "../components/employee/reserve/reservation-component";
import RootElement from "../main";

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
    global.alert = jest.fn();
    it("should be able to make a reservation", () => {
        const { getByRole, getByText, getByTestId } = render(<RootElement />);
        const loginButton = getByRole("button", { name: /login/i });
        const loginDropdown = getByText("Select User");

        fireEvent.click(loginDropdown);
        const user = getByText("John Doe");
        fireEvent.click(user);
        fireEvent.click(loginButton);
        fireEvent.click(getByText("Reserve"));
        const dateInput = getByTestId("date") as HTMLInputElement;
        fireEvent.change(dateInput, { target: { value: "2024-01-31" } });
        fireEvent.click(getByText("Building A"));
        fireEvent.click(getByText("Room 1"));
        fireEvent.click(getByText("Workspace 1-1"));
        fireEvent.click(getByText("Set Workspaces"));
        fireEvent.click(getByText("Make Reservation"));
        fireEvent.click(getByText("Confirm"));
        expect(window.alert).toHaveBeenCalledWith("Reservation added!");
    });
});
