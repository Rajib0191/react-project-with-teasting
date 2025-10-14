import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render empty user", () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/No users/i)).toBeInTheDocument();
  });

  it("renders a list of users when users are provided", () => {
    const users: User[] = [
      { id: 1, name: "Azizul" },
      { id: 2, name: "John Doe" },
    ];

    render(<UserList users={users} />);

    // Check list items count
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    users.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
  });

  it("renders user links with correct href", () => {
    const users: User[] = [
      { id: 1, name: "Azizul" },
      { id: 2, name: "John Doe" },
    ];

    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
