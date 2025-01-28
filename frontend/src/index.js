
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

])

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);