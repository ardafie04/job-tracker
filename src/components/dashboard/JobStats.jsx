// —————————————————————————————
// components/dashboard/JobStats.jsx
// —————————————————————————————

import { Briefcase, Check, X } from "lucide-react";

export default function JobStats({ totalJobs, activeJobs, expiredJobs, darkMode }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <StatCard
                icon={<Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />}
                title="Total Lamaran"
                value={totalJobs}
                dark={darkMode}
            />
            <StatCard
                icon={<Check className="w-5 h-5 sm:w-6 sm:h-6" />}
                title="Aktif"
                value={activeJobs}
                color="green"
                dark={darkMode}
            />
            <StatCard
                icon={<X className="w-5 h-5 sm:w-6 sm:h-6" />}
                title="Expired"
                value={expiredJobs}
                color="red"
                dark={darkMode}
            />
        </div>
    );
}

function StatCard({ icon, title, value, color = "blue", dark }) {
    const colors = {
        blue: dark ? "from-blue-600 to-blue-500" : "from-blue-500 to-blue-400",
        green: dark ? "from-green-600 to-green-500" : "from-green-500 to-green-400",
        red: dark ? "from-red-600 to-red-500" : "from-red-500 to-red-400",
    };

    return (
        <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl backdrop-blur-sm transition-transform hover:scale-105 ${dark
                ? "bg-gray-800/50 border border-gray-700"
                : "bg-white/80 border border-gray-200"
            }`}>
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${colors[color]} flex items-center justify-center text-white shadow-lg`}>
                    {icon}
                </div>
                <div className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-gray-900"
                    }`}>
                    {value}
                </div>
            </div>
            <p className={`text-sm font-medium ${dark ? "text-gray-400" : "text-gray-600"
                }`}>
                {title}
            </p>
        </div>
    );
}
