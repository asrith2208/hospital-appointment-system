
import React from 'react';
import { FileDown, BarChart2, Users, DollarSign } from 'lucide-react';

const ReportsPage = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Generate Reports</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Select a report type to generate and download.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ReportCard
                    icon={<BarChart2 />}
                    title="Appointment Summary"
                    description="Get a summary of all appointments within a date range."
                />
                <ReportCard
                    icon={<Users />}
                    title="Doctor Performance"
                    description="Analyze appointment counts and ratings per doctor."
                />
                <ReportCard
                    icon={<DollarSign />}
                    title="Revenue Report"
                    description="Track revenue from consultation fees over time."
                />
            </div>
        </div>
    );
};

const ReportCard = ({ icon, title, description }) => (
    <div className="p-6 border rounded-lg dark:border-gray-700 flex flex-col items-start">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-500 rounded-lg mb-4">
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 flex-grow mb-4">{description}</p>
        <button className="flex items-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">
            <FileDown className="h-4 w-4 mr-2" />
            Generate
        </button>
    </div>
);

export default ReportsPage;