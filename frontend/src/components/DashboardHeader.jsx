import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import toast from 'react-hot-toast';

dayjs.extend(relativeTime);

const DashboardHeader = ({ theme, setTheme }) => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();
    
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); 

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get('/core/notifications/');
                setNotifications(response.data);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };

        if (user) {
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 60000);
            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMarkAsRead = async (notificationId) => {

        const updatedNotifications = notifications.map(n => 
            n.id === notificationId ? { ...n, is_read: true } : n
        );
        setNotifications(updatedNotifications);
        
        try {
            await axiosInstance.post(`/core/notifications/${notificationId}/mark-as-read/`);
        } catch (error) {
            console.error("Failed to mark notification as read", error);
            toast.error("Could not update notification status.");
        }
    };

    const handleNotificationClick = (notification) => {
        if (!notification.is_read) {
            handleMarkAsRead(notification.id);
        }
        if (notification.link) {
            navigate(notification.link);
        }
        setIsDropdownOpen(false); 
    };
    
    const unreadCount = notifications.filter(n => !n.is_read).length;

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome, {user?.full_name || 'User'}!</h1>
            </div>
            <div className="flex items-center space-x-6">
                <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                
                {/* Notification Bell with outside click handling */}
                <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="relative text-gray-500 dark:text-gray-400">
                        <Bell size={22} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 text-white text-xs flex items-center justify-center">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Dropdown Menu with Transition */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl z-20">
                            <div className="p-3 border-b dark:border-gray-600">
                                <h4 className="font-semibold text-gray-800 dark:text-white">Notifications</h4>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map(notif => (
                                        <div
                                            key={notif.id}
                                            onClick={() => handleNotificationClick(notif)}
                                            className="p-3 flex items-start hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b dark:border-gray-700 last:border-b-0"
                                        >
                                            <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 ${!notif.is_read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                                            <div className="ml-3 w-full">
                                                <p className="text-sm text-gray-800 dark:text-gray-200">{notif.message}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{dayjs(notif.created_at).fromNow()}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="p-4 text-sm text-gray-500 dark:text-gray-400">You have no new notifications.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                
                <button onClick={logoutUser} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;