

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import Modal from '../../components/Modal'; // Assuming Modal component exists
import DatePicker from 'react-datepicker'; // We need the date picker for the modal

const AdminSchedulingPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isPostponeModalOpen, setIsPostponeModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [newDate, setNewDate] = useState(new Date());
    const [newTime, setNewTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchAppointments = async () => {
        setIsLoading(true);
        try {

            const response = await axiosInstance.get('/api/appointments/admin-manage/');
            setAppointments(response.data);
        } catch (error) {
            toast.error("Failed to fetch appointments.");
            console.error("Fetch appointments error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCancelAppointment = async (appointmentId) => {
        if (window.confirm("Are you sure you want to cancel this appointment? An email will be sent to the patient and doctor.")) {
            try {

                await axiosInstance.patch(`/api/appointments/admin-manage/${appointmentId}/`, {
                    status: 'Cancelled'
                });
                toast.success("Appointment cancelled successfully.");
                fetchAppointments(); // Re-fetch the list to show the change
            } catch (error) {
                toast.error("Failed to cancel appointment.");
            }
        }
    };

    const handleOpenPostponeModal = (appointment) => {
        setSelectedAppointment(appointment);

        setNewDate(new Date(appointment.appointment_date + 'T00:00:00')); // Add T00:00:00 to avoid timezone issues
        setNewTime(appointment.appointment_time.slice(0, 5)); // Format as HH:MM
        setIsPostponeModalOpen(true);
    };

    const handleClosePostponeModal = () => {
        setIsPostponeModalOpen(false);
        setSelectedAppointment(null);
    };

    const handlePostponeSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        if (!newTime) {
            toast.error("Please select a new time.");
            setIsSubmitting(false);
            return;
        }

        try {


            await axiosInstance.patch(`/api/appointments/admin-manage/${selectedAppointment.id}/`, {
                appointment_date: newDate.toISOString().split('T')[0],
                appointment_time: newTime,
            });
            toast.success("Appointment rescheduled successfully! Notifications sent.");
            handleClosePostponeModal();
            fetchAppointments(); // Re-fetch to show the updated status
        } catch (error) {
            toast.error("Failed to reschedule appointment.");
            console.error("Reschedule error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Manage All Appointments</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Patient</th>
                            <th className="px-6 py-3">Doctor</th>
                            <th className="px-6 py-3">Date & Time</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="5" className="text-center py-8"><LoaderCircle className="h-8 w-8 animate-spin mx-auto" /></td></tr>
                        ) : appointments.map(appt => (
                            <tr key={appt.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{appt.patient.full_name}</td>
                                <td className="px-6 py-4">{appt.doctor.full_name}</td>
                                <td className="px-6 py-4">{appt.appointment_date} at {appt.appointment_time.slice(0, 5)}</td>
                                <td className="px-6 py-4">{appt.status}</td>
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => handleCancelAppointment(appt.id)} 
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        disabled={appt.status === 'Cancelled' || appt.status === 'Completed'}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={() => handleOpenPostponeModal(appt)} 
                                        className="ml-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        disabled={appt.status === 'Cancelled' || appt.status === 'Completed'}
                                    >
                                        Postpone
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- The Postpone Modal, which only renders when an appointment is selected --- */}
            {selectedAppointment && (
                <Modal isOpen={isPostponeModalOpen} onClose={handleClosePostponeModal} title="Reschedule Appointment">
                    <form onSubmit={handlePostponeSubmit} className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Rescheduling for <span className="font-bold">{selectedAppointment.patient.full_name}</span> with <span className="font-bold">Dr. {selectedAppointment.doctor.full_name}</span>.
                            The status will be set to "Pending" for re-confirmation.
                        </p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select New Date</label>
                            <DatePicker 
                                selected={newDate} 
                                onChange={(date) => setNewDate(date)} 
                                className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                minDate={new Date()} // Prevent selecting past dates
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select New Time (HH:MM)</label>
                            <input 
                                type="time" 
                                value={newTime} 
                                onChange={(e) => setNewTime(e.target.value)} 
                                className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                        <div className="flex justify-end pt-4 border-t dark:border-gray-700 mt-6">
                            <button type="button" onClick={handleClosePostponeModal} className="mr-2 px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300">
                                Cancel
                            </button>
                            <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center">
                                {isSubmitting && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />}
                                {isSubmitting ? 'Rescheduling...' : 'Confirm Reschedule'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default AdminSchedulingPage;