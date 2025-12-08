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
      { path: "comprar", element: <Formulario /> },
      { path: "noticias", element: <Noticias /> },
      { path: "perfil", element: <Perfil /> },
      { path: "compras", element: <MisCompras /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
