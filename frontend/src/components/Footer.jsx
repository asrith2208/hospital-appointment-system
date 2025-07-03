import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-black text-gray-300 transition-colors duration-300">
      
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Titiksha Hospitals</h3>
            <p className="flex items-start mb-2 text-sm">
              <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              101, Main Healthcare Road, New Delhi - 110001, India
            </p>
            <p className="flex items-center mb-2 text-sm">
              <Mail className="h-4 w-4 mr-2" />
              contact@titikshahospitals.com
            </p>
            <p className="flex items-center mb-2 text-sm">
              <Phone className="h-4 w-4 mr-2" />
              +91 90000 11111
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-400"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-pink-400"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-red-500"><Youtube /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500"><Linkedin /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/learn-more" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/#" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="/#" className="text-gray-400 hover:text-white">Feedback</a></li>
              <li><a href="/#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="/#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
             <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
             <ul className="space-y-2 text-sm">
                <li><a href="/learn-more#departments" className="text-gray-400 hover:text-white">Departments</a></li>
                <li><a href="/learn-more#branches" className="text-gray-400 hover:text-white">Find a Branch</a></li>
                <li><a href="/#" className="text-gray-400 hover:text-white">Health Packages</a></li>
             </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="mb-4 text-sm">Get health updates & offers in your inbox.</p>
            <form className="flex">
              <input type="email" placeholder="Your Email" className="w-full px-3 py-2 text-sm rounded-l-md text-gray-800 focus:outline-none" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">Go</button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800 dark:bg-gray-900/50 py-3">
        <p className="text-center text-xs text-gray-400">© 2025 Titiksha Hospitals. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 