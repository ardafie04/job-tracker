// —————————————————————————————
// components/landing/HeroSection.jsx
// —————————————————————————————

import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold animate-float">
                    <Zap size={16} />
                    <span>Platform Gratis & Mudah Digunakan</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight fade-in-up">
                    Kelola Lamaran Kerja dengan
                    <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                        Lebih Smart & Efisien
                    </span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed fade-in-up delay-200">
                    Job Tracker membantu Anda mengorganisir, melacak, dan mengelola semua lamaran kerja dalam satu platform yang mudah dan powerful.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up delay-400">
                    <button
                        onClick={() => navigate("/register")}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 animate-pulse-glow"
                    >
                        Mulai Sekarang
                        <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base sm:text-lg bg-gray-800/80 hover:bg-gray-700 transition-all border border-gray-700 backdrop-blur-sm hover:scale-105"
                    >
                        Lihat Fitur
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
                    <StatCard
                        value="100%"
                        label="Gratis"
                        gradient="from-blue-400 to-purple-400"
                        delay="delay-600"
                    />
                    <StatCard
                        value="24/7"
                        label="Akses"
                        gradient="from-purple-400 to-pink-400"
                        delay="delay-700"
                    />
                    <StatCard
                        value="∞"
                        label="Lamaran"
                        gradient="from-pink-400 to-red-400"
                        delay="delay-800"
                    />
                </div>
            </div>
        </section>
    );
}

function StatCard({ value, label, gradient, delay }) {
    return (
        <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:scale-105 transition-transform scale-in ${delay}`}>
            <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {value}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{label}</div>
        </div>
    );
}
