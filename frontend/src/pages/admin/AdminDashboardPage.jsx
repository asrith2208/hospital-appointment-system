import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Calendar, BarChart2, BellRing, UserCheck, Settings, LoaderCircle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
dayjs.extend(relativeTime);

const AdminDashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {

                const response = await axiosInstance.get('/users/admin/dashboard-data/');
                setDashboardData(response.data);
            } catch (error) {
                toast.error("Failed to load dashboard data.");
                console.error("Dashboard fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    
    
    const chartData = {
        labels: dashboardData?.appointmentTrends?.labels || [],
        datasets: [{
            label: 'Appointments',
            data: dashboardData?.appointmentTrends?.data || [],
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgb(59, 130, 246)',
            tension: 0.3,
        }],
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><LoaderCircle className="h-10 w-10 animate-spin text-blue-500" /></div>;
    }

    return (
        <div className="space-y-8">
            
            <QuickActions navigate={navigate} />

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<Calendar />} title="Total Appointments" value={dashboardData?.totalAppointments} color="blue" />
                <StatCard icon={<UserPlus />} title="Active Doctors" value={dashboardData?.totalDoctors} color="green" />
                <StatCard icon={<Users />} title="Registered Patients" value={dashboardData?.totalPatients} color="indigo" />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Appointment Trends</h3>
                    <Line data={chartData} />
                </div>

                <div className="space-y-8">
                    <DoctorsOnDuty doctors={dashboardData?.doctorsOnDuty} />
                    <RecentActivity activities={dashboardData?.recentActivity} />
                </div>
            </div>
        </div>
    );
};



const QuickActions = ({ navigate }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionCard title="Manage Users" icon={<Users />} onClick={() => navigate('/admin/users')} />
        <ActionCard title="Manage Schedule" icon={<Calendar />} onClick={() => navigate('/admin/scheduling')} />
        <ActionCard title="View Reports" icon={<BarChart2 />} onClick={() => navigate('/admin/reports')} />
        <ActionCard title="System Settings" icon={<Settings />} onClick={() => navigate('/admin/settings')} />
    </div>
);

const ActionCard = ({ title, icon, onClick }) => (
    <button onClick={onClick} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full text-blue-500 mb-2">
            {icon}
        </div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</p>
    </button>
);


const StatCard = ({ icon, title, value, color }) => {
    const colorClasses = { blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-500', green: 'bg-green-100 dark:bg-green-900/50 text-green-500', indigo: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500' };
    return <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center"><div className={`p-4 rounded-full ${colorClasses[color]}`}>{React.cloneElement(icon, { className: 'h-8 w-8' })}</div><div className="ml-4"><p className="text-sm text-gray-500 dark:text-gray-400">{title}</p><p className="text-3xl font-bold text-gray-800 dark:text-white">{value ?? '0'}</p></div></div>;
};


const DoctorsOnDuty = ({ doctors }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
            <UserCheck className="mr-2 h-5 w-5 text-green-500" />
            Doctors On Duty Today
        </h3>
        <ul className="space-y-3">
            {doctors && doctors.length > 0 ? doctors.map((doc, index) => (
                <li key={index} className="flex items-center text-sm">
                    <span className="font-semibold mr-2">Dr. {doc.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{doc.specialization}</span>
                </li>
            )) : <p className="text-sm text-gray-500">No doctors have confirmed appointments today.</p>}
        </ul>
    </div>
);


const RecentActivity = ({ activities }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BellRing className="mr-2 h-5 w-5 text-yellow-500" />
            Recent Activity
        </h3>
        <ul className="space-y-4">
            {activities && activities.length > 0 ? activities.map((act, index) => (
                <li key={index} className="text-sm">
                    <p className="font-medium text-gray-700 dark:text-gray-300">{act.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        by {act.user} - {dayjs(act.timestamp).fromNow()}
                    </p>
                </li>
            )) : <p className="text-sm text-gray-500">No recent activity to show.</p>}
        </ul>
    </div>
);

export default AdminDashboardPage;