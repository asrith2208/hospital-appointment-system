

import React, { useState, useRef } from 'react';
import {useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { Mail, CheckCircle, LoaderCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1); // 1: Enter Email, 2: Verify OTP, 3: Reset Password, 4: Success
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const otpInputs = useRef([]);

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await axios.post('http://127.0.0.1:8000/api/users/password-reset/request/', { email });
            toast.success('OTP has been sent to your email.');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.email?.[0] || 'Failed to send OTP. Please check the email address.');
            toast.error(err.response?.data?.email?.[0] || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        setIsLoading(true);
        setError('');
        const enteredOtp = otp.join("");
        if (enteredOtp.length !== 6) {
            setError("Please enter the complete 6-digit OTP.");
            setIsLoading(false);
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/users/password-reset/verify/', { email, otp: enteredOtp });
            toast.success('OTP Verified!');
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid or expired OTP.');
            toast.error('Invalid or expired OTP.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            await axios.post('http://127.0.0.1:8000/api/users/password-reset/confirm/', {
                email,
                otp: otp.join(""),
                new_password: newPassword,
                confirm_password: confirmPassword,
            });
            setStep(4); // Move to success step
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to reset password.');
            toast.error('Failed to reset password.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1: // Request OTP
                return (
                    <form onSubmit={handleRequestOTP}>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Forgot Password</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Enter your email address to receive an OTP.</p>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <div className="mb-4 relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your registered email" required className="w-full bg-gray-100 dark:bg-slate-700/50 border border-gray-300 dark:border-gray-600 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center">
                            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Send OTP'}
                        </button>
                    </form>
                );
            case 2: // Verify OTP
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Verify OTP</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">We've sent a 6-digit OTP to <strong className="text-gray-700 dark:text-gray-200">{email}</strong></p>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <div className="flex justify-center gap-2 mb-6">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    value={data}
                                    onChange={e => handleOtpChange(e.target, index)}
                                    onFocus={e => e.target.select()}
                                    ref={el => otpInputs.current[index] = el}
                                    className="w-12 h-12 text-center text-xl font-semibold bg-gray-100 dark:bg-slate-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            ))}
                        </div>
                        <button onClick={handleVerifyOTP} disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center">
                            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Verify OTP'}
                        </button>
                        <p className="text-center text-sm mt-4 text-gray-500 dark:text-gray-400">Didn't receive code? <button onClick={handleRequestOTP} className="text-blue-500 hover:underline">Resend OTP</button></p>
                    </div>
                );
            case 3: // Reset Password
                return (
                    <form onSubmit={handleResetPassword}>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Set New Password</h3>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        {/* Password Fields here */}
                        <div className="mb-4 relative">
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required className="w-full bg-gray-100 dark:bg-slate-700/50 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-6 relative">
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required className="w-full bg-gray-100 dark:bg-slate-700/50 border border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center">
                            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Reset Password'}
                        </button>
                    </form>
                );
            case 4: // Success
                return (
                    <div className="text-center">
                        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Password Reset Successful!</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">You can now login with your new password.</p>
                        <button onClick={() => navigate('/login')} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Go to Login
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AuthLayout backTo="/login" backToText="Login">
            <div className="p-8 sm:p-12 text-center">
                <img src="/titiksha-logo.png" alt="Logo" className="h-12 w-12 mx-auto mb-6" />
                {renderStep()}
                {step < 4 && (
                    <div className="flex items-center justify-center space-x-2 mt-8">
                        <div className={`h-2 w-8 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                        <div className={`h-2 w-8 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                        <div className={`h-2 w-8 rounded-full ${step === 3 ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                    </div>
                )}
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;