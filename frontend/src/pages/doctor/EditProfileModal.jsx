

import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { LoaderCircle, X } from 'lucide-react';

const EditProfileModal = ({ isOpen, onClose, user }) => {
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        full_name: user.full_name || '',
        phone_number: user.phone_number || '',
        specialization: user.specialization || '',
        qualification: user.qualification || '',
        years_of_experience: user.years_of_experience || '',
        license_number: user.license_number || '',
        professional_bio: user.professional_bio || '',
        office_address: user.office_address || '',
        languages: user.languages || '',
        consultation_fee: user.consultation_fee || '',
        education: user.education || '',
        certifications: user.certifications || '',
        research_and_publications: user.research_and_publications || '',
        doctor_id_number: user.doctor_id_number || '',
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const submissionData = { ...formData };

        if (submissionData.years_of_experience === '') {
            submissionData.years_of_experience = null;
        }
        if (submissionData.consultation_fee === '') {
            submissionData.consultation_fee = null;
        }

        try {


            const response = await axiosInstance.patch('/api/users/me/', submissionData);
            
            const updatedUser = response.data;

            setUser(prevUser => ({ ...prevUser, ...updatedUser }));
            localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));

            toast.success("Profile updated successfully!");
            onClose();
        } catch (error) {
            const errorData = error.response?.data;
            if (errorData) {
                const fieldName = Object.keys(errorData)[0];
                const errorMessage = Array.isArray(errorData[fieldName]) ? errorData[fieldName][0] : errorData[fieldName];
                toast.error(`${fieldName.replace(/_/g, ' ')}: ${errorMessage}`);
            } else {
                toast.error("An unknown error occurred. Please try again.");
            }
            console.error("Profile update error:", errorData || error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900 dark:text-white flex justify-between items-center">
                                    Edit Your Profile
                                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700">
                                        <X size={20} />
                                    </button>
                                </Dialog.Title>
                                
                                <form onSubmit={handleSubmit} className="mt-4 max-h-[70vh] overflow-y-auto pr-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                        <InputField label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} />
                                        <InputField label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                                        <InputField label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} />
                                        <InputField label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
                                        <InputField label="Years of Experience" name="years_of_experience" type="number" value={formData.years_of_experience} onChange={handleChange} />
                                        <InputField label="License Number" name="license_number" value={formData.license_number} onChange={handleChange} />
                                        <InputField label="Doctor ID Number" name="doctor_id_number" value={formData.doctor_id_number} onChange={handleChange} />
                                        <InputField label="Consultation Fee (₹)" name="consultation_fee" type="number" step="0.01" value={formData.consultation_fee} onChange={handleChange} />
                                        <InputField label="Office Address" name="office_address" value={formData.office_address} onChange={handleChange} />
                                        <InputField label="Languages Spoken" name="languages" value={formData.languages} onChange={handleChange} placeholder="e.g., English, Hindi, Spanish" />
                                        <TextAreaField label="Professional Bio" name="professional_bio" value={formData.professional_bio} onChange={handleChange} rows={4} />
                                        <TextAreaField label="Education" name="education" value={formData.education} onChange={handleChange} rows={4} placeholder="List each degree on a new line." />
                                        <TextAreaField label="Certifications" name="certifications" value={formData.certifications} onChange={handleChange} rows={4} placeholder="List each certification on a new line." />
                                        <TextAreaField label="Research & Publications" name="research_and_publications" value={formData.research_and_publications} onChange={handleChange} rows={4} placeholder="List each publication on a new line." />
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3 border-t dark:border-slate-700 pt-4">
                                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700">Cancel</button>
                                        <button type="submit" disabled={isSaving} className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 flex items-center">
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
        <input 
            id={name} name={name} 
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-slate-700 focus:border-blue-500 focus:ring-blue-500" 
            {...props} 
        />
    </div>
);

const TextAreaField = ({ label, name, ...props }) => (
     <div className="md:col-span-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <textarea
            id={name} name={name} 
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-slate-700 focus:border-blue-500 focus:ring-blue-500"
            {...props} 
        ></textarea>
    </div>
);

export default EditProfileModal;