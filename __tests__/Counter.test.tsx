import { render, screen, fireEvent } from "@testing-library/react";
import * as CartContext from "../src/cartas/context/CartContext";
import type { CartaPokemon } from "../src/cartas/interfaces/carta-pokemon.interface";
import { Counter } from "../src/counter/Counter";

interface CartItem {
  carta: CartaPokemon;
  cantidad: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (carta: CartaPokemon, cantidad: number) => void;
  increaseItem: () => void;
  decreaseItem: () => void;
  removeItem: () => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

describe("Counter Component", () => {
  const mockCarta: CartaPokemon = {
    id: "1",
    nombre: "Pikachu",
    img: "pikachu.png",
    precio: 2000,
    stock: 100,
  };

  let addToCartSpy: jasmine.Spy<
    (carta: CartaPokemon, cantidad: number) => void
  >;

  beforeEach(() => {
    addToCartSpy = jasmine.createSpy("addToCart");

    const mockCartContext: CartContextType = {
      cart: [],
      addToCart: addToCartSpy,
      increaseItem: () => {},
      decreaseItem: () => {},
      removeItem: () => {},
      clearCart: () => {},
      totalItems: 0,
      totalAmount: 0,
    };

    spyOn(CartContext, "useCart").and.returnValue(mockCartContext);
  });

  it("debe renderizar el contador con valor inicial 0", () => {
    render(<Counter carta={mockCarta} />);
    expect(screen.getByText("0")).toBeTruthy();
  });

  it("incrementa el contador al hacer clic en +", () => {
    render(<Counter carta={mockCarta} />);
    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("1")).toBeTruthy();
  });

  it("no permite que el contador baje de 0", () => {
    render(<Counter carta={mockCarta} />);
    fireEvent.click(screen.getByText("-"));
    expect(screen.getByText("0")).toBeTruthy();
  });

  it("llama a addToCart con los parámetros correctos y resetea el contador", () => {
    render(<Counter carta={mockCarta} />);
    const btnPlus = screen.getByText("+");
    const btnAdd = screen.getByText("Agregar al carrito");

    fireEvent.click(btnPlus);
    fireEvent.click(btnPlus);
    fireEvent.click(btnAdd);

    expect(addToCartSpy).toHaveBeenCalledWith(mockCarta, 2);
    expect(screen.getByText("0")).toBeTruthy();
  });
});
