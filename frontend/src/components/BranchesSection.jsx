
import React from 'react';

const branchesData = [
  { name: "Hyderabad Branch", specialization: "Advanced cardiac and neuro care.", mapsLink: "https://maps.google.com" },
  { name: "Mumbai Branch", specialization: "Specialized in oncology and transplant.", mapsLink: "https://maps.google.com" },
  
];
const backgroundImages = ['/hospital1.png', '/hospital2.png', '/hospital3.png'];

const BranchesSection = () => {
  return (
    <div className="py-20 relative overflow-hidden bg-gray-900">

      {backgroundImages.map((src, index) => (
        <div key={src} className="absolute inset-0 ken-burns-image" style={{ animationDelay: `${index * 4}s` }}>
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">Our Presence Across India</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branchesData.map((branch, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex space-x-4 items-center border border-white/20">
              <img src="/hospital1.png" alt={branch.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="text-white">
                <h4 className="font-bold text-lg">{branch.name}</h4>
                <p className="text-sm text-gray-300 mb-3">{branch.specialization}</p>
                <a href={branch.mapsLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Navigate →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchesSection;