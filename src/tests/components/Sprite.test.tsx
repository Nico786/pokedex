import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Sprite from "@/components/Sprite";

describe("Sprite", () => {
  it("should toggle between shiny and regular sprites", () => {
    render(
      <Sprite
        regularSrc="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        shinySrc="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
        alt="Bulbasaur"
        width={100}
        showToggle={true}
      />
    );
    const img = screen.getByAltText("Bulbasaur");
    const button = screen.getByRole("button");

    expect(img).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    );

    fireEvent.click(button);

    expect(img).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
    );
  });
});
