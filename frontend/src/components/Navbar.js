import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext.js';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                {!user ? (
                    <li><a href="/login">Login</a></li>
                ) : (
                    <>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><button onClick={logout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
