import React from 'react';
import { Link } from 'react-router-dom';  // Optional: If you're using react-router for navigation

const Sidebar = () => {
    return (
        <div className="sidebar">
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">Contact</Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <button className="button">Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
