// frontend/src/pages/admin/LicenseManagementPage.jsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { ShieldPlus, LoaderCircle, CheckCircle, XCircle } from 'lucide-react';

const LicenseManagementPage = () => {
    const [licenses, setLicenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newLicense, setNewLicense] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchLicenses = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/users/licenses/');
            setLicenses(response.data);
        } catch (error) {
            toast.error("Failed to fetch license numbers.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLicenses();
    }, []);

    const handleAddLicense = async (e) => {
        e.preventDefault();
        if (!newLicense.trim()) {
            toast.error("License number cannot be empty.");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await axiosInstance.post('/users/licenses/', {
                license_number: newLicense
            });
            // Add the new license to the top of the list
            setLicenses([response.data, ...licenses]);
            setNewLicense(''); // Clear the input field
            toast.success("License added successfully!");
        } catch (error) {
            // Handle unique constraint error from backend
            if (error.response?.data?.license_number) {
                toast.error(error.response.data.license_number[0]);
            } else {
                toast.error("Failed to add license.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Add New License Form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    <ShieldPlus className="mr-3 h-6 w-6 text-blue-500" />
                    Add New Medical License
                </h2>
                <form onSubmit={handleAddLicense} className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={newLicense}
                        onChange={(e) => setNewLicense(e.target.value)}
                        placeholder="Enter unique license number (e.g., DOC12345)"
                        className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
                    >
                        {isSubmitting ? <LoaderCircle className="animate-spin" /> : 'Add'}
                    </button>
                </form>
            </div>

            {/* List of Existing Licenses */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Existing Licenses</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">License Number</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="2" className="text-center py-8"><LoaderCircle className="h-8 w-8 animate-spin mx-auto" /></td></tr>
                            ) : licenses.map(license => (
                                <tr key={license.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4 font-mono text-gray-900 dark:text-white">{license.license_number}</td>
                                    <td className="px-6 py-4">
                                        {license.is_used ? (
                                            <span className="flex items-center text-red-500">
                                                <XCircle className="h-4 w-4 mr-2" /> Used
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-green-500">
                                                <CheckCircle className="h-4 w-4 mr-2" /> Available
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LicenseManagementPage;