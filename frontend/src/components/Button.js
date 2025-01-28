// Button.js
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 20px 30px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const MyButton = ({ label, onClick }) => (
    <Button onClick={onClick}>{label}</Button>
);

export default MyButton;
