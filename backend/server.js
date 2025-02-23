// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { initSocketIo } = require('./SocketServer');

const accountRoutes = require('./routes/accountRoutes');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

dotenv.config()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,

};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/user', accountRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// MongoDB setup
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(process.env.MONGO_URI, options)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Database connection error: ', err);
    });

// Error
app.use((err, req, res, next) => {
     console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3003;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

initSocketIo(server);
