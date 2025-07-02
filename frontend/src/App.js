

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

import Header from './components/Header';
import Footer from './components/Footer'; 

import DashboardLayout from './layouts/DashboardLayout';

import ProtectedRoute from './utils/ProtectedRoute';

import WelcomePage from './pages/WelcomePage';
import LearnMorePage from './pages/LearnMorePage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPatientPage from './pages/auth/RegisterPatientPage';
import RegisterDoctorPage from './pages/auth/RegisterDoctorPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointmentPage from './pages/patient/BookAppointmentPage';
import MedicalHistoryPage from './pages/patient/MedicalHistoryPage';
import PatientProfilePage from './pages/patient/PatientProfilePage';
import MessagesPage from './pages/patient/MessagesPage';

import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointmentsPage from './pages/doctor/DoctorAppointmentsPage';
import DoctorProfilePage from './pages/doctor/DoctorProfilePage';
import DoctorSchedulePage from './pages/doctor/DoctorSchedulePage';
import DoctorPatientsPage from './pages/doctor/DoctorPatientsPage';

import UserManagementPage from './pages/admin/UserManagementPage';
import SchedulingPage from './pages/admin/SchedulingPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';
import AdminSchedulingPage from './pages/admin/AdminSchedulingPage';
import AuditLogPage from './pages/admin/AuditLogPage';
import HelpPage from './pages/HelpPage';


function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const AppLayout = ({ children }) => (
        <div className="flex flex-col min-h-screen">
            <Header theme={theme} setTheme={setTheme} />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );

    return (
        <>
            <Toaster position="top-right" toastOptions={{ className: 'dark:bg-gray-700 dark:text-white' }} />
            <Routes>
                {/* Public Routes with the AppLayout */}
                <Route path="/" element={<AppLayout><WelcomePage /></AppLayout>} />
                <Route path="/learn-more" element={<AppLayout><LearnMorePage /></AppLayout>} />

                {/* Auth Routes (no layout) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPatientPage />} />
                <Route path="/register-doctor" element={<RegisterDoctorPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />


                {/* Patient Routes */}
                <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
                    <Route element={<DashboardLayout theme={theme} setTheme={setTheme} />}>
                        <Route path="/patient/dashboard" element={<PatientDashboard />} />
                        <Route path="/patient/book-appointment" element={<BookAppointmentPage />} />  
                        <Route path="/patient/history" element={<MedicalHistoryPage />} /> 
                        <Route path="/patient/messages" element={<MessagesPage />} />
                        <Route path="/patient/profile" element={<PatientProfilePage />} />
                        
                    </Route>
                </Route>

                {/* Doctor Routes */}
                <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
                    <Route element={<DashboardLayout theme={theme} setTheme={setTheme} />}>
                        <Route path="/doctor/dashboard" element={<DoctorDashboard />}  />
                        <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
                        <Route path="/doctor/schedule" element={<DoctorSchedulePage />} />
                        <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
                        <Route path="/doctor/profile" element={<DoctorProfilePage />} />

                    </Route>
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route element={<DashboardLayout theme={theme} setTheme={setTheme} />}>
                        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                        <Route path="/admin/users" element={<UserManagementPage />} />               
                        <Route path="/admin/scheduling" element={<SchedulingPage />} />
                        <Route path="/admin/reports" element={<ReportsPage />} />
                        <Route path="/admin/settings" element={<SettingsPage />} />
                        <Route path="/admin/scheduling" element={<AdminSchedulingPage />} />
                        <Route path="/admin/audit-logs" element={<AuditLogPage />} />
                    </Route>
                </Route>

                {/* Help Page */}
                <Route element={<ProtectedRoute allowedRoles={['admin', 'doctor', 'patient']} />}>
          <Route element={<DashboardLayout theme={theme} setTheme={setTheme} />}>
            <Route path="/help" element={<HelpPage />} />
          </Route>
        </Route>

                <Route path="*" element={
                    <div className="h-screen flex items-center justify-center">
                        <h1 className="text-4xl font-bold">404: Page Not Found</h1>
                    </div>
                } />
            </Routes>
        </>
    );
}

export default App;