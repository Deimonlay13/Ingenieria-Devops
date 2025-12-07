import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { PokeContainer } from "../cartas/components/PokeContainer";
import Bienvenida from "../bienvenida/components/Bienvenida";
import { Formulario } from "../formulario/components/Formulario";
import { Noticias } from "../noticias/component/Noticias";
import { AuthLayout } from "../layout/AuthLayout";
import { Login } from "../login/Login";
import { Registro } from "../login/Registro";

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
      { path: "/cartas", element: <PokeContainer /> },
      { path: "/", element: <Bienvenida /> },
      { path: "/contacto", element: <Formulario /> },
      { path: "/noticias", element: <Noticias /> },
      { path: "/noticias", element: <Noticias /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
