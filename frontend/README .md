# Frontend for Bank Application

This is the frontend for a bank application built using Vite, React, and Material-UI (MUI). The application allows users to register, log in, and manage their bank account, including viewing transaction summaries, depositing money, withdrawing money, and transferring funds.

## Table of Contents

- [Usage](#usage)
- [Pages](#pages)
    - [Register](#register)
    - [Login](#login)
    - [Home](#home)
    - [Transactions](#transactions)
    - [Profile](#profile)
    - [Messages](#messages)
    - [About](#about)
    - [Contact](#contact)
- [Technologies Used](#technologies-used)

## Usage

This application is designed for managing user bank accounts. Users can perform the following actions:

1. Register for an account.
2. Log in to an existing account.
3. Home page for the bank.
4. View transactions and balance summary.
5. Profile page for ligged in users.
6. Page with all messages for logged in user.
7. About page about the bank
8. Contact page for all of the bank users (not only for logged in users).

## Pages

### Register
Allows users to create a new account by providing their details such as name, email, and password. Input validation ensures the information provided is accurate and complete.

### Login
Enables users to log in to their accounts using their registered email and password. Passwords are securely handled and not stored in plaintext.

### Home
Home page for the bank which users can navigate to login/register page.

### Transactions
Displays a graphical summary of balances and summary of transactions. Also facilitates transferring money to another user's account. Users must specify the recipient's account details and the transfer amount. 

### Profile
Displays a logged in summary info about the user.

### Messages
Displays all of a logged in user messages (such as transferes he received).

### About
About page in which all users can read about the bank info.

### Contact
Allow all users to contact the bank app via email.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Socket.io**: A JavaScript library for using sockets.
- **Axios**: A JavaScript library for sending HTTP requests.
- **Cypress**: A testing tool for front app automated developing tests.
- **Chart.js**: A graphing tool for creating a dynamic and robust graphs.
