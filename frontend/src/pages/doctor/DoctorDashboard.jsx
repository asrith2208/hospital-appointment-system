
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { Users, Calendar, Clock, LoaderCircle } from 'lucide-react';

const DoctorDashboardPage = () => {
    const navigate = useNavigate();
   
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get('/appointments/doctor/dashboard/');
                setDashboardData(response.data);
            } catch (error) {
                toast.error("Could not fetch dashboard data.");
                console.error("Dashboard fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDoctorData();
    }, []); // This effect runs only once on page load

    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        const [h, m] = timeStr.split(':');
        const d = new Date(); d.setHours(parseInt(h), parseInt(m));
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="space-y-8">
            {/* Top Cards now read directly from dashboardData state */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={Calendar} title="Today's Appointments" value={dashboardData?.confirmedToday + dashboardData?.pendingToday || 0} color="blue" isLoading={isLoading} />
                <StatCard icon={Clock} title="Pending Confirmation" value={dashboardData?.pendingToday || 0} color="yellow" isLoading={isLoading} />
                <StatCard icon={Users} title="Total Upcoming" value={dashboardData?.totalUpcoming || 0} color="green" isLoading={isLoading} />
            </div>

            {/* Today's Appointments List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Today's Schedule</h3>
                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <LoaderCircle className="h-8 w-8 animate-spin" />
                    </div>
                ) : dashboardData?.todaysAppointments.length > 0 ? (
                    <div className="space-y-4">
                        {dashboardData.todaysAppointments.map(appt => (
                            <div key={appt.id} className="p-4 border dark:border-gray-700 rounded-lg flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div>
                                    <p className="font-bold text-lg text-gray-800 dark:text-white">{appt.patient.full_name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{appt.reason || 'No reason specified'}</p>
                                </div>
                                <div className="text-right flex items-center space-x-4">
                                    <p className="font-semibold text-lg text-blue-500 flex items-center">
                                        <Clock className="h-5 w-5 mr-2"/> {formatTime(appt.appointment_time)}
                                    </p>
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                        appt.status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                    }`}>
                                        {appt.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">You have no appointments scheduled for today.</p>
                    </div>
                )}
                 <div className="mt-6 text-right">
                    <button onClick={() => navigate('/doctor/appointments')} className="text-blue-500 font-semibold hover:underline">
                        View All Appointments
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, title, value, color, isLoading }) => {
    const colorClasses = {
        blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-500',
        green: 'bg-green-100 dark:bg-green-900/50 text-green-500',
        yellow: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-500',
    };
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
                <div className={`p-4 rounded-full ${colorClasses[color]}`}>
                    <Icon className="h-7 w-7" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">
                        {isLoading ? '...' : value}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboardPage;