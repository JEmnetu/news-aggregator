import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types/User'
import { loginUser, registerUser, getMe, getBookmarks } from '../services/api';
import { Bookmark } from '../types/Bookmark';

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    currentUser: User | null;
    bookmarks: Bookmark[];
    fetchBookmarks: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);


    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            setToken(savedToken)
            getUserInfo()
            fetchBookmarks()
        }
        setLoading(false)
    }, [])
    //logic
    const login = async (email: string, password: string) => {
        const response = await loginUser(email, password)
        localStorage.setItem('token', response.access_token)
        setToken(response.access_token)
        await getUserInfo()
        await fetchBookmarks()
    }

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        const response = await registerUser(email, password, firstName, lastName)
        await login(email, password);
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    const getUserInfo = async () => {
        const response = await getMe()
        setCurrentUser(response);
    }

    const fetchBookmarks = async () => {
        const response = await getBookmarks();
        setBookmarks(response.data)
    }

    return (
        <AuthContext.Provider value={{
            token,
            isAuthenticated: !!token,
            loading,
            currentUser,
            bookmarks,
            fetchBookmarks,
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