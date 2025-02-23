
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import TransactionPage from "./pages/TransactionPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import MessagesPage from "./pages/MessagesPage.jsx";
import SocketProvider from "./components/SocketProvider.js";

const router = createBrowserRouter([
    {path: '/', element: <HomePage />},
    {path: '/login', element: <LoginPage />},
    {path: '/register', element: <RegistrationPage />},
    {path: '/dashboard', element: <DashboardPage />},
    {path: '/not-found', element: <NotFoundPage />},
    {path: '/profile', element: <ProfilePage />},
    {path: '/transactions', element: <TransactionPage />},
    {path: '/about', element: <AboutPage />},
    {path: '/contact', element: <ContactPage />},
    {path: '/messages', element: <MessagesPage />},

])

const root = createRoot(document.getElementById("root"));
root.render(
    // <StrictMode>
        <SocketProvider>
            <RouterProvider router={router} />
        </SocketProvider>

    // </StrictMode>
);