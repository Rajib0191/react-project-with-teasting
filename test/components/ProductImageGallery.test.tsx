import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("render nothing when image urls are empty", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container.firstChild).toBeNull();
  });

  //   it("render text when image urls are empty", () => {
  //     render(<ProductImageGallery imageUrls={[]} />);
  //     expect(screen.getByText(/Hi/i)).toBeInTheDocument();
  //   });

  it("render list of image when image urls are given", () => {
    const imageUrls = [
      "https://example.com/img1.jpg",
      "https://example.com/img2.jpg",
    ];
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(imageUrls.length);

    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
  });
});
