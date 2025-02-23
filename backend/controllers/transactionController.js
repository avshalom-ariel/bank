const Transaction = require('../models/transaction');
const Account = require('../models/account');
const { sendMessage } = require('../SocketServer');

exports.createTransaction = async (req, res) => {
    try {
        const { userId } = req.user;
        const { receiverEmail, amount } = req.body;

        if (!receiverEmail || !amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid transaction details' });
        }

        const senderAccount = await Account.findById(userId);
        const receiverAccount = await Account.findOne({ email: receiverEmail });

        if (!senderAccount || !receiverAccount) {
            return res.status(404).json({ message: 'Sender or Receiver account not found' });
        }

        if (senderAccount.balance < amount) {
            return res.status(402).json({ message: 'Insufficient funds' });
        }

        const transaction = new Transaction({
            senderEmail: senderAccount.email,
            receiverEmail: receiverAccount.email,
            amount,
        });

        await transaction.save();

        senderAccount.balance -= amount;
        receiverAccount.balance = Number(receiverAccount.balance) + Number(amount);

        await senderAccount.save();

        receiverAccount.messages.unshift(`You received ${amount} from ${senderAccount.email}`)

        await receiverAccount.save();

        try {
            await sendMessage(`You received ${amount} from ${senderAccount.email}`, receiverAccount.email);
        } catch (err) {
            console.log(err);
        }

        res.status(201).json({
            message: 'Transaction successful',
            transaction,
        });
    } catch (err) {
        console.log("Transaction failed with error: ", err);
        console.error(err);
        res.status(500).json({ message: 'Error processing transaction' });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const { userId } = req.user;

        const account = await Account.findById(userId);

        const transactions = await Transaction.find({
            $or: [
                { senderEmail: account.email },
                { receiverEmail: account.email }
            ]
        })

        res.status(200).json({ transactions: transactions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};
