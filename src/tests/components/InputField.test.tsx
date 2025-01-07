import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "@/components/InputField";

describe("InputField", () => {
  it("should render the input field with the correct placeholder", () => {
    render(<InputField onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("Entrez le nom du Pokemon");
    expect(input).toBeInTheDocument();
  });

  it("should update the value when typing", () => {
    render(<InputField onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("Entrez le nom du Pokemon");
    fireEvent.change(input, { target: { value: "Hello, World!" } });
    expect(input).toHaveValue("Hello, World!");
  });
});
