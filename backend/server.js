// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const accountRoutes = require('./routes/accountRoutes');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000', // The client origin
    credentials: true, // Allow credentials (cookies)
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Use cookie parser

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// const mongoURI = "mongodb+srv://avshalomariel:1234@cluster0.z9q8z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(process.env.MONGO_URI, options)
// mongoose.connect(mongoURI, options)

    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Database connection error: ', err);
    });

// Routes
app.use('/user', accountRoutes);
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);

// app.get('/', (req, res) => {
//     res.send('Welcome to the Bank API');
// });

app.use((err, req, res, next) => {
     console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the serve
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

