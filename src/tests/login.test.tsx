import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginScreen from "../routes/login";

describe(LoginScreen, () => {
    it("should render the login screen", () => {
        const { getByText } = render(<LoginScreen />);
        expect(getByText("Login").innerHTML).toEqual("Login");
        expect(getByText("Reset DB").innerHTML).toEqual("Reset DB");
    });

    it("should enable the login button when a user is selected", () => {
        const { getByRole, getByText } = render(<LoginScreen />);
        const loginButton = getByRole("button", { name: /login/i });

        // Check that the "Login" button is initially disabled
        expect(loginButton).toBeDisabled();

        // Get the "LoginDropdown" component and simulate a user selection
        const loginDropdown = getByText("Select User");
        fireEvent.click(loginDropdown);
        const user = getByText("John Doe");
        fireEvent.click(user);
        // Check that the "Login" button is now enabled
        expect(loginButton).toBeEnabled();
    });
});
