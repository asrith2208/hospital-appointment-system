

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { LoaderCircle, FilePlus } from 'lucide-react';

const DoctorAppointmentsPage = () => {

    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('Upcoming');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [notes, setNotes] = useState('');
    const [prescription, setPrescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true);
            try {

                const response = await axiosInstance.get('/api/appointments/manage/');
                setAppointments(response.data);
            } catch (error) {
                toast.error("Failed to fetch appointments.");
                console.error("Fetch appointments error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const handleStatusChange = async (appointmentId, newStatus) => {
        const originalAppointments = [...appointments];
        const updatedAppointments = appointments.map(appt =>
            appt.id === appointmentId ? { ...appt, status: newStatus } : appt
        );
        setAppointments(updatedAppointments);

        try {
            await axiosInstance.patch(`/api/appointments/manage/${appointmentId}/`, {
                status: newStatus
            });
            toast.success("Appointment status updated!");
        } catch (error) {
            toast.error("Failed to update status.");
            setAppointments(originalAppointments); // Revert on failure
        }
    };

    const openNotesModal = (appointment) => {
        setSelectedAppointment(appointment);
        setNotes(appointment.consultation_notes || '');
        setPrescription(appointment.prescription || '');
        setIsModalOpen(true);
    };

    const handleSaveNotes = async () => {
        if (!selectedAppointment) return;
        setIsSaving(true);
        try {
            const payload = {
                consultation_notes: notes,
                prescription: prescription,
            };
            const response = await axiosInstance.patch(`/api/appointments/manage/${selectedAppointment.id}/`, payload);

            setAppointments(prev => prev.map(appt =>
                appt.id === selectedAppointment.id ? { ...appt, ...response.data } : appt
            ));

            toast.success("Details saved successfully!");
            setIsModalOpen(false); // Close modal
        } catch (error) {
            toast.error("Failed to save details.");
        } finally {
            setIsSaving(false);
        }
    };

    const getFilteredAppointments = () => {
        const today = new Date().toISOString().split('T')[0];
        if (filter === 'Upcoming') {
            return appointments.filter(a => (a.status === 'Pending' || a.status === 'Confirmed') && a.appointment_date >= today);
        }
        if (filter === 'Completed') {
            return appointments.filter(a => a.status === 'Completed' || (a.status === 'Confirmed' && a.appointment_date < today));
        }
        if (filter === 'Cancelled') {
            return appointments.filter(a => a.status === 'Cancelled');
        }
        return appointments;
    };
    
    const filteredAppointments = getFilteredAppointments();

    return (
        <>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Appointments</h1>

                {/* Filter Tabs */}
                <div className="flex space-x-1 border-b dark:border-gray-700 mb-6">
                    {['Upcoming', 'Completed', 'Cancelled'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${
                                filter === tab 
                                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Appointments Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Patient</th>
                                <th scope="col" className="px-6 py-3">Date & Time</th>
                                <th scope="col" className="px-6 py-3">Reason</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="5" className="text-center py-8"><LoaderCircle className="h-8 w-8 animate-spin mx-auto" /></td></tr>
                            ) : filteredAppointments.length > 0 ? filteredAppointments.map(appt => (
                                <tr key={appt.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{appt.patient.full_name}</td>
                                    <td className="px-6 py-4">{appt.appointment_date} at {appt.appointment_time.slice(0, 5)}</td>
                                    <td className="px-6 py-4 truncate max-w-xs">{appt.reason || 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        <select 
                                            value={appt.status}
                                            onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                                            className={`p-1.5 text-xs rounded-md border-0 focus:ring-2 focus:ring-blue-500 ${
                                                appt.status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                                                appt.status === 'Cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                                                appt.status === 'Completed' ? 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300' :
                                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                            }`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => openNotesModal(appt)}
                                            className="flex items-center text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={appt.status === 'Pending' || appt.status === 'Cancelled'}
                                            title={appt.status === 'Pending' || appt.status === 'Cancelled' ? 'Confirm appointment to add notes' : 'Add/Edit Notes'}
                                        >
                                            <FilePlus className="h-3 w-3 mr-1" />
                                            {appt.consultation_notes ? 'View/Edit' : 'Add Notes'}
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="text-center py-8">No {filter.toLowerCase()} appointments found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Adding/Editing Notes and Prescription */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 transform transition-all">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Consultation Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Consultation Notes</label>
                                <textarea
                                    id="notes"
                                    rows="6"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Enter patient symptoms, diagnosis, and advice..."
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="prescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prescription</label>
                                <textarea
                                    id="prescription"
                                    rows="4"
                                    value={prescription}
                                    onChange={(e) => setPrescription(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="e.g., Paracetamol 500mg - 1 tablet twice a day for 3 days"
                                ></textarea>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md border dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                            <button type="button" onClick={handleSaveNotes} disabled={isSaving} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 flex items-center">
                                {isSaving && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />}
                                Save Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DoctorAppointmentsPage;