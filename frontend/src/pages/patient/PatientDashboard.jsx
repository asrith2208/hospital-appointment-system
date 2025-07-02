
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { CalendarPlus, History, UserCog, LoaderCircle, Calendar, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get('/appointments/patient/dashboard/');
                setDashboardData(response.data);
            } catch (error) {
                toast.error("Failed to load dashboard data.");
                console.error("Dashboard fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><LoaderCircle className="h-10 w-10 animate-spin text-blue-500" /></div>;
    }

    const upcomingAppointments = dashboardData?.upcoming_appointments || [];

    return (
        <div className="space-y-8">
            {/* Welcome Header and Main CTA */}
            <div className="bg-blue-600 dark:bg-blue-700 text-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Welcome, {user?.full_name}!</h1>
                    <p className="mt-2 text-blue-100">Ready to take care of your health? Book your next visit today.</p>
                </div>
                <button
                    onClick={() => navigate('/patient/book-appointment')}
                    className="flex items-center mt-4 md:mt-0 bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-transform transform hover:scale-105"
                >
                    <CalendarPlus className="mr-2" />
                    Book New Appointment
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Appointments List */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Your Upcoming Appointments</h2>
                    {upcomingAppointments.length > 0 ? (
                        <ul className="space-y-4">
                            {upcomingAppointments.map(appt => (
                                <li key={appt.id} className="p-4 border rounded-md dark:border-gray-700 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-white">Dr. {appt.doctor.full_name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{appt.doctor.specialization}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            {new Date(appt.appointment_date + 'T00:00:00').toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                            <Clock className="h-4 w-4 mr-2" />
                                            {appt.appointment_time.slice(0, 5)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center py-10 text-gray-500 dark:text-gray-400">
                            You have no upcoming appointments.
                        </p>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <ActionCard 
                        icon={<History />} 
                        title="View Medical History" 
                        description="Access past appointments and reports." 
                        onClick={() => navigate('/patient/history')}
                    />
                    <ActionCard 
                        icon={<UserCog />} 
                        title="Manage Profile" 
                        description="Update your personal details." 
                        onClick={() => navigate('/patient/profile')}
                    />
                </div>
            </div>
        </div>
    );
};

const ActionCard = ({ icon, title, description, onClick }) => (
    <button
        onClick={onClick}
        className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mr-4">
            {React.cloneElement(icon, { className: 'h-6 w-6 text-gray-600 dark:text-gray-300' })}
        </div>
        <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
    </button>
);

export default PatientDashboard;