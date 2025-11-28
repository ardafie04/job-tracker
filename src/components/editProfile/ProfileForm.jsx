// —————————————————————————————
// components/editProfile/ProfileForm.jsx
// —————————————————————————————

import { useState } from "react";
import { User, Mail, Save } from "lucide-react";

export default function ProfileForm({ user, darkMode, saving, onSubmit }) {
    const [fullName, setFullName] = useState(user?.full_name || "");
    const [username, setUsername] = useState(user?.username || "");
    const [email] = useState(user?.email || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(fullName, username);
    };

    return (
        <div className={`p-6 sm:p-8 rounded-2xl shadow-xl mb-6 backdrop-blur-sm ${darkMode
                ? "bg-gray-800/50 border border-gray-700"
                : "bg-white/80 border border-gray-200"
            }`}>
            <h2 className={`text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"
                }`}>
                <User size={24} />
                Informasi Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <FormInput
                    icon={<User size={18} />}
                    label="Nama Lengkap *"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama lengkap"
                    disabled={saving}
                    darkMode={darkMode}
                />

                {/* Username */}
                <FormInput
                    icon={<User size={18} />}
                    label="Username (Opsional)"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    disabled={saving}
                    darkMode={darkMode}
                />

                {/* Email (Read Only) */}
                <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                        Email
                    </label>
                    <div className="relative">
                        <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"
                            }`}>
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 cursor-not-allowed ${darkMode
                                    ? "bg-gray-700/30 border-gray-600 text-gray-400"
                                    : "bg-gray-100 border-gray-300 text-gray-600"
                                }`}
                        />
                    </div>
                    <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        Email tidak dapat diubah
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={saving}
                    className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2 ${saving
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105"
                        } text-white`}
                >
                    {saving ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save size={20} />
                            Simpan Perubahan
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

function FormInput({ icon, label, type, value, onChange, placeholder, disabled, darkMode }) {
    return (
        <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                {label}
            </label>
            <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                    {icon}
                </div>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all ${darkMode
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                        } focus:outline-none`}
                />
            </div>
        </div>
    );
}
