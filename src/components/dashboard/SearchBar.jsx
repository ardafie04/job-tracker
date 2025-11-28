// —————————————————————————————
// components/dashboard/SearchBar.jsx
// —————————————————————————————

import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, onClear, darkMode }) {
    return (
        <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm transition-all ${darkMode
                ? "bg-gray-800/50 border border-gray-700"
                : "bg-white/80 border border-gray-200"
            }`}>
            <div className="flex items-center gap-2 sm:gap-3">
                <Search size={18} className={`sm:w-5 sm:h-5 flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                <input
                    type="text"
                    placeholder="Cari perusahaan, lokasi, atau posisi..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`flex-1 bg-transparent border-none outline-none text-sm sm:text-base ${darkMode ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"
                        }`}
                />
                {value && (
                    <button
                        onClick={onClear}
                        className={`p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                    >
                        <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                )}
            </div>
        </div>
    );
}
