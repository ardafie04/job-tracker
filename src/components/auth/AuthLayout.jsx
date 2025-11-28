// —————————————————————————————
// components/auth/AuthLayout.jsx
// —————————————————————————————

import logo from "../../logo/logo.png";

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
            </div>

            {/* Auth Card */}
            <div className="relative z-10 w-full max-w-md">
                {/* Logo & Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg mb-4 overflow-hidden">
                        <img src={logo} alt="Job Tracker" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
                    <p className="text-gray-400">{subtitle}</p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
