import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/styles.css';  // Importing the CSS file
import { useNavigate } from 'react-router-dom';
import axios from "axios";  // Import useNavigate hook
import Cookies from 'js-cookie';  // Import js-cookie to handle cookies easily


const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Initialize useNavigate

    useEffect( () => {
        const fetchData = async (e) => {
            try {
                let token = sessionStorage.getItem('token');

                let response = await axios.get("http://localhost:3003/auth", { headers: {"Authorization" : `Bearer ${token}`} })

                let user = response.data.user;

                if (user) {
                    setUserData(user);
                } else {
                    setError('Please login first');
                }
            } catch (error) {
                setError('Please login first');
            }
        }

        fetchData();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!userData) {
        return <div className="loading">Loading...</div>;
    }

    const handleNavigateToTransactions = () => {
        navigate('/transactions');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');

        navigate('/');
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Welcome, {userData.name}!</h1>
                {/*<p className="email">Email: {user.email}</p>*/}
            </div>
            <div className="profile-info">
                <h3>User Information</h3>
                <div className="info-item">
                    <strong>Name:</strong> {userData.name}
                </div>
                <div className="info-item">
                    <strong>Email:</strong> {userData.email}
                </div>
                <div className="info-item">
                    <strong>Phone:</strong> {userData.phone}
                </div>
                <div className="info-item">
                    <strong>Balance:</strong> {userData.balance}
                </div>
            </div>
            <div className="profile-footer">
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="profile-footer">
                <button className="logout-button" onClick={handleNavigateToTransactions}>
                    Transactions
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;