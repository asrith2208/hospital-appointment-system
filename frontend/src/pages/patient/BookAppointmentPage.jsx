
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { Stethoscope, Calendar, LoaderCircle, MessageSquare } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance'; 
const BookAppointmentPage = () => {
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [reason, setReason] = useState('');

    const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            setIsLoadingDoctors(true);
            try {
                const response = await axiosInstance.get('/users/doctors/');
                setDoctors(response.data);
            } catch (error) {
                toast.error('Could not fetch doctors.');
                console.error("Doctor fetch error:", error);
            } finally {
                setIsLoadingDoctors(false);
            }
        };
        fetchDoctors();
    }, []);


     useEffect(() => {
        if (selectedDoctor && selectedDate) {
            const fetchAvailability = async () => {
                setIsLoadingSlots(true);
                setAvailableSlots([]);
                setSelectedSlot('');
                try {
                    const dateStr = selectedDate.toISOString().split('T')[0];
                    const response = await axiosInstance.get('/appointments/availability/', {
                        params: { doctor_id: selectedDoctor, date: dateStr },
                    });
                    setAvailableSlots(response.data);
                } catch (error) {
                    toast.error('Could not fetch slots for this date.');
                    console.error("Availability fetch error:", error);
                } finally {
                    setIsLoadingSlots(false);
                }
            };
            fetchAvailability();
        }
    }, [selectedDoctor, selectedDate]);

     const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSlot) {
            toast.error('Please select a time slot.');
            return;
        }
        setIsBooking(true);
        try {
            await axiosInstance.post('/appointments/book/', {
                doctor: selectedDoctor,
                appointment_date: selectedDate.toISOString().split('T')[0],
                appointment_time: selectedSlot,
                reason: reason,
            });
            toast.success('Appointment booked successfully!');
            navigate('/patient/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Booking failed.');
            console.error("Booking submission error:", error);
        } finally {
            setIsBooking(false);
        }
    };

  
     return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Book an Appointment</h1>
            <form onSubmit={handleBookingSubmit} className="space-y-8">
 
                <div className="p-6 border rounded-lg dark:border-gray-700">
                    <label className="flex items-center text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                        <Stethoscope className="mr-3 h-6 w-6 text-blue-500"/>
                        Step 1: Choose a Doctor
                    </label>
                    <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" disabled={isLoadingDoctors}>
                        <option value="">{isLoadingDoctors ? 'Loading doctors...' : 'Select a doctor'}</option>
                        {doctors.map(doc => <option key={doc.id} value={doc.id}>Dr. {doc.full_name} ({doc.specialization})</option>)}
                    </select>
                </div>
                {selectedDoctor && <div className="p-6 border rounded-lg dark:border-gray-700">
                    <label className="flex items-center text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                        <Calendar className="mr-3 h-6 w-6 text-blue-500"/>
                        Step 2: Select a Date & Time
                    </label>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-medium mb-2 text-gray-600 dark:text-gray-400">Select Date:</h4>
                            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} minDate={new Date()} inline className="bg-gray-100 dark:bg-gray-700" />
                        </div>
                        <div>
                            <h4 className="font-medium mb-2 text-gray-600 dark:text-gray-400">Available Slots:</h4>
                            {isLoadingSlots ? <div className="flex items-center justify-center h-full"><LoaderCircle className="animate-spin text-blue-500" /></div> : <div className="grid grid-cols-3 gap-2">
                                {availableSlots.length > 0 ? availableSlots.map(slot => <button type="button" key={slot} onClick={() => setSelectedSlot(slot)} className={`p-2 rounded-md text-sm transition-colors ${selectedSlot === slot ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600'}`}>{slot}</button>) : <p className="col-span-3 text-sm text-gray-500">{selectedDate ? 'No slots available for this date.' : 'Please select a date.'}</p>}
                            </div>}
                        </div>
                    </div>
                </div>}
                {selectedSlot && <div className="p-6 border rounded-lg dark:border-gray-700">
                    <label className="flex items-center text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                        <MessageSquare className="mr-3 h-6 w-6 text-blue-500"/>
                        Step 3: Reason for Visit
                    </label>
                    <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="4" placeholder="Briefly describe your health concern (optional)..." className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>}
                <div className="flex justify-end">
                    <button type="submit" disabled={!selectedSlot || isBooking} className="flex items-center px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isBooking ? <LoaderCircle className="animate-spin mr-2" /> : null}
                        {isBooking ? 'Booking...' : 'Confirm Appointment'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookAppointmentPage;