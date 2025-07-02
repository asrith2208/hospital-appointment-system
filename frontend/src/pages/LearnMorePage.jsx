import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, CheckCircle, Award } from 'lucide-react';
import { departments, achievements, branches } from '../data'; // Ensure these are in data.js

const DoctorModal = ({ isOpen, closeModal, doctor }) => {
  if (!doctor) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{doctor.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{doctor.role}</p>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300">Qualifications</h4>
                      <p className="text-gray-600 dark:text-gray-400">{doctor.qualifications}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300">Experience</h4>
                      <p className="text-gray-600 dark:text-gray-400">{doctor.experience}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300">Bio</h4>
                      <p className="text-gray-600 dark:text-gray-400">{doctor.bio}</p>
                    </div>
                     <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300">Key Achievements</h4>
                      <ul className="list-none space-y-2 mt-2">
                        {doctor.achievements.map((ach, i) => (
                           <li key={i} className="flex items-start">
                             <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                             <span className="text-gray-600 dark:text-gray-400">{ach}</span>
                           </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const LearnMorePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main>
        {/* Departments Section */}
        <section id="departments" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Departments</h2>
            {departments.map(dept => (
              <div key={dept.name} className="mb-16">
                <h3 className="text-3xl font-semibold border-l-4 border-blue-600 pl-4 mb-8">{dept.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {dept.doctors.map(doctor => (
                    <div 
                      key={doctor.name} 
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden text-center cursor-pointer transform hover:-translate-y-2 transition-transform duration-300"
                      onClick={() => openModal(doctor)}
                    >
                      <img src={doctor.image} alt={doctor.name} className="w-full h-56 object-cover" />
                      <div className="p-4">
                        <h4 className="font-bold text-lg">{doctor.name}</h4>
                        <p className="text-blue-500 text-sm">{doctor.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20 bg-gray-100 dark:bg-black">
             <h2 className="text-4xl font-bold text-center mb-12">Milestones & Achievements</h2>
             <Marquee gradient={false} speed={30} className="mb-4">
                {achievements.slice(0, 15).map((ach, i) => (
                    <div key={i} className="flex items-center mx-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md w-80">
                        <Award className="h-8 w-8 text-yellow-500 mr-4 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">{ach.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{ach.description}</p>
                        </div>
                    </div>
                ))}
             </Marquee>
             <Marquee gradient={false} speed={30} direction="right">
                {achievements.slice(15, 30).map((ach, i) => (
                    <div key={i} className="flex items-center mx-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md w-80">
                        <Award className="h-8 w-8 text-yellow-500 mr-4 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">{ach.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{ach.description}</p>
                        </div>
                    </div>
                ))}
             </Marquee>
        </section>

        {/* Branches Section */}
        <section id="branches" className="py-20 px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Branches Across India</h2>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {branches.map(branch => (
                    <div key={branch.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                        <img src="/hospital1.png" alt={branch.name} className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{branch.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{branch.location}</p>
                             <a href={branch.mapLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Navigate
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </main>

      <DoctorModal isOpen={isModalOpen} closeModal={closeModal} doctor={selectedDoctor} />
    </div>
  );
};

export default LearnMorePage;