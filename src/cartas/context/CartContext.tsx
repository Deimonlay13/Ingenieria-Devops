import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CartaPokemon } from "../../cartas/interfaces/carta-pokemon.interface";

export interface CartItem {
  carta: CartaPokemon;
  cantidad: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (carta: CartaPokemon, cantidad: number) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (carta: CartaPokemon, cantidad: number) => {
    if (cantidad <= 0) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.carta.id === carta.id);
      if (existing) {
        return prev.map((i) =>
          i.carta.id === carta.id
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i
        );
      }
      return [...prev, { carta, cantidad }];
    });
  };

  const increaseItem = (id: string) => {
    setCart((prev) =>
      prev.map((i) =>
        i.carta.id === id ? { ...i, cantidad: i.cantidad + 1 } : i
      )
    );
  };

  const decreaseItem = (id: string) => {
    setCart(
      (prev) =>
        prev
          .map((i) =>
            i.carta.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
          )
          .filter((i) => i.cantidad > 0) // si llega a 0 lo eliminamos
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.carta.id !== id));
  };

  const totalItems = cart.reduce((s, item) => s + item.cantidad, 0);
  const totalAmount = cart.reduce(
    (s, item) => s + item.carta.price * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseItem,
        decreaseItem,
        removeItem,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
