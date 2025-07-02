
import React from 'react';
import { useNavigate } from 'react-router-dom';

const departmentsData = [
  {
    name: "Neuroscience & Neurology",
    specialists: [
      { name: "Dr. Arjun Mehta", role: "Neurologist (stroke, epilepsy)", gender: "male" },
      { name: "Dr. Kavita Rao", role: "Neurologist (MS, geriatric neuro)", gender: "female" },
      { name: "Dr. Ravi Singh", role: "Neurosurgeon (brain tumors)", gender: "male" },
      { name: "Dr. Meera Sharma", role: "Neurosurgeon (spinal)", gender: "female" },
      { name: "Dr. Priya Deshpande", role: "EEG/nerve tests", gender: "female" }
    ],
    icu: [
      { name: "Dr. Nikhil Patil", role: "Neuro-ICU, coma", gender: "male" },
      { name: "Dr. Anjali Kumar", role: "Neuro-ventilator mgmt", gender: "female" }
    ]
  },

  {
    name: "Cardio-Vascular Care",
    specialists: [
      { name: "Dr. Vikram Chauhan", role: "Cardiologist", gender: "male" },
      { name: "Dr. Sunita Reddy", role: "Interventional Cardiologist", gender: "female" },
    ],
    icu: [
      { name: "Dr. Sameer Gupta", role: "Cardiac ICU Specialist", gender: "male" }
    ]
  }
];

const getDoctorImage = (gender, index) => {
  if (gender === 'male') {
    const imgIndex = (index % 10) + 1; 
    return `/male-doctors/maledoc${imgIndex}.png`;
  } else {
    const imgIndex = (index % 12) + 1; 
    return `/female-doctors/femaledoc${imgIndex}.png`;
  }
};

const DoctorCard = ({ name, role, gender, index }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
    <img src={getDoctorImage(gender, index)} alt={name} className="w-16 h-16 rounded-full object-cover" />
    <div>
      <h4 className="font-semibold text-gray-800">{name}</h4>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  </div>
);

const DepartmentsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Our Departments of Excellence</h2>
          <p className="mt-4 text-lg text-gray-600">Explore our comprehensive medical specialties.</p>
        </div>
        <div className="space-y-16">
          {departmentsData.map((dept, deptIndex) => (
            <div key={deptIndex} className="p-8 border border-gray-200 rounded-2xl shadow-md bg-white">
              <h3 className="text-3xl font-bold text-blue-700 mb-6">{dept.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dept.specialists.map((doc, docIndex) => <DoctorCard key={docIndex} {...doc} index={docIndex} />)}
                {dept.icu.map((doc, docIndex) => <DoctorCard key={docIndex} {...doc} index={dept.specialists.length + docIndex} />)}
              </div>
              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate('/register')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Book an Appointment in {dept.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentsSection;