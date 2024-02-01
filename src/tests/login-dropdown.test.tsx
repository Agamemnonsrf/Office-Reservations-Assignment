import { render, fireEvent, act } from "@testing-library/react";
import LoginDropdown from "../components/employee/login-dropdown";
import { users as mockUsers } from "../mocks/data";
import "@testing-library/jest-dom";

describe(LoginDropdown, () => {
    it("should render the login dropdown", () => {
        const { getByText } = render(
            <LoginDropdown user={null} setUser={jest.fn()} users={mockUsers} />
        );
        expect(getByText("Select User")).toBeInTheDocument();
    });

    it("should open on click", async () => {
        const { getByText } = render(
            <LoginDropdown user={null} setUser={jest.fn()} users={mockUsers} />
        );
        const loginDropdown = getByText("Select User");
        await act(async () => {
            fireEvent.click(loginDropdown);
        });
        expect(getByText("John Doe")).toBeInTheDocument();
    });
});
