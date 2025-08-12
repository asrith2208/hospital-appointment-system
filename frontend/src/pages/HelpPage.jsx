import React, { useState } from "react";
import { motion } from "framer-motion";
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

// HelpPage — polished, responsive, accessible, with smooth animations
export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-6 md:p-12 lg:p-20">
      <div className="max-w-7xl mx-auto space-y-8">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <EmergencyNumbers />
            <HospitalInfo />
            <FaqSection />
          </div>

          <aside className="space-y-6">
            <ContactOptions />
            <AdditionalResources />
          </aside>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 shadow-2xl dark:shadow-black/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
    >
      <div className="flex items-center justify-center h-20 w-20 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg flex-shrink-0">
        <HelpCircle className="h-9 w-9" />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Need help? We're here 24/7
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
          Quick access to emergency contacts, hospital details, support channels, and
          answers to common questions — all in one polished, responsive UI.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <PrimaryAction />
          <SecondaryAction />
        </div>
      </div>

      <div className="w-full md:w-48">
        <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-3 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-500 dark:text-slate-400">Available Now</div>
          <div className="text-lg font-semibold text-slate-900 dark:text-white">24 / 7 Emergency</div>
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">Immediate response for critical cases</div>
        </div>
      </div>
    </motion.header>
  );
}

function PrimaryAction() {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 shadow-lg"
      aria-label="Call emergency"
    >
      <Phone className="h-4 w-4" />
      Call Emergency
    </motion.button>
  );
}

function SecondaryAction() {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 shadow-sm"
      aria-label="Contact support"
    >
      <MessageSquare className="h-4 w-4" />
      Contact Support
    </motion.button>
  );
}

const EmergencyNumbers = () => {
  const emergencyServices = [
    { name: "Ambulance", number: "108", icon: HeartPulse, color: "from-red-500 to-red-600" },
    { name: "Hospital Emergency", number: "+91‑98765‑43210", icon: Phone, color: "from-blue-500 to-blue-600 text-sm break-words" },

    { name: "Poison Control", number: "1066", icon: BrainCircuit, color: "from-emerald-500 to-emerald-600" },
    { name: "Police", number: "100", icon: Shield, color: "from-yellow-400 to-yellow-500" },
  ];

  return (
    <section aria-labelledby="emergency-heading">
      <h2 id="emergency-heading" className="text-lg md:text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-3">
        <Siren className="h-5 w-5 text-red-500" />
        Emergency Contact Numbers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {emergencyServices.map((s) => (
          <motion.article
            key={s.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            whileHover={{ translateY: -6, boxShadow: "0 20px 40px rgba(2,6,23,0.12)" }}
            className={`rounded-2xl p-4 border border-slate-100 dark:border-slate-700 bg-gradient-to-br ${s.color} text-white shadow-sm`}
            role="group"
            aria-label={`${s.name} contact`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium opacity-90">{s.name}</div>
                <div className="text-2xl md:text-3xl font-extrabold mt-2 tracking-wide">{s.number}</div>
              </div>
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-white/20">
                {React.createElement(s.icon, { size: 20, className: "opacity-95" })}
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-lg bg-white/20 text-white py-2 text-sm font-semibold">Call</button>
              <button className="flex-1 rounded-lg bg-white/10 text-white/90 py-2 text-sm">Details</button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

const ContactOptions = () => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md border border-slate-100 dark:border-slate-700">
    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Contact Options</h3>

    <div className="space-y-3">
      <ContactCard
        icon={<Phone />}
        title="Call Us"
        details={"+91‑98765‑43210"}
        subtext="Immediate - 24/7"
      />

      <ContactCard
        icon={<MessageSquare />}
        title="WhatsApp"
        details={"+91‑98765‑43210"}
        subtext="9 AM – 9 PM"
      />

      <ContactCard
        icon={<Mail />}
        title="Email Support"
        details={"support@titiksha.com"}
        subtext="Response within 24 hours"
      />
    </div>
  </div>
);

const ContactCard = ({ icon, title, details, subtext }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
  >
    <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
      {React.cloneElement(icon, { size: 18, className: "text-indigo-600 dark:text-indigo-300" })}
    </div>
    <div className="flex-1">
      <div className="text-sm font-semibold text-slate-800 dark:text-white">{title}</div>
      <div className="text-xs text-slate-500 dark:text-slate-300">{details}</div>
      <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span>{subtext}</span>
      </div>
    </div>
    <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">Contact</button>
  </motion.div>
);

const HospitalInfo = () => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
    <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
      <MapPin className="h-5 w-5 text-indigo-500" /> Hospital Information
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300">Address</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Titiksha UPS Hospitals
          <br />123 Medical Center Drive
          <br />Healthcare District
          <br />City, State 12345
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300">Operating Hours</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Emergency: <strong>24/7</strong>
          <br />OPD: 8:00 AM – 8:00 PM
          <br />Pharmacy: 24/7
          <br />Lab: 6:00 AM – 10:00 PM
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
    a: "We use industry-standard encryption so only you and authorized clinicians can view your data.",
  },
];

const FaqSection = () => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
      <HelpCircle className="h-5 w-5 text-indigo-500" /> Frequently Asked Questions
    </h3>

    <div className="space-y-2">
      {faqData.map((item, idx) => (
        <FaqItem key={idx} question={item.q} answer={item.a} />
      ))}
    </div>
  </div>
);

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-transparent dark:border-transparent rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors rounded-lg"
        aria-expanded={open}
      >
        <div className="text-sm font-medium text-slate-800 dark:text-white">{question}</div>
        <ChevronDown className={`h-4 w-4 transform transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="px-3"
      >
        {open && <p className="text-sm text-slate-500 dark:text-slate-400 py-3">{answer}</p>}
      </motion.div>
    </div>
  );
}

const AdditionalResources = () => (
  <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/10 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
    <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-3">Resources</h4>
    <div className="grid grid-cols-1 gap-3">
      <ResourceLink icon={<User />} title="Patient Rights & Responsibilities" description="Learn about your rights as a patient." />
      <ResourceLink icon={<FileText />} title="Insurance & Billing" description="See insurance and billing procedures." />
      <ResourceLink icon={<BookOpen />} title="Health Education" description="Guides, tips and wellness content." />
      <ResourceLink icon={<MessageCircle />} title="Feedback & Complaints" description="Share feedback or file a complaint." />
    </div>
  </div>
);

const ResourceLink = ({ icon, title, description }) => (
  <button className="w-full text-left p-3 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-shadow flex items-start gap-3">
    <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">{React.cloneElement(icon, { size: 16, className: "text-indigo-600 dark:text-indigo-300" })}</div>
    <div className="flex-1">
      <div className="text-sm font-semibold text-slate-800 dark:text-white">{title}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</div>
    </div>
    <div className="text-xs text-indigo-600 dark:text-indigo-300">Open</div>
  </button>
);
