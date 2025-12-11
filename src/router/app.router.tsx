import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { PokeContainer } from "../cartas/components/PokeContainer";
import Bienvenida from "../bienvenida/components/Bienvenida";
import { Formulario } from "../formulario/components/Formulario";
import { Noticias } from "../noticias/component/Noticias";
import { AuthLayout } from "../layout/AuthLayout";
import { Login } from "../login/Login";
import { Registro } from "../login/Registro";
import Perfil from "../usuario/components/Perfil";
import MisCompras from "../compras/compras";
import Pago from "../compras/Pago";
import PrivateRoute from "./privateRoute";

export const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/registro",
    element: (
      <AuthLayout>
        <Registro />
      </AuthLayout>
    ),
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "cartas", element: <PokeContainer /> },
      { path: "", element: <Bienvenida /> },
      {
        path: "comprar",
        element: (
          <PrivateRoute>
            <Formulario />
          </PrivateRoute>
        ),
      },
      {
        path: "pago",
        element: (
          <PrivateRoute>
            <Pago />
          </PrivateRoute>
        ),
      },
      { path: "noticias", element: <Noticias /> },
      {
        path: "perfil",
        element: (
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        ),
      },
      {
        path: "compras",
        element: (
          <PrivateRoute>
            <MisCompras />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
