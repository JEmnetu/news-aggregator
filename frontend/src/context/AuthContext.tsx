import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types/User'
import { loginUser, registerUser } from '../services/api';

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])
    //logic
    const login = async (email: string, password: string) => {
        const response = await loginUser(email, password)
        localStorage.setItem('token', response.access_token)
        setToken(response.access_token)
    }

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        const response = await registerUser(email, password, firstName, lastName)
        await login(email, password);
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{
            token,
            isAuthenticated: !!token,
            login,
            logout,
            register,

        }}>
            {children}
        </AuthContext.Provider >
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}