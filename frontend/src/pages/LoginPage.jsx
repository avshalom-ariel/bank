import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

axios.defaults.withCredentials = true;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            const response = await axios.post('http://localhost:3003/user/login', {
                email: email,
                password: password
            });

            if (response.status !== 200) {
                throw new Error('Login failed, please try again.');
            }

            sessionStorage.setItem('token', response.data.token);
            navigate('/profile');
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Your Account</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="button" disabled={isLoading}>
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