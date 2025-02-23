// src/pages/VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
    const [message, setMessage] = useState('');
    const { search } = useLocation();
    const url = 'http://localhost:3003/api/auth/verify-email';
    const token = new URLSearchParams(search).get('token');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(url, {
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
