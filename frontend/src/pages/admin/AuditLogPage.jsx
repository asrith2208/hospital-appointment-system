
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import dayjs from 'dayjs';

const AuditLogPage = () => {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get('/core/audit-logs/');
                setLogs(response.data);
            } catch (error) {
                toast.error("Failed to fetch audit logs.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">System Audit Logs</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    
                    <thead>
                        <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                            <th className="px-6 py-3">Timestamp</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="3" className="text-center py-8"><LoaderCircle className="h-8 w-8 animate-spin mx-auto" /></td></tr>
                        ) : logs.map(log => (
                            <tr key={log.id} className="border-b dark:border-gray-700">
                                <td className="px-6 py-4">{dayjs(log.timestamp).format('MMM D, YYYY h:mm A')}</td>
                                <td className="px-6 py-4">{log.user || 'System'}</td>
                                <td className="px-6 py-4">{log.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLogPage;