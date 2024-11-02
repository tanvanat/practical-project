import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    // Prepare the payload for the API request
    const payload = {
      username,
      password,
    };

    try {
      // Make a POST request to the sign-in API endpoint
      const response = await axios.post('http://localhost:5000/api/users/signin', payload);

      // Handle successful response
      if (response.status === 200) {
        // Redirect to the Home page upon successful sign-in
        navigate('/home');
      }
    } catch (error) {
      // Handle errors (e.g., invalid credentials)
      setError('Invalid username or password. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="bg-signin-page bg-cover bg-center bg-blend-multiply bg-opacity-60 flex flex-col justify-center px-6 py-13 lg:px-8"
        style={{ minHeight: '100vh' }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <div className="bg-med-icon h-16 w-16 bg-contain bg-center bg-no-repeat mb-6"></div>
          <h1 className="text-2xl font-bold text-custom-orange mb-2">Welcome to Meditrack</h1>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-custom-orange">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && <p className="text-red-600">{error}</p>} {/* Show error message */}
          <form onSubmit={handleSignin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-custom-orange">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-custom-grey text-gray-900 shadow-sm placeholder:text-gray-500 focus:border-custom-orange focus:ring-2 focus:ring-custom-orange sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-custom-orange">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-custom-grey text-gray-900 shadow-sm placeholder:text-gray-500 focus:border-custom-orange focus:ring-2 focus:ring-custom-orange sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-custom-blue px-3 py-2 text-sm font-semibold leading-6 text-custom-orange shadow-sm hover:bg-[#4B3A9C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
