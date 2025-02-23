import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';
import {useNavigate} from "react-router-dom";
import Graph from '../components/Graph.js';
import Header from "../components/Header.js";

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userData, setUserData] = useState(null);
    const numOfTransactionsToShow = 10;

    const fetchTransactions = async () => {
        try {
            let token = sessionStorage.getItem('token');
            const response = await axios.get('http://localhost:3003/api/transactions', { headers: {"Authorization" : `Bearer ${token}`} });
            setTransactions(response.data.transactions);
        } catch (err) {
            setError('Failed to fetch transactions');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserData = async (e) => {
        try {
            let token = sessionStorage.getItem('token');

            let response = await axios.get("http://localhost:3003/api/auth", { headers: {"Authorization" : `Bearer ${token}`} })

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

            if (transactionData.receiverEmail === userData.email) return;

            const response = await axios.post('http://localhost:3003/api/transactions', {
                receiverEmail: transactionData.receiverEmail,
                amount: transactionData.amount,
            }, {headers: {"Authorization" : `Bearer ${token}`}});

            if (response.status < 300 && response.status >= 200) {

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
            setIsSubmitting(false);
        }
    };

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

    const getData = () => {
        return transactions.slice(Math.max(currentIndex * numOfTransactionsToShow, 0), Math.min(currentIndex * numOfTransactionsToShow + numOfTransactionsToShow, transactions.length));
    }

    return (
        <div className="transaction-page">
            <Header/>
            <h1>Transaction Page For {userData.name}</h1>
      
            <h1>
                Current balance: <span style={{color: 'green'}}>{userData.balance}</span>
            </h1>

            <form onSubmit={handleSubmitTransaction} className="transaction-form">
                <label>
                    Receiver email:
                    <input
                        data-test="receiverMail"
                        type="text"
                        name="receiverEmail"
                        className="input"
                        value={transactionData.receiverEmail}
                        onChange={handleInputChange}
                        required
                    />
                </label><br></br><br></br>
                <label>
                    Amount:
                    <input
                        data-test="amount"
                        type="number"
                        name="amount"
                        className="input"
                        value={transactionData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br></br><br></br>
                <button data-test="submit" type="submit" className="button" disabled={isSubmitting}>Send Transaction
                </button>
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
                {getData().map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction._id}</td>
                        {transaction.senderEmail === userData.email && (
                            <td className='minus'>-{transaction.amount}</td>)}
                        {transaction.receiverEmail === userData.email && (
                            <td className='plus'>{transaction.amount}</td>)}
                        <td>{transaction.senderEmail}</td>
                        <td>{transaction.receiverEmail}</td>
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
                    if (currentIndex * numOfTransactionsToShow + numOfTransactionsToShow < transactions.length) setCurrentIndex(currentIndex + 1)
                }}>next
                </button>
            </div>
            <div>
                <br></br>
                <h1>Balance graph</h1>
            </div>
            <div className="container">
                <Graph/>
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

export default TransactionPage;
