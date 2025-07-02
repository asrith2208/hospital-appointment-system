

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { ClipboardList, CheckSquare, Clock, LoaderCircle, Calendar } from 'lucide-react';

const DoctorDashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get('/api/appointments/doctor/dashboard/');
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

    if (!dashboardData) {
        return <p>Could not load dashboard data.</p>;
    }

    const { stats, upcoming_appointments } = dashboardData;

    return (
        <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<ClipboardList />} title="Total Appointments Today" value={stats.total_today} color="blue" />
                <StatCard icon={<CheckSquare />} title="Completed Today" value={stats.completed_today} color="green" />
            </div>

            {/* Upcoming Appointments List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Upcoming Appointments</h2>
                    <button 
                        onClick={() => navigate('/doctor/appointments')}
                        className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        View Full Schedule
                        <Calendar className="h-4 w-4 ml-1" />
                    </button>
                </div>

                {upcoming_appointments.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {upcoming_appointments.map(appt => (
                            <li key={appt.id} className="py-4 flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-white">{appt.patient.full_name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Reason: {appt.reason || "General Check-up"}
                                    </p>
                                </div>
                                <div className="flex items-center text-gray-700 dark:text-gray-300">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span className="font-medium">{appt.appointment_time.slice(0, 5)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No more appointments for today.
                    </p>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-500',
        green: 'bg-green-100 dark:bg-green-900/50 text-green-500',
    };
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center">
            <div className={`p-4 rounded-full ${colorClasses[color]}`}>
                {React.cloneElement(icon, { className: 'h-8 w-8' })}
            </div>
            <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{value ?? '0'}</p>
            </div>
        </div>
    );
};


export default DoctorDashboardPage;