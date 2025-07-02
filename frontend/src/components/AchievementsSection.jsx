import React from 'react';
import { Award, Heart } from 'lucide-react'; 

const achievementsData = [
  { icon: Award, title: "Best Multispecialty Hospital", source: "Times Health 2024" },
  { icon: Heart, title: "Top 5 Cardiology Centre", source: "India Health Awards" },
];

const AchievementCard = ({ icon: Icon, title, source }) => (
  <div className="flex-shrink-0 w-64 p-6 bg-white rounded-lg shadow-md mx-4 border border-yellow-300">
    <Icon className="w-10 h-10 text-yellow-500 mb-3" />
    <h4 className="font-bold text-lg">{title}</h4>
    <p className="text-sm text-gray-500">{source}</p>
  </div>
);

const AchievementsSection = () => {
  return (
    <div className="py-20 bg-yellow-50 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Recognitions & Accreditations</h2>
      </div>
      <div className="space-y-8">
        <div className="flex animate-scroll-x">
          {[...achievementsData, ...achievementsData].map((item, index) => <AchievementCard key={index} {...item} />)}
        </div>
        
        <div className="flex animate-scroll-x-reverse">
          {[...achievementsData, ...achievementsData].map((item, index) => <AchievementCard key={index} {...item} />)}
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;