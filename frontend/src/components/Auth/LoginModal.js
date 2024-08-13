import React from 'react';
import { GoogleLogin } from '@leecheuk/react-google-login';

const clientId = "1028790661771-bqdid78iblvjuu5ikrul2h6d411ukh3k.apps.googleusercontent.com";

const LoginModal = ({ isOpen, onClose, setUser }) => {
  const onSuccess = (res) => {
    const profile = res.profileObj;
    setUser({
      name: profile.name,
      email: profile.email,
      picture: profile.imageUrl,
    });
    localStorage.setItem('user', JSON.stringify(res.profileObj));
    onClose(); // Close the modal after successful login
  };


  
  const onFailure = (res) => {
    console.log("Login Failed", res);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login / Signup</h2>
        <GoogleLogin
    clientId={clientId}
    buttonText="Login"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    isSignedIn={false}  // Ensure user needs to sign in again
    prompt="select_account"  // Force account selection
/>
        <button
          onClick={onClose}
          className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
