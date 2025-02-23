import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import Header from "../components/Header.js";  // Import the CSS file

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword || !phone || !name) {
            setError('Please fill out all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        console.log('Registering with', { email, password });

        const register = async () => {
            let response = await axios.post('http://localhost:3003/api/user/register', {
                name: name,
                password: password,
                email: email,
                phone: phone,
            });

            setData(response);

            if (200 !== response.status) {
                console.log('Registration failed. Response: ' + response);
                setError(response.message);
            }

            sessionStorage.setItem('token', response.data.token);
        };

        try {
            await register();
            navigate('/profile');
        } catch (error) {
            console.log('Error is: ' + error);
            setError(error);
            navigate('/');
        }
    };

    return (
        <div className="container">
            <Header/>
            <div className="hero-section">
                <h2 className="hero-heading">Create an Account</h2><br></br>
            </div>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name</label>
                    <input
                        data-test="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                        placeholder="Enter your name"
                    />
                </div>
                <br></br>
                <div className="input-container">
                    <label>Email</label>
                    <input
                        data-test="email"
                        name="email"
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
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        placeholder="Enter your password"
                    />
                </div>
                <br></br>
                <div className="input-container">
                    <label>Confirm Password</label>
                    <input
                        data-test="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input"
                        placeholder="Confirm your password"
                    />
                </div>
                <br></br>
                <div className="input-container">
                    <label>Phone</label>
                    <input
                        data-test="phone"
                        name="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input"
                        placeholder="Enter your phone number"
                    />
                </div>
                <br></br>
                <button data-test="submit" type="submit" className="button">Register</button>
            </form>
            <div className="redirect">
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>
    );
};

export default RegisterPage;
