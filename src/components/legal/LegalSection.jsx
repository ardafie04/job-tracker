// —————————————————————————————
// components/legal/LegalSection.jsx
// —————————————————————————————

export default function LegalSection({ icon, title, children, variant = "default" }) {
    const variants = {
        default: "bg-gray-800/50 border-gray-700/50",
        highlight: "bg-blue-500/10 border-blue-500/20",
        warning: "bg-yellow-500/10 border-yellow-500/20",
    };

    return (
        <div className={`p-6 rounded-xl ${variants[variant]} border backdrop-blur-sm`}>
            <div className="flex items-start gap-4">
                {icon && (
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                        {icon}
                    </div>
                )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
                    <div className="text-gray-300 space-y-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
