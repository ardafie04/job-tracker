// —————————————————————————————
// NAVBAR COMPONENT (WITH LOGO FILE)
// —————————————————————————————

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Sun, Moon, User, Menu, LogOut, Home, X } from "lucide-react";
import logo from "../logo/logo.png"; // ✅ IMPORT LOGO

export default function Navbar({ user, darkMode, setDarkMode, currentPage = "dashboard" }) {
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleLogout = async () => {
        // ✅ Clear all cache
        localStorage.removeItem('cachedUser');
        localStorage.removeItem('cachedJobs');

        await supabase.auth.signOut();
        window.location.href = "/";
    };

    return (
        <>
            {/* ========== NAVBAR STICKY ========== */}
            <nav className={`sticky top-0 z-40 backdrop-blur-lg border-b transition-colors ${darkMode
                ? "bg-gray-900/80 border-gray-700"
                : "bg-white/80 border-gray-200"
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Side */}
                        <div className="flex items-center gap-3">
                            {/* Hamburger Menu (Mobile Only) */}
                            <button
                                onClick={() => setShowMobileMenu(true)}
                                className={`lg:hidden p-2 rounded-lg transition-all hover:scale-105 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50 shadow"
                                    }`}
                            >
                                <Menu size={20} />
                            </button>

                            {/* ✅ Logo dengan Image File */}
                            <div
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg cursor-pointer overflow-hidden ${darkMode
                                    ? "bg-gradient-to-br from-blue-600 to-purple-600"
                                    : "bg-gradient-to-br from-blue-400 to-purple-400"
                                    }`}
                                onClick={() => navigate("/dashboard")}
                            >
                                <img
                                    src={logo}
                                    alt="Job Tracker Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* User Info - Desktop Only */}
                            <div className="hidden lg:block">
                                <h1 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"
                                    }`}>
                                    Job Tracker
                                </h1>
                            </div>
                        </div>

                        {/* Right Side - Desktop Only */}
                        <div className="hidden lg:flex items-center gap-3">
                            <button
                                onClick={() => navigate("/dashboard")}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105 ${currentPage === "dashboard"
                                    ? darkMode
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-500 text-white"
                                    : darkMode
                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                        : "bg-white hover:bg-gray-50 text-gray-900 shadow"
                                    }`}
                            >
                                <Home size={18} />
                                <span className="text-sm font-medium">Dashboard</span>
                            </button>

                            <button
                                onClick={() => navigate("/edit-profile")}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105 ${currentPage === "profile"
                                    ? darkMode
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-500 text-white"
                                    : darkMode
                                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                                        : "bg-white hover:bg-gray-50 text-gray-900 shadow"
                                    }`}
                            >
                                <User size={18} />
                                <span className="text-sm font-medium">Profile</span>
                            </button>

                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2.5 rounded-lg transition-all hover:scale-105 ${darkMode
                                    ? "bg-gray-800 hover:bg-gray-700"
                                    : "bg-white hover:bg-gray-50 shadow"
                                    }`}
                            >
                                {darkMode ? (
                                    <Sun size={18} className="text-yellow-400" />
                                ) : (
                                    <Moon size={18} className="text-gray-700" />
                                )}
                            </button>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all hover:scale-105 text-sm"
                            >
                                Logout
                            </button>
                        </div>

                        {/* Right Side - Mobile (Only Dark Mode Toggle) */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`lg:hidden p-2 rounded-lg transition-all hover:scale-105 ${darkMode
                                ? "bg-gray-800 hover:bg-gray-700"
                                : "bg-white hover:bg-gray-50 shadow"
                                }`}
                        >
                            {darkMode ? (
                                <Sun size={18} className="text-yellow-400" />
                            ) : (
                                <Moon size={18} className="text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ========== MOBILE SIDEBAR MENU ========== */}
            {showMobileMenu && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-50 lg:hidden animate-fadeIn"
                        onClick={() => setShowMobileMenu(false)}
                    />

                    {/* Sidebar */}
                    <div className={`fixed top-0 left-0 h-full w-72 z-50 shadow-2xl lg:hidden animate-slideInLeft ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                        }`}>
                        {/* Header */}
                        <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">Menu</h2>
                                <button
                                    onClick={() => setShowMobileMenu(false)}
                                    className={`p-2 rounded-lg transition-all ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                        }`}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* User Info */}
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold overflow-hidden ${darkMode
                                    ? "bg-gradient-to-br from-blue-600 to-purple-600"
                                    : "bg-gradient-to-br from-blue-400 to-purple-400"
                                    } text-white`}>
                                    {/* ✅ Logo di Sidebar juga bisa pakai image */}
                                    <img
                                        src={logo}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold truncate">
                                        {user?.full_name || user?.username || "User"}
                                    </p>
                                    <p className={`text-xs truncate ${darkMode ? "text-gray-400" : "text-gray-600"
                                        }`}>
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-4">
                            <button
                                onClick={() => {
                                    setShowMobileMenu(false);
                                    navigate("/dashboard");
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${currentPage === "dashboard"
                                    ? darkMode
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-500 text-white"
                                    : darkMode
                                        ? "hover:bg-gray-700 text-white"
                                        : "hover:bg-gray-100 text-gray-900"
                                    }`}
                            >
                                <Home size={20} />
                                <span className="font-medium">Dashboard</span>
                            </button>

                            <button
                                onClick={() => {
                                    setShowMobileMenu(false);
                                    navigate("/edit-profile");
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${currentPage === "profile"
                                    ? darkMode
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-500 text-white"
                                    : darkMode
                                        ? "hover:bg-gray-700 text-white"
                                        : "hover:bg-gray-100 text-gray-900"
                                    }`}
                            >
                                <User size={20} />
                                <span className="font-medium">Edit Profile</span>
                            </button>

                            <button
                                onClick={() => {
                                    setShowMobileMenu(false);
                                    handleLogout();
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all mt-4"
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>

                        {/* Footer */}
                        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"
                            }`}>
                            <p className={`text-xs text-center ${darkMode ? "text-gray-500" : "text-gray-400"
                                }`}>
                                Job Tracker v1.0
                            </p>
                        </div>
                    </div>
                </>
            )}

            {/* ANIMATIONS */}
            <style>{`
                @keyframes slideInLeft {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slideInLeft { animation: slideInLeft 0.3s ease-out; }
                .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
            `}</style>
        </>
    );
}
