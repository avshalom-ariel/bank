import React from 'react';
import Header from "../components/Header.js";

const AboutPage = () => {
    return (
        <div className="container">
            <Header />

            <header className="about-header">
                <h1>About Us</h1>
            </header>

            <section className="about-content">
                <p>
                    Welcome to <strong>Avshi's Bank</strong>, your trusted financial partner. We are dedicated to providing innovative and secure banking services that empower individuals and businesses to manage their financial needs with ease and confidence.
                </p>

                <p>
                    At <strong>Avshi's Bank</strong>, we believe that everyone deserves access to simple, convenient, and transparent banking solutions. Whether you're looking to save, invest, borrow, or manage your daily finances, we offer a wide range of services tailored to meet your needs. Our platform is designed with user experience in mind, providing you with a seamless, intuitive way to handle your money anytime, anywhere.
                </p>

                <h2>Our Mission</h2>
                <p>
                    Our mission is to revolutionize the way people interact with their finances. We aim to make banking more accessible, more efficient, and more secure. Through continuous innovation, we strive to provide our customers with cutting-edge financial tools and services that help them achieve their goals.
                </p>

                <h2>Why Choose Us?</h2>
                <ul>
                    <li><strong>Security:</strong> Your security is our top priority. We use state-of-the-art encryption and authentication methods to ensure your data and transactions are always protected.</li>
                    <li><strong>User-Friendly Interface:</strong> Our app is designed for ease of use, allowing you to manage your finances with just a few taps.</li>
                    <li><strong>24/7 Customer Support:</strong> Have a question or need assistance? Our support team is available around the clock to help you with anything you need.</li>
                    <li><strong>Wide Range of Services:</strong> From personal checking and savings accounts to loans, investments, and credit cards, we offer everything you need to manage your financial future.</li>
                </ul>

                <h2>Our Values</h2>
                <ul>
                    <li><strong>Trust:</strong> We build strong, lasting relationships with our customers based on transparency and integrity.</li>
                    <li><strong>Innovation:</strong> We are committed to using the latest technology to create solutions that make banking easier and more efficient.</li>
                    <li><strong>Customer-Centric:</strong> Everything we do is focused on helping our customers succeed financially.</li>
                </ul>

                <p>
                    Join <strong>Avshi's Bank</strong> today and experience a smarter way to bank!
                </p>
            </section>
        </div>
    );
};

export default AboutPage;
