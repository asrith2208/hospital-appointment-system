
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Calendar, BarChart2, Settings, ShieldAlert, BookMarked, MessageSquare, History, UserCog, LifeBuoy } from 'lucide-react';

const navLinks = {
  admin: [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Scheduling', path: '/admin/scheduling', icon: Calendar },
    { name: 'Reports', path: '/admin/reports', icon: BarChart2 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert },
  ],
  doctor: [
    { name: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'Appointments', path: '/doctor/appointments', icon: Calendar },
    { name: 'Schedule', path: '/doctor/schedule', icon: BookMarked },
    { name: 'Patients', path: '/doctor/patients', icon: Users },
    { name: 'Profile', path: '/doctor/profile', icon: UserCog },
  ],
  patient: [
    { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
    { name: 'Book Appointment', path: '/patient/book-appointment', icon: Calendar },
    { name: 'Medical History', path: '/patient/history', icon: History },
    { name: 'Messages', path: '/patient/messages', icon: MessageSquare },
    { name: 'Profile', path: '/patient/profile', icon: UserCog },
  ],
};

const Sidebar = () => {
  const { user } = useAuth();
  const links = user ? navLinks[user.role] : [];
  const baseLinkClasses = "flex items-center px-4 py-3 text-gray-300 rounded-lg transition-colors duration-200";
  const inactiveLinkHover = "hover:bg-gray-700 hover:text-white";
  const activeLinkClasses = "bg-gray-700/50 text-white border-l-4 border-blue-500";

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col fixed h-full shadow-lg">
      
      <div className="flex items-center justify-center h-20 border-b border-gray-700/50">
          <img src="/titiksha-logo.png" alt="Logo" className="h-10 w-10 mr-3" />
          <h2 className="text-xl font-bold">Titiksha Hospitals</h2>
      </div>
      
      <nav className="flex-grow px-4 py-6"> 
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink 
                to={link.path}
                className={({ isActive }) => 
                    `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkHover}`
                }
              >
                <link.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="px-4 py-6 border-t border-gray-700/50">
        <Link 
          to="/help" 
          className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <LifeBuoy className="h-5 w-5 mr-3" />
          Need Help?
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;