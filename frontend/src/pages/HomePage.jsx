import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the CSS file
import Header from '../components/Header'; // Import the Header component

const HomePage = () => {
    return (
        <div className="container">
            <Header />
            <div className="hero-section">
                <h1 className="heading">Welcome to Avshi's Bank</h1>
                <p className="subheading">Your trusted partner for financial services</p>
            </div><br></br>

            <div className="cta-buttons">
                <Link to="/login" className="cta-link">
                    <button className="cta-button primary">Login</button>
                </Link>
                <Link to="/register" className="cta-link">
                    <button className="cta-button secondary">Register</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
