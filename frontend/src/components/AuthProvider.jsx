import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
            setUser({ token, userName: user.userName, userId: user.userId });
        }
        setLoading(false);
    }, []);

    const login = (token, userName, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({userName, userId}));
        setUser({ token, userName, userId });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;