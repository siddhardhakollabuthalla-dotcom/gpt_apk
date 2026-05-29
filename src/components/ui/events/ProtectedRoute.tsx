import { Navigate } from "@tanstack/react-router";
import { auth } from "@/firebase/firebase";

const ProtectedRoute = ({ children }: any) => {
  return auth.currentUser ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;