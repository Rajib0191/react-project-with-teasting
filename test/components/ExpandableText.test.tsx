import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const shortText = "Short text content.";
  const longText = "A".repeat(300);

  it("should render full text without button when text length is within limit", () => {
    render(<ExpandableText text={shortText} />);

    expect(screen.getByText(shortText)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders truncated text with 'Show More' button for long text", () => {
    render(<ExpandableText text={longText} />);

    const truncated = longText.substring(0, limit);
    expect(screen.getByText(new RegExp(`${truncated}...`))).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /show more/i })
    ).toBeInTheDocument();
  });

  it("expands and collapses text when button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    // Initially truncated
    const button = screen.getByRole("button", { name: /show more/i });
    expect(button).toBeInTheDocument();
    expect(screen.queryByText(longText)).not.toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(button);
    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/show less/i);

    await user.click(button);
    expect(screen.queryByText(longText)).not.toBeInTheDocument();
    expect(button).toHaveTextContent(/show more/i);
  });
});
