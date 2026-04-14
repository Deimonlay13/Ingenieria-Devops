import { useState, type FC, type MouseEvent } from "react";
import type { CartaPokemon } from "../cartas/interfaces/carta-pokemon.interface";
import { useCart } from "../cartas/context/CartContext";

interface Props {
  carta: CartaPokemon;
  /** `overlay`: acciones sobre la ilustración al pasar el mouse (solo en hover de la card) */
  variant?: "inline" | "overlay";
}

export const Counter: FC<Props> = ({ carta, variant = "inline" }) => {
  const [count, setCount] = useState(0);
  const { addToCart, removeItem, cart } = useCart();
  const inCart = cart.find((i) => i.carta.id === carta.id);

  const increment = () =>
    setCount((c) => Math.min(carta.stock, c + 1));
  const decrement = () => setCount((c) => Math.max(0, c - 1));

  const handleAddToCart = () => {
    addToCart(carta, count);
    setCount(0);
  };

  const handleRemoveFromCart = () => {
    removeItem(carta.id);
  };

  const stop = (e: MouseEvent) => e.stopPropagation();

  if (variant === "overlay") {
    return (
      <div className="tcg-overlay-actions" onClick={stop}>
        <div className="tcg-overlay-actions__qty d-flex align-items-center justify-content-center gap-2">
          <button type="button" className="btn btn-sm btn-danger" onClick={decrement} aria-label="Menos">
            −
          </button>
          <span className="tcg-overlay-actions__count">{count}</span>
          <button type="button" className="btn btn-sm btn-success" onClick={increment} aria-label="Más">
            +
          </button>
        </div>
        <button type="button" className="btn btn-warning btn-sm fw-bold text-dark w-100" onClick={handleAddToCart}>
          Agregar
        </button>
        <button
          type="button"
          className="btn btn-outline-light btn-sm w-100"
          onClick={handleRemoveFromCart}
          disabled={!inCart}
        >
          Eliminar del carrito
        </button>
        {inCart ? (
          <span className="tcg-overlay-actions__hint">En carrito: {inCart.cantidad}</span>
        ) : null}
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-2 align-items-center">
      <div className="d-flex justify-content-center align-items-center gap-2">
        <button type="button" className="btn btn-sm btn-danger" onClick={decrement}>
          -
        </button>
        <span>{count}</span>
        <button type="button" className="btn btn-sm btn-success" onClick={increment}>
          +
        </button>
      </div>
      <button type="button" className="btn btn-primary btn-sm" onClick={handleAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};
