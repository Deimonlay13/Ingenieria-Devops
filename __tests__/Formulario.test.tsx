import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../src/cartas/context/CartContext";
import { Formulario } from "../src/formulario/components/Formulario";

describe("Formulario Component", () => {
  beforeEach(async () => {
    // Mock de Fetch para la carga inicial de dirección y el guardado
    spyOn(window, "fetch").and.callFake((url) => {
      if (url.toString().includes("direccion/usuario")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              calle: "Palma",
              numero: "123",
              region: "Metropolitana",
              comuna: "Santiago",
            }),
        } as Response);
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response);
    });

    // Mock de LocalStorage
    storageMock();
    localStorage.setItem("clienteID", "123");

    await act(async () => {
      render(
        <MemoryRouter>
          <CartProvider>
            <Formulario />
          </CartProvider>
        </MemoryRouter>
      );
    });
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("renderiza el título y los campos básicos", () => {
    expect(
      screen.getByText(/Completa tus datos para procesar tu compra/i)
    ).toBeTruthy();
    expect(screen.getByPlaceholderText("correo@ejemplo.com")).toBeTruthy();
    expect(screen.getByPlaceholderText("Nombre...")).toBeTruthy();
  });

  it("marca el campo de correo como inválido si el formato es incorrecto", async () => {
    const correoInput = screen.getByPlaceholderText(
      "correo@ejemplo.com"
    ) as HTMLInputElement;
    const submitBtn = screen.getByRole("button", {
      name: /continuar con el pago/i,
    });

    await act(async () => {
      fireEvent.change(correoInput, { target: { value: "correoSinArroba" } });
      fireEvent.click(submitBtn);
    });

    // En Bootstrap/React-Bootstrap la validación añade clases al input
    expect(correoInput.checkValidity()).toBeFalse();
  });

  it("muestra mensaje de éxito al enviar formulario válido", async () => {
    // Rellenar campos obligatorios
    fireEvent.change(screen.getByPlaceholderText("correo@ejemplo.com"), {
      target: { value: "ash@pokemon.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nombre..."), {
      target: { value: "Ash" },
    });
    fireEvent.change(screen.getByPlaceholderText("Apellidos..."), {
      target: { value: "Ketchum" },
    });
    fireEvent.change(screen.getByPlaceholderText("11.222.333-4"), {
      target: { value: "11.222.333-4" },
    });
    fireEvent.change(screen.getByPlaceholderText("Calle / Avenida..."), {
      target: { value: "Palma" },
    });
    fireEvent.change(screen.getByPlaceholderText("Número..."), {
      target: { value: "123" },
    });

    // Simular el check de términos y condiciones
    const check = screen.getByRole("checkbox");
    fireEvent.click(check);

    const submitBtn = screen.getByRole("button", {
      name: /continuar con el pago/i,
    });

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    // Esperar a que aparezca la alerta (maneja el setTimeout de 1200ms)
    await waitFor(
      () => {
        const alert = screen.getByText(/Datos ingresados correctamente/i);
        expect(alert).toBeTruthy();
      },
      { timeout: 2000 }
    );
  });

  it("muestra un modal de éxito cuando se guarda la dirección", async () => {
    const saveBtn = screen.getByRole("button", { name: /guardar dirección/i });

    await act(async () => {
      fireEvent.click(saveBtn);
    });

    // Verificamos que aparezca el Modal por su contenido, no por el espía de la función
    await waitFor(() => {
      expect(
        screen.getByText(/La dirección se ha guardado correctamente/i)
      ).toBeTruthy();
    });
  });
});

// Ayudante para mockear localStorage si no existe en el entorno de Karma
function storageMock() {
  let storage: { [key: string]: string } = {};
  spyOn(localStorage, "getItem").and.callFake((key) => storage[key] || null);
  spyOn(localStorage, "setItem").and.callFake((key, value) => {
    storage[key] = value;
  });
  spyOn(localStorage, "clear").and.callFake(() => {
    storage = {};
  });
}
