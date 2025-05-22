import React from 'react';
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export default function Footer() {
  const token = localStorage.getItem('token');
  let loggedIn = true;
  if (!token) {
    loggedIn = false;
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow z-50 p-4">
      <nav className="flex justify-around text-gray-600">
        <a href="/" className="flex flex-col items-center hover:text-blue-500">
          <FaHome size={24} />
          <span className="text-sm">Home</span>
        </a>
        
        <a href="/profile" className="flex flex-col items-center hover:text-blue-500">
          <FaUser size={24} />
          <span className="text-sm">Profile</span>
        </a>

          {loggedIn ? (
          <>
            <a href="/signout" className="flex flex-col items-center hover:text-blue-500">
              <FaSignOutAlt size={24} />
              <span className="text-sm">Sign out</span>
            </a>
            </>
          ) : (
            <>
              <a href="/login" className="flex flex-col items-center hover:text-blue-500">

              <FaSignInAlt size={24} />
              <span className="text-sm">Login</span>
          </a>
            </>
          )}
      </nav>
    </div>
  );
}
