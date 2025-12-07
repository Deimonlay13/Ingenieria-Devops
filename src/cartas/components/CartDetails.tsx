import { useCart } from "../context/CartContext";

export const CartDetails = () => {
  const { cart, increaseItem, decreaseItem, removeItem, totalAmount } =
    useCart();

  return (
    <div>
      <h5>Tu carrito</h5>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li
              key={item.carta.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center gap-2">
                <img
                  src={item.carta.img}
                  alt={item.carta.nombre}
                  style={{ width: 48, height: 48, objectFit: "cover" }}
                />
                <div>
                  <div>{item.carta.nombre}</div>
                  <small>${item.carta.precio} c/u</small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => decreaseItem(item.carta.id)}
                >
                  -
                </button>
                <span>{item.cantidad}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => increaseItem(item.carta.id)}
                >
                  +
                </button>

                <div className="ms-3 fw-bold">
                  ${item.carta.precio * item.cantidad}
                </div>

                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => removeItem(item.carta.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="mt-3 text-end">
          <div className="fw-bold">Total: ${totalAmount}</div>
        </div>
      )}
    </div>
  );
};
