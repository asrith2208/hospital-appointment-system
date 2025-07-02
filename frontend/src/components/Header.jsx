

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import { Sun, Moon } from 'lucide-react';
import { healthTips } from '../data';

const Header = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      {/* CHANGE: The max-width container now wraps the flex container */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Pushed to the start */}
          <div className="flex-shrink-0 flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/titiksha-logo.png" alt="Titiksha Hospitals Logo" className="h-16 w-16" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Titiksha Hospitals</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Compassion. Innovation. Excellence.</p>
            </div>
          </div>

          {/* Right Side: Pushed to the end */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Register
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Ticker Below Header */}
      <div className="bg-gray-100 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          {healthTips.map((tip, index) => (
            <span key={index} className="text-sm text-gray-600 dark:text-gray-300 mx-10 py-2">
              {tip}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Header;