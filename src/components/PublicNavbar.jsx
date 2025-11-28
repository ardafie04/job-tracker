// —————————————————————————————
// PublicNavbar.jsx (WITH ACTIVE SECTION DETECTION)
// —————————————————————————————

import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../logo/logo.png";

export default function PublicNavbar({ currentPage = "home" }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home"); // ✅ Track active section

    // ✅ Detect scroll & active section
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);

            // ✅ Detect which section is active (only on home page)
            if (currentPage === "home") {
                const featuresSection = document.getElementById('features');

                if (featuresSection) {
                    const rect = featuresSection.getBoundingClientRect();
                    const isInView = rect.top <= 100 && rect.bottom >= 100;

                    if (isInView) {
                        setActiveSection("features");
                    } else if (window.scrollY < 300) {
                        setActiveSection("home");
                    }
                }
            }
        };

        handleScroll(); // Check initial position

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage]);

    const handleFeatureClick = () => {
        if (currentPage === "home") {
            const element = document.getElementById('features');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // ✅ Set active immediately
                setTimeout(() => setActiveSection("features"), 300);
            }
        } else {
            navigate("/#features");
        }
    };

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-gray-900 border-b border-gray-700 shadow-2xl"
            : "bg-gray-900/80 backdrop-blur-md border-b border-gray-700/30" // ✅ Tambah background di atas juga
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg overflow-hidden">
                            <img src={logo} alt="Job Tracker" className="w-full h-full object-cover" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg sm:text-xl font-bold text-white">Job Tracker</h1>
                            <p className="text-xs text-gray-400">Lacak Lamaran, Raih Impian</p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => {
                                navigate("/");
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`text-sm font-medium transition-colors ${currentPage === "home" && activeSection === "home" ? "text-white" : "text-gray-300 hover:text-white"
                                }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={handleFeatureClick}
                            className={`text-sm font-medium transition-colors ${activeSection === "features" ? "text-white" : "text-gray-300 hover:text-white"
                                }`}
                        >
                            Fitur
                        </button>
                        <div className="h-6 w-px bg-gray-700"></div>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:scale-105"
                        >
                            Daftar Gratis
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-700/50 transition-colors text-white"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* ✅ Mobile Menu - Fix Background */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-700/50 bg-gray-900 backdrop-blur-xl">
                        <div className="flex flex-col space-y-2">
                            <button
                                onClick={() => {
                                    navigate("/");
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    setMobileMenuOpen(false);
                                }}
                                className={`text-left px-4 py-2.5 rounded-lg transition-colors ${currentPage === "home" && activeSection === "home" ? "bg-gray-800 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                    }`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => {
                                    handleFeatureClick();
                                    setMobileMenuOpen(false);
                                }}
                                className={`text-left px-4 py-2.5 rounded-lg transition-colors ${activeSection === "features" ? "bg-gray-800 text-white" : "text-gray-300 hover:text-white hover:bg-gray-800"
                                    }`}
                            >
                                Fitur
                            </button>
                            <div className="h-px bg-gray-700 my-2"></div>
                            <button
                                onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
                                className="text-left px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { navigate("/register"); setMobileMenuOpen(false); }}
                                className="mx-4 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-center"
                            >
                                Daftar Gratis
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
