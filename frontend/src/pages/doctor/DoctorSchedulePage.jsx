

import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import dayjs from 'dayjs';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { LoaderCircle, User, Clock, Info, } from 'lucide-react';
import Modal from '../../components/Modal';

const localizer = dayjsLocalizer(dayjs);

const DoctorSchedulePage = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const fetchSchedule = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/api/appointments/doctor/schedule/');
            const formattedEvents = response.data.map(appt => {
                const start = dayjs(`${appt.appointment_date}T${appt.appointment_time}`).toDate();
                const end = dayjs(start).add(30, 'minute').toDate();
                let title = 'Blocked Time';
                if (appt.event_type === 'appointment' && appt.patient) {
                    title = `Appt. with ${appt.patient.full_name}`;
                } else if (appt.reason) {
                    title = `Blocked: ${appt.reason}`;
                }
                return { id: appt.id, title, start, end, resource: appt };
            });
            setEvents(formattedEvents);
        } catch (error) {
            toast.error("Failed to fetch schedule.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event.resource);
        setIsModalOpen(true);
    };

    const eventStyleGetter = (event) => {
        const resource = event.resource;
        let className = 'bg-blue-500'; // Default (Confirmed)

        if (resource.event_type === 'blocked') {
            className = 'bg-gray-500';
        } else if (resource.status === 'Pending') {
            className = 'bg-yellow-500';
        } else if (resource.status === 'Cancelled') {
            className = 'bg-red-500 line-through'; // Add line-through for cancelled
        } else if (resource.status === 'Completed') {
            className = 'bg-green-600';
        }

        return { className: `${className} text-white p-1 border-none` };
    };

    const CustomToolbar = (toolbar) => {
        const goToBack = () => toolbar.onNavigate('PREV');
        const goToNext = () => toolbar.onNavigate('NEXT');
        const goToCurrent = () => toolbar.onNavigate('TODAY');
        
        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={goToBack}>Back</button>
                    <button type="button" onClick={goToCurrent}>Today</button>
                    <button type="button" onClick={goToNext}>Next</button>
                </span>
                <span className="rbc-toolbar-label">{toolbar.label}</span>
                <span className="rbc-btn-group">
                    {
                        ['month', 'week', 'day', 'agenda'].map(view => (
                            <button
                                key={view}
                                type="button"
                                className={toolbar.view === view ? 'rbc-active' : ''}
                                onClick={() => toolbar.onView(view)}
                            >
                                {view.charAt(0).toUpperCase() + view.slice(1)}
                            </button>
                        ))
                    }
                </span>
            </div>
        );
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><LoaderCircle className="h-10 w-10 animate-spin text-blue-500" /></div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-[calc(100vh-8rem)] flex flex-col">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ flex: 1 }}
                views={['month', 'week', 'day', 'agenda']}
                defaultView={Views.WEEK}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                components={{
                    toolbar: CustomToolbar,
                }}
            />

            {selectedEvent && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Event Details">
                    <div className="space-y-4">
                        {selectedEvent.event_type === 'appointment' ? (
                            <>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Appointment Details</h3>
                                <p className="flex items-center text-gray-700 dark:text-gray-300"><User className="mr-3 h-5 w-5 text-blue-500" /> Patient: <strong className="ml-2">{selectedEvent.patient?.full_name || 'N/A'}</strong></p>
                                <p className="flex items-center text-gray-700 dark:text-gray-300"><Clock className="mr-3 h-5 w-5 text-blue-500" /> Time: <strong className="ml-2">{dayjs(`${selectedEvent.appointment_date}T${selectedEvent.appointment_time}`).format('MMM D, YYYY [at] h:mm A')}</strong></p>
                                <p className="flex items-center text-gray-700 dark:text-gray-300"><Info className="mr-3 h-5 w-5 text-blue-500" /> Status: <strong className="ml-2">{selectedEvent.status}</strong></p>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md mt-2">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">Reason for Visit:</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.reason || "No reason provided."}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Blocked Time</h3>
                                <p className="flex items-center text-gray-700 dark:text-gray-300"><Clock className="mr-3 h-5 w-5 text-gray-500" /> Time: <strong className="ml-2">{dayjs(`${selectedEvent.appointment_date}T${selectedEvent.appointment_time}`).format('MMM D, YYYY [at] h:mm A')}</strong></p>
                                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md mt-2">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">Reason:</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.reason || "Personal Block"}</p>
                                </div>
                            </>
                        )}
                        <div className="flex justify-end pt-4 border-t dark:border-gray-600 mt-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">Close</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default DoctorSchedulePage;