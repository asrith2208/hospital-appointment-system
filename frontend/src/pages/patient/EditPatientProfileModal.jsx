import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { LoaderCircle, X } from 'lucide-react';

const EditPatientProfileModal = ({ isOpen, onClose, user }) => {
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        full_name: user.full_name || '',
        phone_number: user.phone_number || '',
        date_of_birth: user.date_of_birth || '',
        blood_group: user.blood_group || '',
        address: user.address || '',
        emergency_contact_name: user.emergency_contact_name || '',
        emergency_contact_phone: user.emergency_contact_phone || '',
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await axiosInstance.patch('/users/me/', formData);
            const updatedUser = response.data;

            setUser(prevUser => ({ ...prevUser, ...updatedUser }));
            localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));

            toast.success("Profile updated successfully!");
            onClose();
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl">
                                <Dialog.Title as="h3" className="text-lg font-bold text-gray-900 dark:text-white flex justify-between">
                                    Edit Your Profile
                                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700"><X size={20} /></button>
                                </Dialog.Title>
                                
                                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    <InputField label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} />
                                    <InputField label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                                    <InputField label="Date of Birth" name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleChange} />
                                    <InputField label="Blood Group" name="blood_group" value={formData.blood_group} onChange={handleChange} placeholder="e.g., O+, A-" />
                                    <TextAreaField label="Address" name="address" value={formData.address} onChange={handleChange} />
                                    <div className="pt-4 border-t dark:border-slate-700">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-200">Emergency Contact</h4>
                                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                             <InputField label="Contact Name" name="emergency_contact_name" value={formData.emergency_contact_name} onChange={handleChange} />
                                             <InputField label="Contact Phone" name="emergency_contact_phone" value={formData.emergency_contact_phone} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border dark:border-gray-600">Cancel</button>
                                        <button type="submit" disabled={isSaving} className="px-6 py-2 rounded-md bg-blue-600 text-white flex items-center">
                                            {isSaving && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />}
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

const InputField = ({ label, name, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input id={name} name={name} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-slate-700 focus:border-blue-500 focus:ring-blue-500" {...props} />
    </div>
);
const TextAreaField = ({ label, name, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <textarea id={name} name={name} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-slate-700 focus:border-blue-500 focus:ring-blue-500" {...props}></textarea>
    </div>
);

export default EditPatientProfileModal;