// —————————————————————————————
// components/dashboard/GreetingCard.jsx
// —————————————————————————————

export default function GreetingCard({ user, totalJobs, activeJobs, expiredJobs, darkMode }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Selamat Pagi";
        if (hour < 15) return "Selamat Siang";
        if (hour < 18) return "Selamat Sore";
        return "Selamat Malam";
    };

    const getWelcomeMessage = (count) => {
        if (count === 0) return "Yuk mulai lacak lamaran kerja pertamamu! 🚀";
        if (count < 5) return "Terus semangat! Setiap lamaran adalah satu langkah lebih dekat! 💪";
        if (count < 10) return "Keren! Kamu sudah apply ke banyak tempat! 🎯";
        return "Wow! Produktif banget! Semoga cepet diterima! 🌟";
    };

    const getInitials = () => {
        return (user?.full_name || user?.username || user?.email || "U")
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(s => s[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="mb-8">
            <div className={`p-6 rounded-2xl shadow-xl backdrop-blur-sm ${darkMode
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-gray-700"
                    : "bg-gradient-to-r from-blue-400/20 to-purple-400/20 border border-gray-200"
                }`}>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-lg flex-shrink-0 ${darkMode
                            ? "bg-gradient-to-br from-blue-600 to-purple-600"
                            : "bg-gradient-to-br from-blue-400 to-purple-400"
                        } text-white`}>
                        {getInitials()}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                        <p className={`text-sm sm:text-base font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"
                            }`}>
                            {getGreeting()} 👋
                        </p>
                        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"
                            }`}>
                            {user?.full_name || user?.username || "User"}
                        </h1>

                        <p className={`text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"
                            }`}>
                            {getWelcomeMessage(totalJobs)}
                        </p>
                    </div>

                    <div className="hidden lg:flex gap-4">
                        <QuickStat label="Total" value={totalJobs} icon="📋" dark={darkMode} />
                        <QuickStat label="Aktif" value={activeJobs} icon="✅" dark={darkMode} />
                        <QuickStat label="Expired" value={expiredJobs} icon="⏰" dark={darkMode} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickStat({ label, value, icon, dark }) {
    return (
        <div className={`px-4 py-3 rounded-xl ${dark ? "bg-gray-800/50" : "bg-white/50"
            } backdrop-blur-sm`}>
            <div className="text-2xl font-bold text-center">{icon}</div>
            <div className={`text-2xl font-bold text-center ${dark ? "text-white" : "text-gray-900"
                }`}>
                {value}
            </div>
            <div className={`text-xs text-center ${dark ? "text-gray-400" : "text-gray-600"
                }`}>
                {label}
            </div>
        </div>
    );
}
