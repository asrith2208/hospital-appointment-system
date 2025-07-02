import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, backLink, backText }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Bubble Gradient */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-teal-400 to-green-500 rounded-full opacity-20 filter blur-3xl animate-blob animation-delay-4000"></div>
      
      <div className="absolute top-6 left-6 z-10">
        <Link to={backLink} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          <span>{backText}</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 z-10"
      >
        <div className="text-center mb-8">
          <img src="/titiksha-logo.png" alt="Logo" className="h-12 w-12 mx-auto mb-4 filter brightness-0 invert" />
        </div>
        {children}
      </motion.div>
    </div>
  );
};




