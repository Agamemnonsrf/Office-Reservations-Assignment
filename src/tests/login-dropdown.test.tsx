import { render } from "@testing-library/react";
import LoginDropdown from "../components/employee/login-dropdown";
import { users as mockUsers } from "../mocks/data";

describe(LoginDropdown, () => {
    it("should render the login dropdown", () => {
        const { getByText } = render(
            <LoginDropdown user={null} setUser={jest.fn()} users={mockUsers} />
        );
        expect(getByText("Select User").innerHTML).toEqual("Select User");
    });
});
