

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { Mail, Phone, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

const LoginPage = () => {
  const { loginUser } = useAuth(); // Get the login function from context
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await loginUser(identifier, password);
    setIsLoading(false);
  };

  return (
    <AuthLayout backTo="/" backToText="Home">
      <div className="p-8 w-full">
        <div className="text-center mb-8">
          <img src="/titiksha-logo.png" alt="Logo" className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400">Sign in to access your account</p>
        </div>

        {/* Email/Phone Toggle */}
        <div className="flex bg-slate-700/50 rounded-lg p-1 mb-6">
          <button
            onClick={() => setLoginMethod('email')}
            className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${loginMethod === 'email' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
          >
            Email
          </button>
          <button
            onClick={() => setLoginMethod('phone')}
            className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${loginMethod === 'phone' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Identifier Input (Email or Phone) */}
          <div className="mb-4">
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-300 mb-1">
              {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {loginMethod === 'email' ? <Mail className="h-5 w-5 text-gray-400" /> : <Phone className="h-5 w-5 text-gray-400" />}
              </span>
              <input
                id="identifier"
                name="identifier"
                type={loginMethod === 'email' ? 'email' : 'tel'}
                placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-700/50 border border-gray-600 text-white rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="text-right mb-6">
            <Link to="/forgot-password" className="text-sm text-blue-400 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center"
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Sign In'}
          </button>
        </form>
        
        <p className="text-sm text-gray-400 mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-blue-400 hover:text-blue-300">
            Register here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;