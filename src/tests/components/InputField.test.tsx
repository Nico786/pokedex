import { describe, it, expect, vi } from "vitest";
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
    fireEvent.change(input, { target: { value: "Mewtwo" } });
    expect(input).toHaveValue("Mewtwo");
  });

  it("should call the onSearch function when submitting the form", () => {
    const mockOnSearch = vi.fn();
    render(<InputField onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Entrez le nom du Pokemon");
    fireEvent.change(input, { target: { value: "Mewtwo" } });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith("Mewtwo");
  });

  it("should not call the onSearch function when submitting the form with an empty input", () => {
    const mockOnSearch = vi.fn();
    render(<InputField onSearch={mockOnSearch} />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
