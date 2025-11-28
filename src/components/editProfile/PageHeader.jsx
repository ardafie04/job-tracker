// —————————————————————————————
// components/editProfile/PageHeader.jsx
// —————————————————————————————

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({ darkMode }) {
    const navigate = useNavigate();

    return (
        <>
            {/* Back Button */}
            <button
                onClick={() => navigate("/dashboard")}
                className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${darkMode
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-white hover:bg-gray-50 text-gray-900 shadow"
                    }`}
            >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Kembali</span>
            </button>

            {/* Page Title */}
            <div className="mb-8">
                <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"
                    }`}>
                    Edit Profile
                </h1>
                <p className={`text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                    Kelola informasi akun dan keamanan Anda
                </p>
            </div>
        </>
    );
}
