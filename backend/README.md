# Bank API

This repository provides a backend server for a banking application. The API supports basic banking operations such as user authentication and money transfers.

## Features

1. **User Authentication**:
    - Login
    - Register
2. **Banking Operations**:
    - Transfer Money
    - Retrieve User Actions History

---

## API Endpoints

### Authentication

#### 1. **Login**
- **Endpoint**: `/api/user/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**
    ```json
    {
      "token": "string",
      "user": "object",
    }
    ```

  - **400 Fail**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

  - **500 Fail**
    ```json
    {
      "message": "Server error"
    }
    ```

#### 2. **Register**
- **Endpoint**: `/api/user/register`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string",
    "phone": "string"
  }
  ```
- **Response**:
  - **201 OK**
    ```json
    {
      "token": "string",
      "user": "object",
    }
    ```

  - **400 Fail**
    ```json
    {
      "message": "One of parameters is empty"
    }
    ```

  - **409 Fail**
    ```json
    {
      "message": "Duplicate account"
    }
    ```

  - **500 Fail**
    ```json
    {
      "message": "Error creating account"
    }
    ```
---

### Banking Operations


#### 3. **Transactions**
- **Endpoint**: `/api/transactions`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "amount": "number",
    "receiverEmail": "string"
  }
  ```
- **Response**:
  - **201 OK**
    ```json
    {
      "message": "Transaction successful",
      "transaction": "object"
    }
    ```

  - **400 Fail**
    ```json
    {
      "message": "Invalid transaction details"
    }
    ```

  - **402 Fail**
    ```json
    {
      "message": "Insufficient funds"
    }
    ```

  - **404 Fail**
    ```json
    {
      "message": "Sender or Receiver account not found"
    }
    ```

  - **500 Fail**
    ```json
    {
      "message": "Error processing transaction"
    }
    ```

#### 4. **get transaction**
- **Endpoint**: `/api/transactions`
- **Method**: GET

- **Response**:
  - **200 OK**
    ```json
    {
      "transactions": "object"
    }
    ```

  - **500 Fail**
    ```json
    {
      "message": "Error fetching transactions"
    }
    ```

---

## Environment Variables

Ensure to set up the following environment variables in a `.env` file 
before run the server:

```env
PORT=your_port
MONGO_URI=your_database_connection_string
JWT_SECRET=your_jwt_secret
```

## Technologies Used

- **Node.js**: A JavaScript runtime envirement.
- **Socket.io**: A JavaScript library for using sockets.
- **Axios**: A JavaScript library for sending HTTP requests.
- **Express**: A JavaScript web application framework for building RESTful API.
- **Bcrypt.js**: A JavaScript implementation of the Bcrypt algorithm.
- **JSON Web Token (JWT)**: URL-safe method of transferring claims between parties.

