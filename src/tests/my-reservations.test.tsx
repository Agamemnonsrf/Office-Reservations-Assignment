import { render } from "@testing-library/react";
import MyReservations from "../routes/my-reservations";
import "@testing-library/jest-dom";

describe(MyReservations, () => {
    it("should render the My Reservations screen", () => {
        const { getByText } = render(<MyReservations />);
        expect(getByText("My Reservations")).toBeInTheDocument();
    });
});
