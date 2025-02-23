// src/pages/VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
    const [message, setMessage] = useState('');
    const { search } = useLocation(); // To get the query params (token)
    const token = new URLSearchParams(search).get('token');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch('http://localhost:3003/api/auth/verify-email', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setMessage(data.msg);
            } catch (error) {
                setMessage('Error verifying email.');
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [token]);

    return <div>{message}</div>;
};

export default VerifyEmail;
