
const Account = require('../models/account');

exports.getAuth = async (req, res) => {

    const { userId } = req.user;

    try {
        const user = await Account.findById(userId);

        res.status(201).json({
            user: user,
            message: 'Authentication successful',
        });
    } catch (err) {
        console.log("Authentication failed with error: ", err);
        console.error(err);
        res.status(500).json({ message: 'Error processing Authentication' });
    }
}