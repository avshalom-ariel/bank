const Transaction = require('../models/transaction');
const Account = require('../models/account');

exports.createTransaction = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log("User ID: " + userId);

        const { receiverEmail, amount } = req.body;
        console.log("Receiver email: " + receiverEmail);
        console.log("Amount: " + amount);

        if (!receiverEmail || !amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid transaction details' });
        }

        // Find the sender and receiver accounts
        const senderAccount = await Account.findById(userId);
        console.log("senderAccount: " + senderAccount);
        console.log("-----Receiver email: " + receiverEmail);

        const receiverAccount = await Account.findOne({ email: receiverEmail });
        console.log("receiverAccount: " + receiverAccount);
        console.log("---- Receiver Account1: " + receiverAccount);
        if (!senderAccount || !receiverAccount) {
            return res.status(404).json({ message: 'Sender or Receiver account not found' });
        }
        console.log("---- Receiver Account2: " + receiverAccount);

        if (senderAccount.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        console.log("---- Receiver Account3: " + receiverAccount);

        const transaction = new Transaction({
            senderEmail: senderAccount.email,
            receiverEmail: receiverAccount.email,
            amount,
        });

        console.log("Transaction created: " + transaction);

        await transaction.save();

        console.log("Transaction saved: " + transaction);

        senderAccount.balance -= amount;
        receiverAccount.balance = Number(receiverAccount.balance) + Number(amount);

        await senderAccount.save();

        console.log("senderAccount new balanced updated: " + senderAccount.balance);

        await receiverAccount.save();

        console.log("receiverAccount new balanced updated: " + receiverAccount.balance);

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
        console.log("Get Transactions Request Received");
        const { userId } = req.user;

        const account = await Account.findById(userId);

        const transactions = await Transaction.find({
            $or: [
                { senderEmail: account.email },
                { receiverEmail: account.email }
            ]
        })

        console.log("transactions: " + transactions)

        // const transactionsReceived = await Transaction.find({ receiverUser: userId })

        // console.log("transactionsReceived: " + transactions)

        res.status(200).json({ transactions: transactions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching transactions' });
    }
};

// Get a specific transaction by ID
// exports.getTransaction = async (req, res) => {
//     try {
//         const transactionId = req.params.id;
//         const transaction = await Transaction.findById(transactionId).populate('senderAccountId receiverAccountId');
//
//         if (!transaction) {
//             return res.status(404).json({ message: 'Transaction not found' });
//         }
//
//         res.status(200).json(transaction);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching transaction' });
//     }
// };
