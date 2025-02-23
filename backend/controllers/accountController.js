const bcrypt = require('bcryptjs');
const Account = require('../models/account');
const jwt = require('jsonwebtoken');

// Login user and generate JWT
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login request received.\nemail: " + email + "\nPassword: " + password);

        const account = await Account.findOne({ email });
        if (!account) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, account.password);

        if (!isMatch) {
            console.log("Not match");
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: account._id, email: account.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json( {
            user: {
                token: token,
                id: account._id,
                name: account.name,
                email: account.email,
                phone: account.phone,
                balance: account.balance,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.registerUser = async (req, res) => {
    console.log("Registration request received");
    try {
        const { name, password, email, phone } = req.body;

        if (!name || !password || !email || !phone) {
            return res.status(400).json({ message: 'One of parameters is empty' });
        }

        let account = await Account.findOne({ email });

        if (account) {
            return res.status(409).json({ message: 'Duplicate account' });
        }

        console.log("Received registration request from:\n" + req.body)

        // Hash the password using bcrypt before saving it to the database
        const salt = await bcrypt.genSalt(10);  // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new account with the hashed password
        const newAccount = new Account({
            name,
            password: hashedPassword,
            email,
            phone,
        });

        const savedAccount = await newAccount.save();

        // Generate a JWT token
        const token = jwt.sign(
            { userId: savedAccount._id, name: savedAccount.name },
            process.env.JWT_SECRET,  // Your JWT secret (store this in a .env file)
            { expiresIn: '1h' }  // Set token expiry (e.g., 1 hour)
        );

        // Return the user details and the JWT token
        res.status(201).json({
            user: {
                token: token,
                id: savedAccount._id,
                name: savedAccount.name,
                email: savedAccount.email,
                phone: savedAccount.phone,
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating account' });
    }
};

