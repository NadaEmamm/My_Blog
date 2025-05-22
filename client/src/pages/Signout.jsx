import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Signing out...</h2>
                <p className="text-center">You have been signed out successfully.</p>
            </div>
        </div>
    );
};

export default Signout;
