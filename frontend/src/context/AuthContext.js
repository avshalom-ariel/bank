import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';  // Import js-cookie

// Create the context
const AuthContext = createContext();

// AuthProvider to manage authentication state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if the user is authenticated on mount by reading from cookies
    useEffect(() => {
        const token = Cookies.get('token');  // Get the token from cookies
        if (token) {
            // Optionally decode the token to get user info (if using JWT)
            const decodedUser = jwt_decode(token);  // You would need to install and import 'jwt-decode'
            setUser(decodedUser);
        }
    }, []);

    // Login function to set the token in cookies and update the user state
    const login = (user) => {
        Cookies.set('token', user.token, { expires: 1 });  // Set the token in cookies, expires in 1 day
        setUser(user);
    };

    // Logout function to remove the token from cookies and update the user state
    const logout = () => {
        Cookies.remove('token');  // Remove the token from cookies
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
