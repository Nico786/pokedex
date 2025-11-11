import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CardDetails from "@/components/CardDetails";

// Create a mock Apollo Client for testing
const mockClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

describe("CardDetails", () => {
  it("should render the modal with the correct Pokemon details", () => {
    const onHide = vi.fn();
    render(
      <ApolloProvider client={mockClient}>
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
      </ApolloProvider>
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
