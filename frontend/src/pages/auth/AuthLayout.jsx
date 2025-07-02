

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AuthLayout = ({ children, backTo, backToText = "Home" }) => {
  return (

    <div className="animated-gradient-background min-h-screen w-full flex flex-col items-center justify-center p-4">
      
      {/* CHANGE 1: Increased max-width for the back link to align with the new card width */}
      <div className="w-full max-w-4xl mb-4">
        <Link 
          to={backTo} 

          className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {backToText}
        </Link>
      </div>

      {/* CHANGE 3: Increased width, added light/dark backgrounds, and improved shadows */}
      <div className="w-full max-w-4xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {children}
      </div>

      <div className="w-full max-w-4xl mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Titiksha Hospitals. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;