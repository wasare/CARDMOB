import React, { createContext, useState, useEffect, useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    user: { token: string } | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    getUserDataFromToken: (token: string | null) => Promise<any[]>
};
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

import { getTokenData } from "../services/authService";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Lógica do context provider.
    const [user, setUser] = useState<{ token: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<any[]>([]);

    useEffect( () => {
        const loadUser = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setUser({ token });
            }
            setLoading(false);
        };
        loadUser();
        getUserDataFromToken();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('token', token);
        setUser({token});
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUser(null);
    }
    
    const getUserDataFromToken = async () => {
        const token = await AsyncStorage.getItem('token');
        const tokenData = getTokenData(token);
        setUserData(tokenData);
    }

    return (
        <AuthContext 
            value={{ user, login, logout, loading, userData }}
        >
            {children}
        </AuthContext>
    );
};

export const useAuth = () => useContext(AuthContext);