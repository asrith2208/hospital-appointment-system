

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoaderCircle, Edit, Mail, Phone, MapPin, Clock, Star, Users, Briefcase, IndianRupee, Award, FileText } from 'lucide-react';
import EditProfileModal from './EditProfileModal'; 

const DoctorProfilePage = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (user) setIsLoading(false);
    }, [user]);

    if (isLoading || !user) {
        return <div className="flex justify-center items-center h-64"><LoaderCircle className="h-10 w-10 animate-spin text-blue-500" /></div>;
    }

    const renderInfo = (data) => data || <span className="text-gray-400 dark:text-gray-500 italic">Not provided</span>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your professional profile and credentials</p>
                </div>
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors shadow-md"
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard icon={<Briefcase />} label="Years of Experience" value={user.years_of_experience || '0'} color="blue" />
                <StatCard icon={<Star />} label="Patient Rating" value={user.patient_rating || 'N/A'} color="yellow" />
                <StatCard icon={<Users />} label="Total Patients" value={`${user.total_patients || '0'}+`} color="green" />
                <StatCard icon={<IndianRupee />} label="Consultation Fee" value={user.consultation_fee || 'N/A'} color="purple" />
            </div>

            {/* Main Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Doctor Card */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-lg p-6 flex flex-col items-center text-center shadow-lg">
                    <img
                        src={user.profile_picture || `https://ui-avatars.com/api/?name=${user.full_name}&background=3B82F6&color=fff&size=128`}
                        alt={`Dr. ${user.full_name}`}
                        className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-slate-700 object-cover mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.full_name}</h2>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">{user.specialization}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Doctor ID: {renderInfo(user.doctor_id_number)}</p>
                    <div className="w-full border-t border-gray-200 dark:border-slate-700 my-6"></div>
                    <div className="space-y-4 text-left w-full">
                        <InfoItem icon={<Mail />} text={user.email} />
                        <InfoItem icon={<Phone />} text={renderInfo(user.phone_number)} />
                        <InfoItem icon={<MapPin />} text={renderInfo(user.office_address)} />
                        <InfoItem icon={<Clock />} text="Mon-Fri: 9:00 AM - 5:00 PM" />
                    </div>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                    <InfoSection title="Professional Information" icon={<FileText />}>
                        <DetailPair label="Full Name" value={user.full_name} />
                        <DetailPair label="Specialization" value={user.specialization} />
                        <DetailPair label="Qualification" value={renderInfo(user.qualification)} />
                        <DetailPair label="Years of Experience" value={`${user.years_of_experience || 0} years`} />
                        <DetailPair label="License Number" value={renderInfo(user.license_number)} />
                        <DetailPair label="Consultation Fee (₹)" value={user.consultation_fee || 'N/A'} />
                        <div className="col-span-2">
                             <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Professional Bio</h4>
                             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{renderInfo(user.professional_bio)}</p>
                        </div>
                    </InfoSection>
                    
                    <InfoSection title="Education & Credentials" icon={<Award />}>
                        <div className="col-span-2">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Education</h4>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{renderInfo(user.education)}</p>
                        </div>
                        <div className="col-span-2 mt-4">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Certifications</h4>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{renderInfo(user.certifications)}</p>
                        </div>
                        <div className="col-span-2 mt-4">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Research & Publications</h4>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{renderInfo(user.research_and_publications)}</p>
                        </div>
                    </InfoSection>
                </div>
            </div>

            {/* Modal Logic */}
            {isEditModalOpen && (
                <EditProfileModal user={user} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
            )}
        </div>
    );
};


const StatCard = ({ icon, label, value, color }) => {
    const colors = {
        blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10",
        yellow: "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-500/10",
        green: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/10",
        purple: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/10",
    };
    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg flex items-center gap-4 shadow-md transition-all hover:shadow-lg hover:scale-105">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, text }) => (
    <div className="flex items-start text-gray-700 dark:text-gray-300">
        {React.cloneElement(icon, { size: 16, className: "mr-3 mt-1 text-gray-400 dark:text-gray-500 flex-shrink-0" })}
        <span>{text}</span>
    </div>
);

const InfoSection = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold flex items-center mb-4 border-b border-gray-200 dark:border-slate-700 pb-3 text-gray-800 dark:text-white">
            {React.cloneElement(icon, { size: 20, className: "mr-3 text-blue-500 dark:text-blue-400" })}
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
        <p className="text-gray-800 dark:text-gray-300">{value}</p>
    </div>
);

export default DoctorProfilePage;