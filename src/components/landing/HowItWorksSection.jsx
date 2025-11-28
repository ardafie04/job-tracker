// —————————————————————————————
// components/landing/HowItWorksSection.jsx (FIXED)
// —————————————————————————————

const steps = [
    { step: "1", title: "Daftar Gratis", desc: "Buat akun Anda dalam hitungan detik tanpa biaya apapun" },
    { step: "2", title: "Tambah Lamaran", desc: "Input detail lamaran kerja yang sudah Anda kirimkan" },
    { step: "3", title: "Lacak Progress", desc: "Monitor status dan kelola semua lamaran dengan mudah" }
];

export default function HowItWorksSection() {
    return (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            {/* Background Container */}
            <div className="bg-gray-800/30 rounded-3xl backdrop-blur-sm border border-gray-700/50 p-8 sm:p-12 lg:p-16">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 fade-in-up text-white">
                        Cara Menggunakan
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto fade-in-up delay-200">
                        Hanya 3 langkah sederhana untuk mulai melacak lamaran Anda
                    </p>
                </div>

                {/* ✅ Steps dengan max-width & centered */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                        {steps.map((item, index) => (
                            <StepCard
                                key={index}
                                step={item.step}
                                title={item.title}
                                description={item.desc}
                                animationClass={
                                    index === 0 ? 'fade-in-left' :
                                        index === 1 ? 'fade-in-up delay-200' :
                                            'fade-in-right delay-400'
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepCard({ step, title, description, animationClass }) {
    return (
        <div className={`text-center group ${animationClass}`}>
            {/* ✅ Icon Container dengan flex untuk perfect center */}
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform text-white">
                    {step}
                </div>
            </div>

            {/* ✅ Title & Description dengan min-height untuk alignment */}
            <h3 className="text-xl font-bold mb-3 min-h-[28px] text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{description}</p>
        </div>
    );
}
