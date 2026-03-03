import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadAuth = async () => {
            const authData = await AsyncStorage.getItem("authData");
            if (authData) {
                const { token, role } = JSON.parse(authData);
                setToken(token);
                setRole(role);
                setUser(user)
            } else {
                setToken(null);
                setRole(null);
                setUser(null);
            }
            setLoading(false);
        };
        loadAuth();
    }, [])

    const signIn = async ({ token, role,user }) => {
        if (!token || !role) return;
        await AsyncStorage.setItem("authData", JSON.stringify({ token, role }));
        setToken(token);
        setRole(role);
        setUser(user);

        
    };

    const signOut = async () => {
        await AsyncStorage.removeItem("authData");
        setToken(null);
        setRole(null);
        setUser(null)
    };

    return (
        <AuthContext.Provider
            value={{ token, role,user, loading, setLoading, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);