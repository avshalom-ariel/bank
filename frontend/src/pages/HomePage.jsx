import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the CSS file
import Header from '../components/Header'; // Import the Header component
const logo2 = require('../assets/images/cropped_image.png');

const HomePage = () => {
    return (
        <div className="container">
            <Header/>
            <div className="hero-section">
                <h1 className="hero-heading">Welcome to Avshi's Bank</h1>
                <h2 className="hero-subheading">Your trusted partner for financial services</h2>
            </div>
            <div className="logo-container">
                <img src={logo2} alt="Avshi's Bank Logo" className="logo"/>
            </div>

            {/* Call-to-Action Buttons */}
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
