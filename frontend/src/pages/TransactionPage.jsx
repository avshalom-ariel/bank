import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";  // Assuming you have an external CSS file for styling

const TransactionPage = () => {
    const [transactions, setTransactions] = useState([]);  // Store transaction data
    const [isLoading, setIsLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const [transactionData, setTransactionData] = useState({
        senderUser: '',
        receiverEmail: '',
        amount: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    // let token = sessionStorage.getItem('token');
    const fetchTransactions = async () => {
        try {
            let token = sessionStorage.getItem('token');

            const response = await axios.get('http://localhost:3003/transactions', { headers: {"Authorization" : `Bearer ${token}`} });
            setTransactions(response.data.transactions);
            console.log("response data: " + response.data.transactions);
        } catch (err) {
            setError('Failed to fetch transactions');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserData = async (e) => {
        try {
            let token = sessionStorage.getItem('token');

            let response = await axios.get("http://localhost:3003/auth", { headers: {"Authorization" : `Bearer ${token}`} })

            let user = response.data.user;

            if (user) {
                setUserData(user);
            } else {
                setError('Failed to fetch user data');
            }
        } catch (error) {
            setError('also Failed to fetch user data');
        }
    }

    useEffect(() => {
        fetchUserData();
        fetchTransactions();
    }, []);

    if (isLoading) {
        return <div className="loading">Loading transactions...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const handleSubmitTransaction = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let token = sessionStorage.getItem('token');
            console.log("token is: " + token);
            const response = await axios.post('http://localhost:3003/transactions', {
                // senderUser: user, //transactionData.senderUser,
                receiverEmail: transactionData.receiverEmail,
                amount: transactionData.amount,
            }, {headers: {"Authorization" : `Bearer ${token}`}});
            console.log("response is: " + response);

            if (response.status < 300 && response.status >= 200) {
                // setTransactions([...transactions, response.data.transaction]);

                console.log(response.data.transaction);
                setTransactions((prevTransactions) => [
                    ...prevTransactions,
                    response.data.transaction
                ]);

                setTransactionData({
                    receiverEmail: '',
                    amount: '',
                });

            } else {
                setError('Failed to send transaction\nStatus: ' + response.status);
            }
        } catch (err) {
            setError('also Failed to send transaction');
        } finally {
            setIsSubmitting(false);  // Re-enable the button
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransactionData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNavigateToProfile = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');

        navigate('/');
    };

    return (
        <div className="transaction-page">
            <h1>Transaction Page For {userData.name}</h1>

            <form onSubmit={handleSubmitTransaction} className="transaction-form">
                <label>
                    Receiver email:
                    <input
                        type="text"
                        name="receiverEmail"
                        value={transactionData.receiverEmail}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={transactionData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit" disabled={isSubmitting}>Send Transaction</button>
            </form>

            <table className="transaction-table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction._id}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.senderEmail}</td>
                        <td>{transaction.receiverEmail}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="profile-footer">
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="profile-footer">
                <button className="logout-button" onClick={handleNavigateToProfile}>
                    Profile
                </button>
            </div>
        </div>
    );
};

export default TransactionPage;
