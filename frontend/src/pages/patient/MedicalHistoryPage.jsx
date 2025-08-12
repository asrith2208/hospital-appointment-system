import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { LoaderCircle, CheckCircle, XCircle, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const MedicalHistoryPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get('/api/appointments/history/');
                setAppointments(response.data);
            } catch (error) {
                toast.error("Failed to fetch medical history.");
                console.error("Fetch history error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const toggleDetails = (id) => {
        setExpandedId(prevId => (prevId === id ? null : id));
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <CheckCircle className="text-green-500" />;
            case 'Confirmed': return <CheckCircle className="text-blue-500" />;
            case 'Cancelled': return <XCircle className="text-red-500" />;
            case 'Pending': default: return <Clock className="text-yellow-500" />;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Medical History</h1>

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <LoaderCircle className="h-10 w-10 animate-spin text-blue-500" />
                </div>
            ) : appointments.length > 0 ? (
                <div className="space-y-6">
                    {appointments.map(appt => (
                        <div key={appt.id} className="p-5 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800/50 transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                <div className="mb-2 sm:mb-0">
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                        Appointment with Dr. {appt.doctor.full_name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {appt.doctor.specialization}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium"
                                    style={{ /* ... inline styles for status colors ... */ }}>
                                    {getStatusIcon(appt.status)}
                                    <span>{appt.status}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t dark:border-gray-700">
                                <div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>{new Date(appt.appointment_date + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Clock className="h-4 w-4 mr-2" />
                                        <span>{appt.appointment_time.slice(0, 5)}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Reason for visit:</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{appt.reason || "No reason provided."}</p>
                                </div>
                            </div>

                            {(appt.consultation_notes || appt.prescription) && (
                                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                                    {/* The button to toggle visibility */}
                                    <button 
                                        onClick={() => toggleDetails(appt.id)}
                                        className="flex items-center justify-between w-full text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                    >
                                        <span>View Consultation Details</span>
                                        {expandedId === appt.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </button>

                                    {/* The collapsible details section */}
                                    {expandedId === appt.id && (
                                        <div className="mt-4 space-y-4 animate-fade-in">
                                            {appt.consultation_notes && (
                                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">Consultation Notes</h4>
                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{appt.consultation_notes}</p>
                                                </div>
                                            )}
                                            {appt.prescription && (
                                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">Prescription</h4>
                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{appt.prescription}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400">You have no appointment history yet.</p>
                </div>
            )}
        </div>
    );
};

export default MedicalHistoryPage;