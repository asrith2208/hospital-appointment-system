

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { User, Mail, Phone, Lock, Stethoscope, Award, Calendar, KeySquare, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const specializationsList = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
    'Dermatology', 'Oncology', 'Gastroenterology', 'General Surgery'
];

const RegisterDoctorPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        specialization: '',
        qualification: '',
        yearsOfExperience: '',
        licenseNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            await axios.post('http://127.0.0.1:8000/api/users/register/doctor/', {
                full_name: formData.fullName,
                email: formData.email,
                phone_number: formData.phone,
                specialization: formData.specialization,
                qualification: formData.qualification,
                years_of_experience: formData.yearsOfExperience,
                license_number: formData.licenseNumber,
                password: formData.password,
                password2: formData.confirmPassword,
            });
            toast.success('Doctor registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
                toast.error('Please correct the errors and try again.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout backTo="/register" backToText="Patient Registration">
            <div className="flex flex-col lg:flex-row">
                {/* Left Side (Green Branding Panel) */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center items-center bg-green-600 p-12 text-white text-center">
                    <img src="/titiksha-logo.png" alt="Logo" className="h-24 w-24 mb-6 filter brightness-0 invert" />
                    <h1 className="text-4xl font-bold mb-4">Titiksha Ups Hospitals</h1>
                    <p className="text-green-100 leading-relaxed">
                        Join our medical team and be part of providing exceptional healthcare services to our community.
                    </p>
                </div>

                {/* Right Side (Form) */}
                <div className="w-full lg:w-3/5 p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Doctor Registration</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Complete your professional profile.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <InputField name="fullName" label="Full Name" type="text" placeholder="Dr. Your Full Name" Icon={User} value={formData.fullName} onChange={handleChange} error={errors.full_name} />
                        <InputField name="email" label="Email Address" type="email" placeholder="doctor@example.com" Icon={Mail} value={formData.email} onChange={handleChange} error={errors.email} />
                        <InputField name="phone" label="Phone Number" type="tel" placeholder="+91 XXXXX XXXXX" Icon={Phone} value={formData.phone} onChange={handleChange} error={errors.phone_number} />
                        <SelectField name="specialization" label="Specialization" Icon={Stethoscope} value={formData.specialization} onChange={handleChange} error={errors.specialization} options={specializationsList} />
                        <InputField name="qualification" label="Qualification" type="text" placeholder="MBBS, MD, etc." Icon={Award} value={formData.qualification} onChange={handleChange} error={errors.qualification} />
                        <InputField name="yearsOfExperience" label="Years of Experience" type="number" placeholder="Years of practice" Icon={Calendar} value={formData.yearsOfExperience} onChange={handleChange} error={errors.years_of_experience} />
                        <InputField name="licenseNumber" label="Medical License Number" type="text" placeholder="Your unique license number" Icon={KeySquare} value={formData.licenseNumber} onChange={handleChange} error={errors.license_number} />
                        <PasswordField name="password" label="Password" placeholder="Create a password" value={formData.password} onChange={handleChange} error={errors.password} showPassword={showPassword} toggleShowPassword={() => setShowPassword(!showPassword)} />
                        <PasswordField name="confirmPassword" label="Confirm Password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} error={errors.password2} showPassword={showConfirmPassword} toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)} />

                        <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white py-3 mt-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-green-400 flex items-center justify-center">
                            {isLoading ? <LoaderCircle className="animate-spin" /> : 'Complete Registration'}
                        </button>
                    </form>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

const InputField = ({ name, label, type, placeholder, Icon, value, onChange, error }) => (
    <div><label htmlFor={name} className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label><div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><Icon className="h-5 w-5 text-gray-400" /></span><input id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} className={`w-full bg-gray-100 dark:bg-slate-700/50 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} text-gray-800 dark:text-white rounded-lg py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500`} /></div>{error && <p className="text-red-500 text-xs mt-1">{error[0]}</p>}</div>
);

const PasswordField = ({ name, label, placeholder, value, onChange, error, showPassword, toggleShowPassword }) => (
    <div><label htmlFor={name} className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label><div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><Lock className="h-5 w-5 text-gray-400" /></span><input id={name} name={name} type={showPassword ? 'text' : 'password'} placeholder={placeholder} value={value} onChange={onChange} className={`w-full bg-gray-100 dark:bg-slate-700/50 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} text-gray-800 dark:text-white rounded-lg py-2.5 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500`} /><button type="button" onClick={toggleShowPassword} className="absolute inset-y-0 right-0 flex items-center pr-3">{showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}</button></div>{error && <p className="text-red-500 text-xs mt-1">{error[0]}</p>}</div>
);

const SelectField = ({ name, label, Icon, value, onChange, error, options }) => (
    <div><label htmlFor={name} className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label><div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><Icon className="h-5 w-5 text-gray-400" /></span><select id={name} name={name} value={value} onChange={onChange} className={`w-full bg-gray-100 dark:bg-slate-700/50 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} text-gray-800 dark:text-white rounded-lg py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500`}><option value="">Select Specialization</option>{options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>{error && <p className="text-red-500 text-xs mt-1">{error[0]}</p>}</div>
);

export default RegisterDoctorPage;