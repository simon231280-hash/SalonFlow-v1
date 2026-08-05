import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/token";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
