
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { LoaderCircle, Save } from 'lucide-react';

const SettingsPage = () => {
    const [settings, setSettings] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get('/admin/settings/');
                setSettings(response.data);
            } catch (error) {
                toast.error("Failed to load settings.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await axiosInstance.post('/admin/settings/', settings);
            toast.success("Settings saved successfully!");
        } catch (error) {
            toast.error("Failed to save settings.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <LoaderCircle className="animate-spin" />;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Hospital Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField label="Default Appointment Duration (minutes)" name="appointment_duration_minutes" type="number" value={settings.appointment_duration_minutes} onChange={handleChange} />
                <InputField label="Hospital Opening Time" name="hospital_open_time" type="time" value={settings.hospital_open_time} onChange={handleChange} />
                <InputField label="Hospital Closing Time" name="hospital_close_time" type="time" value={settings.hospital_close_time} onChange={handleChange} />
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cancellation Policy</label>
                    <textarea name="cancellation_policy" value={settings.cancellation_policy} onChange={handleChange} rows="4" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"></textarea>
                </div>
                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={isSaving} className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
                        {isSaving ? <LoaderCircle className="animate-spin mr-2" /> : <Save className="mr-2 h-5 w-5" />}
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};

const InputField = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <input className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500" {...props} />
    </div>
);

export default SettingsPage;