
import React, { useState } from "react";
import {
  Phone,
  Siren,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  User,
  FileText,
  BookOpen,
  MessageCircle,
  HeartPulse,
  X,
  BrainCircuit,
  Shield,
  HelpCircle,
} from "lucide-react";

const HelpPage = () => {
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Need Help?
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          We're here to assist you with any questions or concerns.
        </p>
      </div>

      <EmergencyNumbers />
      <ContactOptions />
      <HospitalInfo />
      <FaqSection />
      <AdditionalResources />
    </div>
  );
};

const EmergencyNumbers = () => {
  const emergencyServices = [
    { name: "Ambulance", number: "108", icon: HeartPulse, color: "red" },
    { name: "Hospital Emergency", number: "+91‑XXXX‑XXXX‑XX", icon: X, color: "blue" },
    { name: "Poison Control", number: "1066", icon: BrainCircuit, color: "green" },
    { name: "Police", number: "100", icon: Shield, color: "yellow" },
  ];

  const colorClasses = {
    red: "from-red-500/80 to-red-600/80 border-red-400 text-red-100",
    blue: "from-blue-500/80 to-blue-600/80 border-blue-400 text-blue-100",
    green: "from-green-500/80 to-green-600/80 border-green-400 text-green-100",
    yellow: "from-yellow-500/80 to-yellow-600/80 border-yellow-400 text-yellow-100",
  };

  return (
    <div className="p-6 bg-slate-800/50 dark:bg-slate-900/50 rounded-lg shadow-lg border border-slate-700">
      <h2 className="text-xl font-bold text-gray-100 dark:text-white flex items-center mb-6">
        <Siren className="h-6 w-6 mr-3 text-red-400" />
        Emergency Contact Numbers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {emergencyServices.map((service) => (
          <div
            key={service.name}
            className={`glass-card p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br ${colorClasses[service.color]}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{service.name}</h3>
              {React.createElement(service.icon, {
                size: 24,
                className: "opacity-70",
              })}
            </div>
            <p className="text-4xl font-bold tracking-wider text-white text-center">
              {service.number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactOptions = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <ContactCard
      icon={<Phone />}
      title="Call Us"
      details="+91‑XXXX‑XXXX‑XX"
      subtext="24/7 Emergency Line"
    />
    <ContactCard
      icon={<MessageSquare className="text-green-500" />}
      title="WhatsApp"
      details="+91‑XXXX‑XXXX‑XX"
      subtext="9 AM – 9 PM"
    />
    <ContactCard
      icon={<Mail />}
      title="Email Support"
      details="support@titiksha.com"
      subtext="Response within 24 hours"
    />
  </div>
);

const ContactCard = ({ icon, title, details, subtext }) => (
  <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md flex">
    <div className="mr-4">
      {React.cloneElement(icon, { size: 24, className: "text-blue-500" })}
    </div>
    <div className="flex-grow">
      <h3 className="font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{details}</p>
      <p className="text-xs text-gray-400 mt-1 flex items-center">
        <Clock size={12} className="mr-1" />
        {subtext}
      </p>
    </div>
    <button className="self-end text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">
      Contact Now
    </button>
  </div>
);

const HospitalInfo = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center mb-4">
      <MapPin className="h-5 w-5 mr-2 text-blue-500" />
      Hospital Information
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-semibold text-gray-600 dark:text-gray-300">
          Address
        </h4>
        <p className="text-gray-500 dark:text-gray-400">
          Titiksha UPS Hospitals
          <br />
          123 Medical Center Drive
          <br />
          Healthcare District
          <br />
          City, State 12345
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-600 dark:text-gray-300">
          Operating Hours
        </h4>
        <p className="text-gray-500 dark:text-gray-400">
          Emergency: 24/7
          <br />
          OPD: 8:00 AM – 8:00 PM
          <br />
          Pharmacy: 24/7
          <br />
          Lab: 6:00 AM – 10:00 PM
        </p>
      </div>
    </div>
  </div>
);

const faqData = [
  {
    q: "How do I book an appointment?",
    a: "Book via the 'Book Appointment' page in your dashboard. Select a doctor, choose a time slot, and confirm.",
  },
  {
    q: "Can I reschedule or cancel my appointment?",
    a: "Yes. Manage upcoming appointments in your dashboard up to 24 hours beforehand.",
  },
  {
    q: "How do I access my medical reports?",
    a: "Find them under 'Medical History' once your appointment is marked as completed.",
  },
  {
    q: "What should I bring for my appointment?",
    a: "Valid ID, insurance info (if any), and relevant past medical records.",
  },
  {
    q: "Is my medical information secure?",
    a: "We use industry‑standard encryption so only you and authorized clinicians can view your data.",
  },
];

const FaqSection = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center mb-4">
      <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
      Frequently Asked Questions
    </h2>
    <div className="space-y-2">
      {faqData.map((item, index) => (
        <FaqItem key={index} question={item.q} answer={item.a} />
      ))}
    </div>
  </div>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 dark:border-slate-700 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left font-semibold text-gray-700 dark:text-gray-200"
      >
        <span>{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <p className="pt-0 pb-4 text-gray-500 dark:text-gray-400">{answer}</p>
      </div>
    </div>
  );
};

const AdditionalResources = () => (
  <div className="bg-blue-900/20 dark:bg-blue-900/20 p-6 rounded-lg">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
      Additional Resources
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ResourceLink
        icon={<User />}
        title="Patient Rights & Responsibilities"
        description="Learn about your rights as a patient and our commitment to your care."
      />
      <ResourceLink
        icon={<FileText />}
        title="Insurance & Billing"
        description="Information about insurance coverage and billing procedures."
      />
      <ResourceLink
        icon={<BookOpen />}
        title="Health Education"
        description="Access health tips, wellness guides, and educational materials."
      />
      <ResourceLink
        icon={<MessageCircle />}
        title="Feedback & Complaints"
        description="Share your feedback or file a complaint about our services."
      />
    </div>
  </div>
);

const ResourceLink = ({ icon, title, description }) => (
  <button
    type="button"
    className="block w-full text-left p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-slate-700/70 transition-colors"
  >
    <h4 className="font-semibold text-gray-800 dark:text-white flex items-center">
      {React.cloneElement(icon, { size: 16, className: "mr-2" })}
      {title}
    </h4>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
  </button>
);

export default HelpPage;
