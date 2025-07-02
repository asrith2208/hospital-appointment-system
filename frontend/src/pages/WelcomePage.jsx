import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import { ArrowRight } from 'lucide-react';
import { features } from '../data';

const slideshowImages = [
  '/hospital1.png',
  '/hospital2.png',
  '/hospital3.png',
];

const FeatureScroller = () => (
  <div className="py-20 bg-white dark:bg-gray-900">
    <Marquee gradient={false} speed={40}>
      {features.map((feature, index) => (
        <div key={index} className="mx-4 group">
          <div className="w-64 h-48 flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50">
            <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4 transition-transform duration-300 group-hover:scale-125" />
            <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-white">{feature.label}</h3>
          </div>
        </div>
      ))}
    </Marquee>
  </div>
);


const WelcomePage = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative w-full flex items-center justify-center py-24 sm:py-32 overflow-hidden min-h-[70vh]">
  {/* Background Slideshow (Stays the same) */}
  {slideshowImages.map((src, index) => (
    <div
      key={src}
      className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
      style={{ 
        backgroundImage: `url(${src})`,
        opacity: index === currentImage ? 1 : 0,
      }}
    />
  ))}
  <div className="absolute inset-0 bg-black/60"></div> {/* Darker overlay for more contrast */}
  
  {/* Foreground Content: The Centered Rectangle */}
  <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white/10 backdrop-blur-lg p-8 sm:p-12 rounded-2xl border border-white/20 shadow-2xl text-center">
      
      {/* Big Transparent Logo */}
      <div className="flex justify-center mb-8">
        <img 
          src="/titiksha-logo.png" 
          alt="Titiksha Hospitals Logo" 
          className="h-28 w-28 filter brightness-0 invert" 
        />
      </div>

      {/* Main Text */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
        Titiksha Hospitals
      </h1>
      <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
        Experience unparalleled healthcare where every patient is a priority. Your journey to wellness begins here.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => navigate('/register')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
        >
          Book Appointment
        </button>
        <button 
          onClick={() => navigate('/learn-more')}
          className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>Learn More</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

    </div>
  </div>
</div>

        {/* Features Section */}
        <FeatureScroller />
      </main>
    </div>
  );
};

export default WelcomePage;