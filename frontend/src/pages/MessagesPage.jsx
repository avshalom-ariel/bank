import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';
import {useNavigate} from "react-router-dom";
import Header from "../components/Header.js";
import {useSocket} from "../components/SocketProvider.js";

const MessagesPage = () => {
    const [messages, setMessages] = useState([]);  // Store transaction data
    const [isLoading, setIsLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userData, setUserData] = useState(null);
    const numOfMessagesToShow = 10;
    const url = process.env.BANK_APP_URL + '/api/user/messages';
    const { socket } = useSocket();

    const fetchMessages = async () => {
        try {
            let token = sessionStorage.getItem('token');
            if (!token) {
                setError('Please log in.');
                return;
            }
            const response = await axios.get('http://localhost:3003/api/user/messages', { headers: {"Authorization" : `Bearer ${token}`} });
            setMessages(response.data.messages);
        } catch (err) {
            setError('Failed to fetch messages');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserData = async (e) => {
        try {
            let token = sessionStorage.getItem('token');
            if (!token) {
                setError('Please log in.');
                return;
            }

            let response = await axios.get("http://localhost:3003/api/auth", { headers: {"Authorization" : `Bearer ${token}`} })

            let user = response.data.user;

            if (user) {
                setUserData(user);
            } else {
                setError('Failed to fetch user data');
            }
        } catch (error) {
            setError('Failed to fetch user data');
        }
    }

    useEffect(() => {
        fetchUserData();
        fetchMessages();

        if (socket) {
            socket.on('message', (data) => {
                console.log(data);
                setMessages((prevMessages) => [data, ...prevMessages]);
            });
        }
    }, [])


    if (isLoading) {
        return <div className="loading">Loading transactions...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const handleNavigateToProfile = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');

        navigate('/');
    };

    const getData = () => {
        return messages.slice(Math.max(currentIndex * numOfMessagesToShow, 0), Math.min(currentIndex * numOfMessagesToShow + numOfMessagesToShow, messages.length));
    }

    return (
        <div className="transaction-page">
            <Header/>
            {userData && <h1>Messages Page For {userData.name}</h1>}
            <table className="transaction-table">
                <thead>
                <tr>
                    <th>Message</th>
                </tr>
                </thead>
                <tbody>
                {getData().map((message) => (
                    <tr>
                        <td>{message}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <button className='button' onClick={() => {
                    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
                }}>prev
                </button>
                <button className='button' onClick={() => {
                    if (currentIndex * numOfMessagesToShow + numOfMessagesToShow < messages.length) setCurrentIndex(currentIndex + 1)
                }}>next
                </button>
            </div>
            <div className="profile-footer">
                <button className="button" onClick={handleLogout}>
                    Logout
                </button>
                <button className="button" onClick={handleNavigateToProfile}>
                    Profile
                </button>
            </div>
        </div>
    );
};

export default MessagesPage;
