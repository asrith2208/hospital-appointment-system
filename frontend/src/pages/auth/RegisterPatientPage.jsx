

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { User, Mail, Phone, Lock, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
const RegisterPatientPage = () => {


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      await axios.post('/api/users/register/patient/', {
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        password: formData.password,
        password2: formData.confirmPassword,
      });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        toast.error('Please correct the errors and try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
        console.error('Registration error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthLayout backTo="/" backToText="Home">
      {/* CHANGE: This layout is now much cleaner and more organized */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Side (Blue Branding Panel) - REDESIGNED */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center items-center bg-blue-600 p-12 text-white text-center">
          <img src="/titiksha-logo.png" alt="Logo" className="h-24 w-24 mb-6 filter brightness-0 invert" />
          <h1 className="text-4xl font-bold mb-4">Titiksha Hospitals</h1>
          <p className="text-blue-100 leading-relaxed">
            Join our healthcare community and experience world-class medical care with compassionate service.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full lg:w-3/5 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Register as a patient to get started.</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* The InputField and PasswordField components will now be theme-aware */}
            <InputField 
              name="fullName" 
              label="Full Name" 
              type="text" 
              placeholder="Enter your full name" 
              Icon={User} 
              value={formData.fullName} 
              onChange={handleChange} 
              error={errors.full_name} 
            />
            <InputField 
              name="email" 
              label="Email Address" 
              type="email" 
              placeholder="Enter your email" 
              Icon={Mail} 
              value={formData.email} 
              onChange={handleChange} 
              error={errors.email} 
            />
            <InputField 
              name="phone" 
              label="Phone Number" 
              type="tel" 
              placeholder="Enter your phone number" 
              Icon={Phone} 
              value={formData.phone} 
              onChange={handleChange} 
              error={errors.phone_number} 
            />
            <PasswordField 
              name="password" 
              label="Password" 
              placeholder="Create a password" 
              value={formData.password} 
              onChange={handleChange} 
              error={errors.password}
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            <PasswordField 
              name="confirmPassword" 
              label="Confirm Password" 
              placeholder="Confirm your password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              error={errors.password2}
              showPassword={showConfirmPassword}
              toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 mt-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center"
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Sign in here
              </Link>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Are you a doctor?{' '}
              <Link to="/register-doctor" className="font-semibold text-green-600 dark:text-green-400 hover:underline">
                Finalize your registration here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

const InputField = ({ name, label, type, placeholder, Icon, value, onChange, error }) => (
  <div className="mb-5"> {/* Increased margin */}
    <label htmlFor={name} className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-5 w-5 text-gray-400" />
      </span>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-100 dark:bg-slate-700/50 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} text-gray-800 dark:text-white rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const PasswordField = ({ name, label, placeholder, value, onChange, error, showPassword, toggleShowPassword }) => (
  <div className="mb-5"> {/* Increased margin */}
    <label htmlFor={name} className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Lock className="h-5 w-5 text-gray-400" />
      </span>
      <input
        id={name}
        name={name}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-100 dark:bg-slate-700/50 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} text-gray-800 dark:text-white rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <button type="button" onClick={toggleShowPassword} className="absolute inset-y-0 right-0 flex items-center pr-3">
        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
      </button>
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default RegisterPatientPage;