import { render, screen } from "@testing-library/react";
import type { CartaPokemon } from "../src/cartas/interfaces/carta-pokemon.interface";
import * as CounterModule from "../src/counter/Counter";
import { PokeList } from "../src/cartas/components/PokeList";
describe("PokeList Component", () => {
  beforeEach(() => {
    spyOn(CounterModule, "Counter").and.callFake(() => (
      <div data-testid="mock-counter">Counter</div>
    ));
  });

  const mockCartas: CartaPokemon[] = [
    {
      id: "1",
      nombre: "Pikachu",
      img: "pikachu.png",
      precio: 500,
      stock: 4
    },
    {
      id: "2",
      nombre: "Charmander",
      img: "charmander.png",
      precio: 600,
      stock: 3
    },
  ];

  it("debe renderizar todas las cartas correctamente", () => {
    render(<PokeList cartas={mockCartas} />);

    expect(screen.getByText("Descubre nuestra colección Pokémon")).toBeTruthy();

    expect(screen.getByText("Pikachu")).toBeTruthy();
    expect(screen.getByText("Charmander")).toBeTruthy();

    expect(screen.getByText("Precio: $500")).toBeTruthy();
    expect(screen.getByText("Precio: $600")).toBeTruthy();

    const counters = screen.getAllByTestId("mock-counter");
    expect(counters.length).toBe(2);
  });

  it("debe mostrar la imagen correcta para cada carta", () => {
    render(<PokeList cartas={mockCartas} />);
    const images = screen.getAllByRole("img");

    expect(images.length).toBe(2);
    expect(images[0].getAttribute("src")).toBe("pikachu.png");
    expect(images[0].getAttribute("alt")).toBe("Pikachu");
    expect(images[1].getAttribute("src")).toBe("charmander.png");
    expect(images[1].getAttribute("alt")).toBe("Charmander");
  });
});
