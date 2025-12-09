import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useCart } from "../cartas/context/CartContext";

const Pago: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { totalAmount, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");

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
                clearCart();
            }
        } catch (error) {
            console.error(error);
            setMensaje("No se pudo procesar el pago.");
        }

        setLoading(false);
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div
                className="card p-4 shadow"
                style={{
                    maxWidth: "500px",
                    width: "100%",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                }}
            >
                <h2 className="text-center mb-4 fw-bold">💳 Finalizar Pago</h2>

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
        </div>
    );
};

export default Pago;
