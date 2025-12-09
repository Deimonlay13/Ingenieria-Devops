import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useCart } from "../cartas/context/CartContext";
import { guardarVenta } from "../api/compras";
import { useNavigate } from "react-router-dom";


const Pago: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { totalAmount, clearCart, cart } = useCart();
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");


    const navigate = useNavigate();
    
    const handlePayment = async () => {
        if (!stripe || !elements) return;
        setLoading(true);

        try {
        const { data } = await axios.post("http://localhost:8080/pago/crear-intent", {
            monto: totalAmount * 100,
        });

        const resultado = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
            card: elements.getElement(CardElement)!,
            },
        });

        if (resultado.error) {
            setMensaje("Error en el pago. Revisa los datos.");
            setLoading(false);
            return;
        }

       if (resultado.paymentIntent?.status === "succeeded") {
         setMensaje("¡Pago realizado con éxito!");
         try {
           await guardarVenta(
             cart.map((item) => ({
               ...item,
               carta: { ...item.carta, id: Number(item.carta.id) },
             })),
             totalAmount
           );
           clearCart();
            setTimeout(() => {
              navigate("/compras");
            }, 1500);
         } catch (error) {
           setMensaje("Pago realizado, pero no se pudo guardar la venta.");
           console.error(error);
         }
       }
        } catch (error) {
        console.error(error);
        setMensaje("No se pudo procesar el pago.");
        }

        setLoading(false);
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4 fw-bold">💳 Finalizar Pago</h2>

        <div className="card shadow p-4 border-0">
            <p className="fs-5">
            Total a pagar: <strong>${totalAmount}</strong>
            </p>

            <label className="mb-2 fw-semibold">Datos de la tarjeta:</label>

            <div className="border rounded p-3 mb-3 bg-light">
            <CardElement
                options={{
                style: {
                    base: {
                    fontSize: "16px",
                    color: "#212529",
                    "::placeholder": { color: "#6c757d" },
                    },
                    invalid: {
                    color: "#e63946",
                    },
                },
                }}
            />
            </div>

            <button
            className="btn btn-success w-100 py-2"
            onClick={handlePayment}
            disabled={!stripe || loading}
            >
            {loading ? "Procesando..." : "Pagar ahora"}
            </button>

            {mensaje && (
            <div className="alert alert-info text-center mt-3 mb-0">
                {mensaje}
            </div>
            )}
        </div>

        {/* 🟦 INFO PARA PRUEBAS STRIPE */}
        <div className="alert alert-secondary text-center mt-4">
            <h6 className="fw-bold">🔹 Datos de tarjeta de prueba Stripe</h6>
            <p className="mb-1"><strong>Número:</strong> 4242 4242 4242 4242</p>
            <p className="mb-1"><strong>Fecha:</strong> 12 / 34</p>
            <p className="mb-1"><strong>CVC:</strong> 123</p>
            <p className="small text-muted">
            Solo para pruebas — No es una tarjeta real.
            </p>
        </div>
        </div>
    );
};

export default Pago;

