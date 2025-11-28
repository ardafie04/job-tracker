// —————————————————————————————
// components/landing/FeaturesSection.jsx
// —————————————————————————————

import { Briefcase, Search, BarChart3, Bell, Shield, Zap } from "lucide-react";

const features = [
    {
        icon: <Briefcase className="w-6 h-6" />,
        title: "Kelola Lamaran",
        description: "Simpan dan lacak semua lamaran kerja Anda di satu tempat yang terorganisir.",
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: <Search className="w-6 h-6" />,
        title: "Pencarian Cepat",
        description: "Temukan lamaran dengan mudah menggunakan fitur pencarian yang powerful.",
        color: "from-purple-500 to-purple-600"
    },
    {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Statistik Real-time",
        description: "Pantau progress lamaran Anda dengan dashboard statistik yang informatif.",
        color: "from-green-500 to-green-600"
    },
    {
        icon: <Bell className="w-6 h-6" />,
        title: "Status Tracking",
        description: "Ketahui status lamaran aktif atau expired dengan indikator yang jelas.",
        color: "from-yellow-500 to-yellow-600"
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Aman & Private",
        description: "Data Anda tersimpan dengan aman menggunakan enkripsi tingkat enterprise.",
        color: "from-red-500 to-red-600"
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Cepat & Responsif",
        description: "Akses dari mana saja, kapan saja dengan performa yang lightning-fast.",
        color: "from-indigo-500 to-indigo-600"
    }
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-offset">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 fade-in-up">
                    Fitur-Fitur Unggulan
                </h2>
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto fade-in-up delay-200">
                    Semua yang Anda butuhkan untuk mengelola lamaran kerja dengan lebih efektif
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        feature={feature}
                        delay={index * 0.1}
                    />
                ))}
            </div>
        </section>
    );
}

function FeatureCard({ feature, delay }) {
    return (
        <div
            className="group p-6 sm:p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600 transition-all hover:scale-105 hover:shadow-2xl fade-in-up"
            style={{ animationDelay: `${delay}s` }}
        >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
        </div>
    );
}
