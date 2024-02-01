import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginScreen from "../routes/login";

import RootElement from "../main";

describe(LoginScreen, () => {
    it("should render the login screen", () => {
        const { getByText } = render(<LoginScreen />);
        expect(getByText("Login").innerHTML).toEqual("Login");
        expect(getByText("Reset DB").innerHTML).toEqual("Reset DB");
    });

    it("should enable the login button when a user is selected", () => {
        const { getByRole, getByText } = render(<LoginScreen />);
        const loginButton = getByRole("button", { name: /login/i });
        expect(loginButton).toBeDisabled();
        const loginDropdown = getByText("Select User");

        fireEvent.click(loginDropdown);
        const user = getByText("John Doe");
        fireEvent.click(user);
        expect(loginButton).toBeEnabled();
    });

    it("should log the user in when the login button is clicked", () => {
        const { getByRole, getByText } = render(<RootElement />);
        const loginButton = getByRole("button", { name: /login/i });
        const loginDropdown = getByText("Select User");

        fireEvent.click(loginDropdown);
        const user = getByText("John Doe");
        fireEvent.click(user);
        fireEvent.click(loginButton);
        expect(getByText("Office Reservations")).toBeInTheDocument();
    });
});
