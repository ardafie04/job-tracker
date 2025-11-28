// —————————————————————————————
// components/dashboard/FilterBar.jsx
// —————————————————————————————

import { Filter, ArrowUpDown } from "lucide-react";

export default function FilterBar({ filter, setFilter, sortBy, setSortBy, darkMode }) {
    return (
        <div className={`mb-4 sm:mb-6 p-4 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm transition-all ${darkMode
                ? "bg-gray-800/50 border border-gray-700"
                : "bg-white/80 border border-gray-200"
            }`}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Filter Status */}
                <div className="flex-1">
                    <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                        <Filter size={14} className="inline mr-1" />
                        Filter Status
                    </label>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg border-2 text-sm transition-all ${darkMode
                                ? "bg-gray-700/50 border-gray-600 text-white focus:border-blue-500"
                                : "bg-white border-gray-300 text-gray-900 focus:border-blue-400"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer`}
                    >
                        <option value="all">Semua Lamaran</option>
                        <option value="active">Aktif</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>

                {/* Sort By */}
                <div className="flex-1">
                    <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                        <ArrowUpDown size={14} className="inline mr-1" />
                        Urutkan
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg border-2 text-sm transition-all ${darkMode
                                ? "bg-gray-700/50 border-gray-600 text-white focus:border-purple-500"
                                : "bg-white border-gray-300 text-gray-900 focus:border-purple-400"
                            } focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer`}
                    >
                        <option value="newest">Terbaru</option>
                        <option value="oldest">Terlama</option>
                        <option value="expiringSoon">Segera Expired</option>
                        <option value="companyAZ">Perusahaan (A-Z)</option>
                        <option value="companyZA">Perusahaan (Z-A)</option>
                    </select>
                </div>
            </div>

            {/* Active Filter Info */}
            {(filter !== 'all' || sortBy !== 'newest') && (
                <div className={`mt-3 pt-3 border-t flex items-center justify-between text-xs ${darkMode ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-600"
                    }`}>
                    <span>
                        Filter aktif: <strong className={darkMode ? "text-white" : "text-gray-900"}>
                            {filter === 'all' ? 'Semua' : filter === 'active' ? 'Aktif' : 'Expired'}
                        </strong> • Urutan: <strong className={darkMode ? "text-white" : "text-gray-900"}>
                            {sortBy === 'newest' ? 'Terbaru' :
                                sortBy === 'oldest' ? 'Terlama' :
                                    sortBy === 'expiringSoon' ? 'Segera Expired' :
                                        sortBy === 'companyAZ' ? 'A-Z' : 'Z-A'}
                        </strong>
                    </span>
                    <button
                        onClick={() => {
                            setFilter('all');
                            setSortBy('newest');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${darkMode
                                ? "bg-gray-700 hover:bg-gray-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                            }`}
                    >
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
}
