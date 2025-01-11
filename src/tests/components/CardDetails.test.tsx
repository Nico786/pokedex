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

    expect(screen.getByAltText("Bulbizarre")).toBeInTheDocument();
    expect(screen.getByText("N°1: Bulbizarre")).toBeInTheDocument();
    expect(screen.getByText("67 cm")).toBeInTheDocument();
    expect(screen.getByText("6 kg")).toBeInTheDocument();

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);

    expect(onHide).toHaveBeenCalled();
  });
});
