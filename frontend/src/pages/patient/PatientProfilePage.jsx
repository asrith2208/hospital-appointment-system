import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoaderCircle, Edit, Mail, Phone, MapPin, ShieldAlert } from 'lucide-react';
import EditPatientProfileModal from './EditPatientProfileModal'; 

const PatientProfilePage = () => {
    const { user } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    if (!user) {
        return (
            <div className="flex justify-center items-center h-96">
                <LoaderCircle className="h-12 w-12 animate-spin text-blue-500" />
            </div>
        );
    }

    const renderInfo = (data) => data || <span className="text-gray-500">Not provided</span>;
    
    const calculateAge = (dob) => {
        if (!dob) return 'N/A';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return `${age} years`;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Profile</h1>
                    <p className="text-gray-400">Manage your personal and medical information</p>
                </div>
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-lg p-6 text-center shadow-lg">
                    <img
                        src={user.profile_picture || `https://ui-avatars.com/api/?name=${user.full_name}&background=3B82F6&color=fff&size=128`}
                        alt={user.full_name}
                        className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-slate-700 object-cover mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.full_name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Patient ID: PATIENT-{user.id}</p>
                    <div className="w-full border-t border-gray-200 dark:border-slate-700 my-6"></div>
                    <div className="space-y-4 text-left w-full">
                        <InfoItem icon={<Mail />} text={user.email} />
                        <InfoItem icon={<Phone />} text={renderInfo(user.phone_number)} />
                        <InfoItem icon={<MapPin />} text={renderInfo(user.address)} />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <InfoSection title="Personal Information">
                        <DetailPair label="Full Name" value={user.full_name} />
                        <DetailPair label="Phone Number" value={renderInfo(user.phone_number)} />
                        <DetailPair label="Date of Birth" value={renderInfo(user.date_of_birth)} />
                        <DetailPair label="Age" value={calculateAge(user.date_of_birth)} />
                        <DetailPair label="Blood Group" value={renderInfo(user.blood_group)} />
                        <DetailPair label="Address" value={renderInfo(user.address)} />
                    </InfoSection>

                    <InfoSection title="Emergency Contact" icon={<ShieldAlert />}>
                        <DetailPair label="Contact Name" value={renderInfo(user.emergency_contact_name)} />
                        <DetailPair label="Contact Phone" value={renderInfo(user.emergency_contact_phone)} />
                    </InfoSection>
                </div>
            </div>

            {isEditModalOpen && (
                <EditPatientProfileModal 
                    user={user} 
                    isOpen={isEditModalOpen} 
                    onClose={() => setIsEditModalOpen(false)} 
                />
            )}
        </div>
    );
};

const InfoItem = ({ icon, text }) => (
    <div className="flex items-start text-gray-600 dark:text-gray-300">
        {React.cloneElement(icon, { size: 16, className: "mr-3 mt-1 text-gray-400 flex-shrink-0" })}
        <span>{text}</span>
    </div>
);

const InfoSection = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold flex items-center mb-4 border-b border-gray-200 dark:border-slate-700 pb-3 text-gray-800 dark:text-white">
            {icon && React.cloneElement(icon, { size: 20, className: "mr-3 text-blue-500" })}
            {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            {children}
        </div>
    </div>
);

const DetailPair = ({ label, value }) => (
    <div>
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</h4>
        <p className="text-gray-800 dark:text-gray-200">{value}</p>
    </div>
);

export default PatientProfilePage;