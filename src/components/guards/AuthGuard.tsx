import { Outlet, Navigate } from "react-router";
import { useAuth } from "../../context/auth.context";

export default function AuthGuard() {
    const { user } = useAuth();

    if(user.id) {
        return <Outlet />;
    }
    return <Navigate to="/login" />;
}