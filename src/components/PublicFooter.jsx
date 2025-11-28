// —————————————————————————————
// PublicFooter.jsx (REUSABLE FOOTER)
// —————————————————————————————

import { useNavigate } from "react-router-dom";
import logo from "../logo/logo.png";

export default function PublicFooter() {
    const navigate = useNavigate();

    return (
        <footer className="relative z-10 border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Logo & About */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
                                <img src={logo} alt="Job Tracker" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="font-bold text-lg">Job Tracker</p>
                                <p className="text-xs text-gray-400">Lacak Lamaran, Raih Impian</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Platform gratis untuk mengelola dan melacak semua lamaran kerja Anda dengan mudah dan efisien.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold mb-4 text-white">Quick Links</h3>
                        <div className="flex flex-col space-y-2">
                            <button onClick={() => navigate("/")} className="text-sm text-gray-400 hover:text-white text-left transition-colors">
                                Home
                            </button>
                            <button onClick={() => navigate("/login")} className="text-sm text-gray-400 hover:text-white text-left transition-colors">
                                Login
                            </button>
                            <button onClick={() => navigate("/register")} className="text-sm text-gray-400 hover:text-white text-left transition-colors">
                                Register
                            </button>
                            <button onClick={() => navigate("/contact")} className="text-sm text-gray-400 hover:text-white text-left transition-colors">
                                Contact Us
                            </button>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-bold mb-4 text-white">Legal</h3>
                        <div className="flex flex-col space-y-2">
                            <button onClick={() => navigate("/privacy")} className="text-sm text-gray-400 hover:text-white text-left transition-colors">
                                Privacy Policy
                            </button>
                            <button onClick={() => navigate("/terms")} className="text-sm text-gray-400 hover:text-white text-left transition-colors">
                                Terms & Conditions
                            </button>
                        </div>
                        <div className="mt-6">
                            <h4 className="font-semibold mb-2 text-white text-sm">Email</h4>
                            <a href="mailto:ardafie04@gmail.com" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                ardafie04@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-8 border-t border-gray-700/50 text-center">
                    <p className="text-sm text-gray-400">
                        © 2025 Job Tracker. All rights reserved. Made with 💙
                    </p>
                </div>
            </div>
        </footer>
    );
}
