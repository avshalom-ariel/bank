import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the CSS file

const HomePage = () => {
    return (
        <div className="container">
            <h1>Welcome to Avshi's Bank</h1>
            <p>Your trusted partner for financial services</p>

            <div className="buttons">
                <Link to="/login">
                    <button className="button">Login</button>
                </Link>
                <Link to="/register">
                    <button className="button">Register</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;

// const styles = {
//     container: {
//         textAlign: 'center',
//         padding: '50px',
//         backgroundColor: '#f4f4f4',
//         height: '100vh',
//     },
//     buttons: {
//         display: 'flex',
//         justifyContent: 'center',
//         gap: '20px',
//         marginTop: '20px',
//     },
//     button: {
//         padding: '15px 30px',
//         fontSize: '16px',
//         cursor: 'pointer',
//         border: 'none',
//         borderRadius: '5px',
//         backgroundColor: '#007bff',
//         color: 'white',
//         transition: 'background-color 0.3s',
//     },
// };

// export default HomePage;
