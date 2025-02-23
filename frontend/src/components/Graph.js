import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'; // Import the chart component for line charts
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    const [transactions, setTransactions] = useState([]);  // Store transaction data
    const initBalance = 5000;
    let balances = [initBalance];
    let balancesIndex = 0;
    let dates = [];


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    const fetchTransactions = async () => {
        try {
            let token = sessionStorage.getItem('token');

            const response = await axios.get('http://localhost:3003/api/transactions', { headers: {"Authorization" : `Bearer ${token}`} });

            setTransactions(response.data.transactions);
            console.log("response data: " + response.data.transactions);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
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
        fetchTransactions();
        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    transactions.forEach((transaction) => {
        try {
            const prevBalance = balances[balancesIndex];
            dates[balancesIndex] = new Date(transaction.date);

            let amount = Number(transaction.amount)

            if (transaction && transaction.receiverEmail == userData.receiverEmail) {
                amount = Number(transaction.amount)
            } else if (transaction.senderEmail == userData.email) {
                amount = -Number(transaction.amount)
            }

            const newBalance = prevBalance + amount;

            ++balancesIndex;

            balances[balancesIndex] = newBalance;
            // acc.push({ date: transaction.date, balance: newBalance });

            // return acc;
        } catch (err) {
            console.log("error in method: " + err);
        }

    });

    dates[balancesIndex] = new Date();

    const data = {
        labels: dates.map(date => date.toLocaleDateString()), // x-axis labels
        datasets: [
            {
                label: 'Balance',
                data: balances.map(entry => entry),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Balance Over Time',
                color: 'rgb(4,5,5)',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount',
                },
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
