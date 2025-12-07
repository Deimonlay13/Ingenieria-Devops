import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
  return <div style={{ minHeight: "100vh" }}>{children}</div>;
};
