import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import Header from "../components/Header.js";
import { useSocket } from "../components/SocketProvider.js";

axios.defaults.withCredentials = true;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { socket } = useSocket(); // Access socket from context


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3003/api/user/login', {
                email: email,
                password: password
            });


            if (response.status !== 200) {
                setError('Failed, please try again.');
            } else {
                if (socket) {
                    socket.emit('connectUser', email);  // Send userId to server
                    console.log('Socket emmited due to: ' + socket);
                } else {
                    console.log('Socket was not emitted');
                }


                sessionStorage.setItem('token', response.data.token);
                navigate('/profile');
            }
        } catch (err) {
            // setError(err.message || 'An error occurred');
            setError('Failed, please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <Header/>
            <div className="hero-section">
                <h2 className="hero-heading">Login to Your Account</h2><br></br>
            </div>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email</label>
                    <input
                        data-test="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        placeholder="Enter your email"
                    />
                </div>
                <br></br>
                <div className="input-container">
                    <label>Password</label>
                    <input
                        data-test="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        placeholder="Enter your password"
                    />
                </div>
                <br></br>

                <button data-test="submit" type="submit" className="button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="redirect">
                <p>Don't have an account? <a href="/register">Register here</a></p>
            </div>
        </div>
    );
};

export default LoginPage;