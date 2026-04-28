import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { token, loading } = useAuth()

    if (loading) {
        return null
    }

    if (token) {
        return <Navigate to="/" />
    }
    return (
        <>
            {children}
        </>
    );
}

export default PublicRoute