

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { LoaderCircle, Save } from 'lucide-react';

const DAYS_OF_WEEK = [
    { id: 0, name: 'Monday' }, { id: 1, name: 'Tuesday' }, { id: 2, name: 'Wednesday' },
    { id: 3, name: 'Thursday' }, { id: 4, name: 'Friday' }, { id: 5, name: 'Saturday' },
    { id: 6, name: 'Sunday' },
];

const SchedulingPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [schedule, setSchedule] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchDoctors = async () => {
            try {
                const response = await axiosInstance.get('/users/doctors/');
                setDoctors(response.data);
            } catch (error) {
                toast.error("Failed to fetch doctors.");
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {

        if (selectedDoctorId) {
            const fetchSchedule = async () => {
                setIsLoading(true);
                try {
                    const response = await axiosInstance.get(`/users/schedules/?doctor=${selectedDoctorId}`);

                    const formattedSchedule = response.data.reduce((acc, curr) => {
                        acc[curr.day_of_week] = { 
                            id: curr.id, // Store id for updates
                            start_time: curr.start_time.slice(0, 5), 
                            end_time: curr.end_time.slice(0, 5) 
                        };
                        return acc;
                    }, {});
                    setSchedule(formattedSchedule);
                } catch (error) {
                    toast.error("Failed to fetch schedule for this doctor.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchSchedule();
        } else {
            setSchedule({}); // Clear schedule if no doctor is selected
        }
    }, [selectedDoctorId]);

    const handleTimeChange = (dayId, timeType, value) => {
        setSchedule(prev => ({
            ...prev,
            [dayId]: { ...prev[dayId], [timeType]: value }
        }));
    };

    const handleSaveSchedule = async (dayId) => {
        const daySchedule = schedule[dayId];
        if (!daySchedule || !daySchedule.start_time || !daySchedule.end_time) {
            toast.error("Please set both start and end times.");
            return;
        }

        const payload = {
            doctor: selectedDoctorId,
            day_of_week: dayId,
            start_time: daySchedule.start_time,
            end_time: daySchedule.end_time,
        };

        try {


            if (daySchedule.id) {
                await axiosInstance.patch(`/users/schedules/${daySchedule.id}/`, payload);
            } else {
                await axiosInstance.post('/users/schedules/', payload);
            }
            toast.success(`${DAYS_OF_WEEK[dayId].name}'s schedule saved!`);
        } catch (error) {
            toast.error("Failed to save schedule.");
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Doctor Scheduling</h1>

            <div className="mb-6 max-w-sm">
                <label htmlFor="doctor-select" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Select a Doctor to Manage Schedule</label>
                <select
                    id="doctor-select"
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">-- Select Doctor --</option>
                    {doctors.map(doc => <option key={doc.id} value={doc.id}>Dr. {doc.full_name}</option>)}
                </select>
            </div>
            
            {selectedDoctorId && (
                isLoading ? <LoaderCircle className="animate-spin" /> : (
                    <div className="space-y-4">
                        {DAYS_OF_WEEK.map(day => (
                            <div key={day.id} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                                <span className="font-semibold w-24">{day.name}</span>
                                <div className="flex items-center gap-4">
                                    <input type="time" value={schedule[day.id]?.start_time || ''} onChange={e => handleTimeChange(day.id, 'start_time', e.target.value)} className="p-1 border rounded dark:bg-gray-600 dark:border-gray-500" />
                                    <span>to</span>
                                    <input type="time" value={schedule[day.id]?.end_time || ''} onChange={e => handleTimeChange(day.id, 'end_time', e.target.value)} className="p-1 border rounded dark:bg-gray-600 dark:border-gray-500" />
                                </div>
                                <button onClick={() => handleSaveSchedule(day.id)} className="p-2 text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
                                    <Save className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default SchedulingPage;