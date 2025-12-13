import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./cartas/context/CartContext";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// 👇 Reemplaza con tu Public Key de Stripe
const stripePromise = loadStripe("pk_test_51Sc7SILr3RHWz2jxLmYH8lh0yYjbUGEzbS3pU5E5IaDAWmdpl8ECuZWVzOt8kr0P4fh9v0beXDXzwNOcgCKapEXg00TsqohYuj");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <CartProvider>
        <App />
      </CartProvider>
    </Elements>
  </React.StrictMode>
);
