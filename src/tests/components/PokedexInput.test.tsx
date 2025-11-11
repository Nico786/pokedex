import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PokedexInput from "@/components/PokedexInput";

describe("PokedexInput", () => {
  it("should render the input field with the correct placeholder", () => {
    render(
      <PokedexInput
        onSubmit={() => {}}
        placeholder="Rechercher un Pokémon..."
        buttonText="GO"
      />
    );
    const input = screen.getByPlaceholderText("Rechercher un Pokémon...");
    expect(input).toBeInTheDocument();
  });

  it("should update the value when typing", () => {
    render(
      <PokedexInput
        onSubmit={() => {}}
        placeholder="Rechercher un Pokémon..."
        buttonText="GO"
      />
    );
    const input = screen.getByPlaceholderText("Rechercher un Pokémon...");
    fireEvent.change(input, { target: { value: "Mewtwo" } });
    expect(input).toHaveValue("Mewtwo");
  });

  it("should call the onSubmit function when submitting the form", () => {
    const mockOnSubmit = vi.fn();
    render(
      <PokedexInput
        onSubmit={mockOnSubmit}
        placeholder="Rechercher un Pokémon..."
        buttonText="GO"
      />
    );

    const input = screen.getByPlaceholderText("Rechercher un Pokémon...");
    fireEvent.change(input, { target: { value: "Mewtwo" } });

    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(mockOnSubmit).toHaveBeenCalledWith("Mewtwo");
  });

  it("should not call the onSubmit function when submitting the form with an empty input", () => {
    const mockOnSubmit = vi.fn();
    render(
      <PokedexInput
        onSubmit={mockOnSubmit}
        placeholder="Rechercher un Pokémon..."
        buttonText="GO"
      />
    );

    const input = screen.getByPlaceholderText("Rechercher un Pokémon...");
    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should clear the input after successful submission", () => {
    const mockOnSubmit = vi.fn();
    render(
      <PokedexInput
        onSubmit={mockOnSubmit}
        placeholder="Rechercher un Pokémon..."
        buttonText="GO"
      />
    );

    const input = screen.getByPlaceholderText(
      "Rechercher un Pokémon..."
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Mewtwo" } });

    const form = input.closest("form");
    fireEvent.submit(form!);

    expect(input.value).toBe("");
  });
});
