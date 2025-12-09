import {
  createContext,
  useContext,
  useEffect,
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
  clearCart: () => void;
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

  const [clientId, setClientId] = useState<string | null>(() => {
    return localStorage.getItem("clienteID");
  });

  const STORAGE_KEY = `cart_${clientId ?? "guest"}`;

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // 🔥 ESCUCHAR CAMBIOS EN localStorage (cuando cambias de usuario)
  useEffect(() => {
    const handler = () => {
      const newClientId = localStorage.getItem("clienteID");
      setClientId(newClientId);
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // 🔥 Cargar el carrito cuando cambia clientId
  useEffect(() => {
    const key = `cart_${clientId ?? "guest"}`;
    const saved = localStorage.getItem(key);
    setCart(saved ? JSON.parse(saved) : []);
  }, [clientId]);

  // 🔥 Guardar cambios del carrito
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, STORAGE_KEY]);


  const addToCart = (carta: CartaPokemon, cantidad: number): boolean => {
    if (cantidad <= 0) return false;

    let limitado = false;

    setCart((prev) => {
      const existing = prev.find((i) => i.carta.id === carta.id);

      if (existing) {
        const nuevaCantidad = existing.cantidad + cantidad;
        const maxCantidad = Math.min(nuevaCantidad, carta.stock);

        if (maxCantidad < nuevaCantidad) {
          limitado = true;
        }

        return prev.map((i) =>
          i.carta.id === carta.id ? { ...i, cantidad: maxCantidad } : i
        );
      }

      const inicial = Math.min(cantidad, carta.stock);
      if (inicial < cantidad) limitado = true;

      return [...prev, { carta, cantidad: inicial }];
    });

    if (limitado) {
      alert("Solo se agregaron las unidades disponibles en stock.");
    }

    return limitado;
  };

  const increaseItem = (id: string) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.carta.id !== id) return i;

        const stockMax = i.carta.stock;
        const nuevaCantidad = i.cantidad + 1;

        if (nuevaCantidad > stockMax) {
          alert("Solo se pudo agregar hasta el máximo disponible en stock.");
          return i;
        }

        return { ...i, cantidad: nuevaCantidad };
      })
    );
  };

  const decreaseItem = (id: string) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.carta.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
        )
        .filter((i) => i.cantidad > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.carta.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((s, item) => s + item.cantidad, 0);
  const totalAmount = cart.reduce(
    (s, item) => s + item.carta.precio * item.cantidad,
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
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
