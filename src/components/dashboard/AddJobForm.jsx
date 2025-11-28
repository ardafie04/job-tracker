// —————————————————————————————
// components/dashboard/AddJobForm.jsx (IMPROVED LAYOUT)
// —————————————————————————————

import { useState } from "react";
import { Briefcase, Building2, MapPin, Calendar, Banknote, FileText } from "lucide-react";

export default function AddJobForm({ onSubmit, darkMode }) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [jobDetails, setJobDetails] = useState("");
    const [createdDate, setCreatedDate] = useState(getTodayDate());
    const [expiryDate, setExpiryDate] = useState(getDefaultExpiry());
    const [keterangan, setKeterangan] = useState("Sedang Di Review");

    function getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }

    function getDefaultExpiry(fromDate = new Date()) {
        const expiry = new Date(fromDate);
        expiry.setDate(expiry.getDate() + 30);
        return expiry.toISOString().split('T')[0];
    }

    const handleCreatedDateChange = (e) => {
        const newDate = e.target.value;
        setCreatedDate(newDate);
        setExpiryDate(getDefaultExpiry(new Date(newDate)));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!company.trim() || !position.trim() || !location.trim()) {
            alert("Perusahaan, Posisi, dan Lokasi harus diisi!");
            return;
        }

        if (new Date(expiryDate) <= new Date(createdDate)) {
            alert("Tanggal kadaluarsa harus lebih besar dari tanggal dibuat!");
            return;
        }

        onSubmit({
            company,
            position,
            location,
            salary: salary.trim() || "-",
            jobDetails: jobDetails.trim() || "-",
            createdDate,
            expiryDate,
            keterangan: keterangan.trim() || "Sedang Di Review"
        });

        // Clear form
        setCompany("");
        setPosition("");
        setLocation("");
        setSalary("");
        setJobDetails("");
        setCreatedDate(getTodayDate());
        setExpiryDate(getDefaultExpiry());
        setKeterangan("Sedang Di Review");
    };

    return (
        <form onSubmit={handleSubmit} className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl mb-6 sm:mb-8 backdrop-blur-sm transition-all ${darkMode
            ? "bg-gray-800/50 border border-gray-700"
            : "bg-white/80 border border-gray-200"
            }`}>
            <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"
                }`}>
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                Tambah Lamaran Baru
            </h2>

            {/* ✅ ROW 1: Company, Location, Position */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <InputField
                    icon={<Building2 size={18} />}
                    placeholder="Nama Perusahaan *"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    dark={darkMode}
                />

                <InputField
                    icon={<MapPin size={18} />}
                    placeholder="Lokasi *"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    dark={darkMode}
                />

                <InputField
                    icon={<Briefcase size={18} />}
                    placeholder="Posisi / Jobdesk *"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    dark={darkMode}
                />
            </div>

            {/* ✅ ROW 2: Salary, Created Date, Expiry Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <InputField
                    icon={<Banknote size={18} />}
                    placeholder="Gaji (opsional)"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    dark={darkMode}
                />

                <InputField
                    icon={<Calendar size={18} />}
                    type="date"
                    value={createdDate}
                    onChange={handleCreatedDateChange}
                    dark={darkMode}
                    title="Tanggal Dibuat"
                />

                <InputField
                    icon={<Calendar size={18} />}
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    dark={darkMode}
                    title="Tanggal Kadaluarsa"
                />
            </div>

            {/* ✅ Detail Pekerjaan */}
            <div className="mb-3 sm:mb-4">
                <div className="relative">
                    <div className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <FileText size={18} />
                    </div>
                    <textarea
                        value={jobDetails}
                        onChange={(e) => setJobDetails(e.target.value)}
                        placeholder="Detail Pekerjaan: Deskripsi, requirement, benefits... (opsional)"
                        rows="3"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm sm:text-base transition-all resize-none ${darkMode
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                </div>
            </div>

            {/* ✅ Keterangan Status */}
            <div className="mb-3 sm:mb-4">
                <textarea
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    placeholder="Keterangan: Status lamaran Anda..."
                    rows="2"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm sm:text-base transition-all resize-none ${darkMode
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
            </div>

            {/* ✅ Info Helper */}
            <div className={`p-3 rounded-lg text-xs sm:text-sm flex items-start gap-2 mb-4 sm:mb-6 ${darkMode
                ? "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}>
                <span className="text-base">💡</span>
                <span>Default kadaluarsa +30 hari dari tanggal dibuat. Field dengan (*) wajib diisi.</span>
            </div>

            <button
                type="submit"
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-95 ${darkMode
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    } text-white`}
            >
                + Tambah Lamaran
            </button>
        </form>
    );
}

function InputField({ icon, placeholder, value, onChange, dark, type = "text", title }) {
    return (
        <div className="relative">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${dark ? "text-gray-400" : "text-gray-500"
                }`}>
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                title={title}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm sm:text-base transition-all ${dark
                    ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
        </div>
    );
}
