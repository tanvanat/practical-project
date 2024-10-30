import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();

    // Here you would typically handle authentication logic.
    // For demo purposes, we'll just check if the username and password are not empty.
    if (username && password) {
      // Redirect to the Home page upon successful sign-in.
      navigate('/home');
    } else {
      alert('Please enter a valid username and password');
    }
  };

  return (
    <>
      <div
        className="bg-signin-page bg-cover bg-center bg-blend-multiply bg-opacity-60 flex flex-col justify-center px-6 py-13 lg:px-8"
        style={{  minHeight: '100vh' }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="med_logo.png"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-custom-orange ">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignin} className="space-y-6"> {/* Call handleSignin on form submit */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-custom-orange">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text" // Change to text if you're using username
                  required
                  autoComplete="username"
                  value={username} // Set value to username state
                  onChange={(e) => setUsername(e.target.value)} // Update username state
                  className="block w-full rounded-md border border-gray-300 bg-custom-grey text-gray-900 shadow-sm placeholder:text-gray-500 focus:border-custom-orange focus:ring-2 focus:ring-custom-orange sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-custom-orange">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-custom-orange hover:text-[#CC5200]">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password} // Set value to password state
                  onChange={(e) => setPassword(e.target.value)} // Update password state
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
  )
}
