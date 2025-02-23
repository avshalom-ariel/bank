const Account = require("../models/account");

exports.getMessages = async (req, res) => {
    try {
        const { userId } = req.user;

        const account = await Account.findById(userId);
        if (!account) {
            return res.status(404).json({ message: 'No account found' });
        }

        res.status(200).json({ messages: account.messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};