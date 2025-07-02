import React from 'react';
import { Zap, Bot, Droplets, Pill } from 'lucide-react'; 

const featuresData = [
  { icon: Zap, label: "Emergency 24x7" },
  { icon: Bot, label: "Robotic Surgery" },
  { icon: Droplets, label: "Blood Bank" },
  { icon: Pill, label: "In-house Pharmacy" },
];

const FeatureCard = ({ icon: Icon, label }) => (
  <div className="flex-shrink-0 w-48 h-48 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg mx-4 transition-transform duration-300 hover:scale-105">
    <Icon className="w-16 h-16 text-blue-600 mb-3" />
    <span className="font-semibold text-center">{label}</span>
  </div>
);

const FeaturesSection = () => {
  return (
    <div className="py-20 bg-gray-100 overflow-hidden group">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Advanced Facilities & Services</h2>
      </div>
      <div className="flex animate-scroll-x group-hover:[animation-play-state:paused]">
        {[...featuresData, ...featuresData].map((item, index) => <FeatureCard key={index} {...item} />)}
      </div>
    </div>
  );
};

export default FeaturesSection;