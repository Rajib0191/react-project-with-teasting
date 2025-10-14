// itr
import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";
import UserAccount from "../../src/components/UserAccount";

describe("User Account Component", () => {
  it("renders user profile heading", () => {
    const user: User = { id: 1, name: "Azizul" };
    render(<UserAccount user={user} />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/user profile/i);
  });

  it("should render user name", () => {
    const user: User = { id: 2, name: "John Doe" };
    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it("shows Edit button when user is admin", () => {
    const user: User = { id: 3, name: "Admin User", isAdmin: true };
    render(<UserAccount user={user} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("does not show Edit button when user is not admin", () => {
    const user: User = { id: 4, name: "Normal User", isAdmin: false };
    render(<UserAccount user={user} />);
    const editButton = screen.queryByRole("button");
    expect(editButton).not.toBeInTheDocument();
  });
});
