import React, {  } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginComponent from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import DashBoard from './pages/DashBoard/DashBoard';
import Profile from './pages/Profile/Profile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DashBoard/>,
    },
    {
        path: '/login',
        element: <LoginComponent/>,
    },
    {
        path: '/signup',
        element: <SignUp/>,
    },
    {
        path: '/profile',
        element: <Profile/>,
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// reportWebVitals();