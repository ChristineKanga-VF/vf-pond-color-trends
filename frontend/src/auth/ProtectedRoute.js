import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? Component : <Navigate to="/" replace />;
};

export default ProtectedRoute;
