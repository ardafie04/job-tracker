// —————————————————————————————
// components/landing/CTASection.jsx
// —————————————————————————————

import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    const navigate = useNavigate();

    return (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 sm:p-12 lg:p-16 text-center shadow-2xl scale-in">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
                    Siap Mengorganisir Lamaran Anda?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto text-white">
                    Bergabunglah dengan ribuan pencari kerja yang sudah merasakan kemudahan Job Tracker
                </p>
                <button
                    onClick={() => navigate("/register")}
                    className="px-8 py-4 rounded-xl font-bold text-lg bg-white text-purple-600 hover:bg-gray-100 transition-all hover:scale-105 shadow-xl inline-flex items-center gap-2"
                >
                    Daftar Sekarang - Gratis!
                    <ArrowRight size={20} />
                </button>
            </div>
        </section>
    );
}
