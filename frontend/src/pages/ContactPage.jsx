import React, { useState } from 'react';
import Header from "../components/Header.js";

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can integrate your backend logic here to send the form data
        setFormSubmitted(true);
    };

    const StyledComponent = () => {
        // Define styles as a JavaScript object
        const styles = {
            style: {
                padding: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
        };

        return (
            <div style={styles.style}>

            </div>
        );
    };

    return (
        <div className="container">
            <Header />

            <header className="contact-header">
                <h1>Contact Us</h1>
            </header>

            <section className="contact-info">
                <h2>Get In Touch</h2>
                <p>If you have any questions or need assistance, feel free to reach out to us. We're here to help!</p>

                <h3>Contact Information</h3>
                <p><strong>Phone:</strong> 1-800-123-4567</p>
                <p><strong>Email:</strong> support@yourbank.com</p>
                <p><strong>Address:</strong> 123 Bank St, City, Country</p>
            </section><br></br>

            <section className="contact-form" >
                <h2>Send Us a Message</h2>
                {formSubmitted ? (
                    <div className="confirmation-message">
                        <p>Thank you for reaching out! We will get back to you as soon as possible.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/*<div className="input-container">*/}
                        {/*    <label htmlFor="name">Name</label>*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        id="name"*/}
                        {/*        name="name"*/}
                        {/*        value={formData.name}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="input-container">
                            <label>Name</label>
                            <input
                                type="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="button">Submit</button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default ContactUsPage;
