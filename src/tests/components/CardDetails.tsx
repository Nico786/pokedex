import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CardDetails from "@/components/CardDetails";

describe("CardDetails", () => {
  it("should render the modal with the correct Pokemon details", () => {
    const onHide = vi.fn();
    render(
      <CardDetails
        show
        onHide={onHide}
        pokemon={{
          pokedex_id: 1,
          name: {
            fr: "Bulbizarre",
          },
          height: "67 cm",
          weight: "6 kg",
          sprites: {
            regular:
              "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/1/regular.png",
            shiny:
              "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/1/shiny.png",
          },
          types: [
            {
              name: "plante",
              image:
                "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/grass.png",
            },
            {
              name: "poison",
              image:
                "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/poison.png",
            },
          ],
          stats: {
            atk: 49,
            def: 49,
            vit: 45,
          },
        }}
      />
    );

    expect(screen.getByText("Bulbizarre")).toBeInTheDocument();
    expect(screen.getByText("Taille: 67 cm")).toBeInTheDocument();
    expect(screen.getByText("Poids: 6kg")).toBeInTheDocument();
    expect(
      screen.getByText("Abilities: overgrow, chlorophyll")
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/1/regular.png"
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(onHide).toHaveBeenCalled();
  });
});
