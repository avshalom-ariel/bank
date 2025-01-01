import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';  // Import the CSS file

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
            let response = await axios.post('http://localhost:3003/user/register', {
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
        } catch (error) {
            console.log('Error is: ' + error);
            setError(error);
            navigate('/');
        }

        navigate('/profile');
    };

    return (
        <div className="register-container">
            <h2>Create an Account</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                        placeholder="Enter your name"
                    />
                </div>
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
                <div className="input-container">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input"
                        placeholder="Confirm your password"
                    />
                </div>
                <div className="input-container">
                    <label>Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input"
                        placeholder="Enter your phone number"
                    />
                </div>
                <button type="submit" className="button">Register</button>
            </form>
            <div className="redirect">
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>
    );
};

export default RegisterPage;

// const styles = {
//     container: {
//         maxWidth: '400px',
//         margin: 'auto',
//         padding: '20px',
//         backgroundColor: '#f9f9f9',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     },
//     inputContainer: {
//         marginBottom: '15px',
//     },
//     input: {
//         width: '100%',
//         padding: '10px',
//         marginTop: '5px',
//         borderRadius: '5px',
//         border: '1px solid #ccc',
//     },
//     button: {
//         width: '100%',
//         padding: '12px',
//         backgroundColor: '#007bff',
//         color: 'white',
//         border: 'none',
//         borderRadius: '5px',
//         fontSize: '16px',
//         cursor: 'pointer',
//     },
//     error: {
//         color: 'red',
//         marginBottom: '10px',
//     },
//     redirect: {
//         marginTop: '10px',
//         textAlign: 'center',
//     },
// };

// export default RegisterPage;
