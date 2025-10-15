import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  it("should renders heading and terms text", () => {
    render(<TermsAndConditions />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Terms & Conditions/i);

    expect(
      screen.getByText(/Lorem ipsum dolor, sit amet consectetur/i)
    ).toBeInTheDocument();
  });

  it("submit button should be disabled initially", () => {
    render(<TermsAndConditions />);

    const button = screen.getByRole("button", { name: /Submit/i });
    expect(button).toBeDisabled();
  });

  it("checkbox should uncheck initially", () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("enables and disables button on checkbox toggle", async () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox", {
      name: /I accept the terms and conditions./i,
    });

    const button = screen.getByRole("button", { name: /submit/i });

    const user = userEvent.setup();

    await user.click(checkbox);
    expect(button).toBeEnabled();

    await user.click(checkbox);
    expect(button).toBeDisabled();
  });
});
