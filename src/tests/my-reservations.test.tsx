import { render, fireEvent } from "@testing-library/react";
import MyReservations from "../routes/my-reservations";
import "@testing-library/jest-dom";
import RootElement from "../main";

describe(MyReservations, () => {
    it("should render the My Reservations screen", () => {
        const { getByText } = render(<MyReservations />);
        expect(getByText("My Reservations")).toBeInTheDocument();
    });

    it("should make a new reservation appear in the list", () => {
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
        fireEvent.click(getByText("My Reservations"));
        expect(getByText("Wed Jan 31 2024 (Passed)")).toBeInTheDocument();
    });
});
